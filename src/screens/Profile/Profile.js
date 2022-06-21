import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../../components/ProfileBody';
import BottomTabView from '../../components/BottomTabView';
import Logout from './Logout';
import {useSelector, useDispatch} from 'react-redux';
import {GET_USER} from '../../utils/url';
import {uploadImage} from '../../store/actions';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Modal from 'react-native-modal';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
const Profile = ({navigation}) => {
  const token = useSelector(state => state.user.user.token);
  const userId = useSelector(state => state.user.user.userId);
  const [isModalVisible, setModalVisible] = useState(false);
  function modalHandler() {
    setModalVisible(!isModalVisible);
  }

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
  }, [userDetail]);

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
          modalVisible={modalHandler}
        />
        <ProfileButtons
          id={0}
          name={user?.name}
          accountName={user?.userName}
          profileImage={userDetail}
          // profileImage={userDetail}
        />
      </View>

      <BottomTabView id={userId} />
      <Modal
        isVisible={isModalVisible}
        swipeDirection={'down'}
        swipeThreshold={10}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View
            style={{
              height: 3,
              width: '20%',
              marginVertical: 12,
              backgroundColor: '#ccc',
              alignSelf: 'center',
            }}
          />
          {/* <Text>Logout</Text> */}
          <View
            style={{
              justifyContent: 'center',
              height: '80%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                // alignSelf: 'center',
              }}>
              <CustomButton
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                }}
                customBackgroundColor={COLORS.primary}
                customStyle={{width: '40%'}}
              />
              <Logout />
            </View>
          </View>
        </View>
      </Modal>
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

export default Profile;
