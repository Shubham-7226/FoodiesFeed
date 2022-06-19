import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProfileBody, ProfileButtons} from '../../components/ProfileBody';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '../../components/BottomTabView';
import Logout from './Logout';
const Profile = () => {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2VwVJtO7z0ie4Wt7_qkDbZYQOwV6q1euig&usqp=CAU'
          }
          followers="3.6M"
          following="35"
          post="458"
        />
        <ProfileButtons
          id={0}
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2VwVJtO7z0ie4Wt7_qkDbZYQOwV6q1euig&usqp=CAU'
          }
        />
      </View>

      <BottomTabView />
      {/* <Logout /> */}
    </View>
  );
};

export default Profile;
