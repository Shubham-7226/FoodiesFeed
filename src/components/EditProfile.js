import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
const EditProfile = ({route, navigation}) => {
  const {name, accountName, profileImage} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(profileImage);
  function photoFromCameraHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(response => {
        if (!response.didCancel) {
          setImage(response.path);
          console.log('this is image', image);
        }
      })
      .catch(err => {
        console.log('no image selected');
      });
  }

  function photoFromGalleryHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(response => {
        if (!response.didCancel) {
          setImage(response.path);
          console.log('this is image' + image);
        }
      })
      .catch(err => {
        console.log('no image selected');
      });
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
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{fontSize: 35}} />
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => {
            TostMessage();
            navigation.goBack();
          }}>
          <Ionic
            name="checkmark"
            style={{fontSize: 35, color: COLORS.primary}}
          />
        </TouchableOpacity>
      </View>
      <Pressable onPress={addPostButtonEventHandler}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Image
            source={{uri: image}}
            style={{width: 80, height: 80, borderRadius: 100}}
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
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
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
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
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
        <Pressable onPress={() => {navigation.navigate('ChangePassword')}}>
          <Text
            style={{
              marginVertical: 10,
              padding: 10,
              color: COLORS.primary,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#EFEFEF',
            }}>
            Change Password
          </Text>
        </Pressable>
        {/* <Text
          style={{
            marginVertical: 10,
            padding: 10,
            color: '#3493D9',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#EFEFEF',
          }}>
          Persnol information setting
        </Text> */}
      </View>
    </View>
  );
};

export default EditProfile;
