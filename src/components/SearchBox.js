import React, {useState, useEffect, createRef} from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {SEARCH_USER} from '../utils/url';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import DelayInput from 'react-native-debounce-input';

const SearchBox = ({setSearchedData}) => {
  const navigation = useNavigation();
  const userToken = useSelector(state => state.user.user.token);
  const inputRef = createRef();

  const [searchText, setSearchText] = useState('');
  let responseData;
  const getSearchUser = async searchText => {
    console.log(SEARCH_USER);
    data = await axios
      .get(`${SEARCH_USER}${searchText}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .catch(err => {
        console.log(err?.response?.data?.errorMessage);
      });
    console.log('in searchBox after api call', data?.data?.data.users);
    responseData = data?.data?.data.users;
    setSearchedData(responseData);
    console.log('after api call search box', responseData);
  };

  return (
    <View style={styles.searchContainer}>
      {/* <TextInput
        placeholder="Search"
        placeholderTextColor="#909090"
        style={styles.textInputContainer}
        returnKeyType="done"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      /> */}
      <DelayInput
        value={searchText}
        minLength={3}
        inputRef={inputRef}
        onChangeText={text => getSearchUser(text)}
        delayTimeout={500}
        style={styles.textInputContainer}
      />
      <Pressable style={styles.iconContainer} onPress={getSearchUser}>
        <Ionic name="search" style={styles.iconStyles} />
      </Pressable>
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
    paddingLeft: 20,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 30,
  },
  iconStyles: {
    fontSize: 18,
    opacity: 0.7,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
});

export default SearchBox;
