import { Dimensions } from 'react-native';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    flex: 1
  },
  settingsTouchStyle: {
    marginTop: 20,
    marginRight: 0,
    marginBottom: -2,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  accountTabsViewStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY,
    flexDirection: 'row'
  },
  avatarPlaceholderStyle: {
    marginLeft: deviceWidth * 0.09,
    marginVertical: 8,
    flexDirection: 'row',
    width: '30%'
  },
  avatarViewStyle: {
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: deviceWidth / 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarStyle: {
    width: deviceWidth / 4 - 3.6,
    height: deviceWidth / 4 - 3.6,
    borderRadius: deviceWidth / 8,
    justifyContent: 'center'
  },
  avatarEditStyle: {
    width: deviceWidth / 13,
    height: deviceWidth / 13,
    resizeMode: 'contain'
  },
  accountTabStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '60%'
  },
  friendRequest: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  acceptRequest: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.GREEN,
  },
  ignoreRequest: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.RED,
  },
  blockRequest: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.DARK_GREY
  },
  textButton: {
    color: COLORS.WHITE,
    marginVertical: 5,
  },
  waitingApprovalText: {
    fontSize: 10,
  },
};
