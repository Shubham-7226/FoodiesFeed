import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const SearchBox = () => {
  return (
    <View style={styles.searchContainer}>
      <Ionic name="search" style={styles.iconStyles} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#909090"
        style={styles.textInputContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    width: '94%',
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    padding: 4,
    paddingLeft: 40,
  },
  iconStyles: {
    fontSize: 18,
    opacity: 0.7,
    position: 'absolute',
    zIndex: 1,
    left: 25,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    position: 'relative',
  },
});

export default SearchBox;
