import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {ADD_COMMENT, LIKE_POST} from '../utils/url';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';

export default function PostItem({items}) {
  const navigation = useNavigation();
  const [item, setItem] = useState(items);
  const [like, setLike] = useState(!!item.PostLikes.length);
  console.log('like in postItem', like);
  const [comment, setComment] = useState('');
  let token = useSelector(state => state.user.user.token);
  const [userToken, setUserToken] = useState(token);
  console.log('in postItem After userSelectorr', userToken);
  const likeHandler = async postId => {
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
        console.log(err.response.data);
      });

    console.log('in add comment after api call of item', data?.data?.data);
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
        console.log(err.response.data);
      });

    console.log('in like after api call of posts', data?.data?.data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: item?.User.image,
          }}
          style={styles.userProfileImageStyles}
        />

        <View style={styles.textContainer}>
          <Text>{item?.User.userName}</Text>
          <Text>{new Date().toString().substring(0, 16)}</Text>
        </View>
      </View>
      <View style={styles.postImageContainer}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.postImageStyles}
          resizeMode="cover"
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
            {
            }
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
      <View style={{paddingHorizontal: 8}}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    flexDirection: 'row',
    flex: 1,
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
  commentTextStyle: {opacity: 0.9},
  profileImageInCommentStyle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 10,
  },
  partitionStyle: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.primary,
    marginVertical: 8,
  },
  postImageStyles: {height: 400, width: '98%'},
  //   itemContainerWrapper: {
  //     margin: 12,
  //     padding: 10,
  //     borderRadius: 7,
  //     borderColor: COLORS.primary,
  //     borderWidth: 0.8,
  //     // elevation: 10,
  //     // shadowOffset: {width: 0, height: 1},
  //     // shadowColor: '#333',
  //     // shadowOpacity: 0.9,
  //     // shadowRadius: 1,
  //     // backgroundColor: 'white',
  //     // elevation: 2,
  //     // shadowColor: '#000',
  //     // shadowOffset: {width: 0, height: 1},
  //     // shadowOpacity: 0.5,
  //     // shadowRadius: 1,
  //   },
  profileContainerWrapper: {flexDirection: 'row', alignItems: 'center'},
  profileInCommentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginVertical: 4,
    borderRadius: 7,
    borderColor: COLORS.primary,
    borderWidth: 0.8,
    padding: 8,
  },
  itemContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'red',
  },
  textContainer: {
    marginLeft: 10,
  },
  commentTextStyle: {opacity: 0.4, paddingVertical: 2},
  userProfileImageStyles: {height: 50, width: 50, borderRadius: 50},
});
