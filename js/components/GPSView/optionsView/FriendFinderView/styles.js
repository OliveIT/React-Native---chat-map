import { Dimensions, PixelRatio } from 'react-native';
import { COLORS } from '../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    marginBottom: 0, // previously 51
  },
  sectionHeaderViewStyle: {
    height: deviceHeight * 0.09,
    justifyContent: 'center',
  },
  sectionHeaderTextStyle: {
    alignSelf: 'center',
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 20,
    fontWeight: '600',
  },
  iconStyle: {
    height: deviceWidth * 0.15,
    width: deviceWidth * 0.15,
    marginBottom: deviceWidth * 0.1,
  },
  inputStyle: {
    alignSelf: 'center',
    fontFamily: 'avenir',
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.11,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0.7,
    borderRadius: 10,
    marginBottom: deviceWidth * 0.07,
    paddingHorizontal: 16,
  },
  textStyle1: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: deviceWidth * 0.1,
    marginTop: deviceWidth * 0.07,
    marginBottom: deviceWidth * 0.1,
  },
  textStyle2: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: deviceWidth * 0.1,
    marginTop: deviceWidth * 0.07,
    marginBottom: deviceWidth * 0.05,
  },
  textInput: {
    fontFamily: 'avenir',
    fontSize: 15,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 10,
    height: 12 * PixelRatio.get(),
    paddingLeft: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 5,
    width: deviceWidth / 1.5,
  },
  avatar: {
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: deviceWidth / 5,
    flex: 1,
  },
  rows: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  noItem: {
    margin: 10,
    backgroundColor: COLORS.TRANSPARENT,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  }
};
