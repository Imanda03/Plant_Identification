import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Avatar} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import CategoryBox from '../../../components/CategoryBox';
import ProductHomeItem from '../../../components/ProductHomeItem';
import {useQuery, useQueryClient} from 'react-query';
import {useAuth} from '../../../Context';
import AnimatedBanner from '../../../components/AnimatedBanner';
import ListComponent from '../../../components/List';
interface RenderCategoryItemProps {
  item: CategoryItem;
  index: number;
}

interface CategoryItem {
  id: any;
  title: string;
  image: string;
}

interface ProductItem {
  title: string;
  images: string[];
  category: any;
  price: string;
  description?: string;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}

const HomeScreen = ({navigation}: any) => {
  const {authToken, userId} = useAuth();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };
    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  const handleChangeSearch = (value: string) => {
    setKeyword(value);
  };

  const bannerImages = [
    'https://img.freepik.com/free-vector/gradient-supermarket-social-media-promo-template_23-2149361392.jpg?semt=ais_hybrid',
    'https://img.freepik.com/free-vector/gradient-supermarket-sale-background_23-2149381867.jpg',
    'https://img.freepik.com/free-vector/gradient-sale-landing-page-with-photo_52683-68514.jpg',
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries('recommendedProducts', authToken, userId);
    queryClient.invalidateQueries('products', authToken);
    queryClient.invalidateQueries('category', authToken);

    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#e8e8e8', height: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View>
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
          <View>
            <ListComponent />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
