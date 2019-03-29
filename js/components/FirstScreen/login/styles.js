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
    fontFamily: 'avenir',
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.WHITE
  },
  titleStyle: {
    flex: 1,
    width: deviceWidth - 100,
    height: deviceWidth / 6 - 15,
    marginTop: 20,
    marginHorizontal: 30
  },
  subTitleStyle: {
    fontFamily: 'avenir',
    fontSize: 18,
    marginTop: 10,
    marginRight: 30,
    alignSelf: 'flex-end'
  },
  welcomeTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 17,
    alignSelf: 'center',
    fontFamily: 'avenir',
    marginTop: 20 * PixelRatio.get()
  },
  iconStyle: {
    width: 20 * PixelRatio.get(),
    height: 20 * PixelRatio.get(),
    marginTop: 20,
    alignSelf: 'center'
  },
  forgotPasswordTextStyle: {
    color: COLORS.TEXT_GREY,
    fontFamily: 'avenir',
    fontSize: 16
  },
  loginBtnStyle: {
    width: deviceWidth / 2.5,
    alignSelf: 'center',
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 5,
    marginTop: 15 * PixelRatio.get(),
    height: 12 * PixelRatio.get(),
    justifyContent: 'center'
  },
  emailLoginTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    alignSelf: 'center',
    fontFamily: 'avenir',
    fontSize: 17,
    marginTop: 50
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
  forgotemailInputStyle: {
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    marginTop: 5,
    marginHorizontal: 30,
    paddingHorizontal: 16,
    fontFamily: 'avenir',
    fontSize: 4 * PixelRatio.get(),
    height: 12 * PixelRatio.get(),
    textAlign: 'center'
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
  forgotModalStyle: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    marginTop: deviceHeight / 3,
    height: deviceHeight / 2.3,
    width: deviceWidth / 1.3,
    marginHorizontal: deviceWidth / 8
  },
  forgotModalStyle1: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    marginTop: deviceHeight / 3,
    marginBottom: deviceHeight / 4.32,
    height: deviceHeight / 2.3,
    width: deviceWidth / 1.3,
    marginHorizontal: deviceWidth / 8
  },
  modalTextStyle: {
    fontFamily: 'avenir',
    fontSize: 5 * PixelRatio.get(),
    textAlign: 'center',
    margin: 10 * PixelRatio.get(),
    marginTop: 15 * PixelRatio.get()
  },
  removeBtnStyle: {
    width: 13 * PixelRatio.get(),
    height: 13 * PixelRatio.get()
  },
  BtnStyle: {
    width: 35 * PixelRatio.get(),
    height: 35 * PixelRatio.get()
  },
  touchModalStyle: {
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    borderRadius: 20 * PixelRatio.get(),
    width: 40 * PixelRatio.get(),
    height: 40 * PixelRatio.get()
  },
  imageIconStyle: {
    width: 35 * PixelRatio.get(),
    height: 35 * PixelRatio.get(),
    marginTop: 20
  }
};
