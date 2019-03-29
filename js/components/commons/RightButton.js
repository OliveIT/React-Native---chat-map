'use strict';
import React from 'react';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const RightButton = ({ onPress, title }) => (
  <View style={{ width: deviceWidth / 8 }}>
    <TouchableOpacity
      onPress={ onPress }
    >
      <Text style={{ alignSelf: 'flex-end', color: COLORS.WHITE, fontFamily: 'avenir', fontSize: 20 }}>
        {title}
      </Text>
    </TouchableOpacity>
  </View>
);

export default RightButton;
