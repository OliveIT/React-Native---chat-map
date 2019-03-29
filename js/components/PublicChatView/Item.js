import React, { Component } from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import { Col } from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import MarqueeLabel from '../commons/MarqueeLabel';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const defaultProps = {
  disabled: false
};

const Item = ({ name, disabled, id, onJoinPublicZone }) => {
  return (
    <Col style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.PURPLE,
          justifyContent: 'center',
          width: deviceWidth,
          height: 20,
          marginTop: 30,
          opacity: disabled ? 0.5 : 1,
        }}
        onPress={() => {
          if (!disabled) {
            onJoinPublicZone(name, id);
            Actions.chatRoom({
              id: id,
              channelName: name,
              isPublic: true
            });
          }
        }}
      >
        {name.length > 6 ? (
          <MarqueeLabel
            duration={7000}
            text={name}
            textContainerWidth={deviceWidth / 6}
            textStyle={{
              color: COLORS.WHITE,
              textAlign: 'center',
              backgroundColor: COLORS.TRANSPARENT,
              fontFamily: 'avenir',
              fontSize: 14
            }}
          />
        ) : (
          <Text
            style={{
              color: COLORS.WHITE,
              textAlign: 'center',
              backgroundColor: COLORS.TRANSPARENT,
              fontFamily: 'avenir',
              fontSize: 14,
            }}
          >
            {name}
          </Text>
        )}
      </TouchableOpacity>
    </Col>
  );
};

Item.defaultProps = defaultProps;

export default Item;
