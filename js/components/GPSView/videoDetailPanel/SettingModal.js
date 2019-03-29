'use strict';
import React, { PureComponent } from 'react';
import { Text, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class SettingModal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false,
    canReport: true
  };

  clickReportInappropriate = () => {
    this.props.onClose();
    Actions.contentReporting({ id: this.props.id });
  };

  render() {
    const { canReport } = this.props;
    return (
      <View style={styles.settingBase}>
        <View style={styles.settingBaseBottom}>
          <Button
            style={[
              styles.spamButtonStyle,
              { opacity: canReport ? 1 : 0.4 }
            ]}
            onPress={() => {
              if (canReport) this.props.onReport(this.props.id, 'spam');
            }}
          >
            <Text style={styles.reportingTextStyle}>
              spam
            </Text>
          </Button>
          <Button
            style={[
              styles.inappropriateButtonStyle,
              { opacity: canReport ? 1 : 0.4 }
            ]}
            onPress={this.clickReportInappropriate}
          >
            <Text style={styles.reportingTextStyle}>
              inappropriate
            </Text>
          </Button>
        </View>
        <View style={styles.settingBaseTop}/>
      </View>
    );
  }
}

const styles = {
  settingBase: {
    position: 'absolute',
    alignSelf: 'center',
    top: 70,
    right: -10,
  },
  settingBaseBottom: {
    backgroundColor: COLORS.WHITE,
    height: deviceWidth * 0.3 * 0.67,
    width: deviceWidth * 0.34,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: deviceWidth / 50
  },
  settingBaseTop: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    width: 14,
    height: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.BRIGHT_ORANGE,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.BRIGHT_ORANGE,
    top: -7,
    transform: [{ rotate: '45deg' }],
    ...Platform.select({
      android: { marginLeft: deviceWidth / 3.82 },
      ios: { marginLeft: deviceWidth / 3.54 }
    })
  },
  spamButtonStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    width: deviceWidth * 0.34 * 0.9,
    height: deviceWidth * 0.3 * 0.2,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: deviceWidth / 35
  },
  inappropriateButtonStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    width: deviceWidth * 0.34 * 0.9,
    height: deviceWidth * 0.3 * 0.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  reportingTextStyle: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: deviceHeight * 0.016,
    textAlign: 'center'
  }
};

export default SettingModal;
