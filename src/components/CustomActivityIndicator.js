import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

export default function CustomActivityIndicator() {
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator
        size={'large'}
        color="orange"
        style={styles.activityIndicatorStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
});
