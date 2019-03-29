import { Dimensions, Platform, PixelRatio } from 'react-native';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  textPlaceholderStyle: {
    textAlign: 'center',
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 20,
    marginHorizontal: 60,
    marginTop: 30
  },
  usernameInputAreaStyle: {
    alignItems: 'center',
    marginHorizontal: 60,
    marginTop: 50,
    borderBottomWidth: 1,
    borderColor: COLORS.GREY
  },
  usernameInputStyle: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'avenir',
    fontSize: 23,
    width: deviceWidth - 110,
    ...Platform.select({
      ios: { height: 50 }
    })
  },
  usernameStatusViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  usernameStatusStyle: {
    fontFamily: 'avenir',
    fontSize: 12,
    marginLeft: 5,
    marginTop: 5
  },
  usernameStatusAvailableIconStyle: {
    color: COLORS.GREEN,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 5,
    marginTop: 5
  },
  usernameStatusUnavailableIconStyle: {
    color: COLORS.RED,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 5,
    marginTop: 5
  },
  confirmBtnViewStyle: {
    marginTop: deviceHeight * 0.1
  },
  confirmBtnStyle: {
    width: deviceWidth / 2.5,
    alignSelf: 'center',
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 5,
    marginTop: 15 * PixelRatio.get(),
    height: 15 * PixelRatio.get(),
    justifyContent: 'center'
  },
  textStyle1: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center'
  }
};
