import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../../components/ProfileBody';
import BottomTabView from '../../components/BottomTabView';
import {GET_SEARCHED_USER, GET_USER} from '../../utils/url';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getOtherUser} from '../../store/actions';
const OtherUserProfile = ({route}) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.user.user.token);
  const [user, setUser] = useState();
  const {id} = route.params;
  // let userData;
  console.log('id in other user profile', id);

  const dispatch = useDispatch();

  useEffect(() => {
    getSearchedUser();
  }, []);

  // console.log('in profile', token);

  const getSearchedUser = async () => {
    // dispatch(uploadImage({image: user?.image}));
    const url = `${GET_SEARCHED_USER}${id}`;
    console.log(url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });
    // console.log('in  other user profile after api call', response?.data?.data);
    // userData = data?.data?.data;
    dispatch(
      getOtherUser(
        response?.data?.data?.Followers?.length,
        response?.data?.data?.Follows?.length,
      ),
    );
    setUser(response?.data?.data);
  };

  // console.log('in other profile', userData?.Followers.length);
  // console.log('in other profile', userData?.Follows.length);

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

        {console.log('@follow', user?.follows)}
        <ProfileButtons
          id={1}
          name={user?.name}
          accountName={user?.userName}
          profileImage={user?.image}
          follows={user?.Follows.length}
          following={user?.Followers.length}
          userId={id}
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
