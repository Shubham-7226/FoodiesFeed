import {
  Pressable,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

export default function AddPost({navigation}) {
  const [description, setDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  
  function photoFromCameraHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  function photoFromGalleryHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  function ButtonEventHandler() {
    // console.log('button Pressed');
    // navigation.navigate('Home');
    setModalVisible(!isModalVisible);
  }
  return (
    <View style={styles.container}>
      <CustomButton
        title={'+'}
        onPress={ButtonEventHandler}
        customBackgroundColor={'#ccc'}
        customStyle={{height: 250}}
        customTextStyle={{fontSize: 50}}
      />
      <TextInput
        style={{
          textAlignVertical: 'top',
          //  backgroundColor: 'red'
        }}
        numberOfLines={5}
        placeholder="Add feed text here..."
      />
      <CustomButton
        title="POST"
        customBackgroundColor="#0066ff"
        customStyle={{margin: 12}}
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
            customBackgroundColor="#0066ff"
            customStyle={{margin: 12}}
            onPress={photoFromCameraHandler}
          />
          <CustomButton
            title="Choose From Gallery"
            customBackgroundColor="#0066ff"
            customStyle={{margin: 12}}
            onPress={photoFromGalleryHandler}
          />
          <CustomButton
            title="Cancel"
            customBackgroundColor="#0066ff"
            customStyle={{margin: 12}}
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
  },
});
