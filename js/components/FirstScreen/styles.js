import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.BRIGHT_ORANGE
  },
  textStyle: {
    fontFamily: 'avenir',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: deviceWidth / 4 - 38,
    textAlignVertical: 'center'
  },
  titleStyle: {
    flex: 1,
    width: 200,
    height: 100,
    marginHorizontal: 30,
    marginTop: 40,
    resizeMode: 'contain'
  },
  subTitleStyle: {
    fontFamily: 'avenir',
    fontSize: 20,
    marginTop: 10,
    marginRight: 30,
    alignSelf: 'flex-end'
  },
  SignupBtn: {
    ...Platform.select({
      android: { marginTop: deviceHeight / 2 - deviceWidth / 2 + 100 },
      ios: { marginTop: deviceHeight / 2 - 50 }
    }),
    width: deviceWidth / 2 - 50,
    height: deviceWidth / 2 - 50,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.WHITE,
    borderRadius: deviceWidth / 4 - 25,
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    marginRight: 10,
    alignContent: 'center'
  },
  LoginBtn: {
    ...Platform.select({
      android: { marginTop: deviceHeight / 2 - deviceWidth / 2 + 100 },
      ios: { marginTop: deviceHeight / 2 - 50 }
    }),
    width: deviceWidth / 2 - 50,
    height: deviceWidth / 2 - 50,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: deviceWidth / 4 - 25,
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    marginLeft: 10,
    alignContent: 'center'
  },
  rowTitleStyle: {
    marginTop: 30,
    height: 0
  },
  rowTitleStyle2: {
    ...Platform.select({
      ios: { position: 'absolute' }
    })
  },
  appVerViewStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    ...Platform.select({
      android: { marginTop: deviceHeight * 0.948 },
      ios: { marginTop: deviceHeight * 0.958 }
    })
  },
  appVerTextStyle: {
    color: COLORS.BRIGHT_ORANGE_200,
    fontFamily: 'avenir',
    fontSize: 7
  },
  imageStyle: {
    width: deviceWidth,
    height: deviceWidth * 1712 / 1242
  },
  skipBtnStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: deviceWidth / 2.5,
    height: 40,
    borderRadius: 10
  },
  textStyle: {
    fontFamily: 'avenir',
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontSize: 20,
    padding: 5,
    paddingTop: 9
  }
};
