import { Dimensions, Platform } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  textStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 18,
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '600' }
    })
  },
  textStyle1: {
    color: COLORS.BRIGHT_ORANGE_200,
    fontFamily: 'avenir',
    fontSize: 16,
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '500' }
    })
  },
  groupNameSectionStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.025,
    marginBottom: 5
  },
  plusIconTouchStyle: {
    backgroundColor: COLORS.LIGHT_ORANGE,
    borderRadius: deviceWidth / 9,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: deviceWidth / 4.5,
    height: deviceWidth / 4.5
  },
  plusIconTextStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontSize: 70 * deviceHeight / 736,
    marginBottom: 6
  },
  groupNameInputStyle: {
    textAlign: 'center',
    width: deviceWidth * 0.5,
    fontFamily: 'avenir',
    fontSize: 16,
    ...Platform.select({
      ios: { marginBottom: 5 }
    })
  },
  groupNameUnderlineStyle: {
    height: deviceWidth / 13,
    backgroundColor: COLORS.TRANSPARENT,
    borderTopColor: COLORS.LIGHT_ORANGE,
    borderTopWidth: 3,
    ...Platform.select({
      android: { marginTop: -deviceHeight / 60 },
      ios: { marginTop: -deviceHeight / 600 }
    })
  },
  imageStyle: {
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11
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
  rows: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    width: 90,
    flex: 1
  },
  item: {
    backgroundColor: COLORS.GREY,
    flex: 1,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90
  },
  noItem: {
    backgroundColor: COLORS.TRANSPARENT,
    flex: 1,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90
  },
  roomLabel: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: 'avenir'
  },
  noChatLabel: {
    color: COLORS.LIGHT_ORANGE,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    fontFamily: 'avenir',
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '600' }
    })
  },
  avatar: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    ...Platform.select({
      android: { borderRadius: 95 },
      ios: { borderRadius: 45 }
    })
  }
};
