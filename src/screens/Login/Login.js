import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {loginUser} from '../../store/actions';
import {LOGIN} from '../../utils/url';
import COLORS from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  // const userDetail = useSelector(state => state.user.user);
  // console.log('in Login After userSelector', userDetail);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  // const [userToken, setUserToken] = useState();

  //console.log(registerd);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (inputidentifier, enteredData) => {
    setInput(input => {
      return {
        ...input,
        [inputidentifier]: enteredData,
      };
    });
  };

  function registerLinkHandler() {
    navigation.navigate('Signup');
  }

  const storeTokenTOAsync = async token => {
    try {
      console.log('storing token in async', token);
      const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem('userToken', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogin = async () => {
    if (input.email === '' || input.password === '') {
      alert('Please enter all the details');
    }
    const {email, password} = input;
    console.log(input);
    // setUserToken(123456);
    // console.log(LOGIN);
    setIsLoading(true);
    await axios
      .post(LOGIN, {
        userName: email,
        password: password,
      })
      .then(res => {
        // console.log('this is token', res.data.data.user.image);
        // setUserToken(res.data.data.authenticate);
        let userToken = res.data.data.authenticate;
        // storeTokenTOAsync(userToken);
        console.log('user token before dispatch', userToken);
        setErrorMessage('');
        // AsyncStorage.setItem('token', JSON.stringify(userToken));
        // const token = await AsyncStorage.getItem('token');

        // console.log('in navigation', JSON.parse(token));
        let userImage = res.data.data.user.image;
        setIsLoading(false);
        let userId = res.data.data.user.id;
        // dispatch(uploadImage({image: userImage}));
        // navigation.navigate('Login');
        dispatch(loginUser({input, userToken, userImage, userId}));
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
        setErrorMessage(err.response.data.errorMessage);
        setIsLoading(false);
      });

    // if (userToken !== null) {
    //   saveData(userToken);
    // }
    // navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top: '50%', left: '50%'}}>
        {isLoading ? <ActivityIndicator size={'large'} color="orange" /> : null}
      </View>
      <CustomTextInput
        label="Email"
        placeholder="Email"
        onChangeText={inputHandler.bind(this, 'email')}
        // value={input.email}
      />
      <CustomTextInput
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={inputHandler.bind(this, 'password')}
        // value={input.password}
      />
      <Text style={styles.errorMessageStyle}>{errorMessage}</Text>

      <CustomButton
        title="Login"
        onPress={onLogin}
        customBackgroundColor={COLORS.primary}
      />
      <View style={styles.registerTextContainer}>
        <Text style={styles.accountLabel}>Don't have account?</Text>
        <Pressable onPress={registerLinkHandler}>
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}>
        <Text
          style={{
            // marginHorizontal: 10,
            // padding: 10,
            color: COLORS.primary,
            // borderTopWidth: 1,
            // borderBottomWidth: 1,
            // borderColor: '#EFEFEF',
          }}>
          <Text style={styles.accountLabel}>Don't remember passowrd? </Text>
          ForgotPassword
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    // borderWidth: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  registerTextContainer: {
    // flex: 1,
    marginVertical: 12,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  accountLabel: {color: 'black'},
  registerText: {
    marginLeft: 6,
    color: COLORS.primary,
  },
  errorMessageStyle: {
    color: 'red',
    paddingVertical: 5,
  },
});
