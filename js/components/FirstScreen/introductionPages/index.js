import React, { PureComponent } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import IntroducePage1 from './page1/index';
import IntroducePage2 from './page2/index';
import IntroducePage3 from './page3/index';
import IntroducePage4 from './page4/index';
import IntroducePage5 from './page5/index';
import IntroducePage6 from './page6/index';
import IntroducePage7 from './page7/index';
import { COLORS } from '../../../constants';

class IntroducePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        dotColor={COLORS.WHITE}
        activeDotColor={COLORS.LIGHT_PURPLE_200}
        activeDotStyle={{
          borderColor: COLORS.WHITE,
          borderWidth: 1
        }}
        autoplay={false}
        autoplayTimeout={3}
      >
        <IntroducePage1 />
        <IntroducePage2 />
        <IntroducePage3 />
        <IntroducePage4 />
        <IntroducePage5 />
        <IntroducePage6 />
        <IntroducePage7 />
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
  }
});

export default IntroducePage;
