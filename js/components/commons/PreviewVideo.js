'use strict';
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { COLORS } from '../../constants'

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class PreviewVideo extends React.PureComponent {
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'cover',
    paused: false,
    ignoreSilentSwitch: null
  };

  render() {
    const {
      ignoreSilentSwitch,
      muted,
      volume,
      paused,
      rate,
      resizeMode
    } = this.state;
    const { file } = this.props;

    if (file === null) return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            color: COLORS.TEXT_GREY,
            fontFamily: 'avenir',
            textAlign: 'center'
          }}
        >
          Vedio file is missing.
        </Text>
      </View>
    );

    return (
      <View
        style={{
          backgroundColor: COLORS.BLACK,
          height: deviceHeight
        }}
      >
        <TouchableOpacity
          style={styles.preview}
          onPress={() => this.setState({
            paused: !paused
          })}
          activeOpacity={1}
        >
          <Video
            source={{ uri: file.uri }}
            style={{ height: deviceHeight }}
            rate={rate}
            paused={paused}
            volume={volume}
            muted={muted}
            ignoreSilentSwitch={ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            repeat={true}
          />
          {paused && (
            <View style={styles.buttonHandler}>
              <FontAwesome5Pro
                name="play-circle"
                style={{
                  backgroundColor: COLORS.TRANSPARENT
                }}
                size={deviceWidth / 3.9}
                color={COLORS.BRIGHT_ORANGE}
                light
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  preview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center'
  },
  buttonHandler: {
    alignSelf: 'center',
    flex: 1,
    top: deviceHeight * 0.25,
    right: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.TRANSPARENT
  }
};

export default PreviewVideo;
