import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
  Dimensions
} from 'react-native';

const { width: deviceWidth } = Dimensions.get('window');

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import MessageAudio from './MessageAudio';
import MessageVideo from './MessageVideo';
import Time from './Time';

import { isSameUser, isSameDay, warnDeprecated } from './utils';

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  handleBubbleToNext() {
    if (
      isSameUser(this.props.currentMessage, this.props.nextMessage) &&
      isSameDay(this.props.currentMessage, this.props.nextMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToNext,
        this.props.containerToNextStyle[this.props.position]
      ]);
    }
    return null;
  }

  handleBubbleToPrevious() {
    if (
      isSameUser(this.props.currentMessage, this.props.previousMessage) &&
      isSameDay(this.props.currentMessage, this.props.previousMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToPrevious,
        this.props.containerToPreviousStyle[this.props.position]
      ]);
    }
    return null;
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const { containerStyle, wrapperStyle, ...messageTextProps } = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps} />;
    }
    return null;
  }

  renderMessageAudio() {
    if (this.props.currentMessage.audio) {
      const { containerStyle, wrapperStyle, ...messageAudioProps } = this.props;
      if (this.props.renderMessageAudio) {
        return this.props.renderMessageAudio(messageAudioProps);
      }
      return <MessageAudio {...messageAudioProps} />;
    }
    return null;
  }

  renderMessageVideo() {
    if (this.props.currentMessage.video) {
      const { containerStyle, wrapperStyle, ...messageVideoProps } = this.props;
      if (this.props.renderMessageVideo) {
        return this.props.renderMessageVideo(messageVideoProps);
      }
      return <MessageVideo {...messageVideoProps} />;
    }
    return null;
  }

  renderTicks() {
    const { currentMessage } = this.props;
    if (this.props.renderTicks) {
      return this.props.renderTicks(currentMessage);
    }
    if (currentMessage.user._id !== this.props.user._id) {
      return;
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={styles.tickView}>
          {currentMessage.sent && (
            <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>
          )}
          {currentMessage.received && (
            <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>
          )}
        </View>
      );
    }
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return <Time {...timeProps} />;
    }
    return null;
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  renderTriangle(position) {
    let triangleStyles = {
      left: {
        borderColor: 'transparent',
        borderRightColor: 'rgba(0, 0, 0, .2)',
        borderWidth: 8,
        left: -15,
        bottom: 5,
        zIndex: 9
      },
      right: {
        borderColor: 'transparent',
        borderLeftColor: 'rgba(0, 0, 0, .2)',
        borderWidth: 8,
        right: 3,
        bottom: 5,
        zIndex: 9
      }
    };
    return <View style={[styles.triangleCorner, triangleStyles[position]]} />;
  }

  renderInnerTriangle(position) {
    let triangleStyles = {
      left: {
        borderColor: 'transparent',
        borderRightColor: '#fff',
        borderWidth: 6,
        left: -11,
        bottom: 7,
        zIndex: 10
      },
      right: {
        borderColor: 'transparent',
        borderLeftColor: '#fff',
        borderWidth: 6,
        right: 7,
        bottom: 7,
        zIndex: 10
      }
    };
    return <View style={[styles.triangleCorner, triangleStyles[position]]} />;
  }

  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage);
    } else {
      if (this.props.currentMessage.text) {
        const options = ['Copy Text', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions({
          options,
          cancelButtonIndex
        }, buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(this.props.currentMessage.text);
              break;
          }
        });
      }
    }
  }

  render() {
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position]
        ]}
      >
        <View
          style={[
            styles[this.props.position].wrapper,
            this.props.wrapperStyle[this.props.position],
            this.handleBubbleToNext(),
            this.handleBubbleToPrevious()
          ]}
        >
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits="text"
            {...this.props.touchableProps}
          >
            <View>
              {this.renderCustomView()}
              {this.renderMessageImage()}
              {this.renderMessageAudio()}
              {this.renderMessageVideo()}
              {this.renderMessageText()}
              <View
                style={[
                  styles.bottom,
                  this.props.bottomContainerStyle[this.props.position]
                ]}
              >
                {this.renderTime()}
                {this.renderTicks()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.props.position === 'right' ? (
          this.renderTriangle('right')
        ) : (
          this.renderTriangle('left')
        )}
        {this.props.position === 'right' ? (
          this.renderInnerTriangle('right')
        ) : (
          this.renderInnerTriangle('left')
        )}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start'
    },
    wrapper: {
      width: deviceWidth * 0.72,
      borderRadius: 5,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#666'
    },
    containerToNext: {
      borderBottomLeftRadius: 3
    },
    containerToPrevious: {
      borderTopLeftRadius: 3
    }
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end'
    },
    wrapper: {
      width: deviceWidth * 0.72,
      borderRadius: 5,
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#666',
      marginRight: deviceWidth * 0.045,
      minHeight: 20,
      justifyContent: 'flex-end'
    },
    containerToNext: {
      borderBottomRightRadius: 3
    },
    containerToPrevious: {
      borderTopRightRadius: 3
    }
  }),
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  tick: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: '#000'
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10
  },
  triangleCorner: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid'
  }
};

Bubble.contextTypes = {
  actionSheet: PropTypes.func
};

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  position: 'left',
  currentMessage: {
    text: null,
    createdAt: null,
    image: null
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  bottomContainerStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser)
};

Bubble.propTypes = {
  touchableProps: PropTypes.object,
  onLongPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderCustomView: PropTypes.func,
  renderTime: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  bottomContainerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  tickStyle: Text.propTypes.style,
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  //TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func
};
