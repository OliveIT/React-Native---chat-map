import { COLORS } from '../../constants';

export const CategoryRowData = [
  {
    key: '1',
    categoryName: 'law and order',
    iconName: 'fire',
    iconBackgroundColor: COLORS.DARK_RED,
    iconOnPress: this.clickLawAndOrderOnlyButton,
  },
  {
    key: '2',
    categoryName: 'weather',
    iconName: 'sun-cloud',
    iconBackgroundColor: COLORS.LIGHT_BLUE,
    iconOnPress: this.clickWeatherOnlyButton,
  },
  {
    key: '3',
    categoryName: 'general',
    iconName: 'fire',
    iconBackgroundColor: COLORS.BRIGHT_ORANGE,
    iconOnPress: this.clickGeneralOnlyButton,
  },
  {
    key: '4',
    categoryName: 'events',
    iconName: 'mountain',
    iconBackgroundColor: 'magenta',
    iconOnPress: this.clickEventsOnlyButton,
  },
  {
    key: '5',
    categoryName: 'traffic',
    iconName: 'pig',
    iconBackgroundColor: COLORS.LIGHT_GREEN,
    iconOnPress: this.clickTrafficOnlyButton,
  },
  {
    key: '6',
    categoryName: 'newsworthy',
    iconName: 'fire',
    iconBackgroundColor: COLORS.PURPLE_200,
    iconOnPress: this.clickNewsworthyOnlyButton,
  },
];
