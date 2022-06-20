import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProfileBody, ProfileButtons} from '../../components/ProfileBody';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '../../components/BottomTabView';
import Logout from './Logout';
import {useSelector, useDispatch} from 'react-redux';
import {GET_USER} from '../../utils/url';
import {uploadImage} from '../../store/actions';

import axios from 'axios';

const Profile = ({navigation}) => {
  const token = useSelector(state => state.user.user.token);
  let data;
  const userDetail = useSelector(state => state.user.user.image);
  // console.log('+++++++++++++++++++++++++in profile after selector', userDetail);
  const [user, setUser] = useState();

  // console.log('in profile', token);
  const dispatch = useDispatch();

  const getUser = async () => {
    data = await axios.get(GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('in profile after api call', data?.data?.data);
    setUser(data?.data?.data);
    // console.log('-----------------------in useEffect of profile', user);
    // dispatch(uploadImage({image: user?.image}));
  };
  useEffect(() => {
    getUser();
  }, [navigation]);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          name={user?.name}
          accountName={user?.userName}
          profileImage={userDetail}
          followers={user?.followCount}
          following={user?.followingCount}
          post={user?.postCount}
        />
        <ProfileButtons
          id={0}
          name={user?.name}
          accountName={user?.userName}
          profileImage={userDetail}
          // profileImage={userDetail}
        />
      </View>

      <BottomTabView id={user?.id} />
      {/* <Logout /> */}
    </View>
  );
};

export default Profile;
