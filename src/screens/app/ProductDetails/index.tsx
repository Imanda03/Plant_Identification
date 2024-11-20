import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {useAuth} from '../../../Context';
import {useToast} from '../../../Context/ToastContext';
import ImageCarsousel from '../../../components/core/ImageCarsousel';
import ButtonWithIcon from '../../../components/core/ButtonWithIcon';
import InfoModal from '../../../components/core/InfoModal';
import {styles} from './styles';

const ProductDetails = ({route, navigation}: any) => {
  const product = route?.params || {};
  const {authToken, userId} = useAuth();
  const queryClient = useQueryClient();
  const {showToast} = useToast();

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const contentTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const onBackPress = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Animated Header Background */}
      <Animated.View
        style={[
          styles.headerBackground,
          {
            opacity: headerOpacity,
          },
        ]}
      />

      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <Animated.View style={{opacity: fadeAnim}}>
          {product?.images?.length ? (
            <ImageCarsousel images={product.images} />
          ) : (
            <Image style={styles.Image} source={{uri: product.image}} />
          )}
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {translateY: contentTranslate},
                {translateY: slideAnim},
              ],
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Rs. {product.price}</Text>
          <View style={styles.stockContainer}>
            <Text style={styles.stock}>{`${product.quantity} on stock`}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </Animated.View>
      </ScrollView>

      <TouchableOpacity
        onPress={onBackPress}
        style={[styles.backContainer, {opacity: 0.9}]}>
        <FontAwesome name="arrow-left" size={20} color="#212b24" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.footer,
          {
            transform: [{translateY: slideAnim}],
            opacity: fadeAnim,
          },
        ]}></Animated.View>
    </SafeAreaView>
  );
};

export default React.memo(ProductDetails);
