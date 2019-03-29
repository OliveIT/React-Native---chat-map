import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { ICONS } from '../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class IntroducePage4 extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Image
        style={styles.imageStyle}
        source={ICONS.INTRO_4}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: deviceWidth,
    height: deviceWidth * 1712 / 1242
  }
});

export default IntroducePage4;
