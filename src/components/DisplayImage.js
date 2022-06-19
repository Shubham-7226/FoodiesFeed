import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import COLORS from '../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DisplayImage({route}) {
  const [image, setImage] = useState(null);
  const [like, setLike] = useState();

  const {profileimage} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.mainContainerStyles}>
        <View style={styles.userHeaderWrapper}>
          <View style={styles.userImageWrapper}>
            <Image source={{uri: profileimage}} style={styles.imageStyle} />
            <View style={{paddingLeft: 8}}>
              <Text style={{fontSize: 12, fontWeight: '600'}}>
                the_anonymous_guy
              </Text>
            </View>
          </View>
        </View>
        <Image
          source={{
            uri: profileimage,
          }}
          style={{height: 200}}
        />
        <Text style={styles.captionContainer}>
          caption of this post is ....
        </Text>
        <View style={styles.partitionStyle} />
        <View style={styles.iconWrapper}>
          <Icon
            name={like ? 'heart-sharp' : 'heart-outline'}
            size={30}
            style={{marginLeft: 5}}
            color={COLORS.primary}
            onPress={() => {
              setLike(!like);
            }}
          />
          <Icon
            name="ios-chatbubble-outline"
            size={30}
            style={{marginLeft: 10}}
            onPress={() => {
              console.log('comment button pressed');
            }}
          />
        </View>
        <View style={styles.likeAndCommentContainer}>
          <Text>
            Liked by
            {/* {like ? 'you and' : ''} {like ? 
          data.likes + 1 : data.likes} */}
            others
          </Text>

          {/* <Text style={{opacity: 0.4, paddingVertical: 2}}>
            View all comments
          </Text> */}
          <View style={styles.addCommentContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: profileimage,
                }}
                style={styles.commentProfileStyles}
              />
              <TextInput placeholder="Add a comment " style={{opacity: 0.5}} />
            </View>
            <View style={styles.sendIconContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconWrapper: {
    flexDirection: 'row',
    padding: 5,
  },
  captionContainer: {
    margin: 5,
    color: '#333',
    fontSize: 12,
    padding: 5,
  },
  likeAndCommentContainer: {paddingHorizontal: 15},
  sendIconContainer: {flexDirection: 'row', alignItems: 'center'},
  partitionStyle: {height: 2, width: '100%', backgroundColor: '#cccc'},
  mainContainerStyles: {
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    // shadowOffset: {width: 0, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  userHeaderWrapper: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 15,
    marginTop: 10,
  },
  addCommentContainer: {
    // flex: 1,
    // width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#cccc',
  },
  userImageWrapper: {
    // marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  mainImageStyles: {width: '100%', height: '60%'},
  commentProfileStyles: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 10,
  },
});
