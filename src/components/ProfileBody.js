import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  // route,
}) => {
  // const {updatedImage} = route?.params;
  const [image, setImage] = useState();
  const setData = data => {
    setImage(data);
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
            source={{uri: `${profileImage}?${new Date().getTime()}`}}
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
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{followers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{following}</Text>
          <Text>Following</Text>
        </View>
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
    borderColor: '#cccc',
    borderWidth: 1,
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
    borderColor: '#cccc',
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
