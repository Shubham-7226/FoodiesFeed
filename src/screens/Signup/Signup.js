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
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  isUserNameValid;

  const dispatch = useDispatch();

  const inputHandler = (inputidentifier, enteredData) => {
    if (inputidentifier === 'dob') {
      let result;
      if (enteredData.length === 2 && !enteredData.includes('/')) {
        result = `${enteredData.substring(0, 2)}/`;
      } else if (enteredData.length === 5) {
        result = `${enteredData.substring(0, 5)}/`;
      } else {
        result = enteredData;
      }

      setInput(input => {
        return {
          ...input,
          [inputidentifier]: result,
        };
      });
    } else {
      setInput(input => {
        return {
          ...input,
          [inputidentifier]: enteredData,
        };
      });
    }
  };
  function validateEmail() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(input.email) === false) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  }
  function validatePassword() {
    const reg =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@&.])[A-Za-z\d$@&.]{8,12}/;
    if (reg.test(input.password) === false) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  }
  function validate() {
    if (input.username.length < 4) {
      setIsUserNameValid(false);
    } else {
      setIsUserNameValid(true);
    }
  }

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
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView>
        <ScrollView style={styles.scrollViewSignup}>
          <View style={[styles.container]}>
            <View style={styles.indicatorWrapper}>
              {isLoading ? (
                <ActivityIndicator size="large" color="orange" />
              ) : null}
            </View>
            <Text style={styles.errorMessageStyle}>{errorMessage}</Text>

            <CustomTextInput
              label="Username"
              placeholder="Username"
              onChangeText={inputHandler.bind(this, 'username')}
              onEndEditing={() => {
                validate();
              }}
            />
            {!isUserNameValid && (
              <Text style={{color: 'red'}}>
                username must have atlest 4 length
              </Text>
            )}
            <CustomTextInput
              label="Name"
              placeholder="Fullname"
              onChangeText={inputHandler.bind(this, 'name')}
            />
            <CustomTextInput
              label="Email"
              placeholder="Email"
              onChangeText={inputHandler.bind(this, 'email')}
              onEndEditing={() => {
                validateEmail();
              }}
            />
            {!isEmailValid && (
              <Text style={{color: 'red'}}>email is not valid</Text>
            )}
            <CustomTextInput
              label="DOB"
              placeholder="MM-DD-YYYY"
              keyboardType="number-pad"
              onChangeText={inputHandler.bind(this, 'dob')}
              value={input.dob}
              maxLength={10}
            />
            <CustomTextInput
              label="Password"
              placeholder="Password"
              secureTextEntry
              onEndEditing={() => {
                validatePassword();
              }}
              onChangeText={inputHandler.bind(this, 'password')}
            />
            {!isPasswordValid && (
              <View style={{width: '100%'}}>
                <Text style={styles.warningTextStyle}>
                  password must contain{'\n'}
                  <Text style={[styles.warningTextStyle]}>
                    {'\t - '}1 Uppercase letters: A-Z{'\n'}
                  </Text>
                  <Text style={styles.warningTextStyle}>
                    {'\t - '}1 Lowercase l a-z {'\n'}
                  </Text>
                  <Text style={styles.warningTextStyle}>
                    {'\t - '}1 Numbers: 0-9 {'\n'}
                  </Text>
                  <Text style={styles.warningTextStyle}>
                    {'\t - '}1 Symbols: @$&()_-+={'\n'}
                  </Text>
                </Text>
              </View>
            )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  errorMessageStyle: {
    color: 'red',
    paddingVertical: 5,
  },
  scrollViewSignup: {
    height: '100%',

    // backgroundColor: 'white',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  warningTextStyle: {
    color: 'red',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
