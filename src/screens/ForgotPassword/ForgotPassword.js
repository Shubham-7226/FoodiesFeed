import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../constants/colors';
import {FORGOT_PASSWORD} from '../../utils/url';
import axios from 'axios';

export default function ForgotPassword({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [resUrl, setResUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let url = '';
  const TostMessage = () => {
    ToastAndroid.show('Email sended Sucessfully !', ToastAndroid.SHORT);
  };
  async function onSubmit() {
    setIsLoading(true);
    await axios
      .post(FORGOT_PASSWORD, {
        userName: email,
      })
      .then(res => {
        console.log('this is response', res.data.data.resetUrl);
        url = res.data.data.resetUrl;
        setResUrl(url);
        setIsLoading(false);
        navigation.pop();
        TostMessage();
      })
      .catch(err => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.errorMessage);
        setIsLoading(false);
      });
    console.log('url in onSUbmit of reset password', url);
  }

  return (
    <View style={styles.container}>
      <CustomTextInput
        label="Email"
        placeholder="Email"
        customStyle={{minWidth: '80%'}}
        onChangeText={text => {
          setEmail(text);
        }}
        value={email}
      />
      {errorMessage ? (
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
      ) : null}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          customStyle={{width: '45%'}}
          onPress={onSubmit}
          customBackgroundColor={COLORS.primary}
        />
        <CustomButton
          title="Cancel"
          customStyle={{width: '45%'}}
          onPress={() => {
            navigation.pop();
          }}
          customBackgroundColor={COLORS.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorMessageStyle: {
    color: 'red',
    paddingVertical: 5,
  },
});
