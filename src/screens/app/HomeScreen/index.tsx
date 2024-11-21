import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {Avatar} from 'react-native-elements';
import {useQuery} from 'react-query';
import {useAuth} from '../../../Context';
import {getHistory} from '../../../services/AuthService';

const HomeScreen = ({navigation}: any) => {
  const {authToken, userId} = useAuth();
  const [selectedPlant, setSelectedPlant] = useState<any>(null); // State to hold selected plant data
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State to manage modal visibility
  const [refreshing, setRefreshing] = useState(false);

  const {data: historyData, refetch} = useQuery(['history', userId], () =>
    getHistory(userId),
  );

  console.log('sele', selectedPlant);
  const renderHistoryItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.historyItemContainer}
      onPress={() => {
        setSelectedPlant(item.plantData); // Set the selected plant data
        setModalVisible(true); // Open modal
      }}>
      <Image
        source={{uri: item.plantData.imageUrl}}
        style={styles.historyItemImage}
      />
      <View style={styles.historyItemTextContainer}>
        <Text style={styles.historyItemTitle}>{item.plantData.name}</Text>
        <Text style={styles.historyItemCategory}>
          Category: {item.plantData.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#e8e8e8', height: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View>
          {/* App Description Section */}
          <View style={styles.topView}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Plant</Text>
              <Text style={styles.text}>Identifiers</Text>
            </View>
            <Avatar
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
              }}
              size={55}
              rounded
              icon={{name: 'home'}}
            />
          </View>

          <View style={styles.appDescriptionContainer}>
            <Text style={styles.appDescriptionTitle}>
              Welcome to Plant Identifiers
            </Text>
            <Text style={styles.appDescriptionText}>
              This app allows you to view and manage your plant identification
              history. Explore recent plant identifications, browse plant
              details, and track your plant data.
            </Text>
          </View>

          {/* History Section */}
          <View style={styles.historySection}>
            <Text style={styles.historySectionTitle}>
              {historyData?.length > 0 ? 'Recent Identifications' : ''}
            </Text>
            <FlatList
              data={historyData && historyData?.length > 0 ? historyData : []}
              renderItem={renderHistoryItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 16,
              }} // Adds vertical and horizontal spacing
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                <View style={{marginBottom: 100}} /> // Empty footer to add space at the bottom
              }
              contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16}} // Padding for the entire list
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal for Plant Description */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedPlant?.name}</Text>
              <Image
                source={{uri: selectedPlant?.imageUrl}}
                style={styles.modalImage}
              />
              <Text style={styles.modalDescription}>
                {selectedPlant?.description}
              </Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
