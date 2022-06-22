import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../constants/colors';
const Stories = () => {
  const navigation = useNavigation();

  const imageString =
    'https://www.eatthis.com/wp-content/uploads/sites/4/2019/06/deep-dish-pizza-chicago.jpg';
  const storyData = [
    {
      id: 1,
      name: 'Your Story',
      image:
        'https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/cover-for-street-food-in-sydney.jpg',
    },
    {
      id: 0,
      name: 'Ram_Charan',
      image: imageString,
    },
    {
      id: 0,
      name: 'The_Groot',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDoHP_USX5Zk2GUVJUNZXPAeZec8hnhBzhkQ&usqp=CAU',
    },
    ,
    {
      id: 0,
      name: 'loverland',
      image: imageString,
    },
    ,
    {
      id: 0,
      name: 'chillhouse',
      image: imageString,
    },
  ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.storiesHorizontalContainer}>
      {storyData.map((data, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              // console.log('story pressed');
              navigation.push('Status', {
                name: data.name,
                image: data.image,
              });
            }}>
            <View style={styles.createStoryContainer}>
              {data.id == 1 ? (
                <View style={styles.createStoryIconContainer}>
                  <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: COLORS.primary,
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      console.log('add story button pressed');
                    }}
                  />
                </View>
              ) : null}
              <View style={styles.UserStoryContainer}>
                <Image
                  source={{uri: data.image}}
                  style={{
                    resizeMode: 'cover',
                    width: '90%',
                    height: '90%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'black',
                  // opacity: data.id == 0 ? 1 : 0.5,
                }}>
                {data.name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storiesHorizontalContainer: {
    paddingVertical: 20,
    // backgroundColor: 'red',
    maxHeight: 125,
  },
  createStoryContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    position: 'relative',
  },
  createStoryIconContainer: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 1,
  },
  UserStoryContainer: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Stories;
