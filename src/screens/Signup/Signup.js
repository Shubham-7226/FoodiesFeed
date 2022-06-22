import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {registerUser} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import COLORS from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REGISTER} from '../../utils/url';

export default function Signup({navigation}) {
  const [input, setInput] = useState({
    username: '',
    name: '',
    email: '',
    dob: '',
    password: '',
  });
  // const [userToken, setUserToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const storeTokenTOAsync = async token => {
  //   try {
  //     console.log('storing token in async', token);
  //     const jsonValue = JSON.stringify(token);
  //     await AsyncStorage.setItem('userToken', jsonValue);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const userDetail = useSelector(state => state.user.user);
  // console.log('After userSelector', userDetail);
  //console.log(registerd);
  const inputHandler = (inputidentifier, enteredData) => {
    setInput(input => {
      return {
        ...input,
        [inputidentifier]: enteredData,
      };
    });
  };

  const onSignup = async () => {
    console.log('this is input in signUp', input);
    if (
      input.username === '' ||
      input.email === '' ||
      input.password === '' ||
      input.name === '' ||
      input.dob === ''
    ) {
      alert('Please enter all the details');
    }
    const {username, password, email, name, dob} = input;
    setIsLoading(true);
    await axios
      .post(REGISTER, {
        userName: username,
        password: password,
        email: email,
        name: name,
        dob: dob,
      })
      .then(res => {
        console.log('this is token', res.data.data.authenticate);
        setErrorMessage('');
        let userToken = res.data.data.authenticate;
        console.log('user token before dispatch', userToken);
        // storeTokenTOAsync(userToken);
        setIsLoading(false);
        let userImage = res.data.data.user.image;
        let userId = res.data.data.user.id;
        dispatch(registerUser({input, userToken, userImage, userId}));
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
        setErrorMessage(err.response.data.errorMessage);
        setIsLoading(false);
      });

    // await AsyncStorage.setItem('token', userToken);
  };
  return (
    <View style={[styles.container]}>
      <ScrollView style={styles.scrollViewSignup}>
        <View
          style={{
            position: 'absolute',
            top: '45%',
            left: '45%',
            // backgroundColor: 'red',
          }}>
          {isLoading ? <ActivityIndicator size="large" color="orange" /> : null}
        </View>
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>

        <CustomTextInput
          label="Username"
          placeholder="Username"
          onChangeText={inputHandler.bind(this, 'username')}
        />
        <CustomTextInput
          label="Name"
          placeholder="Username"
          onChangeText={inputHandler.bind(this, 'name')}
        />
        <CustomTextInput
          label="Email"
          placeholder="Email"
          onChangeText={inputHandler.bind(this, 'email')}
        />
        <CustomTextInput
          label="DOB"
          placeholder="MM/DD/YYYY"
          onChangeText={inputHandler.bind(this, 'dob')}
        />
        <CustomTextInput
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={inputHandler.bind(this, 'password')}
        />

        <CustomButton
          title="SIGNUP"
          onPress={onSignup}
          customBackgroundColor={COLORS.primary}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    // backgroundColor: 'white',
    // borderWidth: 1,
  },
  errorMessageStyle: {
    color: 'red',
    paddingVertical: 5,
  },
  scrollViewSignup: {
    // height: 300,
    // paddingVertical: 40,
    marginVertical: 25,
    backgroundColor: 'white',
  },
});
