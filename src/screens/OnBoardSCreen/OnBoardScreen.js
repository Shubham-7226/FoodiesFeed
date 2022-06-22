import React from 'react';
import {Text, StyleSheet, View, Image, Button} from 'react-native';
import COLORS from '../../constants/colors';
import CustomButton from '../../components/CustomButton';

const OnBoardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#ccc'}}>
      <View style={{height: 400, alignItems: 'center'}}>
        <Image
          style={{
            width: '90%',
            height: 150,
            resizeMode: 'contain',

            // top: -150,
          }}
          source={{
            uri: 'https://mag.foodiesfeed.com/wp-content/uploads/2018/05/foodiesfeed-mag-w@x2.png',
          }}
        />
        <Image
          style={{
            width: '100%',
            height: 250,
            // resizeMode: 'contain',

            // top: -150,
          }}
          source={{
            uri: 'https://media.istockphoto.com/photos/bakery-chef-prepare-pizza-picture-id1291299956?b=1&k=20&m=1291299956&s=170667a&w=0&h=Ys_FLtdY0Uzc7yTQl6JzvCHTQ3eRAuqNNU4x8EX1FB8=',
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>
            Delicious Food
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: COLORS.grey,
            }}>
            We help you to find best and delicious food
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
        <CustomButton
          onPress={() => navigation.navigate('LoginUserStack')}
          title="Get Started"
          customBackgroundColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
