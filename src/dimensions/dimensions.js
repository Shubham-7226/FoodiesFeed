import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ratio = {
  x: width / 375.0,
  y: Math.min(height / 667.0, width / 375.0),
};

export default {
  getHeight: value => value * ratio.y,
  getWidth: value => value * ratio.x,
  height,
  ratio,
  width,
};
