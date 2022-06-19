import React, {useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import SearchBox from '../../components/SearchBox';
import SearchContent from '../../components/SearchContent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Search = () => {
  const [image, setImage] = useState(null);

  const getData = data => {
    setImage(data);
  };

  return (
    <View style={styles.container}>
      <SearchBox />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Pressable
          style={{
            margin: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="pluscircleo" style={{fontSize: 40, opacity: 0.5}} />
        </Pressable> */}
        <SearchContent imgdata={getData} />
      </ScrollView>
      {image ? (
        <View style={styles.popUpConainer}>
          <StatusBar backgroundColor="#525252" barStyle="dark-content" />
          <View style={styles.userHeaderWrapper}>
            <View style={styles.userImageWrapper}>
              <Image source={{uri: image}} style={styles.imageStyle} />
              <View style={{paddingLeft: 8}}>
                <Text style={{fontSize: 12, fontWeight: '600'}}>
                  the_anonymous_guy
                </Text>
              </View>
            </View>
            <Image source={{uri: image}} style={styles.mainImageStyles} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'relative',
  },
  popUpConainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52,52,52,0.8)',
  },
  userHeaderWrapper: {
    position: 'absolute',
    top: windowHeight / 6,
    left: windowWidth / 18,
    backgroundColor: 'white',
    width: '90%',
    height: 465,
    borderRadius: 15,
    zIndex: 1,
    elevation: 50,
  },
  userImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  mainImageStyles: {width: '100%', height: '80%'},
});

export default Search;
