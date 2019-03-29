import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    marginBottom: 0 // previously 51
  },
  logoutTouchStyle: {
    marginTop: 20,
    marginRight: 0,
    marginBottom: -2,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  headerViewStyle: {
    height: deviceHeight * 0.09,
    justifyContent: 'center'
  },
  headerTextStyle: {
    alignSelf: 'center',
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 20,
    fontWeight: '700'
  },
  itemStyle: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    marginBottom: 1,
    height: deviceWidth * 0.12,
    alignItems: 'center'
  },
  itemStyle1: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    height: deviceWidth * 0.18,
    alignItems: 'center'
  },
  snippetTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 11,
    marginHorizontal: deviceWidth * 0.05,
    marginBottom: deviceWidth * 0.05,
    justifyContent: 'space-around',
    textAlign: 'justify'
  },
  spaceFiller: {
    ...Platform.select({
      android: { height: deviceWidth * 0.25 },
      ios: { height: '18%' }
    })
  }
};
