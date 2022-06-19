import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../constants/colors';
import {FORGOT_PASSWORD} from '../../utils/url';
import axios from 'axios';
import {WebView} from 'react-native-webview';

export default function ForgotPassword({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [resUrl, setResUrl] = useState('');
  let url = '';

  async function onSubmit() {
    setIsLoading(true);
    await axios
      .post(FORGOT_PASSWORD, {
        userName: email,
      })
      .then(res => {
        console.log('this is response', res.data.data.resetUrl);
        url = res.data.data.resetUrl;
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.response.data);
        setIsLoading(false);
      });
    console.log('url in onSUbmit of reset password', url);
    // navigation.navigate('WebViewForgotPassword', {
    //   url: url,
    // });
    setResUrl(url);
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
      <CustomButton
        title="Submit"
        onPress={onSubmit}
        customBackgroundColor={COLORS.primary}
        customStyle={{minWidth: '80%'}}
      />
      {resUrl ? (
        <View style={styles.webViewStyles}>
          <WebView
            source={{
              uri: resUrl,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webViewStyles: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'red',
  },
});
