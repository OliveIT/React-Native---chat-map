import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes, Platform } from 'react-native';
import Lightbox from 'react-native-lightbox';
import Sound from 'react-native-sound';
import RNFetchBlob from 'react-native-fetch-blob';
import { MediaControls, PLAYER_STATE } from '../../../MediaControl/';
import { COLORS } from '../../../../constants';

function getFilePathExtension(path) {
  return path.match(/\.([^\./\?]+)($|\?)/)[1];
}

export default class MessageAudio extends React.Component {
  constructor(props) {
    super(props);

    this.exitFullScreen = this.exitFullScreen.bind(this);
    this.onFullScreen = this.onFullScreen.bind(this);
    this.onPaused = this.onPaused.bind(this);
    this.onReplay = this.onReplay.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.state = {
      isLoading: true,
      isFullScreen: false,
      playerState: PLAYER_STATE.PAUSED,
      paused: false,
      currentTime: 0,
      duration: 0,
      failed: false
    };
  }

  componentDidMount() {
    var self = this;
    const url = this.props.currentMessage.audio;
    const ext = getFilePathExtension(url);

    RNFetchBlob.config({
      fileCache: true,
      appendExt: ext
    })
      .fetch('GET', url)
      .then(res => {
        self.sound = new Sound(res.path(), undefined, error => {
          if (error) {
            self.setState({
              durationStr: '0:00',
              isLoading: false,
              failed: true
            });
            return;
          }
          // loaded successfully
          var duration = self.sound.getDuration();
          var second = parseInt(duration);
          var mili = parseInt((duration - second) * 100);
          var str = second + ':' + mili;
          self.sound.setVolume(1);
          self.setState({
            durationStr: str,
            duration: duration,
            isLoading: false
          });
        });
      });
  }

  onPaused() {
    this.sound.pause();
    this.setState({
      paused: !this.state.paused,
      playerState: !this.state.paused
        ? PLAYER_STATE.PAUSED
        : PLAYER_STATE.PLAYING
    });
  }

  setCurrentTime(seconds) {
    this.setState({ currentTime: seconds });
  }

  onReplay() {
    this.setState({ playerState: PLAYER_STATE.PLAYING });

    var self = this;
    this.timer = setInterval(() => {
      self.sound.getCurrentTime(seconds => {
        self.setCurrentTime(seconds);
      });
    }, 5);
    var whoosh = this.sound;
    whoosh.play(success => {
      if (success) {
        self.setState({ playerState: PLAYER_STATE.ENDED });
        if (self.timer) {
          clearInterval(self.timer);
          self.setCurrentTime(0);
        }
      } else {
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        self.setState({ playerState: PLAYER_STATE.ENDED });
        if (Platform.OS === 'android') whoosh.reset();
        if (self.timer) clearInterval(self.timer);
      }
    });
  }

  onProgress(data) {}

  onLoad(data) {}

  onLoadStart(data) {}

  onSeek(seek) {}

  onEnd() {}

  onError() {}

  exitFullScreen() {}

  enterFullScreen() {}

  onFullScreen() {}

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <MediaControls
          mainColor={COLORS.TEXT_GREY}
          playerState={this.state.playerState}
          isLoading={this.state.isLoading}
          progress={this.state.currentTime}
          duration={this.state.duration}
          durationStr={this.state.durationStr}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          failed={this.state.failed}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40
  },
  audio: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover'
  },
  audioActive: {
    flex: 1,
    resizeMode: 'contain'
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.BLACK
  }
});

MessageAudio.defaultProps = {
  currentMessage: {
    audio: null
  },
  containerStyle: {},
  audioStyle: {}
};

MessageAudio.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  audioProps: PropTypes.object,
  lightboxProps: PropTypes.object
};
