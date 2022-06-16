import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {loginUser} from '../../store/actions';
import {LOGIN} from '../../utils/url';

export default function Login({navigation}) {
  // const userDetail = useSelector(state => state.user);
  // console.log('in Login After userSelector', userDetail);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [userToken, setUserToken] = useState();

  //console.log(registerd);
  const [errorMessage, setErrorMessage] = useState('');

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
  const onLogin = () => {
    if (input.email === '' || input.password === '') {
      alert('Please enter all the details');
    }
    const {email, password} = input;
    console.log(input);
    // setUserToken(123456);
    // console.log(LOGIN);
    axios
      .post(LOGIN, {
        userName: email,
        password: password,
      })
      .then(res => {
        console.log('this is token', res.data.data.authenticate);
        // setUserToken(res.data.data.authenticate);
        setErrorMessage('');
        let userToken = res.data.data.authenticate;
        console.log('user token before dispatch', userToken);
        dispatch(loginUser({input, userToken}));
        // navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
        setErrorMessage(err.response.data.errorMessage);
      });
    // navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
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
        customBackgroundColor="#0066ff"
      />
      <View style={styles.registerTextContainer}>
        <Text style={styles.accountLabel}>Don't have account?</Text>
        <Pressable onPress={registerLinkHandler}>
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
      </View>
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
  accountLabel: {},
  registerText: {
    marginLeft: 6,
    color: 'blue',
  },
  errorMessageStyle: {
    color: 'red',
    paddingVertical: 5,
  },
});
