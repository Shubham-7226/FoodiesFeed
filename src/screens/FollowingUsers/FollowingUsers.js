import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState} from 'react';

export default function FollowingUsers({route}) {
  let {data} = route.params;
  console.log('in following user ', data);

  function ItemHandler({item}) {
    console.log(item);
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.userProfileImageStyles}
        />

        <View style={styles.textContainer}>
          <Text>{item?.userName}</Text>
          <Text>{item?.name}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
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
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 6,
    padding: 10,
    alignItems: 'center',
    borderColor: '#cccc',
    borderBottomWidth: 1,
  },
  userProfileImageStyles: {height: 50, width: 50, borderRadius: 50},
  textContainer: {
    marginLeft: 10,
  },
});
