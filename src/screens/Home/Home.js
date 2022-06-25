import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import Posts from '../../components/Posts';
import Stories from '../../components/Stories';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {GET_USER} from '../../utils/url';
import {getUserInfo} from '../../store/actions';
import COLORS from '../../constants/colors';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.user.user.token);
  console.log('in home after selector', userToken);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (userToken !== null) {
      data = await axios.get(GET_USER, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log('in home after api call', data?.data?.data);
      let user = data?.data?.data;
      let image = user?.image;
      let userId = user?.id;
      console.log('in home token', userToken);
      console.log('in home image', image);
      console.log('in home userId', userId);

      dispatch(getUserInfo({userToken, image, userId}));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.mainLogoContainer}>FoodiesFeed</Text>
      </View>
      <Stories />
      <Posts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  iconWrapper: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  mainLogoContainer: {
    fontSize: 25,
    fontWeight: '500',
    color: COLORS.primary,
  },
  captionContainer: {
    margin: 5,
    color: '#333',
    fontSize: 12,
    padding: 5,
  },
  itemContainerWrapper: {
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  logoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});
