import {
  Pressable,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
  TostMessage,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';
import CheckBox from '@react-native-community/checkbox';
import {CREATE_POST} from '../../utils/url';
import {useSelector, useDispatch} from 'react-redux';
import FormData from 'form-data';

export default function AddPost({navigation}) {
  const [caption, setCaption] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const dispatch = useDispatch();
  let token = useSelector(state => state.user.user.token);
  // console.log('in add post', token);
  let data = new FormData();
  data.append('postImage', {
    name: image.modificationDate,
    type: image.mime,
    uri: image.path,
  });
  data.append('caption', caption);
  data.append('commentOff', !toggleCheckBox);

  function photoFromCameraHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then(response => {
        if (!response.didCancel) {
          console.log('this is image', response);
          setImage(response);
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
      compressImageQuality: 0.8,
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
  }

  function addPostButtonEventHandler() {
    // console.log('button Pressed');
    // navigation.navigate('Home');
    setModalVisible(!isModalVisible);
  }
  const TostMessage = () => {
    ToastAndroid.show('Post added Sucessfully !', ToastAndroid.SHORT);
  };
  async function postButtonHandler() {
    setIsLoading(true);
    console.log('this is form data', data);
    await axios
      .post(CREATE_POST, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('response while adding post', res.data.data);
        setIsLoading(false);
        setImage('');
        setCaption('');
        TostMessage();
      })
      .catch(err => {
        console.log(
          'this is error message while posting data',
          err?.response?.data,
        );
        setIsLoading(false);
      });
    // setIsLoading(false);

    if (image == '') {
      Alert.alert('Upload Image', 'Please upload image', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
    }
    // navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color="orange"
          style={styles.activityIndicatorStyle}
        />
      ) : null}
      {image == '' ? (
        <CustomButton
          title={'+'}
          onPress={addPostButtonEventHandler}
          customBackgroundColor={'#ccc'}
          customStyle={{height: 250}}
          customTextStyle={{fontSize: 50}}
        />
      ) : (
        <Pressable>
          <ImageBackground
            style={styles.imagePostStyle}
            source={{uri: image.path}}>
            <Icon
              name="close"
              size={30}
              color="white"
              onPress={() => {
                // console.log('cancel image  button pressed');
                setImage('');
              }}
            />
          </ImageBackground>
        </Pressable>
      )}
      <View
        style={{
          flexDirection: 'row',
          // padding: 10,
          borderWidth: 1,
          borderColor: '#CDCDCD',
          elevation: 3,
        }}>
        <Text
          style={{
            fontSize: 16,

            marginTop: 8,
            // backgroundColor: 'red',
          }}>
          Captions:
        </Text>

        <TextInput
          style={{
            textAlignVertical: 'top',
            marginLeft: 8,
            // backgroundColor: 'red',
            width: '80%',
            fontSize: 16,
            // borderWidth: 1,
            // borderColor: '#CDCDCD',
          }}
          multiline={true}
          numberOfLines={5}
          placeholder="Add feed text here..."
          value={caption}
          onChangeText={text => {
            setCaption(text);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text>Comment disabled</Text>
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
      <CustomButton
        title="POST"
        customBackgroundColor={COLORS.primary}
        customStyle={{margin: 12}}
        onPress={postButtonHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingVertical: 10,
  },
  imagePostStyle: {
    height: 300,
    alignItems: 'flex-end',
  },

  activityIndicatorStyle: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
});
