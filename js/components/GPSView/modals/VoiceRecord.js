'use strict';
import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class VoiceRecord extends Component {
  static defaultProps = {
    duration: 30
  };
  state = {
    isRecording: false,
    isVoiceModal: false,
    voiceProgress: 0,
    visible: false
  };

  handlePressIn = () => {
    this.setState({ isRecording: true, visible: true });
    this._record();
  };

  handlePressOut = () => {
    if (!this.state.isRecording) {
      return;
    }
    this.setState({ isRecording: false, visible: false });
    this._stop();
  };

  async _record() {
    this.startTime = new Date().getTime();
    // const filePath = await AudioRecorder.startRecording();
    this.timer = setInterval(() => {
      if (this.state.voiceProgress >= 100) {
        this._stop();
        return;
      }
      this.setState({ voiceProgress: this.state.voiceProgress + 1 });
    }, this.props.duration * 10);
  }

  async _stop() {
    this.setState({ voiceProgress: 0, visible: false });
    // this.duration = (new Date().getTime() - this.startTime) / 1000;
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { likeCount, data } = this.props;
    const { voiceProgress, visible } = this.state;

    return (
      <View>
        <TouchableOpacity
          onLongPress={this.handlePressIn}
          onPressOut={this.handlePressOut}
        >
          <Image
            style={{
              width: deviceWidth * 0.11,
              height: deviceWidth * 0.11,
              margin: deviceWidth / 100
            }}
            source={ICONS.AUDIO_ICON}
          />
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={visible}
          onRequestClose={this.closeModal}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              margin: 10,
              marginTop: 10,
              height: 150,
              justifyContent: 'center',
              flex: 1
            }}
          >
            <View
              style={{
                height: 80,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Progress.Bar
                progress={voiceProgress / 100}
                width={deviceWidth - 100}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  metricsTextStyle: {
    color: 'black',
    fontFamily: 'avenir'
  }
};

export default VoiceRecord;
