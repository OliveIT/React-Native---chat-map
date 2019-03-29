import React, { Component } from 'react';
import { Modal, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Content, Button, Row } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { openDrawer } from '../../../../../actions/drawer';
import { notify_stop, update_start } from '../../../../../actions/notification';
import { ICONS } from '../../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class forgotPasswordPhoneModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  anothermodalView() {
    this.props.notify_stop('SHOW_ForgotPasswordPhoneModal');
    this.props.update_start('SHOW_ForgotPasswordPhoneConfirmModal');
  }

  modalView() {
    this.props.notify_stop('SHOW_ForgotPasswordPhoneModal');
    this.props.update_start('SHOW_ForgotPasswordModal');
  }

  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={true}
        onRequestClose={() => {
            this.props.notify_stop('SHOW_ForgotPasswordPhoneModal');
        }}
      >
        <Container
          style={{
            backgroundColor: 'rgba(246, 172, 83, 0.93)',
            width: deviceWidth,
            height: deviceHeight
          }}
        >
          <Content>
            <View style={styles.forgotModalStyle}>
              <Row style={{ alignSelf: 'center' }}>
                <Image
                  style={styles.imageIconStyle}
                  source={ICONS.FORGOT_PHONE}
                />
              </Row>
              <Row style={{ alignSelf: 'center', marginTop: 100 }}>
                <Text
                  style={{
                    fontFamily: 'avenir',
                    fontSize: 15
                  }}
                >
                  a message will be sent to:
                </Text>
              </Row>
              <Row>
                <TextInput
                  style={styles.forgotemailInputStyle}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="phone number"
                  onChangeText={fee => this.setState({ fee })}
                  returnKeyType={'send'}
                  underlineColorAndroid={'transparent'}
                />
              </Row>
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
                    width: deviceWidth / 2.5,
                    height: 30,
                    justifyContent: 'center'
                  }}
                  onPress={() => this.anothermodalView()}
                >
                  <Text style={{ fontFamily: 'avenir' }}>
                    {' '}
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
                    width: deviceWidth / 2.5,
                    height: 30,
                    justifyContent: 'center'
                  }}
                  onPress={() => this.modalView()}
                >
                  <Text style={{ fontFamily: 'avenir' }}>
                    {' '}
                    cancel{' '}
                  </Text>
                </Button>
              </Row>
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    update_start: notify => dispatch(update_start(notify)),
    notify_stop: notify => dispatch(notify_stop(notify))
  };
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps, bindAction)(forgotPasswordPhoneModal);
