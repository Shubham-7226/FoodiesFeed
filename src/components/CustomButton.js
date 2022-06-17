import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';

export default function CustomButton({
  title,
  onPress,
  customStyle,
  customBackgroundColor,
  customTextStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonStyle,
        {backgroundColor: pressed ? 'grey' : customBackgroundColor},
        customStyle,
      ]}>
      <Text style={[styles.textStyle, customTextStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'COLORS.primary',
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
