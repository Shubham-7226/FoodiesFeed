import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {GET_FOLLOWING_POSTS} from '../utils/url';
import COLORS from '../constants/colors';
import PostItem from './PostItem';
import {useNavigation} from '@react-navigation/native';
export default function Posts() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [nextUrl, setNextUrl] = useState();
  // const [postdata, setPostdata] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const userToken = useSelector(state => state.user.user.token);
  const [count, setCount] = useState(1);
  // const [lastCount, setLastCount] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  console.log('in post After userSelector', userToken);
  let url;
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    // setIsLoadingPosts(true);
    getPosts();
    // setIsLoadingPosts(false);
    // });
    console.log('useEffect posts', posts);
    // return unsubscribe;
  }, [count]);

  const getPosts = async () => {
    setIsLoadingPosts(true);
    // setLastCount(count);

    console.log('in getpost of getposts', userToken);
    // if (count === 0) {
    //   url = GET_FOLLOWING_POSTS;
    // } else {
    //   url = nextUrl;
    // }
    console.log('+++++++++++++++++++++++++++++++++++++urlis :', url);
    data = await axios
      .get(`${GET_FOLLOWING_POSTS}?page=${count}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .catch(err => {
        console.log(err?.response?.data?.errorMessage);
        setIsLoadingPosts(false);

        // setErrorMessage(err.response.data.errorMessage);
        // setIsLoading(false);
      });
    setIsLoadingPosts(false);

    console.log('in posts after api call', data?.data?.data?.posts);
    setTotalPages(data?.data?.data?.totalPages);
    let postdata = data?.data?.data?.posts;
    if (count === 1) {
      setPosts(postdata);
    } else {
      setPosts([...posts, ...postdata]);
    }

    console.log('after api call posts', posts);
  };

  function FeedItemHandler({item}) {
    // console.log('this is item', item);
    // let isLiked = 'heart-outline';
    return (
      <View style={styles.itemContainerWrapper}>
        <PostItem items={item} />
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
              if (count < totalPages) {
                setCount(1);
                getPosts();
                console.log('this is count', count);
              }
              setIsLoading(false);
            }}
          />
        }
        ListFooterComponent={
          isLoadingPosts ? (
            <ActivityIndicator
              size={'large'}
              color="orange"
              style={styles.activityIndicatorStyle}
            />
          ) : null
        }
        style={{}}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (count < totalPages) {
            setCount(count + 1);

            console.log('this is count', count);
          }
          return (
            <ActivityIndicator
              size={'large'}
              color="orange"
              style={styles.activityIndicatorStyle}
            />
          );
        }}
        data={posts}
        renderItem={FeedItemHandler}
        keyExtractor={item => item?.id}
      />
      {/* {isLoadingPosts ? (
        <ActivityIndicator
          size={'large'}
          color="orange"
          style={styles.activityIndicatorStyle}
        />
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
  activityIndicatorStyle: {
    paddingVertical: 5,
    // zIndex: 5,
  },
});
