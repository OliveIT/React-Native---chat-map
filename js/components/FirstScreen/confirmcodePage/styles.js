import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  codeInputAreaStyle: {
    alignItems: 'center',
    marginHorizontal: 60,
    marginTop: 100,
    borderBottomWidth: 1,
    borderColor: COLORS.GREY,
  },
  codeInputStyle: {
    textAlign: 'center',
    fontFamily: 'avenir',
    fontSize: 20,
    width: deviceWidth - 140,
    height: Platform.OS === 'ios' ? 50 : 10,
  },
  textPlaceholderStyle: {
    textAlign: 'center',
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 20,
    marginHorizontal: 60,
    marginTop: 30,
  }
};
