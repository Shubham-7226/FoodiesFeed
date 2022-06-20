import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../store/actions/index';
import COLORS from '../../constants/colors';
import {LOGOUT, API_URL, GET_USER} from '../../utils/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout({navigation}) {
  const dispatch = useDispatch();
  let token = useSelector(state => state.user.user.token);
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
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
  return (
    <View style={styles.container}>
      <CustomButton
        title="Logout"
        onPress={logoutHandler}
        customBackgroundColor={COLORS.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
