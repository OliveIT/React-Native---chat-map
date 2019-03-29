import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <View style={{ alignItems: 'center', justifyContent: 'center'}}>
    {props.image ?
      <Image style={{ width: 35.744681, height: 30 }} source={props.image} />
      :
      <Image style={{ width: 0, height: 0 }} source={props.image} />
    }
  </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
