'use strict';
import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const HiddenArea = ({ routes }) => {
  return (
    <View style={styles.hiddenArea}>
      <TouchableOpacity
        onPress={() => Actions.swagPanel()}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = {
  hiddenArea: {
    position: 'absolute',
    height: deviceWidth,
    width: deviceWidth / 8,
    backgroundColor: 'transparent',
    right: 0,
    top: deviceHeight / 4
  }
};

export default HiddenArea;
