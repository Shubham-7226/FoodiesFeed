import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../../components/ProfileBody';
import BottomTabView from '../../components/BottomTabView';
import {GET_SEARCHED_USER, GET_USER} from '../../utils/url';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
const OtherUserProfile = ({route}) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.user.user.token);
  const [user, setUser] = useState();
  const {id} = route.params;
  console.log('id in other user profile', id);
  useEffect(() => {
    getSearchedUser();
  }, [navigation]);

  // console.log('in profile', token);
  let url = `${GET_SEARCHED_USER}${id}`;
  const getSearchedUser = async () => {
    console.log(url);
    data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });
    console.log('in  other user profile after api call', data?.data?.data);
    setUser(data?.data?.data);
    // console.log('-----------------------in useEffect of profile', user);
    // dispatch(uploadImage({image: user?.image}));
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          id={0}
          name={user?.name}
          accountName={user?.userName}
          profileImage={user?.image}
          followers={user?.followCount}
          following={user?.followingCount}
          post={user?.postCount}
          userId={id}
        />
        <ProfileButtons
          id={1}
          name={user?.name}
          accountName={user?.userName}
          profileImage={user?.image}
          // profileImage={userDetail}
        />
      </View>

      <BottomTabView id={id} />
      {/* <Logout /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 120,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',

    // zIndex: 1,
  },
});

export default OtherUserProfile;
