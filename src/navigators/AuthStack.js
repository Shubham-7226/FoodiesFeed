import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import OnBoardScreen from '../screens/OnBoardSCreen/OnBoardScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import WebViewForgotPassword from '../components/WebViewForgotPassword';

// import {createStackNavigator} from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  function LoginUserStack() {
    return (
      <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        {/* <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="WebViewForgotPassword"
          component={WebViewForgotPassword}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoardScreen"
        component={OnBoardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginUserStack"
        component={LoginUserStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
