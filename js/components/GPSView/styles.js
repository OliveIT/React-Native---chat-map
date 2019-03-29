import { Dimensions, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  pinStyle: {
    width: deviceWidth / 12,
    height: deviceWidth / 12 * 1.34
  },
  avatarStickStyle: {
    position: 'absolute',
    top: deviceHeight * 0.064,
    left: deviceWidth * 0.05,
    zIndex: 10
  },
  myImageStyle: {
    borderRadius: deviceHeight * 0.05,
    width: deviceHeight * 0.1,
    height: deviceHeight * 0.1
  },
  stickStyle: {
    backgroundColor: 'rgba(10,10,10,0.6)',
    width: deviceWidth,
    height: deviceHeight * 0.07,
    position: 'absolute',
    top: deviceHeight * 0.08,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  otherImageStyle: {
    width: deviceHeight * 0.06,
    height: deviceHeight * 0.06,
    borderRadius: deviceHeight * 0.03
  },
  rewardInactiveCircleStyle: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: deviceHeight * 0.06,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceHeight * 0.06,
    height: deviceHeight * 0.06
  },
  rewardActiveCircleStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: deviceHeight * 0.06,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceHeight * 0.06,
    height: deviceHeight * 0.06,
  },
  rewardImageStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    width: deviceHeight * 0.04,
    height: deviceHeight * 0.04,
    resizeMode: 'contain'
  },
  biggerAvatar: {
    borderRadius: deviceHeight * 0.04,
    width: deviceHeight * 0.08,
    height: deviceHeight * 0.08
  },
  scrollViewContainer: {
    paddingVertical: 0
  },
  scrollViewStyle: {
    backgroundColor: COLORS.WHITE,
    borderColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    position: 'absolute',
    width: deviceWidth / 1.2,
    height: deviceHeight * 0.085
  },
  candidateStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: { marginRight: 20 },
      ios: { marginRight: 14 }
    }),
    marginVertical: 0,
    paddingVertical: 0
  },
  purpleCountStyle: {
    backgroundColor: COLORS.PURPLE_200,
    borderColor: COLORS.WHITE,
    borderRadius: deviceHeight * 0.0175,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -deviceHeight * 0.015,
    width: deviceHeight * 0.035,
    height: deviceHeight * 0.035
  },
  orangeCountStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderColor: COLORS.WHITE,
    borderRadius: deviceHeight * 0.0175,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -deviceHeight * 0.015,
    width: deviceHeight * 0.035,
    height: deviceHeight * 0.035
  },
  redCountStyle: {
    backgroundColor: COLORS.BRIGHT_RED,
    borderColor: COLORS.WHITE,
    borderRadius: deviceHeight * 0.0175,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -deviceHeight * 0.015,
    width: deviceHeight * 0.035,
    height: deviceHeight * 0.035
  },
  blueCountStyle: {
    backgroundColor: COLORS.INCOMING_BLUE,
    borderColor: COLORS.WHITE,
    borderRadius: deviceHeight * 0.0175,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -deviceHeight * 0.015,
    width: deviceHeight * 0.035,
    height: deviceHeight * 0.035
  },
  commentNotifViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: -deviceHeight * 0.023,
    width: 33,
    height: 30
  },
  purpleBubbleStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.PURPLE_200,
    fontSize: 26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  purpleBubbleStyle2: {
    backgroundColor: COLORS.TRANSPARENT,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: 30,
    height: 26
  },
  orangeBubbleStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  orangeBubbleStyle2: {
    backgroundColor: COLORS.TRANSPARENT,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: 30,
    height: 26
  },
  notifCountStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 13,
    fontWeight: '700'
  },
  active_avatarStyle: {
    margin: 10,
    backgroundColor: COLORS.TRANSPARENT,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center'
  },
  active_avatarStyle_public: {
    margin: 10,
    backgroundColor: COLORS.PURPLE_200,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center'
  },
  publicStyle: {
    backgroundColor: COLORS.PURPLE_200,
    borderRadius: deviceHeight * 0.03,
    width: deviceHeight * 0.06,
    height: deviceHeight * 0.06
  },
  privateStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: deviceHeight * 0.03,
    width: deviceHeight * 0.06,
    height: deviceHeight * 0.06
  },
  imageStyle: {
    borderRadius: deviceWidth / 11,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5
  },
  publicBackColor: {
    backgroundColor: COLORS.PURPLE
  },
  privateBackColor: {
    backgroundColor: COLORS.TRANSPARENT
  },
  pinStickStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    width: deviceWidth,
    height: deviceHeight
  },
  privateContainerStyle: {
    backgroundColor: COLORS.WHITE,
    borderColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: deviceHeight / 4.5,
    width: deviceWidth / 1.2,
    height: deviceHeight / 1.6
  },
  publicContainerStyle: {
    backgroundColor: COLORS.PURPLE,
    borderColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: deviceHeight / 4.5,
    width: deviceWidth / 1.2,
    height: deviceHeight / 1.6
  },
  privateTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 20,
    textAlign: 'center',
    marginTop: deviceHeight / 20
  },
  publicTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 20,
    textAlign: 'center',
    marginTop: deviceHeight / 20
  },
  rows: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5
  },
  markerContainer: {
    width: deviceWidth / 1.45,
    height: 70,
    justifyContent: 'center'
  },
  pinContainer: {
    backgroundColor: COLORS.WHITE,
    width: deviceWidth / 1.5,
    height: 40
  }
};
