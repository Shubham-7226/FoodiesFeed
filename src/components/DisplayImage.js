import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import COLORS from '../constants/colors';
import {GET_SINGLE_POST} from '../utils/url';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DisplayImage({route, navigation}) {
  const [item, setItem] = useState(null);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState();
  const user = useSelector(state => state.user.user);
  console.log('in DisplayImage after selector', user);

  const {postId} = route.params;
  console.log(postId);
  const url = `${GET_SINGLE_POST}${postId}`;
  console.log(url);
  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    console.log(url);
    data = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .catch(error => {
        console.log(error);
      });
    console.log('in displayimage after api call', data?.data?.data);
    let postData = data?.data?.data;
    setItem(postData);
    console.log('after api call DisplayImage', postData);

    console.log('after api call DisplayImage', item);
  };

  return (
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
        <Icon
          name={like ? 'heart-sharp' : 'heart-outline'}
          size={30}
          style={{marginLeft: 5}}
          color={COLORS.primary}
          onPress={() => {
            console.log('like button pressed');
            // if (isLiked === 'heart-outline') {
            //   isLiked = 'heart-sharp';
            // } else {
            //   isLiked = 'heart-outline';
            // }
            setLike(!like);
          }}
        />
        <Icon
          name="ios-chatbubble-outline"
          size={30}
          style={{marginLeft: 10}}
          color={COLORS.primary}
          onPress={() => {
            console.log('comment button pressed');
          }}
        />
      </View>
      <View style={{paddingHorizontal: 15}}>
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
    backgroundColor: 'white',
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
  commentTextStyle: {opacity: 0.5},
  profileImageInCommentStyle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 10,
  },
  partitionStyle: {height: 2, width: '100%', backgroundColor: COLORS.primary},
  postImageStyles: {height: 400, width: '98%'},
  itemContainerWrapper: {
    margin: 12,
    padding: 10,
    borderRadius: 7,
    borderColor: COLORS.primary,
    borderWidth: 2,
    // elevation: 10,
    // shadowOffset: {width: 0, height: 1},
    // shadowColor: '#333',
    // shadowOpacity: 0.9,
    // shadowRadius: 1,
    // backgroundColor: 'white',
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
  },
  profileContainerWrapper: {flexDirection: 'row', alignItems: 'center'},
  profileInCommentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemContainer: {
    // flex: 1,
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
