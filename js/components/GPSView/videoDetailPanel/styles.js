import { Dimensions } from 'react-native';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  fullScreen: {
    backgroundColor: COLORS.BLACK,
    height: deviceHeight
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: -5,
    left: -5,
    alignItems: 'center'
  },
  topOverlay: {
    top: 26,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: -deviceHeight / 3.2,
    backgroundColor: 'rgba(0,0,0,0.0)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomOverlay1: {
    bottom: -deviceHeight / 7,
    backgroundColor: 'rgba(0,0,0,0.0)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
    padding: 15,
    borderRadius: 40
  },
  typeButton: {
    color: COLORS.BRIGHT_ORANGE,
    padding: 5
  },
  flashButton: {
    color: COLORS.BRIGHT_ORANGE,
    padding: 5
  },
  buttonsSpace: {
    width: 10
  },
  buttonsDelay: {
    flexDirection: 'row'
  },
  buttonStyle: {
    width: deviceWidth / 5,
    height: deviceWidth / 5
  },
  chatIconStyle: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    marginBottom: deviceWidth / 14
  },
  chatIcon: {
    padding: 5
  },
  textStyle: {
    fontSize: 16,
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    paddingVertical: deviceWidth / 17
  },
  active_avatarStyle: {
    margin: 10,
    backgroundColor: 'transparent',
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11
  },
  button_disabled_Style: {
    width: deviceWidth / 5,
    height: deviceWidth / 5,
    marginTop: deviceHeight * 0.05
  },
  textInputStyle: {
    backgroundColor: COLORS.WHITE,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 30,
    height: 40,
    textAlign: 'center',
    borderColor: COLORS.GREY,
    borderWidth: 1,
    fontFamily: 'avenir'
  },
  reportingContainer: {
    backgroundColor: COLORS.TRANSPARENT,
    marginBottom: 51
  },
  headContent: {
    height: 40,
    backgroundColor: COLORS.LIGHT_ORANGE,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headContentTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 14,
    textAlign: 'center'
  },
  reportButtonStyle1: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.DARK_GREY,
    borderWidth: 1,
    height: deviceWidth * 0.3,
    width: deviceWidth * 0.3,
    borderRadius: deviceWidth * 0.6,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reportButtonStyle2: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderWidth: 1,
    height: deviceWidth * 0.3,
    width: deviceWidth * 0.3,
    borderRadius: deviceWidth * 0.6,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 16
  },
  descriptionViewStyle: {
    position: 'absolute',
    marginTop: deviceHeight / 2 - 10,
    width: deviceWidth,
    height: deviceHeight / 18,
    backgroundColor: COLORS.BRIGHT_ORANGE,
    justifyContent: 'center',
    padding: 10
  },
  descriptionTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 20,
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  likeChatShareTouchable: {
    padding: 5,
    marginHorizontal: 10
  },
  like: {
    width: deviceWidth / 15,
    height: deviceWidth / 15 * 0.8961
  },
  likeChatShare: {
    width: deviceWidth / 15,
    height: deviceWidth / 15
  },
  metricsTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    textAlign: 'center',
    width: 28
  }
};
