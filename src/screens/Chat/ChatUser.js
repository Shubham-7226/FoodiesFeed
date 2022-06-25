import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function ChatUser() {
  const userDetail = useSelector(state => state.user.user.image);
  console.log('in chat user expecting image from store', userDetail);
  return (
    <View style={styles.container}>
      <Text>Recepies will be added soon</Text>
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
