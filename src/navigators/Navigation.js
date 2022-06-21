import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import {useSelector, useDispatch} from 'react-redux';

export default function Navigation() {
  // const [isUserLoggedin, setIsUserLoggedin] = useState();
  let isUserLoggedin;
  isUserLoggedin = useSelector(state => {
    return state.user.user.token;
  });
  // const getTokenFromAsync = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('userToken');
  //     setIsUserLoggedin(jsonValue != null ? JSON.parse(jsonValue) : null);
  //     console.log(
  //       'in navigation after getting token from async',
  //       isUserLoggedin,
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    // getTokenFromAsync();
  }, []);

  // let token = useSelector(state => state.user.token);
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
