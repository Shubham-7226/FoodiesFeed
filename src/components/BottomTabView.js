import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {GET_SELF_POSTS} from '../utils/url';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const BottomTabView = ({id}) => {
  console.log('id in bottomView', id);
  const navigation = useNavigation();
  const [postdata, setPostdata] = useState();

  const dispatch = useDispatch();
  let token = useSelector(state => state.user.user.token);
  // let user = useSelector(state => state.user.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      getUserPosts();
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const getUserPosts = async () => {
    const url = `${GET_SELF_POSTS}${id}`;
    console.log(url);
    const data = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(err => {
        console.log(err);
      });
    setPostdata(data?.data?.data);
    console.log('in bottomview after api call', data?.data?.data);
    // setUser(data?.data?.data);
    // console.log('-----------------------in useEffect of profile', user);
    // dispatch(uploadImage({image: user?.image}));
  };

  let squares = [];
  let numberOfSquare = postdata?.posts?.length;
  // console.log(
  //   '------------------------------------------------this is post data in bottom view',
  //   postdata,
  // );

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index}>
        <View
          style={{
            width: 130,
            height: 150,
            marginVertical: 0.5,
            backgroundColor: '#cccc',
            opacity: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: postdata?.posts[index]?.image}}
            style={{
              height: 145,
              width: 125,
            }}
          />
        </View>
      </View>,
    );
  }

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.postScrollviewStyle}>
        <View style={styles.postViewStyle}>{squares}</View>
      </ScrollView>
    );
  };

  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.postScrollviewStyle}>
        <View style={styles.postViewStyle}>{squares}</View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({focused, colour}) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Tags') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
            colour = focused ? 'black' : 'gray';
          }

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  postScrollviewStyle: {
    width: '100%',
    height: '100%',
  },
  postViewStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 5,
    // justifyContent: 'space-between',
  },
});
export default BottomTabView;
