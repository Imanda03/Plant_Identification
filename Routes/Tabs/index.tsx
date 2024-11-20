import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import HomeScreen from '../../src/screens/app/HomeScreen';
import ProfileScreen from '../../src/screens/app/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraScreen from '../../src/screens/app/CameraScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }
          const iconColor = focused ? '#ffffff' : '#dcdedc';
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        headerShown: false,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                styles.tabLabel,
                {color: focused ? '#ffffff' : '#dcdedc'},
              ]}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        // tabBarIconStyle: styles.tabBarIcon,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarButton = ({accessibilityState, children, onPress}: any) => {
  const focused = accessibilityState.selected;

  // Animated values for the translation and scale
  const translateYValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateYValue, {
      toValue: focused ? -1 : 0,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.tabBarButtonContainer}>
      <Animated.View
        style={[
          styles.tabBarButton,
          {
            transform: [{translateY: translateYValue}],
          },
          focused ? styles.tabBarButtonActive : null,
        ]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    elevation: 5,
    backgroundColor: '#232e23',
    borderRadius: 20,
    height: 70,
  },
  tabBarItem: {
    padding: 5,
  },
  // tabBarIcon: {
  //   marginTop: 10,
  // },
  tabLabel: {
    fontSize: 12,
    textAlign: 'center',
    width: 60,
    marginBottom: 10,
  },
  tabBarButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tabBarButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 8,
    // paddingHorizontal: 12,
  },
  tabBarButtonActive: {
    backgroundColor: '#777a77',
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default Tabs;
