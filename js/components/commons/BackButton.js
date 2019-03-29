'use strict';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
};
const defaultProps = {
  color: COLORS.BRIGHT_ORANGE
};
const BackButton = ({ onPress, color, focused }) => (
  <TouchableOpacity
    style={{ width: deviceWidth / 8, zIndex: 20 }}
    onPress={onPress}
    activeOpacity={1}
  >
    <FontAwesome5Pro
      name="chevron-circle-left"
      style={{
        alignSelf: 'flex-start',
        color: color,
        marginTop: 25
      }}
      size={25}
      color={focused ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
      light={focused ? false : true}
    />
  </TouchableOpacity>
);

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
