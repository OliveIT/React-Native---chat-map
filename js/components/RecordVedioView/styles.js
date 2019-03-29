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
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: -5,
    left: -5
  },
  bottomOverlay: {
    bottom: -deviceHeight / 3.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordViewOverlayIconToggle: {
    top: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  captureButton: {
    padding: 15,
    borderRadius: 40
  },
  typeButton: {
    padding: 5
  },
  recordButtonViewStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 60,
    ...Platform.select({
      android: { top: 1 },
      ios: { top: 2, left: 1 }
    })
  },
  buttonSpacing: {
    width: 10
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
  captionViewStyle: {
    position: 'absolute',
    marginTop: deviceHeight / 2 - 10,
    width: deviceWidth,
    backgroundColor: COLORS.BRIGHT_ORANGE,
    justifyContent: 'center',
    ...Platform.select({
      android: { height: deviceHeight / 14 },
      ios: { height: deviceHeight / 18 }
    })
  },
  captionInputStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 4,
    textAlign: 'center',
    ...Platform.select({
      android: { fontSize: 16 },
      ios: { fontSize: 20 }
    })
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
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 16,
    paddingVertical: deviceWidth / 17
  },
  textInputStyle: {
    backgroundColor: COLORS.WHITE,
    fontFamily: 'avenir',
    marginTop: 10,
    marginHorizontal: 30,
    height: 40,
    textAlign: 'center',
    borderColor: COLORS.GREY,
    borderRadius: 5,
    borderWidth: 1
  },
  friendModalContainerStyle: {
    backgroundColor: COLORS.WHITE,
    borderColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: deviceHeight / 9,
    width: deviceWidth / 1.2,
    height: deviceHeight / 1.3
  },
  friendModalHeadingTextViewStyle: {
    alignItems: 'center',
    marginTop: 20
  },
  friendModalHeadingTextStyle: {
    color: COLORS.BRIGHT_ORANGE_200,
    fontFamily: 'avenir',
    fontSize: 16,
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '500' }
    })
  },
  scanViewOverlayTop: {
    top: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scanViewOverlayBTM: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barcodeDataViewStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: deviceHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth / 1.86,
    height: deviceHeight * 0.05,
    marginBottom: 10,
  },
  receiptUploadRowStyle: {
    justifyContent: 'flex-end',
    ...Platform.select({
      android: { top: deviceHeight * 0.65 },
      ios: { top: deviceHeight * 0.66 }
    })
  },
  receiptUploadTouchStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: deviceHeight * 0.05,
    justifyContent: 'center',
    width: deviceWidth * 0.38,
    height: deviceHeight * 0.05
  },
  barcodeDetectionTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 16,
    textAlign: 'center'
  },
  receiptViewStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.WHITE,
    borderRadius: 60,
    borderWidth: 2
  },
  successModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    top: -70
  },
  innerBox: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  formView: {
    position: 'absolute',
    top: deviceHeight * 0.38,
    width: deviceWidth * 0.76,
    height: deviceHeight * 0.16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 5
  },
  inputForm: {
    backgroundColor: COLORS.WHITE,
    width: deviceWidth * 0.76,
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 0,
    textAlign: 'center'
  },
  todoItem: {
    alignSelf: 'center',
    backgroundColor: COLORS.BRIGHT_ORANGE,
    opacity: 0.8,
    borderRadius: deviceHeight * 0.05,
    width: deviceWidth / 1.28,
    height: deviceHeight * 0.05,
    marginBottom: 10
  },
  todoText: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 11
  },
};
