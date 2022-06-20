import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

export default function ChatUser() {
  const userDetail = useSelector(state => state.user.user.image);
  console.log('in chat user expecting image from store', userDetail);
  return (
    <View style={styles.container}>
      <Image source={{uri: userDetail}} style={{height: 200, width: 200}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
