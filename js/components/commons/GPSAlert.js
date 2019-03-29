'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import GPSState from 'react-native-gps-state';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class GPSAlert extends Component {
  state = {
    visible: false
  };

  componentWillMount() {
    GPSState.addListener(status => {
      switch (status) {
        case GPSState.NOT_DETERMINED:
          this.setState({ visible: true });
          break;

        case GPSState.RESTRICTED:
          this.setState({ visible: true });
          break;

        case GPSState.DENIED:
          // GPSState.requestAuthorization();
          // alert("It's a shame that you do not allowed us to use location :(");
          this.setState({ visible: true });
          break;

        case GPSState.AUTHORIZED_ALWAYS:
          this.setState({ visible: false });
          break;

        case GPSState.AUTHORIZED_WHENINUSE:
          this.setState({ visible: false });
          break;
      }
    });
  }

  componentDidMount() {
    this.requestPermission(true);
  }

  requestPermission = (firstLoad = false) => {
    if (firstLoad) return;

    if (Platform.OS === 'ios') {
      GPSState.openSettings();
      return;
    }
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(data => {
        this.setState({ visible: false }, () => {
          GPSState.requestAuthorization();
        });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  componentWillUnmount() {
    GPSState.removeListener();
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal
        animationType={'fade'}
        visible={visible}
        onRequestClose={() => {}}
        transparent
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(84, 70, 69, 0.18)'
          }}
        >
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLORS.WHITE,
              borderColor: 'rgba(52, 52, 52, 0.2)',
              borderRadius: 10,
              borderWidth: 2,
              alignSelf: 'center',
              width: deviceWidth / 2,
              height: deviceWidth / 2,
              padding: 15,
              marginTop: deviceHeight / 3.2
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'contain'
                }}
                source={ICONS.PRIVATE_PIN}
              />
            </View>

            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                fontFamily: 'avenir',
                fontSize: 14,
                marginTop: 15,
                textAlign: 'center'
              }}
            >
              vediohead only works when your GPS is enabled
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.BRIGHT_ORANGE,
                borderRadius: 5,
                padding: 5,
                marginTop: 5
              }}
              onPress={this.requestPermission}
            >
              <Text
                style={{
                  color: COLORS.WHITE,
                  fontFamily: 'avenir',
                  fontSize: 14,
                  textAlign: 'center'
                }}
              >
                turn on gps
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default GPSAlert;
