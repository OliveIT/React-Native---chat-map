import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { COLORS } from '../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ChangePassword extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View style={styles.alertsTextstyle}>
          <Text
            style={{
              color: COLORS.BRIGHT_ORANGE,
              fontSize: 20,
              alignSelf: 'center',
              fontWeight: '600',
              fontFamily: 'avenir'
            }}
          >
            change password
          </Text>
        </View>
        <View style={{ backgroundColor: COLORS.WHITE }}>
          <TextInput
            style={styles.usernameInputStyle}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="current password"
            secureTextEntry
            onChangeText={currentPassword => {
              this.props.onFormChange('currentPassword', currentPassword);
            }}
            returnKeyType={'next'}
            underlineColorAndroid={COLORS.TRANSPARENT}
          />
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="new password"
            secureTextEntry
            onChangeText={password => {
              this.props.onFormChange('password', password);
            }}
            returnKeyType={'next'}
            underlineColorAndroid={COLORS.TRANSPARENT}
          />
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="reconfirm"
            secureTextEntry
            onChangeText={passwordConfirmation => {
              this.props.onFormChange(
                'passwordConfirmation',
                passwordConfirmation
              );
            }}
            returnKeyType={'go'}
            underlineColorAndroid={COLORS.TRANSPARENT}
          />
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              flexDirection: 'row',
              alignSelf: 'center',
              marginBottom: deviceWidth * 0.07
            }}
          >
            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                fontSize: 12,
                fontFamily: 'avenir',
                textAlign: 'center'
              }}
            >
              we
              <Text style={{ fontWeight: 'bold' }}> highly </Text>
              recommend that you change your password{'\n'}from time to time
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ChangePassword;
