import React, { Component } from 'react';
import { Modal, Text, View, PixelRatio, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Content, Icon, Row } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { openDrawer } from '../../../../../actions/drawer';
import { notify_stop, update_start } from '../../../../../actions/notification';
import { ICONS } from '../../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class forgotPasswordPhoneConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  modalView() {
    this.props.notify_stop('SHOW_ForgotPasswordPhoneConfirmModal');
  }

  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={true}
        onRequestClose={() => {
          this.props.notify_stop(
            'SHOW_ForgotPasswordPhoneConfirmModal'
          );
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
                  a message has been sent to:
                </Text>
              </Row>
              <Row style={{ alignSelf: 'center' }}>
                <View
                  style={{
                    borderColor: '#f39019',
                    borderWidth: 1,
                    borderRadius: 6 * PixelRatio.get(),
                    width: deviceWidth / 1.3 - 60,
                    height: 12 * PixelRatio.get(),
                    marginHorizontal: 30,
                    marginTop: -20
                  }}
                >
                  <Text style={styles.emailTextStyle}>
                    65047489
                  </Text>
                </View>
              </Row>
              <Row
                style={{
                  alignSelf: 'center',
                  marginBottom: 40,
                  height: 40
                }}
              >
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 1.0,
                    borderBottomColor: '#53585f'
                  }}
                  onPress={() => this.modalView()}
                >
                  <Text style={styles.backBtnTextStyle}>
                    back to login screen
                  </Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps, bindAction)(
  forgotPasswordPhoneConfirmModal
);
