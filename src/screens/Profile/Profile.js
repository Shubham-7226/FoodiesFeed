import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../../components/ProfileBody';
import BottomTabView from '../../components/BottomTabView';
import Logout from './Logout';
import {useSelector, useDispatch} from 'react-redux';
import {GET_USER} from '../../utils/url';
import Modal from 'react-native-modal';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const token = useSelector(state => state.user.user.token);
  const userId = useSelector(state => state.user.user.userId);
  const [isModalVisible, setModalVisible] = useState(false);
  function modalHandler() {
    setModalVisible(!isModalVisible);
  }

  let data;
  const userDetail = useSelector(state => state.user.user.image);
  const userIdRedux = useSelector(state => state.user.user.userId);
  console.log('in profile getting user from redux', userIdRedux);

  const getUser = async () => {
    data = await axios.get(GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('in profile after api call', data?.data?.data);
    setUser(data?.data?.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    return unsubscribe;
  }, [userDetail]);

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <ProfileBody
          id={1}
          name={user?.name}
          accountName={user?.userName}
          profileImage={userDetail}
          followers={user?.followCount}
          following={user?.followingCount}
          post={user?.postCount}
          modalVisible={modalHandler}
          userId={userIdRedux}
        />
        <ProfileButtons
          id={0}
          name={user?.name}
          accountName={user?.userName}
          profileImage={userDetail}
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
          <View style={styles.secondaryModalContainer} />
          {/* <Text>Logout</Text> */}
          <View style={styles.buttonWrapperContainer}>
            <View style={styles.buttonWrapper}>
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
  },
  buttonWrapperContainer: {
    justifyContent: 'center',
    height: '80%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignSelf: 'center',
  },
  secondaryModalContainer: {
    height: 3,
    width: '20%',
    marginVertical: 12,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
  secondaryContainer: {width: '100%', padding: 10},
  container: {width: '100%', height: '100%', backgroundColor: 'white'},
});

export default Profile;
