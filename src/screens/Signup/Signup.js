import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {registerUser} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import COLORS from '../../constants/colors';
import {REGISTER} from '../../utils/url';

export default function Signup({navigation}) {
  const [input, setInput] = useState({
    username: '',
    name: '',
    email: '',
    dob: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
        setIsLoading(false);
        let userImage = res.data.data.user.image;
        let userId = res.data.data.user.id;
        dispatch(registerUser({input, userToken, userImage, userId}));
      })
      .catch(err => {
        console.log(err?.response?.data?.errorMessage);
        setErrorMessage('enter valid details');
        setIsLoading(false);
      });
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.scrollViewSignup}>
        <View style={[styles.container]}>
          <View
            style={{
              position: 'absolute',
              top: '45%',
              left: '45%',
            }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="orange" />
            ) : null}
          </View>
          <Text style={styles.errorMessageStyle}>{errorMessage}</Text>

          <CustomTextInput
            label="Username"
            placeholder="Username"
            onChangeText={inputHandler.bind(this, 'username')}
          />
          <CustomTextInput
            label="Name"
            placeholder="Fullname"
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
          <View style={styles.buttonContainer}>
            <CustomButton
              title="SIGNUP"
              onPress={onSignup}
              customBackgroundColor={COLORS.primary}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 12,
  },
  errorMessageStyle: {
    color: 'red',
    paddingVertical: 5,
  },
  scrollViewSignup: {
    height: '100%',

    backgroundColor: 'white',
  },
});
