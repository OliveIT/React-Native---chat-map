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
  forgotemailInputStyle: {
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    borderColor: '#f39019',
    marginTop: 5,
    marginHorizontal: 30,
    paddingHorizontal: 16,
    fontFamily: 'avenir',
    fontSize: 15,
    height: 12 * PixelRatio.get(),
    textAlign: 'center'
  }
};
