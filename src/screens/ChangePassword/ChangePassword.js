import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {CHANGE_PASSWORD} from '../../utils/url';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

export default function ChangePassword({navigation}) {
  let token = useSelector(state => state.user.user.token);

  const [input, setInput] = useState({
    oldPassword: '',
    newPassword: '',
    reEnteredNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputHandler = (inputidentifier, enteredData) => {
    setInput(input => {
      return {
        ...input,
        [inputidentifier]: enteredData,
      };
    });
  };
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  async function onSubmit() {
    if (input.newPassword !== input.reEnteredNewPassword) {
      Alert.alert('Passwords do not match', 'Both passsword must match', [
        {
          text: 'OK',
          onPress: () =>
            console.log('OK Pressed on alert of both pass do not match'),
        },
      ]);
    } else {
      setIsLoading(true);
      await axios
        .post(
          CHANGE_PASSWORD,
          {
            oldPassword: input.oldPassword,
            newPassword: input.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          console.log('this is response', res.data.data);
          setIsLoading(false);
          navigation.pop();
          TostMessage();
        })
        .catch(err => {
          console.log(err.response.data);
          let message = err?.response?.data?.errorMessage;
          setIsLoading(false);
          setErrorMessage(message);
        });
    }
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color="orange"
          style={styles.activityIndicatorStyle}
        />
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
      ) : null}
      <CustomTextInput
        label="Old Password"
        placeholder="Old Password"
        secureTextEntry={true}
        onChangeText={inputHandler.bind(this, 'oldPassword')}
      />
      <CustomTextInput
        label="New Password"
        placeholder="New Password"
        secureTextEntry={true}
        onChangeText={inputHandler.bind(this, 'newPassword')}
      />
      <CustomTextInput
        label="Re-enter New Password"
        placeholder="Re-enterNew Password"
        secureTextEntry={true}
        onChangeText={inputHandler.bind(this, 'reEnteredNewPassword')}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          onPress={onSubmit}
          customBackgroundColor={COLORS.primary}
          customStyle={{width: '45%'}}
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
    padding: 10,
    justifyContent: 'center',
  },
  activityIndicatorStyle: {
    position: 'absolute',
    top: '45%',
    left: '45%',
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
