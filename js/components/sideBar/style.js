import { Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  sidebar: {
    flex: 1,
    padding: 10,
    paddingRight: 0,
    paddingTop: 30,
    backgroundColor: COLORS.WHITE
  },
};
