import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, Dimensions, Platform, StyleSheet, TouchableOpacity, View, ViewPropTypes, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Video from 'react-native-video';
import DoubleClick from './DoubleClick';
// import NbIcon from './NbIcon';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const BackgroundImage = ImageBackground || Image; // fall back to Image if RN < 0.46

const styles = StyleSheet.create({
  preloadingPlaceholder: {
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playButton: {
    backgroundColor: COLORS.TRANSPARENT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playArrow: {
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 40
  },
  video: Platform.Version >= 24
    ? {}
    : { backgroundColor: COLORS.BLACK },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 48,
    marginTop: -48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playControl: {
    color: COLORS.WHITE,
    padding: 8
  },
  extraControl: {
    color: COLORS.WHITE,
    padding: 8
  },
  seekBar: {
    alignItems: 'center',
    height: 30,
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginLeft: -10,
    marginRight: -5
  },
  seekBarFullWidth: {
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 0,
    marginTop: -3,
    height: 3
  },
  seekBarProgress: {
    height: 3,
    backgroundColor: '#F00'
  },
  seekBarKnob: {
    width: 20,
    height: 20,
    marginHorizontal: -8,
    marginVertical: -10,
    borderRadius: 10,
    backgroundColor: '#F00',
    transform: [{ scale: 0.8 }],
    zIndex: 1
  },
  seekBarBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 3
  },
  overlayButton: {
    flex: 1
  }
});

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isStarted: props.autoplay,
      isPlaying: props.autoplay,
      width: 200,
      progress: 0,
      isMuted: props.defaultMuted,
      isControlsVisible: !props.hideControlsOnStart,
      duration: 0,
      isSeeking: false,
      isLoading: false
    };

    this.seekBarWidth = 200;
    this.wasPlayingBeforeSeek = props.autoplay;
    this.seekTouchStart = 0;
    this.seekProgressStart = 0;

    this.onLayout = this.onLayout.bind(this);
    this.onStartPress = this.onStartPress.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onPlayPress = this.onPlayPress.bind(this);
    this.onMutePress = this.onMutePress.bind(this);
    this.showControls = this.showControls.bind(this);
    this.onToggleFullScreen = this.onToggleFullScreen.bind(this);
    this.onSeekBarLayout = this.onSeekBarLayout.bind(this);
    this.onSeekGrant = this.onSeekGrant.bind(this);
    this.onSeekRelease = this.onSeekRelease.bind(this);
    this.onSeek = this.onSeek.bind(this);
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.hideControls();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.routes) !== JSON.stringify(this.props.routes)) {
      this.setState({
        isPlaying: false,
      });
    }
  }

  componentWillUnmount() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
      this.controlsTimeout = null;
    }
  }

  onLayout(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({
      width
    });
  }

  onStartPress() {
    if (this.props.onStart) {
      this.props.onStart();
    }

    this.setState(state => ({
      isPlaying: true,
      isStarted: true,
      progress: state.progress === 1 ? 0 : state.progress
    }));

    this.hideControls();
  }

  onProgress(event) {
    if (this.state.isSeeking) {
      return;
    }
    if (this.props.onProgress) {
      this.props.onProgress(event);
    }
    this.setState({
      progress: event.currentTime / (this.props.duration || this.state.duration)
    });
  }

  onEnd(event) {
    if (this.props.onEnd) {
      this.props.onEnd(event);
    }

    if (this.props.endWithThumbnail) {
      this.setState({ isStarted: false });
      this.player.dismissFullscreenPlayer();
    }

    this.setState({ progress: 1 });

    if (!this.props.loop) {
      this.setState({ isPlaying: false }, () => {
        this.player.seek(0);
      });
    } else {
      this.player.seek(0);
    }
  }

  onLoad(event) {
    if (this.props.onLoad) {
      this.props.onLoad(event);
    }

    const { duration } = event;
    this.setState({ duration: duration, isLoading: false });
  }

  onPlayPress() {
    if (this.props.onPlayPress) {
      this.props.onPlayPress();
    }

    this.setState({
      isPlaying: !this.state.isPlaying
    });
    this.showControls();
  }

  onMutePress() {
    this.setState({
      isMuted: !this.state.isMuted
    });
    this.showControls();
  }

  onToggleFullScreen() {
    this.player.presentFullscreenPlayer();
  }

  onSeekBarLayout({ nativeEvent }) {
    const customStyle = this.props.customStyles.seekBar;
    let padding = 0;
    if (customStyle && customStyle.paddingHorizontal) {
      padding = customStyle.paddingHorizontal * 2;
    } else if (customStyle) {
      padding = customStyle.paddingLeft || 0;
      padding += customStyle.paddingRight ? customStyle.paddingRight : 0;
    } else {
      padding = 20;
    }

    this.seekBarWidth = nativeEvent.layout.width - padding;
  }

  onSeekStartResponder() {
    return true;
  }

  onSeekMoveResponder() {
    return true;
  }

  onSeekGrant(e) {
    this.seekTouchStart = e.nativeEvent.pageX;
    this.seekProgressStart = this.state.progress;
    this.wasPlayingBeforeSeek = this.state.isPlaying;
    this.setState({
      isSeeking: true,
      isPlaying: false
    });
  }

  onSeekRelease() {
    this.setState({
      isSeeking: false,
      isPlaying: this.wasPlayingBeforeSeek
    });
    this.showControls();
  }

  onSeek(e) {
    const diff = e.nativeEvent.pageX - this.seekTouchStart;
    const ratio = 100 / this.seekBarWidth;
    const progress = this.seekProgressStart + ratio * diff / 100;

    this.setState({
      progress
    });

    this.player.seek(progress * this.state.duration);
  }

  getSizeStyles() {
    const { videoWidth, videoHeight } = this.props;
    const { width } = this.state;
    const ratio = videoHeight / videoWidth;
    return {
      height: videoHeight,
      width: videoWidth
    };
  }

  hideControls() {
    if (this.props.onHideControls) {
      this.props.onHideControls();
    }

    if (this.props.disableControlsAutoHide) {
      return;
    }

    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
      this.controlsTimeout = null;
    }
    this.controlsTimeout = setTimeout(() => {
      this.setState({ isControlsVisible: false });
    }, this.props.controlsTimeout);
  }

  showControls() {
    if (this.props.onShowControls) {
      this.props.onShowControls();
    }

    this.setState({
      isControlsVisible: true
    });
    this.hideControls();
  }

  seek(t) {
    this.player.seek(t);
  }

  stop() {
    this.setState({
      isPlaying: false,
      progress: 0
    });
    this.seek(0);
    this.showControls();
  }

  pause() {
    this.setState({
      isPlaying: false
    });
    this.showControls();
  }

  resume() {
    this.setState({
      isPlaying: true
    });
    this.showControls();
  }

  renderStartButton() {
    const { customStyles } = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 3,
          // margin: 6,
          width: 60,
          height: 60,
        }}
      >
        <TouchableOpacity
          style={[styles.playButton, customStyles.playButton]}
          onPress={this.onStartPress}
        >
          {this.state.isLoading ? (
            <ActivityIndicator color={COLORS.BRIGHT_ORANGE} size="small"/>
          ) : (
            <FontAwesome5Pro
              name="play-circle"
              style={{
                backgroundColor: COLORS.TRANSPARENT
              }}
              size={60}
              color={COLORS.BRIGHT_ORANGE}
              light
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  onLoadStart = () => {
    this.setState({
      isLoading: true,
      isPlaying: false
    });
  };

  onTogglePlay = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  };

  renderThumbnail() {
    const {
      customStyles,
      style,
      thumbnail,
      ...props
    } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {this.renderStartButton()}
      </View>
    );
  }

  renderSeekBar(fullWidth) {
    const { customStyles, disableSeek } = this.props;
    return (
      <View
        style={[
          styles.seekBar,
          fullWidth ? styles.seekBarFullWidth : {},
          customStyles.seekBar,
          fullWidth ? customStyles.seekBarFullWidth : {}
        ]}
        onLayout={this.onSeekBarLayout}
      >
        <View
          style={
            [styles.seekBarProgress, customStyles.seekBarProgress, {
              flexGrow: this.state.progress
            }]
          }
        />
        {!fullWidth && !disableSeek ? (
          <View
            style={[
              styles.seekBarKnob,
              customStyles.seekBarKnob,
              this.state.isSeeking ? { transform: [{ scale: 1 }] } : {},
              this.state.isSeeking ? customStyles.seekBarKnobSeeking : {}
            ]}
            hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
            onStartShouldSetResponder={this.onSeekStartResponder}
            onMoveShouldSetPanResponder={this.onSeekMoveResponder}
            onResponderGrant={this.onSeekGrant}
            onResponderMove={this.onSeek}
            onResponderRelease={this.onSeekRelease}
            onResponderTerminate={this.onSeekRelease}
          />
        ) : null}
        <View
          style={
            [styles.seekBarBackground, customStyles.seekBarBackground, {
              flexGrow: 1 - this.state.progress
            }]
          }
        />
      </View>
    );
  }

  renderControls() {
    const { customStyles } = this.props;
    return (
      <View style={[styles.controls, customStyles.controls]}>
        <TouchableOpacity onPress={this.onPlayPress} style={[customStyles.controlButton, customStyles.playControl]}>
          {this.state.isLoading ? (
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10
              }}
            >
              <ActivityIndicator color={COLORS.BRIGHT_ORANGE} size="small"/>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  renderVideo() {
    const {
      customStyles,
      fullScreenOnLongPress,
      style,
      video,
      resizeMode,
      pauseOnPress,
      ...props
    } = this.props;

    return (
      <View style={customStyles.videoWrapper}>
        <DoubleClick
          onPress={this.onTogglePlay}
          onClick={this.onToggleFullScreen}
        >
          <Video
            {...props}
            style={[styles.video, this.getSizeStyles(), style, customStyles.video]}
            ref={ref => {
              this.player = ref;
            }}
            muted={this.props.muted || this.state.isMuted}
            paused={!this.state.isPlaying}
            onProgress={this.onProgress}
            onLoadStart={this.onLoadStart}
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            source={video}
            resizeMode={resizeMode}
          />
        </DoubleClick>
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            top: this.props.videoHeight / 2 - 34,
            right: 0,
            bottom: 0,
            left: 0
          }}
        >
          {!this.state.isPlaying || this.state.isControlsVisible
            ? this.renderThumbnail()
            : null
          }
        </View>
      </View>
    );
  }

  renderContent() {
    const { thumbnail, style } = this.props;
    const { isStarted } = this.state;
    return this.renderVideo();
  }

  render() {
    return (
      <View
        style={this.props.customStyles.wrapper}
        onLayout={this.onLayout}
      >
        {this.renderContent()}
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  video: Video.propTypes.source,
  thumbnail: Image.propTypes.source,
  videoWidth: PropTypes.number,
  videoHeight: PropTypes.number,
  duration: PropTypes.number,
  autoplay: PropTypes.bool,
  defaultMuted: PropTypes.bool,
  muted: PropTypes.bool,
  style: ViewPropTypes.style,
  controlsTimeout: PropTypes.number,
  disableControlsAutoHide: PropTypes.bool,
  disableFullscreen: PropTypes.bool,
  loop: PropTypes.bool,
  resizeMode: Video.propTypes.resizeMode,
  hideControlsOnStart: PropTypes.bool,
  endWithThumbnail: PropTypes.bool,
  disableSeek: PropTypes.bool,
  pauseOnPress: PropTypes.bool,
  fullScreenOnLongPress: PropTypes.bool,
  customStyles: PropTypes.shape({
    wrapper: ViewPropTypes.style,
    video: Video.propTypes.style,
    videoWrapper: ViewPropTypes.style,
    controls: ViewPropTypes.style,
    playControl: TouchableOpacity.propTypes.style,
    controlButton: TouchableOpacity.propTypes.style,
    controlIcon: Icon.propTypes.style,
    playIcon: Icon.propTypes.style,
    seekBar: ViewPropTypes.style,
    seekBarFullWidth: ViewPropTypes.style,
    seekBarProgress: ViewPropTypes.style,
    seekBarKnob: ViewPropTypes.style,
    seekBarKnobSeeking: ViewPropTypes.style,
    seekBarBackground: ViewPropTypes.style,
    thumbnail: Image.propTypes.style,
    playButton: TouchableOpacity.propTypes.style,
    playArrow: Icon.propTypes.style
  }),
  onEnd: PropTypes.func,
  onProgress: PropTypes.func,
  onLoad: PropTypes.func,
  onStart: PropTypes.func,
  onPlayPress: PropTypes.func,
  onHideControls: PropTypes.func,
  onShowControls: PropTypes.func
};

VideoPlayer.defaultProps = {
  videoWidth: 1280,
  videoHeight: 720,
  autoplay: false,
  controlsTimeout: 2000,
  loop: false,
  resizeMode: 'cover',
  disableSeek: false,
  pauseOnPress: false,
  fullScreenOnLongPress: false,
  customStyles: {}
};


const mapStateToProps = ({ routes }) => ({
  routes,
});

export default connect(mapStateToProps, null)(VideoPlayer);
