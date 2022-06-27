import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GET_COMMENTS} from '../utils/url';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import COLORS from '../constants/colors';
export default function Comments({route}) {
  let {postId} = route.params;
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const userToken = useSelector(state => state.user.user.token);
  console.log('in comment After userSelector', userToken);

  useEffect(() => {
    getComments(postId);
  }, [navigation]);

  const getComments = async postId => {
    let url = `${GET_COMMENTS}${postId}/comments`;
    console.log(url);
    let data = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .catch(err => {
        console.log(err?.response?.data);
      });
    console.log(
      'in comments after api call of comments',
      data?.data?.data?.comments,
    );
    let postdata = data?.data?.data?.comments;
    setComments(postdata);
  };

  function commentHandler({item}) {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item?.User?.image}}
          style={styles.userProfileImageStyles}
        />

        <View style={styles.textContainer}>
          <Text>{item?.User?.userName}</Text>
          <Text>{item?.comment}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={commentHandler}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: COLORS.primary,
    borderBottomWidth: 0.8,
  },
  textContainer: {
    marginLeft: 10,
  },
  userProfileImageStyles: {height: 50, width: 50, borderRadius: 50},
});
