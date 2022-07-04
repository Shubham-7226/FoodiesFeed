import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

export default function CustomTextInput({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  numberOfLines,
  customStyle,
  keyboardType,
  onEndEditing,
  maxLength,
  onKeyPress,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onEndEditing={onEndEditing}
        maxLength={maxLength}
        onKeyPress={onKeyPress}
        style={[styles.input, customStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 12,
    color: 'black',
    paddingHorizontal: 16,
  },
  labelStyle: {fontSize: 16, fontWeight: 'bold', marginBottom: 16},
});
