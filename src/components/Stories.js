import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import CustomButton from './CustomButton';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FormData from 'form-data';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import {ADD_STORY, GET_FOLLOWING_STORY} from '../utils/url';
const Stories = () => {
  const dispatch = useDispatch();
  let token = useSelector(state => state.user.user.token);
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [story, setStory] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStory();
    });
    console.log('useEffect story', story);
    return unsubscribe;
  }, []);

  const getStory = async () => {
    console.log('in getStory of getStory', token);
    console.log(GET_FOLLOWING_STORY);
    const data = await axios
      .get(GET_FOLLOWING_STORY, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
      });

    console.log('in Story after api call', data?.data?.data?.story);
    let storydata = data?.data?.data?.story;
    setStory(storydata);
    console.log('after api call story', storydata);

    console.log('after api call story', story);
  };

  async function addStory() {
    let formdata = new FormData();
    formdata.append('storyImage', {
      name: image.modificationDate,
      type: image.mime,
      uri: image.path,
    });
    console.log(ADD_STORY);
    console.log('this is form data', formdata);
    await axios
      .post(ADD_STORY, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('response while adding Story', res.data.data);
        // setIsLoading(false);
      })
      .catch(err => {
        console.log(
          'this is error message while posting data in add Story',
          err?.response?.data,
        );
      });

    // if (image == '') {
    //   Alert.alert('Upload Image', 'Please upload image', [
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ]);
    // } else {
    // }
    // navigation.navigate('Home');
  }

  function photoFromCameraHandler() {
    setModalVisible(!isModalVisible);
    ImagePicker.openCamera({
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(response => {
        if (!response.didCancel) {
          console.log('this is image', response);
          setImage(response);
          addStory();
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
      compressImageQuality: 0.7,
    })
      .then(response => {
        if (!response.didCancel) {
          console.log('this is image' + response);
          setImage(response);
          addStory();
        }
      })
      .catch(err => {
        console.log('no image selected');
      });
  }

  // const imageString =
  //   'https://www.eatthis.com/wp-content/uploads/sites/4/2019/06/deep-dish-pizza-chicago.jpg';
  // const storyData = [
  //   {
  //     id: 1,
  //     name: 'Your Story',
  //     image:
  //       'https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/cover-for-street-food-in-sydney.jpg',
  //   },
  //   {
  //     id: 0,
  //     name: 'Ram_Charan',
  //     image: imageString,
  //   },
  //   {
  //     id: 0,
  //     name: 'The_Groot',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDoHP_USX5Zk2GUVJUNZXPAeZec8hnhBzhkQ&usqp=CAU',
  //   },
  //   ,
  //   {
  //     id: 0,
  //     name: 'loverland',
  //     image: imageString,
  //   },
  //   ,
  //   {
  //     id: 0,
  //     name: 'chillhouse',
  //     image: imageString,
  //   },
  // ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.storiesHorizontalContainer}>
      {story?.map((data, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              console.log('story pressed');
              navigation.push('Status', {
                name: data.name,
                profileImage: data?.user?.image,
                storyImage: data?.image,
              });
            }}>
            <View style={styles.createStoryContainer}>
              {index === 0 ? (
                <View style={styles.createStoryIconContainer}>
                  <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: COLORS.primary,
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      setModalVisible(!isModalVisible);
                    }}
                  />
                </View>
              ) : null}
              <View style={styles.UserStoryContainer}>
                <Image
                  source={{uri: data.image}}
                  style={{
                    resizeMode: 'cover',
                    width: '90%',
                    height: '90%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'black',
                  // opacity: data.id == 0 ? 1 : 0.5,
                }}>
                {data?.user?.userName}
              </Text>
            </View>
          </Pressable>
        );
      })}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storiesHorizontalContainer: {
    paddingVertical: 20,
    // backgroundColor: 'red',
    maxHeight: 125,
  },
  createStoryContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    position: 'relative',
  },
  createStoryIconContainer: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 1,
  },
  UserStoryContainer: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Stories;
