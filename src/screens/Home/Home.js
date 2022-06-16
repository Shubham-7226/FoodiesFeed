import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {
  // const [isLiked, setIsLiked] = useState('heart-outline');
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {}, []);

  function FeedItemHandler({item}) {
    let isLiked = 'heart-outline';
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
            name={isLiked}
            size={30}
            style={{marginLeft: 5}}
            color="#F36D67"
            onPress={() => {
              console.log('like button pressed');
              if (isLiked === 'heart-outline') {
                isLiked = 'heart-sharp';
              } else {
                isLiked = 'heart-outline';
              }
            }}
          />
          <Icon
            name="chatbox-ellipses-outline"
            size={30}
            style={{marginLeft: 10}}
            // color="#000"
            onPress={() => {
              console.log('comment button pressed');
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
          style={{height: 50, width: 50, borderRadius: 50}}
        />

        <View style={styles.textContainer}>
          <Text>Name</Text>
          <Text>{new Date().toString().substring(0, 16)}</Text>
        </View>
      </View>
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
