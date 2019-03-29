import { Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: COLORS.BG_GREY
  },
  memberCounterViewStyle: {
    marginTop: 20,
    marginRight: 0,
    marginBottom: -6,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  memberCounterTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 12,
    textAlign: 'center'
  },
  noItem: {
    margin: 10,
    backgroundColor: COLORS.LIGHT_ORANGE,
    borderRadius: 45,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeVoice: {
    flex: 2,
    marginHorizontal: deviceWidth * 0.03,
    width: deviceWidth / 4.5
  }
};
