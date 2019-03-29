import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    flex: 1
  },
  activeVoice: {
    flex: 2,
    marginHorizontal: deviceWidth * 0.03,
    width: deviceWidth / 4.5
  },
};
