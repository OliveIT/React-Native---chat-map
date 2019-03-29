import React, { Component } from 'react';
import { Modal, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Content, Button, Row, Col } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import { openDrawer } from '../../../../../actions/drawer';
import { notify_stop, update_start } from '../../../../../actions/notification';
import { onConfirmResetPasswordCode } from '../../../../../actions/user';
import { ICONS } from '../../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class forgotPasswordEmailConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  modalView() {
    this.props.notify_stop('SHOW_ForgotPasswordEmailConfirmModal');
  }

  onConfirmCode = () => {
    const { code } = this.state;
    const { userId } = this.props;
    if (code.length > 3)
      this.props.actions.onConfirmResetPasswordCode(userId, code, true);
  };
  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={true}
        onRequestClose={() => {
          this.props.notify_stop('SHOW_ForgotPasswordEmailConfirmModal');
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
                  confirmation code:
                </Text>
              </View>
              <Col>
                <TextInput
                  style={styles.forgotemailInputStyle}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="code"
                  onChangeText={code => this.setState({ code })}
                  returnKeyType={'go'}
                  underlineColorAndroid={'transparent'}
                />
              </Col>
              <Row
                style={{
                  alignSelf: 'center',
                  marginTop: 35
                }}
              >
                <Button
                  success
                  style={{
                    height: 30,
                    width: deviceWidth / 2.5,
                    justifyContent: 'center'
                  }}
                  onPress={this.onConfirmCode}
                >
                  <Text
                    style={{
                      fontFamily: 'avenir',
                      color: 'white'
                    }}
                  >
                    confirm
                  </Text>
                </Button>
              </Row>
              <Row
                style={{
                  alignSelf: 'center',
                  marginBottom: 25,
                  height: 40
                }}
              >
                <TouchableOpacity
                  style={{ borderBottomWidth: 1.0, borderBottomColor: '#53585f' }}
                  onPress={() => this.modalView()}
                >
                  <Text style={styles.backBtnTextStyle}>
                    back to login screen
                  </Text>
                </TouchableOpacity>
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
    actions: bindActionCreators({ onConfirmResetPasswordCode }, dispatch)
  };
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification,
  userId: state.user.userId
});

export default connect(mapStateToProps, bindAction)(
  forgotPasswordEmailConfirmModal
);
