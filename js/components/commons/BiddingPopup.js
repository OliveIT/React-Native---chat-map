'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, ICONS } from '../../constants';
import { scale, moderateScale, verticalScale } from '../../utils/scaling';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  isValid: PropTypes.bool
};

const defaultProps = {
  visible: false,
  isValid: true
};

const BiddingPopup = ({ onClose, visible, onPress, isValid }) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          width: deviceWidth,
          height: deviceHeight,
          backgroundColor: 'rgba(255, 255, 255, .5)',
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            width: moderateScale(180),
            height: moderateScale(180),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.BRIGHT_ORANGE,
            padding: scale(15),
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              backgroundColor: COLORS.TRANSPARENT,
              fontFamily: 'avenir',
              color: COLORS.BRIGHT_ORANGE,
              textAlign: 'center'
            }}
          >
            {isValid
              ? 'are you sure you want to put all your tokens into this bid?'
              : 'sorry, you don’t have sufficient tokens to bid for this right now'}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={{
              padding: 10,
              backgroundColor: COLORS.BRIGHT_ORANGE,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
            }}
          >
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: 14,
                fontFamily: 'avenir'
              }}
            >
              {isValid ? 'very sure!' : 'ok'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            ...Platform.select({
              android: {
                top: deviceHeight * 0.344,
                right: deviceWidth * 0.206
              },
              ios: {
                top: deviceHeight * 0.344,
                right: deviceWidth * 0.226
              }
            }),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            borderRadius: 15,
            borderWidth: 3,
            borderColor: COLORS.WHITE
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <Image
              style={{
                alignSelf: 'flex-end',
                width: 25,
                height: 25
              }}
              source={ICONS.REMOVE_ICON}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

BiddingPopup.propTypes = propTypes;
BiddingPopup.defaultProps = defaultProps;

export default BiddingPopup;
