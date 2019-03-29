import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Video from 'react-native-video';
import styles from './styles';
import { COLORS } from '../../../constants';

class VideoPlayer extends Component {
  static propTypes = {
    onClose: PropTypes.func
  };

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: true,
    path: null,
    visibleSpinner: true
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }

  onLoad(data) {
    // console.log('on load');
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.routes) !== JSON.stringify(this.props.routes)) {
      this.setState({
        paused: true,
      });
    }
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    } else {
      return 0;
    }
  }

  renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.onClose()}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 20,
            height: 30,
            zIndex: 999,
            backgroundColor: COLORS.TRANSPARENT
          }}
        >
          <Icon name="close" style={{ color: COLORS.WHITE, fontSize: 30 }}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            this.setState({ paused: !this.state.paused });
          }}
        >
          <Video
            ref={(ref: Video) => {
              this.video = ref;
            }}
            source={{ uri: this.props.url }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            repeat={true}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.progress}>
            <View
              style={{
                flex: flexCompleted,
                height: 5,
                backgroundColor: COLORS.GREY
              }}
            />
            <View
              style={{
                flex: flexRemaining,
                height: 5,
                backgroundColor: COLORS.BLACK
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return this.renderCustomSkin();
  }
}

const mapStateToProps = ({ routes }) => ({
  routes,
});

export default connect(mapStateToProps, null)(VideoPlayer);
