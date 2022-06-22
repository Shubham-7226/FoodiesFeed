import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function ShowSearchedUsers({data}) {
  const navigation = useNavigation();
  const [users, setUsers] = useState(data);

  function ItemHandler({item}) {
    console.log(item);
    return (
      <Pressable
        onPress={() => {
          console.log('searched user item pressed', item.id);
          navigation.navigate('OtherUserProfile', {id: item.id});
        }}>
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: item?.image, //image
            }}
            style={styles.userProfileImageStyles}
          />

          <View style={styles.textContainer}>
            <Text>{item?.userName}</Text>
            <Text>{item?.name}</Text>
          </View>
          {/* <Button title={buttonTitle} /> */}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        // refreshControl={
        //   <RefreshControl
        //     refreshing={false}
        //     onRefresh={() => {
        //       setIsLoading(true);
        //       // getPosts();
        //       setIsLoading(false);
        //     }}
        //   />
        // }
        data={data}
        renderItem={ItemHandler}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 6,
    padding: 10,
    alignItems: 'center',
    // borderRadius: 3,
    borderColor: '#cccc',
    borderBottomWidth: 1,
    // elevation: 1,
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
  userProfileImageStyles: {height: 50, width: 50, borderRadius: 50},
  textContainer: {
    marginLeft: 10,
  },
});
