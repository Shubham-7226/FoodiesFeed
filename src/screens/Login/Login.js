import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {loginUser} from '../../store/actions';
import {LOGIN} from '../../utils/url';
import COLORS from '../../constants/colors';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
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

  const onLogin = async () => {
    if (input.email === '' || input.password === '') {
      alert('Please enter all the details');
    }
    const {email, password} = input;
    console.log(input);
    setIsLoading(true);
    await axios
      .post(LOGIN, {
        userName: email,
        password: password,
      })
      .then(res => {
        let userToken = res.data.data.authenticate;

        console.log('user token before dispatch', userToken);
        setErrorMessage('');
        let userImage = res.data.data.user.image;
        setIsLoading(false);
        let userId = res.data.data.user.id;
        dispatch(loginUser({input, userToken, userImage, userId}));
      })
      .catch(err => {
        console.log(err?.response?.data?.errorMessage);
        Alert.alert(
          'Incorrect Login credentials',
          'Please check your credentials and try again',
          [
            {
              text: 'OK',
              onPress: () =>
                console.log('OK Pressed on alert of both pass do not match'),
            },
          ],
        );
        setErrorMessage(err?.response?.data?.errorMessage);
        setIsLoading(false);
      });
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
      />
      <CustomTextInput
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={inputHandler.bind(this, 'password')}
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
            color: COLORS.primary,
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
    justifyContent: 'center',
  },
  registerTextContainer: {
    marginVertical: 12,
    flexDirection: 'row',
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
