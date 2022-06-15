import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {registerUser} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';

export default function Signup({navigation}) {
  const [input, setInput] = useState({
    username: '',
    name: '',
    email: '',
    dob: '',
    password: '',
  });
  // const userDetail = useSelector(state => state.user);
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

  // const [username, setUserName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  // const {username, email, password, isSecure} = state;
  // const updateState = data => setState(() => ({...state, ...data}));

  const onSignup = () => {
    // if (username === '' || email === '' || password === '') {
    //   alert('Please enter all the details');
    //   return;
    // }
    // axios
    //   .post(`${API_URL}/register`, {
    //     user,
    //   })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    navigation.navigate('Login');
  };
  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: 'transparent',
        },
      ]}>
      <CustomTextInput
        label="Username"
        placeholder="Username"
        onChangeText={() => inputHandler.bind(this, 'username')}
      />
      <CustomTextInput
        label="Name"
        placeholder="Username"
        onChangeText={() => inputHandler.bind(this, 'name')}
      />
      <CustomTextInput
        label="Email"
        placeholder="Email"
        onChangeText={() => inputHandler.bind(this, 'email')}
      />
      <CustomTextInput
        label="DOB"
        placeholder="DOB"
        onChangeText={() => inputHandler.bind(this, 'dob')}
      />
      <CustomTextInput
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={() => inputHandler.bind(this, 'password')}
      />

      <CustomButton
        title="SIGNUP"
        onPress={onSignup}
        customBackgroundColor="#0066ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderWidth: 1,
  },
});
