import React, { Component } from 'react';
import { Modal, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Button, Row, Col } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import { openDrawer } from '../../../../../actions/drawer';
import { notify_stop, update_start } from '../../../../../actions/notification';
import { onForgotPassword } from '../../../../../actions/user';
import { ICONS } from '../../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class forgotPasswordEmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  anothermodalView() {
    this.props.notify_stop('SHOW_ForgotPasswordEmailModal');
    this.props.update_start('SHOW_ForgotPasswordEmailConfirmModal');
  }

  modalView() {
    this.props.notify_stop('SHOW_ForgotPasswordEmailModal');
    this.props.update_start('SHOW_ForgotPasswordModal');
  }

  onForgotPassword = () => {
    const { email } = this.state;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      alert('Email is invalid.');
      return true;
    }

    this.props.actions.onForgotPassword(email);
  };

  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={true}
        onRequestClose={() => {
          this.props.notify_stop('SHOW_ForgotPasswordEmailModal');
        }}
      >
        <Container
          style={{
            backgroundColor: 'rgba(246, 172, 83, 0.93)',
            width: deviceWidth,
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View>
            <View style={styles.forgotModalStyle}>
              <View style={{ alignSelf: 'center' }}>
                <Image
                  style={styles.imageIconStyle}
                  source={ICONS.FORGOT_MAIL}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <Text style={{ fontFamily: 'avenir', fontSize: 15 }}>
                  an email will be sent to:
                </Text>
              </View>
              <Col>
                <TextInput
                  style={styles.forgotemailInputStyle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="email"
                  onChangeText={email => this.setState({ email })}
                  returnKeyType={'send'}
                  underlineColorAndroid={'transparent'}
                />
              </Col>
              <Row
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  height: 40
                }}
              >
                <Button
                  success
                  style={{
                    height: 30,
                    width: deviceWidth / 2.5,
                    justifyContent: 'center'
                  }}
                  onPress={this.onForgotPassword}
                >
                  <Text
                    style={{
                      fontFamily: 'avenir',
                      color: 'white'
                    }}
                  >
                    proceed
                  </Text>
                </Button>
              </Row>
              <Row
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                  marginBottom: 20,
                  height: 40
                }}
              >
                <Button
                  danger
                  style={{
                    height: 30,
                    width: deviceWidth / 2.5,
                    justifyContent: 'center'
                  }}
                  onPress={() => this.modalView()}
                >
                  <Text
                    style={{
                      fontFamily: 'avenir',
                      color: 'white'
                    }}
                  >
                    cancel
                  </Text>
                </Button>
              </Row>
            </View>
          </View>
        </Container>
      </Modal>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    update_start: notify => dispatch(update_start(notify)),
    notify_stop: notify => dispatch(notify_stop(notify)),
    actions: bindActionCreators({ onForgotPassword }, dispatch)
  };
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps, bindAction)(forgotPasswordEmailModal);
