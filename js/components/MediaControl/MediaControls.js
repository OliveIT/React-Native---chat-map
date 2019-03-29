import React, { PureComponent } from 'react';
import { Text, View, Platform, TouchableOpacity, ActivityIndicator, Animated, UIManager } from 'react-native';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './MediaControlsStyles';
import Utils from './Utils';
import { PLAYER_STATE } from './Constants';
import { COLORS } from '../../constants';

class MediaControls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dragging = this.dragging.bind(this);
    this.seekVideo = this.seekVideo.bind(this);
    this.state = {
      opacity: new Animated.Value(1),
      isVisible: true
    };
  }

  componentDidMount() {
    // TODO remove when android supports animations
    if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillReceiveProps(nextProps) {}

  getPlayerStateIcon(playerState) {
    switch (playerState) {
      case PLAYER_STATE.PAUSED:
        return 'play-circle';
      case PLAYER_STATE.PLAYING:
        return 'pause-circle';
      case PLAYER_STATE.ENDED:
        return 'play-circle';
    }
  }

  pressAction() {
    if (
      !this.props.failed &&
      !this.props.isLoading &&
      (this.props.playerState === PLAYER_STATE.ENDED ||
        this.props.playerState === PLAYER_STATE.PAUSED)
    )
      this.props.onReplay();
  }

  setPlayerControls(playerState) {
    let icon = this.getPlayerStateIcon(playerState);

    return (
      <FontAwesome5Pro
        name={icon}
        style={{
          backgroundColor: COLORS.TRANSPARENT
        }}
        size={22}
        color={COLORS.TEXT_GREY}
        solid
      />
    );
  }

  setLoadingView() {
    return (
      <ActivityIndicator color={COLORS.BRIGHT_ORANGE} size="small"/>
    );
  }

  dragging() {
    if (this.props.playerState === PLAYER_STATE.PAUSED) return;
    this.props.onPaused();
  }

  seekVideo(value) {
    this.props.onSeek(value);
    this.props.onPaused();
  }

  renderControls() {
    // this let us block the controls
    if (!this.state.isVisible) return null;
    return (
      <TouchableOpacity
        style={[styles.controlsRow, styles.progressContainer]}
        onPress={() => this.pressAction()}
      >
        <View>
          {this.props.isLoading ? (
            this.setLoadingView()
          ) : (
            this.setPlayerControls(this.props.playerState)
          )}
        </View>
        <View style={{ flex: 1, width: 100 }}>
          <Slider
            style={styles.progressSlider}
            onValueChange={this.dragging}
            maximumValue={this.props.duration}
            value={Math.floor(this.props.progress)}
            trackStyle={styles.track}
            thumbStyle={[
              styles.thumb, {
                borderColor: this.props.mainColor
              }
            ]}
            minimumTrackTintColor={this.props.mainColor}
          />
        </View>
        <View>
          <Text style={{ color: this.props.failed ? COLORS.RED : COLORS.BLACK }}>
            {this.props.failed ? 'error' : this.props.durationStr}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderControls()}
      </View>
    );
  }
}

MediaControls.propTypes = {
  toolbar: PropTypes.node,
  mainColor: PropTypes.string,
  isLoading: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  progress: PropTypes.number,
  duration: PropTypes.number,
  playerState: PropTypes.number,
  onFullScreen: PropTypes.func,
  onPaused: PropTypes.func,
  onReplay: PropTypes.func,
  onSeek: PropTypes.func,
  durationStr: PropTypes.string,
  failed: PropTypes.bool
};

MediaControls.defaultProps = {
  mainColor: 'rgba(12, 83, 175, 0.9)',
  failed: false
};

export default MediaControls;
