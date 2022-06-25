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
              uri: item?.image,
            }}
            style={styles.userProfileImageStyles}
          />

          <View style={styles.textContainer}>
            <Text>{item?.userName}</Text>
            <Text>{item?.name}</Text>
          </View>
        </View>
      </Pressable>
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
