import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import RNFetchBlob from 'react-native-fetch-blob';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import LoadingSpinner from '../commons/LoadingSpinner';
import { COLORS } from '../../constants';

function getFilePathExtension(path) {
  return path.match(/\.([^\./\?]+)($|\?)/)[1];
}

class PlayVideo extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    uri: PropTypes.string,
    fileName: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'cover',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      path: null,
      visibleSpinner: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.routes) !== JSON.stringify(this.props.routes)) {
      this.setState({
        isPlaying: false,
      });
    }
  }

  componentDidMount() {
    const self = this;
    RNFetchBlob.config({
      fileCache: true,
      appendExt: getFilePathExtension(self.props.uri)
    })
      .fetch('GET', self.props.uri)
      .then(res => {
        const path = res.path();
        self.setState({ path: path, visibleSpinner: false });
      });
  }

  video: Video;

  onLoad = data => {
    this.setState({ duration: data.duration });
  };

  onProgress = data => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true });
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true });
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({ paused: !event.hasAudioFocus });
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  renderRateControl(rate) {
    const isSelected = this.state.rate === rate;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ rate });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' }
          ]}
        >
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = this.state.resizeMode === resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ resizeMode });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' }
          ]}
        >
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  }

  renderVolumeControl(volume) {
    const isSelected = this.state.volume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ volume });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' }
          ]}
        >
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }

  showSpinner() {
    if (this.state.visibleSpinner) return <LoadingSpinner />;
    return null;
  }

  get showVideo() {
    if (this.state.path)
      return (
        <TouchableOpacity
          style={styles.fullScreen}
          activeOpacity={1}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          {this.showSpinner()}
          <Video
            ref={(ref: Video) => {
              this.video = ref;
            }}
            source={{ uri: this.state.path, type: 'mp4' }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>
      );
    return null;
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        {this.showVideo}

        <TouchableOpacity
          onPress={() => this.props.onClose()}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 30,
            height: 30,
            zIndex: 999,
            ...ifIphoneX({
              top: 40
            })
          }}
        >
          <Icon
            name="close"
            style={{
              color: COLORS.WHITE,
              fontSize: 30,
              textAlign: 'center',
              backgroundColor: COLORS.TRANSPARENT
            }}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View
                style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
              />
              <View
                style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controls: {
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden'
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: COLORS.GREY
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: COLORS.BLACK
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: COLORS.WHITE,
    paddingHorizontal: 2,
    lineHeight: 12
  }
});
const mapStateToProps = ({ routes }) => ({
  routes,
});

export default connect(mapStateToProps, null)(PlayVideo);
