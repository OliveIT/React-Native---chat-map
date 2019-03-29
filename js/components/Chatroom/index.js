import React, { Component } from 'react';
import { Text, View, Dimensions, Platform, TouchableOpacity, TextInput, PermissionsAndroid, Modal, ScrollView, StatusBar, Keyboard, Alert } from 'react-native';
import { Container, Content, Button, FooterTab } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import RNThumbnail from 'react-native-thumbnail';
import * as Progress from 'react-native-progress';
import _ from 'lodash';
import moment from 'moment';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import AddNewMemberModal from './AddNewMemberModal';
import MemberCircle from './MemberCircle';
import { GiftedChat } from './ui/';
import RecordChatVideo from '../RecordVideoChat';
import firebase from '../firebase/';
import BackButton from '../commons/BackButton';
import Title from '../commons/Title';
import LoadingSpinner from '../commons/LoadingSpinner';
import NbIcon from '../commons/NbIcon';
import { COLORS, ICONS } from '../../constants';
import { getFilePathExtension } from '../../utils/converter';
import headerStyle from '../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const isIphoneX = Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375;
const headerHeight = Platform.OS === 'ios' ? (isIphoneX ? 60 : 60) : 56;
const database = firebase.database();
const storage = firebase.storage();

const AddNewCircle = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{ justifyContent: 'center' }}
      onPress={onPress}
      activeOpacity={1}
    >
      <View style={styles.noItem}/>
      <View
        style={{
          position: 'absolute',
          backgroundColor: COLORS.TRANSPARENT,
          top: 5,
          left: 15,
          width: 20,
          height: 20
        }}
      >
        <NbIcon
          family={'Ionicons'}
          name={'md-add-circle'}
          style={{ fontSize: 20, color: COLORS.GREEN }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default class ChatRoom extends React.Component {
  static propTypes = {
    channelName: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    isPublic: PropTypes.bool
  };

  static defaultProps = {
    isPublic: true,
    isVideoHead: false
  };

  constructor(props) {
    super(props);

    const { channelName, isPublic } = props;
    let name = `public/channels/${channelName}/messages`;
    if (!isPublic) name = `private/channels/${channelName}/messages`;

    this.ref = database.ref(name);

    this.state = {
      messages: [],
      message_length: 0,
      inputState: false,
      text: '',
      segment: 'chat',
      hasPermission: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      modalVisible: false,
      isLoading: false,
      voiceProgress: 0,
      isRecording: false,
      newMember: false
    };
    this._checkPermission().then(hasPermission => {
      this.setState({ hasPermission: true });

      if (!hasPermission) return;
    });
  }

  componentDidMount() {
    const bgColor = !this.props.isPublic
      ? COLORS.BRIGHT_ORANGE
      : COLORS.DARK_PURPLE;
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(bgColor);
    }
    StatusBar.setBarStyle('light-content', true);
    const self = this;
    setTimeout(() => {
      this.ref.on('child_added', child => {
        this.handleReceive(child.val());
      });
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routes.routeName !== 'chatRoom' && this.props.routes.routeName === 'chatRoom') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }

  handleReceive(message) {
    this.setState({ messages: [message, ...this.state.messages] });
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

  async _record() {
    if (!this.state.hasPermission) {
      alert("can't record, no permission granted!");
      return;
    }
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
      }, 300);
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.hasPermission) {
      alert("can't record, no permission granted!");
      return;
    }
    this.setState({ voiceProgress: 0 });
    try {
      this.duration = (new Date().getTime() - this.startTime) / 1000;

      const filePath = await AudioRecorder.stopRecording();
      if (this.timer) clearInterval(this.timer);
      if (Platform.OS === 'android') {
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', error => {
        if (error) {
          alert('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            // alert('play success');
          } else {
            alert('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: 'microphone permission',
      message:
        'Vediohead needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale
    ).then(result => {
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  onSend() {
    if (this.state.text.trim() !== '')
      this.sendMessage({ text: this.state.text.trim() });
  }

  sendMessage(message, attachment = false) {
    const { user } = this.props;
    const sender = {
      _id: user._id,
      name: user.username,
      avatar: user.photo_url
    };
    if (attachment) {
      this.ref.push({
        isAttachment: true,
        ...message,
        user: sender,
        _id: uuid.v4()
      });
      this.props.actions.pushNotification({
        id: this.props.id,
        message: `${message.type} message received`,
        action: 'message',
        isPublic: this.props.isPublic
      });
      return;
    }
    this.ref.push({
      text: message.text,
      createdAt: new Date(),
      user: sender,
      _id: uuid.v4()
    });
    this.props.actions.pushNotification({
      id: this.props.id,
      message: `${sender.name}: ${message.text}`,
      action: 'message',
      isPublic: this.props.isPublic
    });

    this.setState({ text: '' });
  }

  onChangeText(text) {
    this.setState({ text: text });
  }

  handlePressIn = () => {
    this.setState({ isRecording: true });
    this._record();
  };

  sendAudioMessage(audioUrl, duration) {
    messages = { audio: audioUrl, duration: duration };
    this.sendMessage(messages, true);
  }

  handlePressOut = () => {
    if (!this.state.isRecording) return;

    this.setState({ isRecording: false, isLoading: true });
    this._stop();

    const str = this.state.audioPath.slice(1);
    const time = new Date().getTime();
    const ext = getFilePathExtension(this.state.audioPath);
    const filePath = `/files/${this.props.user.username}_${time}.${ext}`;
    const self = this;
    Keyboard.dismiss();
    storage
      .ref(filePath)
      .putFile(str)
      .then(uploadedFile => {
        self.sendAudioMessage(uploadedFile.downloadUrl, 0.0);
        self.setState({ isLoading: false });
      })
      .catch(err => {
        self.setState({ isLoading: false });
        alert(err.message);
      });
  };

  sendVideoMessage(path) {
    const self = this;
    if (!path) return;
    this.setModalVisible(false);
    this.setState({ isLoading: true });
    RNThumbnail.get(path).then(result => {
      const thumbPath = result.path;
      const time = +new Date();
      const ext = getFilePathExtension(path);
      const ext1 = getFilePathExtension(thumbPath);
      const fileName = `${self.props.user.username}_${time}.${ext}`;
      const filePath = `/videos/${fileName}`;
      firebase
        .storage()
        .ref(filePath)
        .putFile(path, { contentType: `video/${ext}` })
        .then(snapshot => {
          const videoUri = snapshot.downloadUrl;
          const fileName1 = `${self.props.user.username}_${time}.${ext1}`;
          const newFilePath = `/thumbs/${fileName1}`;
          storage
            .ref(newFilePath)
            .putFile(thumbPath, { contentType: `image/${ext1}` })
            .then(uploadedFile => {
              const thumbUri = uploadedFile.downloadUrl;
              message = {
                video: videoUri,
                thumb: thumbUri,
                fileName: fileName
              };
              this.setState({ isLoading: false });
              self.sendMessage(message, true);
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
  }

  get showFooter() {
    const { isRecording, inputState, voiceProgress } = this.state;

    let activeStyle = {};
    if (isRecording) {
      activeStyle = Object.assign({}, styles.activeVoice, {
        backgroundColor: !this.props.isPublic
          ? COLORS.BRIGHT_ORANGE
          : COLORS.DARK_PURPLE
      });
    }

    if (inputState) {
      return (
        <FooterTab
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: !this.props.isPublic
              ? COLORS.BRIGHT_ORANGE
              : COLORS.DARK_PURPLE
          }}
        >
          {!isRecording && (
            <View
              style={{
                height: 52,
                justifyContent: 'center'
              }}
            >
              <TextInput
                underlineColorAndroid={COLORS.TRANSPARENT}
                returnKeyType={'send'}
                autoFocus={true}
                value={this.state.text}
                onChangeText={text => this.onChangeText(text)}
                onSubmitEditing={() => {
                  this.onSend();
                }}
                style={{
                  paddingLeft: 15,
                  fontFamily: 'avenir',
                  fontSize: 14,
                  marginTop: 0,
                  marginLeft: deviceHeight / 30 * 0.5,
                  backgroundColor: COLORS.WHITE,
                  borderRadius: 13.5,
                  width: deviceWidth * 4.6 / 7,
                  ...Platform.select({
                    android: { height: deviceHeight * 0.0582 },
                    ios: { height: deviceHeight * 0.052 }
                  })
                }}
                placeholder="type a message..."
              />
            </View>
          )}

          {isRecording && (
            <View
              style={{
                height: 52,
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
          <View
            style={{
              width: deviceWidth / 7,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              onLongPress={this.handlePressIn}
              onPressOut={this.handlePressOut}
              style={activeStyle}
            >
              <FontAwesome5Pro
                name={'microphone-alt'}
                size={26}
                color={isRecording
                  ? !this.props.isPublic
                    ? COLORS.DARK_RED
                    : COLORS.BRIGHT_RED
                  : COLORS.WHITE
                }
                light
              />
            </TouchableOpacity>
          </View>

          {!isRecording && (
            <View
              style={{
                width: deviceWidth / 7,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <FontAwesome5Pro
                  name={'video'}
                  size={28}
                  color={COLORS.WHITE}
                  solid
                />
              </TouchableOpacity>
            </View>
          )}
        </FooterTab>
      );
    }

    return (
      <FooterTab
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: !this.props.isPublic
            ? COLORS.BRIGHT_ORANGE
            : COLORS.DARK_PURPLE
        }}
      >
        {!isRecording && (
          <Button
            onPress={() => {
              this.setState({ inputState: true });
            }}
          >
            <FontAwesome5Pro
              name={'keyboard'}
              size={28}
              color={COLORS.WHITE}
              light
            />
          </Button>
        )}

        {isRecording && (
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              marginLeft: 20
            }}
          >
            <Progress.Bar
              progress={this.state.voiceProgress / 100}
              width={deviceWidth - 150}
              height={24}
              color={COLORS.WHITE}
            />
          </View>
        )}
        <View>
          <Button
            onLongPress={this.handlePressIn}
            onPressOut={this.handlePressOut}
            style={activeStyle}
          >
            <FontAwesome5Pro
              name={'microphone-alt'}
              size={26}
              color={isRecording
                ? !this.props.isPublic
                  ? COLORS.DARK_RED
                  : COLORS.BRIGHT_RED
                : COLORS.WHITE
              }
              light
            />
          </Button>
        </View>

        {!isRecording && (
          <Button
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <FontAwesome5Pro
              name={'video'}
              size={28}
              color={COLORS.WHITE}
              solid
            />
          </Button>
        )}
      </FooterTab>
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onRemove = userID => {
    const { id, user } = this.props;
    this.props.actions.onRemoveMember(id, userID, user._id === userID);
  };

  render() {
    const { isLoading } = this.state;
    const {
      activeUsers,
      channelName,
      user,
      isPublic,
      publicMemberCount,
      pivateMemberCount,
      isVideoHead,
    } = this.props;

    let additionalHeight = isPublic ? 64 : 150;
    if (Platform.OS === 'android' && !isPublic) additionalHeight -= 1;
    if (Platform.OS === 'ios' && isPublic) additionalHeight -= 4;

    let prettyChannelName = channelName;
    if (channelName.includes('__Vediohead')) {
      prettyChannelName = 'vediohead';
    } else if (channelName.includes('vedio share ')) {
      const numberPattern = /\d+/g;
      if (channelName.match(numberPattern)) {
        const timestamp = channelName.match(numberPattern).join([]);
        if (moment(new Date(timestamp)).isValid())
          prettyChannelName = 'vedio shared with me';
      }
    }

    return (
      <Container style={styles.container}>
        <Header
          backgroundColor={
            !isPublic ? COLORS.BRIGHT_ORANGE : COLORS.DARK_PURPLE
          }
          leftComponent={
            <BackButton
              color={COLORS.WHITE}
              onPress={() => {
                isPublic ? Actions.pop() : Actions.privateView();
              }}
            />
          }
          centerComponent={<Title title={prettyChannelName}/>}
          rightComponent={
            isPublic ? (
              <View style={{ width: deviceWidth / 8 }}>
                <View style={styles.memberCounterViewStyle}>
                  <NbIcon
                    family={'Ionicons'}
                    name={'ios-contacts'}
                    style={{
                      color: COLORS.WHITE,
                      backgroundColor: COLORS.TRANSPARENT,
                      fontSize: 18
                    }}
                  />
                  <Text style={styles.memberCounterTextStyle}>
                    {isPublic ? publicMemberCount : activeUsers.size}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ width: deviceWidth / 8 }}/>
            )
          }
          {...headerStyle}
        />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <RecordChatVideo
            onClose={() => {
              this.setModalVisible(false);
            }}
            onChecked={path => this.sendVideoMessage(path)}
          />
        </Modal>

        <Content
          bounces={false}
          style={{ backgroundColor: COLORS.WHITE, height: deviceHeight }}
        >
          {!isPublic && (
            <ScrollView
              style={{
                width: deviceWidth,
                ...Platform.select({
                  android: { height: 85 },
                  ios: { height: 90 }
                })
              }}
              horizontal
            >
              {activeUsers.map((ac, index) => (
                <MemberCircle
                  key={index}
                  onRemove={() => this.onRemove(ac.get('user_id'))}
                  canRemove={false}
                  isMind={ac.get('user_id') === user._id}
                  avatar={
                    ac.get('photo_url')
                      ? { uri: ac.get('photo_url') }
                      : ICONS.DEFAULT_AVATAR
                  }
                />
              ))}
              {!isVideoHead && (
                <AddNewCircle
                  onPress={() => this.setState({ newMember: true })}
                />
              )}
            </ScrollView>
          )}
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              width: deviceWidth,
              height: deviceHeight - (headerHeight + additionalHeight)
            }}
          >
            <GiftedChat
              messages={this.state.messages}
              user={{
                _id: user._id,
                name: user.username,
                avatar: user.photoUrl !== ''
                  ? user.photoUrl
                  : ICONS.DEFAULT_AVATAR
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: !this.props.isPublic
                ? COLORS.BRIGHT_ORANGE
                : COLORS.DARK_PURPLE,
              width: deviceWidth,
              height: 50
            }}
          >
            {this.showFooter}
          </View>

          {!isPublic && (
            <AddNewMemberModal
              id={this.props.id}
              visible={this.state.newMember}
              data={this.props.searchResult}
              onClose={() => this.setState({ newMember: false })}
              searchFriends={this.props.actions.searchFriends}
              onAddMember={this.props.actions.onAddMember}
            />
          )}
        </Content>

        {isLoading && <LoadingSpinner />}
      </Container>
    );
  }
}
