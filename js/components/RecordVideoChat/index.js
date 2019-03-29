'use strict';
import React, { PureComponent } from 'react';
import { Text, View, Dimensions, Platform, Image, TouchableOpacity, PermissionsAndroid, StatusBar, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { RNCamera } from 'react-native-camera';
import * as Progress from 'react-native-progress';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import PreviewVideo from '../commons/PreviewVideo';
import NbIcon from '../commons/NbIcon';
import { COLORS, ICONS } from '../../constants';

const AnimatedProgressCircle = Animated.createAnimatedComponent(Progress.Circle);
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const MAX_VIDEO_DURATION = 15; // in seconds

class RecordChatVideo extends React.PureComponent {
  recordingProgress = new Animated.Value(0);
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
      },
      isRecording: false,
      isStartRefresh: 0,
      percent: 0,
      isLoading: false,
      isCameraPermission: Platform.OS === 'ios' ? true : false,
    };
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
    await this.requestCameraPermission();
  }

  startRecording = () => {
    this.record();
  };

  stopRecording = () => {
    if (!this.state.isRecording) {
      return;
    }
    if (this.timer) clearInterval(this.timer);
    this.setState({ isRecording: false });
    if (this.camera) this.camera.stopRecording();
    this.recordingProgress.setValue(0);
  };

  record = () => {
    var self = this;
    this.setState({ isRecording: true });
    this.timer = setInterval(() => {
      if (self.state.percent >= 100) {
        self.stopRecording();
        return;
      }
      self.setState({ percent: self.state.percent + 1 });
    }, this.props.duration * 10);

    this.setState({ isStartRefresh: 0 });

    if (this.camera) {
      this.camera
        .recordAsync({ maxDuration: MAX_VIDEO_DURATION, quality: RNCamera.Constants.VideoQuality["720p"] })
        .then(path => {
          self.recordedPath = path.uri;
          self.setState({ isStartRefresh: 1 });
        })
        .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  };

  async requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          ],
          {
            title: 'Vediohead app permission',
            message:
              'Vediohead needs access to your camera ' +
              'so you can share your wonderful moments with everyone.'
          }
        );
        if (granted) this.setState({ isCameraPermission: true });
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        const iosGranted = true;
        if (iosGranted) this.setState({ isCameraPermission: true });
      } catch(e) {
        console.warn(err);
      }
    }
  }

  switchType = () => {
    const { type } = this.state.camera;
    const { back, front } = RNCamera.Constants.Type;

    this.setState({
      camera: {
        ...this.state.camera,
        type: type === front ? back : front
      }
    });
  };

  get typeIcon() {
    const { type } = this.state.camera;
    const { back } = RNCamera.Constants.Type;

    return (
      <NbIcon
        family={'MaterialCommunityIcons'}
        name={type === back ? 'camera-rear' : 'camera-front'}
        style={{
          backgroundColor: COLORS.TRANSPARENT,
          color: COLORS.BRIGHT_ORANGE,
          fontSize: 28
        }}
      />
    );
  }

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  clickRefreshBtn = () => {
    this.setState({
      isStartRefresh: 0,
      percent: 0
    });
    this.recordingProgress.setValue(0);
  };

  clickCheckBtn = () => {
    this.props.onChecked(this.recordedPath);
  };

  get delayButtons() {
    if (this.state.isStartRefresh == 0) {
      return (
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonSpacing}/>

          <TouchableOpacity
            style={styles.captureButton}
            onLongPress={this.startRecording}
            onPressOut={this.stopRecording}
            activeOpacity={1}
          >
            <Progress.Circle
              size={80}
              progress={this.state.percent / 100}
              indeterminate={false}
              color={COLORS.BRIGHT_ORANGE}
              unfilledColor={COLORS.LIGHT_GREY}
              borderWidth={0}
              showsText={true}
            >
              <View style={styles.recordButtonViewStyle}>
                <NbIcon
                  family={'Ionicons'}
                  name={'md-square'}
                  style={{
                    color: COLORS.RED,
                    fontSize: 50
                  }}
                />
              </View>
            </Progress.Circle>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonDelay}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.clickRefreshBtn}
            >
              <View style={styles.borderedButtonFAViewStyle}>
                <FontAwesome5Pro
                  style={styles.borderedButtonFAStyle}
                  name={'poo'}
                  size={44}
                  color={COLORS.REVERT_BROWN}
                  solid
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.clickCheckBtn}
            >
              <View style={styles.borderedButtonFAViewStyle}>
                <FontAwesome5Pro
                  style={styles.borderedButtonFAStyle}
                  name={'smile'}
                  size={44}
                  color={COLORS.UPLOAD_ORANGE}
                  solid
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  componentWillUnmount() {
    this.camera = null;
  }

  render() {
    const {
      camera,
      isRecording,
      isStartRefresh
    } = this.state;
    const { onClose } = this.props;
    const opacity = this.recordingProgress.interpolate({
      inputRange: [0, 0.001, 1],
      outputRange: [1, 0, 0],
    });
    let file = {};
    if (this.recordedPath) {
      file = { uri: this.recordedPath };
    }

    return (
      <View style={styles.squareContainer}>
        {isStartRefresh ? <PreviewVideo file={file}/> :
          <View
           style={{
             backgroundColor: COLORS.BLACK,
             height: deviceHeight,
           }}
          >
            {this.state.isCameraPermission ? (
              <RNCamera
                permissionDialogTitle={'Camera & Microphone required'}
                permissionDialogMessage={'You need to authorize the app if you want to record an awesome vedio'}
                ref={cam => {
                  this.camera = cam;
                }}
                type={camera.type}
                style={styles.preview}
                onFocusChanged={() => {}}
                onZoomChanged={() => {}}
                defaultTouchToFocus
                captureAudio={true}
                mirrorImage={false}
              />
            ) : (
              <View style={styles.preview}/>
            )}

            {!isRecording && (
              <View style={[styles.overlay, styles.topOverlay]}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <NbIcon
                    family={'Ionicons'}
                    name={'ios-close'}
                    style={{
                      color: COLORS.BRIGHT_ORANGE,
                      backgroundColor: COLORS.TRANSPARENT,
                      fontSize: 46,
                      top: -5
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.typeButton}
                  onPress={this.switchType}
                >
                  {this.typeIcon}
                </TouchableOpacity>
              </View>
            )}
          </View>
        }

        {this.delayButtons}
      </View>
    );
  }
}

export default RecordChatVideo;
