'use strict';
import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants';

const propTypes = {
  // title: PropTypes.string.isRequired, // when enabled, this 'Warning: Failed prop type' appears
  title: PropTypes.string,
  color: PropTypes.string
};
const defaultProps = {
  color: COLORS.WHITE
};
const Title = ({ title, color }) => (
  <Text
    style={{
      color: color,
      fontFamily: 'avenir',
      fontSize: 20,
      marginTop: 26,
      justifyContent: 'center',
      textAlign: 'center'
    }}
    numberOfLines={1}
  >
    {title}
  </Text>
);

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
