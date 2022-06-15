import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
