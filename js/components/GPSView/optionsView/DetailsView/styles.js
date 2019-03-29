import { Dimensions, PixelRatio, Platform } from 'react-native';
import { COLORS } from '../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    marginBottom: 0 // previously 51
  },
  alertsTextstyle: {
    height: deviceHeight * 0.09,
    justifyContent: 'center'
  },
  itemStyle: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.TRANSPARENT,
    flexDirection: 'row',
    height: deviceWidth * 0.2,
    alignItems: 'center',
    alignSelf: 'center'
  },
  inputStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.11,
    alignSelf: 'center',
    marginBottom: deviceWidth * 0.04,
    paddingHorizontal: 20,
    fontFamily: 'avenir',
    ...Platform.select({
      android: { fontSize: 4 * PixelRatio.get() },
      ios: { fontSize: 15 }
    })
  },
  dateInputStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.11,
    alignSelf: 'center',
    marginBottom: deviceWidth * 0.04,
    paddingHorizontal: deviceWidth * 0.03
  }
};
