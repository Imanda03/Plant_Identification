import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  Modal,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import axios from 'axios';
import {comparePlant} from '../../../services/AuthService';
import {useToast} from '../../../Context/ToastContext';

const CameraScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>();
  const [imageModal, setImageModal] = useState<boolean>(false);

  const requestCameraPermission = async () => {
    const permission: any = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    });

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  const {mutate: compareImage, isLoading: plantLoading, error} = comparePlant();

  const {showToast} = useToast();

  const uploadImagesToCloudinary = async (
    images: {uri: string}[],
  ): Promise<string[]> => {
    setIsLoading(true);
    try {
      const uploadPromises = images.map(async file => {
        const data = new FormData();
        data.append('file', {
          uri: file.uri,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
        data.append('upload_preset', 'upload');

        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dac2bl82p/image/upload',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('Cloudinary Image URL:', uploadRes.data.url);
        return uploadRes.data.url;
      });

      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      Alert.alert('Upload Failed', 'Could not upload image to Cloudinary');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera(
        {
          mediaType: 'photo',
          includeBase64: false,
        },
        async (response: any) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            console.log('Camera Error', response.errorMessage);
          } else if (response.assets && response.assets[0]?.uri) {
            const data = await uploadImagesToCloudinary(response.assets);
            compareImage(data?.[0], {
              onSuccess: async data => {
                console.log('data on success', data);
                setResponseData(data);
                setImageModal(true);
              },
              onError: (error: any) => {
                if (error?.response?.data) {
                  // Check for the actual error message from the backend
                  const backendMessage = error.response.data.message;
                  showToast(backendMessage, 'error');
                } else {
                  // Handle generic error cases
                  console.log('error', error.message);
                  showToast('Network error or server is down', 'error');
                }
              },
            });
          }
        },
      );
    }
  };

  const openGallery = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 0,
      },
      async (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled gallery');
        } else if (response.errorCode) {
          console.log('Gallery Error', response.errorMessage);
        } else if (response.assets) {
          const data = await uploadImagesToCloudinary(response.assets);
          console.log('first', data?.[0]);
          compareImage(data?.[0], {
            onSuccess: async data => {
              console.log('data on success', data);
              setResponseData(data);
              setImageModal(true);
            },
            onError: (error: any) => {
              if (error?.response?.data) {
                // Check for the actual error message from the backend
                const backendMessage = error.response.data.message;
                showToast(backendMessage, 'error');
              } else {
                // Handle generic error cases
                console.log('error', error.message);
                showToast('Network error or server is down', 'error');
              }
            },
          });
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.border}>
        {isLoading || plantLoading ? (
          <Text style={{color: 'black'}}>
            Waiting...
            <ActivityIndicator size="large" color="#2d3b37" />
          </Text>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <Text style={styles.buttonText}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal
          visible={imageModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setImageModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setImageModal(false)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>

              {/* Image */}
              <Image
                source={{uri: responseData?.imageUrl}}
                style={styles.image}
              />

              {/* Title */}
              <Text style={styles.title}>{responseData?.name}</Text>

              {/* Description */}
              <Text style={styles.description}>
                {responseData?.description}
              </Text>

              {/* Category and Accuracy */}
              <View style={styles.infoRow}>
                <Text style={styles.category}>
                  Category: {responseData?.category}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  border: {
    height: '50%',
    width: '80%',
    borderWidth: 5,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2d3b37',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  accuracy: {
    fontSize: 16,
    fontWeight: '500',
    color: '#28a745',
  },
});

export default CameraScreen;
