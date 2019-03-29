import { Dimensions, StyleSheet, PixelRatio, Platform } from 'react-native';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: COLORS.WHITE
  },
  textStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center'
  },
  titleStyle: {
    flex: 1,
    width: deviceWidth-100,
    height: deviceWidth / 6 - 15,
    marginTop: 20,
    marginHorizontal: 30
  },
  welcomeTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 20 * PixelRatio.get()
  },
  iconStyle: {
    width: 20 * PixelRatio.get(),
    height: 20 * PixelRatio.get(),
    marginTop: 20,
    alignSelf: 'center'
  },
  forgotPasswordTextStyle: {
    fontFamily: 'avenir',
    fontSize: 18
  },
  signupBtnStyle: {
    width: deviceWidth / 2.5,
    alignSelf: 'center',
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 5,
    marginTop: 12 * PixelRatio.get(),
    height: 12 * PixelRatio.get(),
    justifyContent: 'center'
  },
  emailLoginTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    alignSelf: 'center',
    fontFamily: 'avenir',
    fontSize: 17,
    marginTop: 20 * PixelRatio.get()
  },
  emailInputStyle: {
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    height: 12 * PixelRatio.get(),
    marginTop: 10,
    marginHorizontal: 30,
    paddingHorizontal: 16,
    fontFamily: 'avenir',
    ...Platform.select({
      android: { fontSize: 4 * PixelRatio.get() },
      ios: { fontSize: 15 }
    })
  },
  passwordInputStyle: {
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    height: 12 * PixelRatio.get(),
    marginTop: 10,
    marginHorizontal: 30,
    paddingHorizontal: 16,
    fontFamily: 'avenir',
    ...Platform.select({
      android: { fontSize: 4 * PixelRatio.get() },
      ios: { fontSize: 15 }
    })
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
  disclaimerStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
    ...Platform.select({
      android: { marginBottom: 32 },
      ios: { marginBottom: 10 }
    })
  }
};
