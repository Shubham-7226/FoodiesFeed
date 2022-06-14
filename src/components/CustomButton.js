import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

export default function CustomButton({title, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonStyle,
        {backgroundColor: pressed ? 'grey' : '#0066ff'},
      ]}>
      <Text style={styles.textStyle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#0066ff',
    height: 48,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});
