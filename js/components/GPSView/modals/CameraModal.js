'use strict';
import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Modal, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RNThumbnail from 'react-native-thumbnail';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import RecordChatVideo from '../../RecordVideoChat';
import firebase from '../../firebase/';
import { getFilePathExtension } from '../../../utils/converter';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const storage = firebase.storage();

class CameraRecord extends React.Component {
  state = {
    visible: false,
    isLoading: false
  };

  onClose = () => {
    const isVisible = !this.state.visible;
    StatusBar.setHidden(isVisible);
    this.setState({ visible: isVisible });
  };

  onRecordSuccess = path => {
    if (!path) return;
    const self = this;
    const { username } = this.props.user;
    this.onClose();
    this.setState({ isLoading: true });

    RNThumbnail.get(path).then(result => {
      const thumbPath = result.path;
      const time = +new Date();
      const ext = getFilePathExtension(path);
      const ext1 = getFilePathExtension(thumbPath);
      const fileName = `${_.snakeCase(username)}_${time}.${ext}`;
      const filePath = `/videos/comments/${fileName}`;

      storage
        .ref(filePath)
        .putFile(path, { contentType: `video/${ext}` })
        .then(snapshot => {
          const fileName1 = `${_.snakeCase(username)}_${time}.${ext1}`;
          const newFilePath = `/thumbs/comments/${fileName1}`;

          storage
            .ref(newFilePath)
            .putFile(thumbPath, { contentType: `image/${ext1}` })
            .then(uploadedFile => {
              const message = {
                video: snapshot.downloadUrl,
                thumb: uploadedFile.downloadUrl,
                fileName: fileName
              };
              self.sendMessage(message);
            })
            .catch(err => {
              alert(err.message);
            });
        })
        .catch(error => {
          alert(error.message);
        });
    });
  };

  sendMessage = message => {
    this.props.onComment(this.props.id, message, false);
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.onClose();
    }, 500);
  };

  render() {
    const { visible } = this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          borderColor: COLORS.BRIGHT_ORANGE,
          borderRadius: 36,
          borderWidth: 1,
          marginHorizontal: 28
        }}
      >
        <TouchableOpacity onPress={this.onClose}>
          <FontAwesome5Pro
            name="video-plus"
            style={{
              backgroundColor: COLORS.TRANSPARENT,
              margin: 6,
              left: 5,
              width: 36
            }}
            size={24}
            color={COLORS.BRIGHT_ORANGE}
            light
          />
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visible}
          onRequestClose={this.onClose}
        >
          <RecordChatVideo
            duration={15}
            onClose={this.onClose}
            onChecked={this.onRecordSuccess}
          />
        </Modal>
      </View>
    );
  }
}

export default CameraRecord;
