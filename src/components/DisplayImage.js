import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import {ADD_COMMENT, GET_SINGLE_POST} from '../utils/url';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {LIKE_POST} from '../utils/url';

export default function DisplayImage({route, navigation}) {
  const [item, setItem] = useState();
  const [comment, setComment] = useState();
  const user = useSelector(state => state.user.user);
  console.log('in DisplayImage after selector', user);
  let token = useSelector(state => state.user.user.token);
  const [userToken, setUserToken] = useState(token);
  const [like, setLike] = useState(0);
  const {postId} = route.params;
  console.log(postId);
  const url = `${GET_SINGLE_POST}${postId}`;
  console.log(url);
  useEffect(() => {
    getPost();
  }, []);
  console.log('like in display image', like);
  const addComment = async postId => {
    let url = `${ADD_COMMENT}${postId}/comments`;
    console.log(url);
    let data = await axios
      .post(
        url,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .catch(err => {
        console.log(err?.response?.data);
      });

    console.log('in add comment after api call of item', data?.data?.data);
  };

  const getPost = async () => {
    console.log(url);
    data = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch(error => {
        console.log(error);
      });
    console.log('in displayimage after api call', data?.data?.data);
    let postData = data?.data?.data;
    setItem(postData);
    setLike(!!postData?.PostLikes.length);
  };
  const likeHandler = async postId => {
    console.log('in likehandler of display image of getposts', like);
    let url = `${LIKE_POST}${postId}/like`;
    console.log(url);
    let data = await axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .catch(err => {
        console.log(err.response.data);
      });

    console.log('in like after api call of posts', data?.data?.data);
  };
  const unLikeHandler = async postId => {
    let url = `${LIKE_POST}${postId}/unlike`;
    console.log(url);
    let data = await axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .catch(err => {
        console.log(err?.response?.data);
      });

    console.log('in like after api call of posts', data?.data?.data);
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={20}>
      <ScrollView>
        <View style={styles.itemContainerWrapper}>
          <View style={styles.itemContainer}>
            <Image
              source={{
                uri: item?.User.image,
              }}
              style={styles.userProfileImageStyles}
            />

            <View style={styles.textContainer}>
              <Text>{item?.User.userName}</Text>
              <Text>{item?.createdAt.toString().substring(0, 10)}</Text>
            </View>
          </View>
          <View style={styles.postImageContainer}>
            <Image
              source={{
                uri: item?.image,
              }}
              style={styles.postImageStyles}
            />
          </View>
          <Text style={styles.captionContainer}>
            <Text style={styles.captionTextStyle}>{item?.User.userName}</Text>{' '}
            {item?.caption}
          </Text>
          <View style={styles.partitionStyle} />
          <View style={styles.iconWrapper}>
            <Pressable
              onPress={() => {
                console.log('like button pressed');
                let postId = item?.id;
                console.log('this is post id onPress', postId);
                if (like) {
                  unLikeHandler(postId);
                  setLike(!like);
                } else {
                  likeHandler(postId);
                  setLike(!like);
                }
              }}>
              <Icon
                name={like ? 'heart-sharp' : 'heart-outline'}
                size={30}
                style={{marginLeft: 5}}
                color={COLORS.primary}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('Comments', {postId: item?.id});
              }}>
              <Icon
                name="ios-chatbubble-outline"
                size={30}
                style={{marginLeft: 10}}
                color={COLORS.primary}
              />
            </Pressable>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text>
              Liked by{' '}
              {like ? `you and ${item?.likeCount} ` : `${item?.likeCount} `}
              others
            </Text>

            <Text style={styles.commentTextStyle}>
              View all {item?.commentCount} comments
            </Text>
            <View style={styles.profileInCommentStyle}>
              <View style={styles.profileContainerWrapper}>
                <Image
                  source={{
                    uri: item?.User.image,
                  }}
                  style={styles.profileImageInCommentStyle}
                />
                <TextInput
                  placeholder="Add a comment "
                  style={styles.commentTextStyle}
                  value={comment}
                  onChangeText={data => {
                    setComment(data);
                  }}
                />
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  size={25}
                  color={COLORS.primary}
                  name="send"
                  onPress={() => {
                    console.log('send comment pressed');
                    let postId = item?.id;
                    addComment(postId);
                    setComment('');
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconWrapper: {
    flexDirection: 'row',
    padding: 5,
  },
  postImageContainer: {
    alignItems: 'center',
  },
  captionTextStyle: {fontWeight: 'bold'},
  captionContainer: {
    margin: 5,
    color: '#333',
    fontSize: 14,
    padding: 5,
  },
  commentTextStyle: {opacity: 0.5},
  profileImageInCommentStyle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 10,
  },
  partitionStyle: {height: 2, width: '100%', backgroundColor: COLORS.primary},
  postImageStyles: {height: 350, width: '98%'},
  itemContainerWrapper: {},
  profileContainerWrapper: {flexDirection: 'row', alignItems: 'center'},
  profileInCommentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderRadius: 7,
    borderColor: COLORS.primary,
    borderWidth: 0.8,
    padding: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  commentTextStyle: {opacity: 0.4, paddingVertical: 2},
  userProfileImageStyles: {height: 50, width: 50, borderRadius: 50},
});
