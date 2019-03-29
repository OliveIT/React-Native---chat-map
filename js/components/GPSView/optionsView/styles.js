import { Platform } from 'react-native';
import { COLORS } from '../../../constants';

const React = require('react-native');
const { StyleSheet, Dimensions, PixelRatio } = React;

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: COLORS.TRANSPARENT,
    marginBottom: 51
  },
  buttonStyle1: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.PURPLE,
    borderWidth: 1,
    height: deviceWidth * 0.3,
    width: deviceWidth * 0.3,
    borderRadius: deviceWidth * 0.6,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle2: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderWidth: 1,
    height: deviceWidth * 0.3,
    width: deviceWidth * 0.3,
    borderRadius: deviceWidth * 0.6,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
