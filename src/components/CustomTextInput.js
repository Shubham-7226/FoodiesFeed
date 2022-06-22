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
}) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 16}}>
        {label}
      </Text>
      <TextInput
        autoCapitalize="none"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        numberOfLines={numberOfLines}
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
});
