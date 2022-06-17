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
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';
export default function AddPost({navigation}) {
  const [description, setDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  function postButtonHandler() {
    const uploadObject = {
      name: 'username',
      ProfileImage: 'url of userimage',
      text: 'caption text',
      image: image,
    };
    setIsLoading(true);
    //upload functionallity
    if (image == '') {
      Alert.alert('Upload Image', 'Please upload image', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
    }
    setIsLoading(false);
    navigation.navigate('Home');
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
          <ImageBackground style={styles.imagePostStyle} source={{uri: image}}>
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
      <TextInput
        style={{
          textAlignVertical: 'top',
          //  backgroundColor: 'red'
        }}
        numberOfLines={5}
        placeholder="Add feed text here..."
      />

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
