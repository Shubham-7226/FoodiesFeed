import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';


export default function Profile() {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Logout"
        onPress={() => {}}
        customBackgroundColor="#0066ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
