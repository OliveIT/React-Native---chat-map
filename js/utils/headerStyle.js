import { ifIphoneX } from 'react-native-iphone-x-helper';
import { COLORS } from '../constants';

export default {
  outerContainerStyles: {
    borderBottomColor: COLORS.TRANSPARENT,
    ...ifIphoneX({
      paddingHorizontal: 10,
      paddingBottom: 0,
      paddingTop: 54,
    }),
  },
};
