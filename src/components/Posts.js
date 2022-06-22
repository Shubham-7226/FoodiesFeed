import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {GET_FOLLOWING_POSTS} from '../utils/url';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
export default function Posts() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState();
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [listData, setListData] = useState([]);
  const userToken = useSelector(state => state.user.user.token);
  // const userDetail = useSelector(state => state.user.user);
  console.log('in post After userSelector', userToken);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPosts();
    });
    console.log('useEffect posts', posts);
    return unsubscribe;
  }, []);

  const getPosts = async () => {
    console.log('in getpost of getposts', userToken);
    console.log(GET_FOLLOWING_POSTS);
    data = await axios.get(GET_FOLLOWING_POSTS, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });

    console.log('in posts after api call', data?.data?.data?.posts);
    let postdata = data?.data?.data?.posts;
    setPosts(postdata);
    console.log('after api call posts', posts);
  };

  function FeedItemHandler({item}) {
    console.log('this is item', item);
    // let isLiked = 'heart-outline';
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
            <Text>{new Date().toString().substring(0, 16)}</Text>
          </View>
        </View>
        {/* <View style={styles.partitionStyle} /> */}
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
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setIsLoading(true);
              // getPosts();
              setIsLoading(false);
            }}
          />
        }
        data={posts}
        renderItem={FeedItemHandler}
        keyExtractor={item => item.id}
      />
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
  itemContainerWrapper: {
    margin: 12,
    padding: 10,
    borderRadius: 7,
    borderColor: COLORS.primary,
    borderWidth: 0.8,
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
    // backgroundColor: 'red',
  },
  textContainer: {
    marginLeft: 10,
  },
  commentTextStyle: {opacity: 0.4, paddingVertical: 2},
  userProfileImageStyles: {height: 50, width: 50, borderRadius: 50},
});
