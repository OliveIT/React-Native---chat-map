import { Platform, Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  headerAreaStyle1: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 0
  },
  textAreaStyle2: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 0
  },
  listAreaStyle: {
    alignItems: 'center',
    margin: 20,
    justifyContent: 'space-between'
  },
  listAreaStyle2: {
    height: deviceHeight * 0.36,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 70
  },
  headerStyle: {
    color: COLORS.PURPLE,
    fontFamily: 'avenir',
    fontSize: 18,
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '600' }
    })
  },
  textStyle1: {
    color: COLORS.GREY,
    fontFamily: 'avenir',
    ...Platform.select({
      android: { fontSize: 16, fontWeight: 'normal' },
      ios: { fontSize: 17, fontWeight: '400' }
    }),
    textAlign: 'center',
    marginVertical: deviceWidth / 8
  },
  textStyle2: {
    color: COLORS.GREY,
    fontFamily: 'avenir',
    ...Platform.select({
      android: { fontSize: 14, fontWeight: 'normal' },
      ios: { fontSize: 15, fontWeight: '400' }
    }),
    textAlign: 'center'
  },
  textInputStyle: {
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    marginTop: 20,
    marginHorizontal: 30,
    height: 40,
    textAlign: 'center',
    ...Platform.select({
      android: { width: deviceWidth - 100 },
      ios: { width: deviceWidth * 0.854 }
    })
  },
  filterIconStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  filterIconColStyle: {
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
