import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ToastAndroid,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import Modal from 'react-native-modal';
import axios from 'axios';
import {uploadImage} from '../store/actions';
import CustomButton from './CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {UPLOAD_IMAGE} from '../utils/url';
import {useSelector, useDispatch} from 'react-redux';
import FormData from 'form-data';

const EditProfile = ({route, navigation}) => {
  const {name, accountName, profileImage} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  // const [oldimage, setOldImage] = useState(profileImage);
  const [isLoading, setIsLoading] = useState(false);

  let token = useSelector(state => state.user.user.token);
  const dispatch = useDispatch();

  // console.log('in add post', token);

  async function uploadImageToApi() {
    let data = new FormData();
    // console.log('this is image', response);
    data.append('profilepic', {
      name: image.modificationDate,
      type: image.mime,
      uri: image.path,
    });
    console.log('this is form data', data);

    await axios
      .put(UPLOAD_IMAGE, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('response while adding post', res.data.data);
        dispatch(uploadImage({image: image.path}));
        // setIsLoading(false);
      })
      .catch(err => {
        // setIsLoading(false);
        console.log(
          'this is error message while posting data in profile',
          err.response.data,
        );
      });
    // setIsLoading(false);

    // if (image.path == '') {
    //   Alert.alert('Upload Image', 'Please upload image', [
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ]);
    // } else {
    // }
  }
  function photoFromCameraHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openCamera({
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,
      // compressImageQuality: 0.8,
    })
      .then(response => {
        if (!response.didCancel) {
          setImage(response);
          console.log('this is image', response);
        }
      })
      .catch(err => {
        console.log('no image selected');
      });
  }

  function photoFromGalleryHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openPicker({
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,
      // compressImageQuality: 0.8,
    })
      .then(response => {
        if (!response.didCancel) {
          console.log('this is image' + response);
          setImage(response);
        }
      })
      .catch(err => {
        console.log('no image selected');
      });
    // dispatch(uploadImage(image.path));
  }
  function addPostButtonEventHandler() {
    // console.log('button Pressed');
    // navigation.navigate('Home');
    setModalVisible(!isModalVisible);
  }
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color="orange"
          style={styles.activityIndicatorStyle}
        />
      ) : null}

      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{fontSize: 35}} />
        </Pressable>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Edit Profile</Text>
        <Pressable
          onPress={() => {
            setIsLoading(true);

            uploadImageToApi();
            setIsLoading(false);

            TostMessage();
            navigation.navigate('Profile');
          }}>
          <Ionic
            name="checkmark"
            style={{fontSize: 35, color: COLORS.primary}}
          />
        </Pressable>
      </View>
      <Pressable onPress={addPostButtonEventHandler}>
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Image
            source={{
              uri: image
                ? `${image.path}?${new Date().getTime()}`
                : `${profileImage}?${new Date().getTime()}`,
            }}
            style={styles.imageStyles}
          />
          <Text
            style={{
              color: COLORS.primary,
            }}>
            Change profile photo
          </Text>
        </View>
      </Pressable>
      <View style={{padding: 10}}>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}>
            Name
          </Text>
          <TextInput
            placeholder="name"
            defaultValue={name}
            style={styles.inputTextStyles}
          />
        </View>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              opacity: 0.5,
            }}>
            Username
          </Text>
          <TextInput
            placeholder="accountname"
            defaultValue={accountName}
            style={styles.inputTextStyles}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={{
          marginTop: '128%',
          height: '30%',
          // backgroundColor: '#cccc'
        }}>
        <View style={{flex: 1}}>
          {/* <Button
            title="Hide modal"
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}
          /> */}
          <CustomButton
            title="Take Photo"
            customBackgroundColor={COLORS.primary}
            customStyle={{margin: 12}}
            onPress={photoFromCameraHandler}
          />
          <CustomButton
            title="Choose From Gallery"
            customBackgroundColor={COLORS.primary}
            customStyle={{margin: 12}}
            onPress={photoFromGalleryHandler}
          />
          <CustomButton
            title="Cancel"
            customBackgroundColor={COLORS.primary}
            customStyle={{margin: 12}}
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <Text style={styles.changePassStyles}>Change Password</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageStyles: {width: 80, height: 80, borderRadius: 100},
  activityIndicatorStyle: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  inputTextStyles: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
  },
  changePassStyles: {
    marginVertical: 10,
    padding: 10,
    color: COLORS.primary,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: '#EFEFEF',
  },
});

export default EditProfile;
