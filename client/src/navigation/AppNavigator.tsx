import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screen/auth/LoginScreen';
import RegisterScreen from '../screen/auth/RegisterScreen';
import ProfileScreen from '../screen/dashboard/ProfileScreen';

import EditImageScreen from "../screen/dashboard/EditImageScreen"
import GalleryScreen from "../screen/dashboard/GalleryScreen"
import ImageDetailScreen from "../screen/dashboard/ImageDetailScreen"

const Stack = createStackNavigator();


const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Register">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: 'Login' }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ title: 'Crear Cuenta' }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen
      name="EditImage"
      component={EditImageScreen}
      options={{ title: 'EditImage' }}
    />
    <Stack.Screen
      name="Gallery"
      component={GalleryScreen}
      options={{ title: 'Gallery' }}
    />
    <Stack.Screen
      name="ImageDetail"
      component={ImageDetailScreen}
      options={{ title: 'ImageDetail' }}
    />
    

  </Stack.Navigator>
);

export default AppNavigator;