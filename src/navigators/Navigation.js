import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUserToken} from '../store/actions/index';

export default function Navigation() {
  const dispatch = useDispatch();
  let isUserLoggedin;
  let tokenfromAsync = useSelector(state => {
    return state.user.user.token;
  });
  isUserLoggedin = tokenfromAsync;
  useEffect(() => {
    if (tokenfromAsync === null) getTokenFromAsync();
  }, [tokenfromAsync]);
  const getTokenFromAsync = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userToken');
      isUserLoggedin = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(
        'in navigation after getting token from async',
        isUserLoggedin,
        dispatch(setUserToken({isUserLoggedin})),
      );
    } catch (e) {
      console.log(e);
    }
  };

  console.log('in navigation checking is user loggedin', isUserLoggedin);

  return (
    <NavigationContainer>
      {isUserLoggedin !== null ? <MainStack /> : <AuthStack />}
      {/* <MainStack /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
