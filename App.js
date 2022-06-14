import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigators/Navigation';
// import {Provider} from 'react-redux';
// import store from './src/redux/store';

export default function App() {
  return (
    // <Provider store={store}>
    <Navigation />
    // </Provider>
  );
}

const styles = StyleSheet.create({});
