import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  imageStyle: {
    width: deviceWidth,
    height: deviceWidth * 856 / 621
  },
  forgotModalStyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: deviceHeight / 3,
    height: deviceHeight / (Platform.OS === 'ios' ? 2.3 : 1.82),
    width: deviceWidth / 1.3,
    marginHorizontal: deviceWidth / 8
  },
  imageIconStyle: {
    width: 26 * PixelRatio.get(),
    height: 26 * PixelRatio.get(),
    marginTop: 20
  },
  emailTextStyle: {
    fontFamily: 'avenir',
    fontSize: 15,
    paddingTop: 10,
    marginHorizontal: 15,
    textAlign: 'center'
  },
  backBtnTextStyle: {
    fontFamily: 'avenir',
    fontSize: 18,
    marginTop: 17
  }
};
