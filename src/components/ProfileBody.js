import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import Ionic from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Logout from '../screens/Profile/Logout';
import {FOLLOW_USER, GET_USER_FOLLOWERS, UNFOLLOW_USER} from '../utils/url';
import {GET_USER_FOLLOWINGS} from '../utils/url';
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  let token = useSelector(state => state.user.user.token);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserFollowers();
      getUserFollowings();
    });
    return unsubscribe;
  }, []);

  function ButtonEventHandler() {
    modalVisible();
    setModalVisible(!isModalVisible);
  }
  const getUserFollowers = async () => {
    const followUrl = `${GET_USER_FOLLOWERS}${userId}/followers`;
    console.log(followUrl);
    let responsedata = await axios
      .get(followUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
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
    let resData = await axios
      .get(followingUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
      });
    console.log(
      'in profile after api call of followings',
      resData?.data?.data.following,
    );
    let following = resData?.data?.data.following;
    setUserFollowings(following);
  };

  return (
    <View>
      <View>
        {id ? (
          <View style={styles.accountNameContainer}>
            <Text style={styles.accountNameStyles}>{accountName}</Text>
            <Pressable
              onPress={() => {
                ButtonEventHandler();
              }}>
              <Ionic name="exit-outline" style={{fontSize: 30}} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.accountNameContainerOtherUser}>
            <Pressable
              onPress={() => {
                navigation.pop();
              }}>
              <Ionic
                name="arrow-back"
                color={'black'}
                style={{fontSize: 30, marginHorizontal: 8}}
              />
            </Pressable>
            <Text style={styles.accountNameStyles}>{accountName}</Text>
          </View>
        )}
      </View>

      <View style={styles.profileViewContainer}>
        <View
          style={{
            alignItems: 'center',
          }}>
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

export const ProfileButtons = ({
  id,
  name,
  accountName,
  profileImage,
  userId,
}) => {
  const navigation = useNavigation();

  const status = useSelector(state => {
    return {
      follow: state.user.otherUser.followers,
      followBack: state.user.otherUser.followings,
    };
  });
  console.log('in profilebody status', status);
  const [follow, setFollow] = useState(!!status.follow);
  const [followBack, setFollowBack] = useState(!!status.followBack);
  let token = useSelector(state => state.user.user.token);
  console.log('in profilebody status follow', follow);
  console.log('in profilebody status followBack', followBack);

  const setUserFollow = async () => {
    let url = `${FOLLOW_USER}${userId}`;
    console.log('in follow of profilebody ', url);
    console.log(url);
    let data = await axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch(err => {
        console.log(err.response.data.errorMessage);
      });

    console.log('in follow after api call of userfollow++++', data?.data?.data);
  };
  const setUserUnfollow = async () => {
    let url = `${UNFOLLOW_USER}${userId}`;
    console.log('in unfollow of profilebody ', url);
    console.log(url);
    let data = await axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch(err => {
        console.log(err.response.data);
      });
    console.log(
      'in unfollow after api call of userunfollow++++',
      data?.data?.data,
    );
  };

  return (
    <>
      {id === 0 ? (
        <View style={styles.editButtonWrapper}>
          <Pressable
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
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={() => {
              if (follow) {
                setUserUnfollow();
                setFollow(!follow);
              } else {
                setUserFollow();
                setFollow(!follow);
              }
            }}
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
                {follow ? 'Unfollow' : followBack ? 'follow Back' : 'follow'}
              </Text>
            </View>
          </Pressable>
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
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  accountNameContainerOtherUser: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  profileViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
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
  accountNameStyles: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  editProfileButtonContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: COLORS.primary,
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
