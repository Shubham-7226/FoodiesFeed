import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector, useDispatch} from 'react-redux';

export default function Navigation() {
  let isUserLoggedin = useSelector(state => {
    return state.user.token;
  });

  // const [data, setData] = useState(null);
  // setData(AsyncStorage.getItem('token'));
  // console.log(data);

  // isUserLoggedin = async () => {
  //   try {
  //     return await AsyncStorage.getItem('token');
  //     // alert('Data successfully saved');
  //   } catch (e) {
  //     alert('Failed to save the data to the storage');
  //   }
  // };
  console.log('in navigation checking is user loggedin', isUserLoggedin);

  return (
    <NavigationContainer>
      {isUserLoggedin ? <MainStack /> : <AuthStack />}
      {/* <MainStack /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
