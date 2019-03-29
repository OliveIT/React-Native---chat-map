import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    flex: 1
  },
  headContent: {
    height: 108,
    backgroundColor: COLORS.LIGHT_GREY,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center'
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: 'cover'
  },
  swagImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: 'contain'
  },
  scrollRewardsView: {
    padding: 15
  },
  swagLabel: {
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 14,
    fontFamily: 'avenir',
    textAlign: 'center',
    marginVertical: 10
  },
  swagWarning: {
    color: COLORS.BRIGHT_RED,
    fontSize: 14,
    fontFamily: 'avenir',
    textAlign: 'center',
    top: -10
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginHorizontal: 5,
    ...Platform.select({
      android: { marginBottom: deviceHeight * 0.075 },
      ios: { marginBottom: deviceHeight * 0.06 }
    })
  },
  tncContainer: {
    backgroundColor: 'rgba(64, 64, 64, 0.92)',
    margin: 10,
    marginTop: 50,
    height: deviceHeight - 40,
    borderRadius: 8
  },
  tncTitle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  tncHeading: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 12,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 20
  },
  tncParagraph: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 12,
    marginHorizontal: 20,
    justifyContent: 'space-around',
    textAlign: 'justify'
  },
  rewardProgrammeTermsBox: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderWidth: 1,
    borderRadius: 11,
    height: deviceHeight * 0.09,
    marginHorizontal: deviceWidth / 22,
    marginTop: 15,
    justifyContent: 'center'
  },
  rewardProgrammeTermsText: {
    color: COLORS.BRIGHT_ORANGE,
    backgroundColor: COLORS.TRANSPARENT,
    fontFamily: 'avenir',
    fontSize: 14,
    textAlign: 'center',
    ...Platform.select({
      android: { marginTop: deviceHeight * 0.005 },
      ios: { marginTop: deviceHeight * 0.027 }
    })
  }
}
