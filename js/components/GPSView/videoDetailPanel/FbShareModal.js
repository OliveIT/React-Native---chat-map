'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { Row } from 'native-base';
import PropTypes from 'prop-types';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class FbShareModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false
  };

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            position: 'absolute',
            borderWidth: 2,
            borderColor: 'rgba(52, 52, 52, 0.2)',
            alignSelf: 'center',
            marginTop: deviceHeight / 3.2,
            width: deviceWidth / 2,
            height: deviceWidth / 2,
            backgroundColor: COLORS.WHITE,
            borderRadius: 10
          }}
        >
          <Row style={{ alignSelf: 'center' }}>
            <Text
              style={{
                marginTop: deviceWidth / 8,
                fontFamily: 'avenir',
                color: COLORS.BRIGHT_ORANGE,
                fontSize: 18
              }}
            >
              share the vedio
            </Text>
          </Row>
          <Row style={{ alignSelf: 'center' }}>
            <TouchableOpacity>
              <Image
                style={{
                  height: deviceWidth / 8,
                  width: deviceWidth / 8,
                  backgroundColor: COLORS.WHITE
                }}
                source={ICONS.FACEBOOK_ICON}
              />
            </TouchableOpacity>
          </Row>
        </View>

        <View
          style={{
            position: 'absolute',
            top: deviceHeight / 3.46,
            right: deviceWidth / 4.74,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: COLORS.GREY
          }}
        >
          <TouchableOpacity onPress={this.props.onClose}>
            <Image
              style={{
                alignSelf: 'flex-end',
                backgroundColor: COLORS.TRANSPARENT,
                borderRadius: 15,
                borderWidth: 3,
                borderColor: COLORS.WHITE,
                width: 30,
                height: 30
              }}
              source={ICONS.REMOVE_ICON}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default FbShareModal;
