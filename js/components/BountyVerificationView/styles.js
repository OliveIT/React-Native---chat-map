import { Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default {
  container: {
    flex: 1,
  },
  entryLeftColIconStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  entryCenterColTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 14,
  },
  entryFingerPointerStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
  },
  entryBountySum: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 14,
  },
  entrySurveyTextStyle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  entryCenterColRowStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 1,
    marginLeft: 8,
    marginRight: 6,
    width: '90%',
  },
  entryRightColViewStyle: {
    flex: 1,
    marginVertical: 5,
  },
};
