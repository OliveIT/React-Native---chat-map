'use strict';
import React, { PureComponent } from 'react';
import { View, StatusBar, Dimensions, Platform, Modal, PermissionsAndroid, Keyboard } from 'react-native';
import { FooterTab, Button } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import _ from 'lodash';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import RNThumbnail from 'react-native-thumbnail';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import firebase from '../../firebase/';
import { GiftedChat } from '../../Chatroom/ui';
import RecordChatVideo from '../../RecordVideoChat';
import LoadingSpinner from '../../commons/LoadingSpinner';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import NbIcon from '../../commons/NbIcon';
import { getFilePathExtension } from '../../../utils/converter';
import { COLORS, ICONS } from '../../../constants';
import headerStyle from '../../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const isIphoneX =
  Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375;
const headerHeight = Platform.OS === 'ios' ? (isIphoneX ? 60 : 60) : 56;
const storage = firebase.storage();

class Comment extends React.PureComponent {
  state = {
    comments: [],
    isVideoComment: false,
    isRecording: false,
    isVoiceModal: false,
    voiceProgress: 0,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac'
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.BRIGHT_ORANGE);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('light-content');
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('light-content');
  }

  handlePressIn = async () => {
    this.setState({ isRecording: true });
    await this._record();
  };

  handlePressOut = async () => {
    if (!this.state.isRecording) return;

    const { username } = this.props.user;

    this.setState({ isRecording: false, isLoading: true });
    await this._stop();

    const str = this.state.audioPath.slice(1);
    console.log({ str });
    const filePath = `/files/${_.snakeCase(username)}_${+new Date()}.aac`;
    const self = this;

    Keyboard.dismiss();
    storage
      .ref(filePath)
      .putFile(str)
      .then(uploadedFile => {
        self.sendAudioMessage(uploadedFile.downloadUrl || uploadedFile.downloadURL, 0.0);
        self.setState({ isLoading: false });
      })
      .catch(err => {
        self.setState({ isLoading: false });
        alert(err.message);
      });
  };

  async _record() {
    this.prepareRecordingPath(this.state.audioPath);
    const self = this;
    try {
      this.startTime = new Date().getTime();
      const filePath = await AudioRecorder.startRecording();
      this.timer = setInterval(() => {
        if (self.state.voiceProgress >= 100) {
          self._stop();
          return;
        }
        self.setState({ voiceProgress: self.state.voiceProgress + 1 });
      }, 150);
    } catch (error) {
      console.error(error);
    }
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High', // Low, High
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    });
  }

  async _stop() {
    this.setState({ voiceProgress: 0 });
    try {
      this.duration = (new Date().getTime() - this.startTime) / 1000;

      const filePath = await AudioRecorder.stopRecording();
      if (this.timer) clearInterval(this.timer);
      return filePath;
    } catch (error) {}
  }

  sendAudioMessage(audioUrl, duration) {
    const messages = { audio: audioUrl, duration: duration };

    this.sendMessage(messages, true);
  }

  sendMessage(message, isAudio = true) {
    const { data } = this.props;
    this.props.actions.onComment(data.get('id'), message, isAudio);
  }

  sendVideoMessage = path => {
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
                video: snapshot.downloadUrl || snapshot.downloadURL,
                thumb: uploadedFile.downloadUrl || uploadedFile.downloadURL,
                fileName: fileName
              };
              this.setState({ isLoading: false });
              self.sendMessage(message, false);
            })
            .catch(err => {
              this.setState({ isLoading: false });
              alert(err.message);
            });
        })
        .catch(error => {
          this.setState({ isLoading: false });
          alert(error.message);
        });
    });
  };

  handleBackButtonPress = () => {
    Actions.pop();
    StatusBar.setHidden(true);
  };

  onClose = () => {
    const isVisible = !this.state.isVideoComment;
    StatusBar.setHidden(isVisible);
    this.setState({ isVideoComment: isVisible });
  };

  render() {
    const {
      data,
      isPublic,
      user
    } = this.props;
    const {
      isVideoComment,
      voiceProgress,
      isLoading,
      isVoiceModal,
      isRecording
    } = this.state;

    let additionalHeight = Platform.OS === 'ios' ? 59 : 64;
    if (Platform.OS === 'android' && !isPublic) additionalHeight -= 1;

    let activeStyle = {
      width: deviceWidth / 2
    };
    if (isRecording) {
      activeStyle = Object.assign({}, styles.activeVoice, {
        backgroundColor: !isPublic
          ? COLORS.BRIGHT_ORANGE
          : COLORS.DARK_PURPLE
      });
    }
    const comments = data
      .get('commentsData')
      .toJS()
      .map(item => {
        item['_id'] = item.Id || item._id;
        item.user['_id'] = item.user.Id || item.user._id;
        return item;
      });

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={
            <BackButton
              color={COLORS.WHITE}
              onPress={this.handleBackButtonPress}
            />
          }
          centerComponent={<Title title={'comments'}/>}
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />

        <View>
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              width: deviceWidth,
              height: deviceHeight - (headerHeight + additionalHeight)
            }}
          >
            <GiftedChat
              messages={comments}
              user={{
                _id: user._id,
                name: user.username,
                avatar:
                  user.photoUrl !== ''
                    ? user.photoUrl
                    : ICONS.DEFAULT_AVATAR,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: COLORS.BRIGHT_ORANGE,
              width: deviceWidth,
              height: 50
            }}
          >
            <FooterTab style={{ backgroundColor: COLORS.BRIGHT_ORANGE }}>
              {isRecording && (
                <View
                  style={{
                    height: 44,
                    justifyContent: 'center',
                    marginLeft: 20
                  }}
                >
                  <Progress.Bar
                    progress={voiceProgress / 100}
                    width={deviceWidth - 150}
                    height={24}
                    color={COLORS.WHITE}
                  />
                </View>
              )}
              <View>
                <Button
                  onPressIn={this.handlePressIn}
                  onPressOut={this.handlePressOut}
                  style={activeStyle}
                >
                  <FontAwesome5Pro
                    name="microphone-alt"
                    size={26}
                    color={isRecording
                      ? !isPublic
                        ? COLORS.DARK_RED
                        : COLORS.BRIGHT_RED
                      : COLORS.WHITE
                    }
                    light
                  />
                </Button>
              </View>
              {!isRecording && (
                <Button onPress={this.onClose}>
                  <FontAwesome5Pro
                    name="video"
                    size={28}
                    color={COLORS.WHITE}
                    solid
                  />
                </Button>
              )}
            </FooterTab>
          </View>

          <Modal
            animationType={'slide'}
            transparent={true}
            visible={isVoiceModal}
            onRequestClose={() => {
              this.setState({ isVoiceModal: false });
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.TRANSPARENT,
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

          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.isVideoComment}
            onRequestClose={this.onClose}
          >
            <RecordChatVideo
              onClose={this.onClose}
              onChecked={this.sendVideoMessage}
            />
          </Modal>
        </View>

        {isLoading && <LoadingSpinner />}
      </View>
    );
  }
}

export default Comment;
