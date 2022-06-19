import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';

const SearchContent = ({imgdata}) => {
  // const {data} = props;
  const searchData = [
    {
      id: 0,
      images: [
        'https://image.shutterstock.com/image-photo/bowl-buddha-buckwheat-pumpkin-chicken-260nw-1259570605.jpg',
        'https://image.shutterstock.com/image-photo/bowl-buddha-buckwheat-pumpkin-chicken-260nw-1259570605.jpg',
        'https://image.shutterstock.com/image-photo/bowl-buddha-buckwheat-pumpkin-chicken-260nw-1259570605.jpg',
        'https://image.shutterstock.com/image-photo/bowl-buddha-buckwheat-pumpkin-chicken-260nw-1259570605.jpg',
        'https://image.shutterstock.com/image-photo/bowl-buddha-buckwheat-pumpkin-chicken-260nw-1259570605.jpg',
        'https://image.shutterstock.com/image-photo/bowl-buddha-buckwheat-pumpkin-chicken-260nw-1259570605.jpg',
      ],
    },
    {
      id: 1,
      images: [
        'https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg',
        'https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg',
        'https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg',
        'https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg',
        'https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg',
        'https://thumbs.dreamstime.com/b/assorted-american-food-top-view-109748438.jpg',
      ],
    },
    {
      id: 2,
      images: [
        'https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg',
        'https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg',
        'https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg',
      ],
    },
  ];

  return (
    <View>
      {searchData.map((data, index) => {
        return (
          <View key={index}>
            {data.id === 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                {data.images.map((imageData, imgIndex) => {
                  return (
                    <Pressable
                      delayLongPress={1000}
                      key={imgIndex}
                      onLongPress={() => imgdata(imageData)}
                      onPressOut={() => imgdata(null)}
                      style={{paddingBottom: 2, width: '33%'}}>
                      <Image
                        source={{uri: imageData}}
                        style={{width: '100%', height: 150}}
                      />
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            {data.id === 1 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '66.5%',
                    justifyContent: 'space-between',
                  }}>
                  {data.images.slice(0, 4).map((imageData, imgIndex) => {
                    return (
                      <Pressable
                        delayLongPress={1000}
                        key={imgIndex}
                        onLongPress={() => imgdata(imageData)}
                        onPressOut={() => imgdata(null)}
                        style={{paddingBottom: 2, width: '49.5%'}}>
                        <Image
                          source={{uri: imageData}}
                          style={{width: '100%', height: 150}}
                        />
                      </Pressable>
                    );
                  })}
                </View>
                <Pressable
                  delayLongPress={1000}
                  onLongPress={() => imgdata(data.images[5])}
                  onPressOut={() => imgdata(null)}
                  style={{marginLeft: 2, width: '33%'}}>
                  <Image
                    source={{uri: data.images[5]}}
                    style={{width: '100%', height: 300}}
                  />
                </Pressable>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default SearchContent;
