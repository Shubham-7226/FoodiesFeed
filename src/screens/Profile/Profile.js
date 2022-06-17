import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';
import {logoutUser} from '../../store/actions/index';
import COLORS from '../../constants/colors';
import {LOGOUT, API_URL, GET_USER} from '../../utils/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  let token = useSelector(state => state.user.token);
  console.log('in Login After userSelector', token);
  console.log(LOGOUT);

  async function logoutHandler() {
    console.log('token before post logout', token);
    await axios
      .post(
        LOGOUT,
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        console.log('-----------------------', res.data);
        dispatch(logoutUser());
        console.log('logout sucess');
        // let t1 = useSelector(state => state.user.token);
        // console.log('---in logout After userSelector---', t1);
        // navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err.response.data);
      });

    // try {
    //   await AsyncStorage.removeItem('token');
    //   alert('Data successfully deleted');
    // } catch (e) {
    //   console.log(e);
    //   alert('Failed to delete the data to the storage');
    // }
    // dispatch(logoutUser());

    // // navigation.navigate('Home');
    // const config = {
    //   headers: {Authorization: `Bearer ${token}`},
    // };
    // console.log('this is config', config);
    // await fetch(API_URL + '/users/self', 'GET', config)
    //   .then(res => {
    //     console.log('res', res.data);
    //   })
    //   .catch(err => console.log(err));
    // fetch
    //   "GET"(API_URL + '/users/self', config)
    //   .then(res => {
    //     console.log('this is token', res.data);
    //     // setUserToken(res.data.data.authenticate);
    //     // setErrorMessage('');
    //     console.log('logout sucess');

    //     // let userToken = res.data.data.authenticate;
    //     // console.log('user token before dispatch', userToken);
    //     // dispatch(loginUser({input, userToken}));
    //     // navigation.navigate('Login');
    //   })
    //   .catch(err => {
    //     console.log(err.response.data);
    //     // setErrorMessage(err.response.data.errorMessage);
    //   });
  }
  return (
    <View style={styles.container}>
      <CustomButton
        title="Logout"
        onPress={logoutHandler}
        customBackgroundColor={COLORS.primary}
      />
      {/* <WebView source={{uri: 'https://google.com'}} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
