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
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Posts() {
  const [like, setLike] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {}, []);

  function FeedItemHandler({item}) {
    // let isLiked = 'heart-outline';
    let data = 5;
    return (
      <View style={styles.itemContainerWrapper}>
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            }}
            style={{height: 50, width: 50, borderRadius: 50}}
          />

          <View style={styles.textContainer}>
            <Text>Name</Text>
            <Text>{new Date().toString().substring(0, 16)}</Text>
          </View>
        </View>

        <Image
          source={{
            uri: 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
          }}
          style={{height: 200}}
        />
        <Text style={styles.captionContainer}>
          caption of this post is ....
        </Text>
        <View style={{height: 2, width: '100%', backgroundColor: '#cccc'}} />
        <View style={styles.iconWrapper}>
          <Icon
            name={like ? 'heart-sharp' : 'heart-outline'}
            size={30}
            style={{marginLeft: 5}}
            color="#F36D67"
            onPress={() => {
              // console.log('like button pressed');
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
            // color="#000"
            onPress={() => {
              console.log('comment button pressed');
            }}
          />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text>
            Liked by {like ? 'you and' : ''}{' '}
            {like ? data.likes + 1 : data.likes} others
          </Text>

          <Text style={{opacity: 0.4, paddingVertical: 2}}>
            View all comments
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  backgroundColor: 'orange',
                  marginRight: 10,
                }}
              />
              <TextInput placeholder="Add a comment " style={{opacity: 0.5}} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                size={25}
                color="black"
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
      {/* <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000',
          }}
          style={{height: 50, width: 50, borderRadius: 50}}
        />

        <View style={styles.textContainer}>
          <Text>Name</Text>
          <Text>{new Date().toString().substring(0, 16)}</Text>
        </View>
      </View> */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setIsLoading(true);
              //func
              setIsLoading(false);
            }}
          />
        }
        data={[1, 2, 3]}
        renderItem={FeedItemHandler}
        keyExtractor={item => item}
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
  captionContainer: {
    margin: 5,
    color: '#333',
    fontSize: 12,
    padding: 5,
  },
  itemContainerWrapper: {
    margin: 10,
    // padding: 10,
    borderRadius: 10,
    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: 'white',
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
});
