import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  TextInput,
  Animated,
  StyleSheet,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Status = ({route, navigation}) => {
  const {name} = route.params;
  const {profileImage} = route.params;
  const {storyImage} = route.params;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    return () => clearTimeout(timer);
  }, []);

  const [progress, setProgress] = useState(new Animated.Value(0));

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.statusContainer}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.statusInnerContainer}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}></Animated.View>
      </View>
      <View style={styles.mainStatusHaderContainer}>
        <View style={styles.imageWrapperContainer}>
          <Image source={{uri: profileImage}} style={styles.imageStyle} />
        </View>
        <View style={styles.statusHaderContainer}>
          <Text style={styles.inStatusTextContainer}>{name}</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionic
              name="close"
              style={{fontSize: 20, color: 'white', opacity: 0.8}}
            />
          </Pressable>
        </View>
      </View>
      <Image
        source={{uri: storyImage}}
        style={{position: 'absolute', width: '100%', height: 600}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: 'black',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInnerContainer: {
    height: 3,
    width: '95%',
    borderWidth: 1,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 18,
  },
  inStatusTextContainer: {color: 'white', fontSize: 15, paddingLeft: 10},
  statusHaderContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  imageStyle: {
    borderRadius: 100,
    backgroundColor: 'orange',
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
  },
  imageWrapperContainer: {
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainStatusHaderContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    left: 0,
    width: '90%',
  },
});

export default Status;
