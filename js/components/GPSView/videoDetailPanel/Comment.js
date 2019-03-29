'use strict';
import React, { PureComponent } from 'react';
import { Text, View, Dimensions, Platform } from 'react-native';
import { Row } from 'native-base';
import PropTypes from 'prop-types';
import CameraRecord from '../modals/CameraModal';
// import VoiceRecord from '../modals/VoiceRecord';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class CommentModal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false
  };

  render() {
    const { onComment } = this.props;
    return (
      <View style={styles.base}>
        <View style={styles.baseBottom}>
          <Text
            style={{
              backgroundColor: COLORS.TRANSPARENT,
              color: COLORS.BRIGHT_ORANGE,
              fontFamily: 'avenir',
              fontSize: deviceHeight * 0.016,
              marginTop: 5,
              textAlign: 'center'
            }}
          >
            comment
          </Text>
          <Row
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
              justifyContent: 'center',
              margin: deviceWidth * 0.01
            }}
          >
            {/*
            <VoiceRecord />
            */}
            <CameraRecord
              user={this.props.user}
              onComment={onComment}
              id={this.props.id}
            />
          </Row>
        </View>
        <View style={styles.baseTop}/>
      </View>
    );
  }
}

const styles = {
  base: {
    position: 'absolute',
    top: deviceHeight * 0.662,
    right: deviceWidth * 0.12
  },
  baseBottom: {
    backgroundColor: COLORS.WHITE,
    width: deviceWidth * 0.28,
    height: deviceWidth * 0.28 * 0.67,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: deviceWidth / 15
  },
  baseTop: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    width: 14,
    height: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.BRIGHT_ORANGE,
    borderRightWidth: 1,
    borderRightColor: COLORS.BRIGHT_ORANGE,
    top: 16,
    right: 4,
    transform: [{ rotate: '45deg' }],
    ...Platform.select({
      android: { marginLeft: -12 },
      ios: { marginRight: -10 }
    })
  }
};

export default CommentModal;
