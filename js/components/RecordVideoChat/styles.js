import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  squareContainer: {
    width: deviceWidth,
    height: deviceHeight / 1.77
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
    left: -5
  },
  topOverlay: {
    top: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: -deviceHeight / 3.2,
    backgroundColor: COLORS.TRANSPARENT,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordingInactiveTextStyle: {
    fontFamily: 'avenir',
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 18,
    ...Platform.select({
      android: { marginTop: 25, marginBottom: 5 },
      ios: { marginBottom: 20 }
    })
  },
  recordingActiveTextStyle: {
    ...Platform.select({
      android: { marginTop: 25, marginBottom: 5 },
      ios: { marginBottom: 20 }
    })
  },
  captureButton: {
    padding: 15,
    borderRadius: 40
  },
  typeButton: {
    padding: 5
  },
  closeButton: {
    padding: 5
  },
  recordButtonViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 60,
    position: 'absolute'
  },
  buttonSpacing: {
    width: 10,
  },
  buttonDelay: {
    flexDirection: 'row'
  },
  buttonStyle: {
    width: deviceWidth / 5,
    height: deviceWidth / 5
  },
  buttonFAStyle: {
    width: deviceWidth / 4.8,
    height: deviceWidth / 4.8,
    padding: 6
  },
  borderedButtonFAViewStyle: {
    width: 70,
    height: 70,
    borderColor: COLORS.WHITE,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderedButtonFAStyle: {
    padding: 6
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
  }
};
