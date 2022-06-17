import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Posts from '../../components/Posts';
import Stories from '../../components/Stories';
import {useSelector, useDispatch} from 'react-redux';

export default function Home({navigation}) {
  const userDetail = useSelector(state => state.user);
  useEffect(() => {
    console.log('in HOME After userSelector', userDetail);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View style={styles.logoContainer}>
        {/* <FontAwesome name="plus-square-o" style={{fontSize: 24}} /> */}
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
          }}>
          FoodiesFeed
        </Text>
        <Feather name="navigation" style={{fontSize: 24}} />
      </View>
      <Stories />
      <Posts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
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
  logoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});
