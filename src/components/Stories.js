import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import CustomButton from './CustomButton';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FormData from 'form-data';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
import {
  ADD_STORY,
  GET_FOLLOWING_STORY,
  GET_SELF_STORY,
  WATCH_STORY,
} from '../utils/url';
const Stories = () => {
  let selfStorydata;
  const dispatch = useDispatch();
  let token = useSelector(state => state.user.user.token);
  const userData = useSelector(state => state.user.user);
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [story, setStory] = useState([]);
  const [selfStory, setSelfStory] = useState([]);

  console.log('-----------------Image', userData.image);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSelfStory();
      getStory();
    });
    console.log('useEffect story', story);
    return unsubscribe;
  }, [image, selfStorydata, isModalVisible, navigation]);

  const getStory = async () => {
    console.log('in getStory of getStory', token);
    console.log(GET_FOLLOWING_STORY);
    const data = await axios
      .get(GET_FOLLOWING_STORY, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  const getSelfStory = async () => {
    console.log(GET_SELF_STORY);
    const data = await axios
      .get(GET_SELF_STORY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
      });

    console.log('in self Story after api call', data?.data?.data);
    selfStorydata = data?.data?.data;
    setSelfStory(selfStorydata);
    console.log('after api call self story', selfStorydata);

    console.log('after api call self story', selfStory);
  };

  async function addStory(storyImage) {
    let formdata = new FormData();
    formdata.append('storyImage', {
      name: storyImage.modificationDate,
      type: storyImage.mime,
      uri: storyImage.path,
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
      })
      .catch(err => {
        console.log(
          'this is error message while posting data in add Story',
          err?.response?.data,
        );
      });
  }
  async function setWatchStory(storyId) {
    let url = `${WATCH_STORY}${storyId}/users/watch`;
    console.log(url);
    await axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        console.log('response while watching Story', res.data.data);
      })
      .catch(err => {
        console.log(
          'this is error message while posting data in add Story',
          err?.response?.data,
        );
      });
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
          let storyImage = response;
          setImage(response);
          addStory(storyImage);
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
          let storyImage = response;
          setImage(response);
          addStory(storyImage);
        }
      })
      .catch(err => {
        console.log('no image selected');
      });
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.storiesHorizontalContainer}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            getSelfStory();
            getStory();
          }}
        />
      }>
      {selfStory.length !== 0 ? (
        selfStory?.map((data, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                console.log('story pressed');

                let postId = data.id;
                console.log(postId);

                setWatchStory(postId);
                navigation.push('Status', {
                  name: 'You',
                  profileImage: userData?.image,
                  storyImage: data?.image,
                });
              }}>
              <View style={styles.createStoryContainer}>
                <View style={styles.UserStoryContainer}>
                  <Image
                    source={{
                      uri:
                        userData?.image !== ''
                          ? userData?.image
                          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                    }}
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
                  }}>
                  {'You'}
                </Text>
              </View>
            </Pressable>
          );
        })
      ) : (
        <Pressable>
          <View style={styles.createStoryContainer}>
            <View style={styles.createStoryIconContainer}>
              <Pressable
                onPress={() => {
                  setModalVisible(!isModalVisible);
                }}>
                <Entypo
                  name="circle-with-plus"
                  style={{
                    fontSize: 20,
                    color: COLORS.primary,
                    backgroundColor: 'white',
                    borderRadius: 100,
                  }}
                />
              </Pressable>
            </View>
            <View style={styles.SelfNoneUserStoryContainer}>
              <Image
                source={{
                  uri:
                    userData?.image !== ''
                      ? userData?.image
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                }}
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
              }}>
              {'You'}
            </Text>
          </View>
        </Pressable>
      )}
      {story?.map((data, index) => {
        let length = data?.StoryWatches?.length;
        console.log('this is length', length);
        return (
          <Pressable
            key={index}
            onPress={() => {
              console.log('story pressed');

              let postId = data.id;
              console.log(postId);

              setWatchStory(postId);
              navigation.push('Status', {
                name: data?.user?.userName,
                profileImage: data?.user?.image,
                storyImage: data?.image,
              });
            }}>
            <View style={styles.createStoryContainer}>
              <View
                style={
                  length === 0
                    ? styles.UserStoryContainer
                    : [styles.UserStoryContainer, {borderColor: '#ccc'}]
                }>
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
        }}>
        <View style={{flex: 1}}>
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
  SelfNoneUserStoryContainer: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Stories;
