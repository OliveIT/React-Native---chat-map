import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes, Dimensions } from 'react-native';
import VideoPlayer from '../../../commons/VideoPlayer';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class MessageVideo extends React.Component {
  render() {
    return (
      <View style={styles.videoContainer}>
        <VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: this.props.currentMessage.thumb }}
          video={{ uri: this.props.currentMessage.video }}
          videoWidth={deviceWidth * 0.72 - 10}
          videoHeight={deviceWidth * 0.72 - 10}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    width: deviceWidth * 0.72,
    height: deviceWidth * 0.72,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  videoProps: PropTypes.object
};
