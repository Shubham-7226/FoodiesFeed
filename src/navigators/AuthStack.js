import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
// import {createStackNavigator} from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
