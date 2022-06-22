import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import Ionic from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Logout from '../screens/Profile/Logout';
import {GET_USER_FOLLOWERS} from '../utils/url';
import {GET_USER_FOLLOWINGS} from '../utils/url';
// import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

export const ProfileBody = ({
  id,
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  modalVisible,
  userId,
  // route,
}) => {
  const navigation = useNavigation();
  // const {updatedImage} = route?.params;
  // const [image, setImage] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  let token = useSelector(state => state.user.user.token);

  // useEffect(() => {}, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserFollowers();
      getUserFollowings();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  // const setData = data => {
  //   setImage(data);
  // };
  function ButtonEventHandler() {
    modalVisible();
    setModalVisible(!isModalVisible);
  }
  const getUserFollowers = async () => {
    const followUrl = `${GET_USER_FOLLOWERS}${userId}/followers`;
    console.log(followUrl);
    let responsedata = await axios.get(followUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });
    console.log(
      'in profile after api call of followers',
      responsedata?.data?.data.followers,
    );
    let follow = responsedata?.data?.data.followers;
    setUserFollowers(follow);
  };
  const getUserFollowings = async () => {
    const followingUrl = `${GET_USER_FOLLOWERS}${userId}/following`;
    console.log(followingUrl);
    let resData = await axios.get(followingUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });
    console.log(
      'in profile after api call of followings',
      resData?.data?.data.following,
    );
    let following = resData?.data?.data.following;
    setUserFollowings(following);
    // console.log('-----------------------in useEffect of profile', user);
    // dispatch(uploadImage({image: user?.image}));
  };

  return (
    <View>
      {accountName ? (
        <View style={styles.accountNameContainer}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {accountName}
          </Text>
          {id ? (
            <Pressable
              onPress={() => {
                ButtonEventHandler();
              }}>
              <Ionic name="menu" style={{fontSize: 35}} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.pop();
              }}>
              <Text>Go back</Text>
            </Pressable>
          )}
        </View>
      ) : null}
      <View style={styles.profileViewContainer}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {/* updatedImage ? updatedImage : */}
          <Image
            key={Date.now()}
            source={{uri: `${profileImage}?${new Date().getMinutes()}`}}
            style={styles.profileImageViewContainer}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{post}</Text>
          <Text>Posts</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('FollowingUsers', {
              data: userFollowers,
              name: 'Followers',
            });
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{followers}</Text>
            <Text>Followers</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('FollowingUsers', {
              data: userFollowings,
              name: 'Following',
            });
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{following}</Text>
            <Text>Following</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export const ProfileButtons = ({id, name, accountName, profileImage}) => {
  const navigation = useNavigation();
  const [follow, setFollow] = useState(follow);
  return (
    <>
      {id === 0 ? (
        <View style={styles.editButtonWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              });
            }}
            style={{
              width: '100%',
            }}>
            <View style={styles.editProfileButtonContainer}>
              <Text style={styles.editButtonStyles}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{width: '100%'}}>
            <View
              style={[
                styles.followButtonContainer,
                {
                  backgroundColor: follow ? null : COLORS.primary,
                  borderWidth: follow ? 3 : 0,
                },
              ]}>
              <Text style={{color: follow ? 'black' : 'white'}}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  accountNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: '#cccc',
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  profileViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  profileImageViewContainer: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  followButtonContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  editProfileButtonContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonStyles: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    opacity: 1,
  },
  editButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
});
