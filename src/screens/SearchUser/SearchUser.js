import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import SearchBox from '../../components/SearchBox';
import ShowSearchedUsers from '../../components/ShowSearchedUsers';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Search = () => {
  const [users, setUsers] = useState([]);
  const setData = data => {
    setUsers(data);
  };

  return (
    <View style={styles.container}>
      <SearchBox setSearchedData={setData} />
      <ShowSearchedUsers data={users} />
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
