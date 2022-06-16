import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

import {useSelector, useDispatch} from 'react-redux';

export default function Navigation() {
  const userDetail = useSelector(state => state.user);
  console.log('in Login After userSelector', userDetail);
  return (
    <NavigationContainer>
      {userDetail.token ? <MainStack /> : <AuthStack />}
      {/* <MainStack /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
