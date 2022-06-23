import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
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

  const [posts, setPosts] = useState([]);
  const userToken = useSelector(state => state.user.user.token);
  console.log('in post After userSelector', userToken);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPosts();
    });
    console.log('useEffect posts', posts);
    return unsubscribe;
  }, [navigation]);

  const getPosts = async () => {
    console.log('in getpost of getposts', userToken);
    console.log(GET_FOLLOWING_POSTS);
    data = await axios
      .get(GET_FOLLOWING_POSTS, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
        // setErrorMessage(err.response.data.errorMessage);
        // setIsLoading(false);
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
              getPosts();
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
});
