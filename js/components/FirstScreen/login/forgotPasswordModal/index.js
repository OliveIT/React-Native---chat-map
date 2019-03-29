import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, PixelRatio, Platform, Modal, TouchableOpacity } from 'react-native';
import { Container, Content, Row, Col } from 'native-base';
import { connect } from 'react-redux';
import { openDrawer } from '../../../../actions/drawer';
import { notify_stop, update_start } from '../../../../actions/notification';
import { COLORS, ICONS } from '../../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  modal_show() {
    var self = this;
    self.props.notify_stop('SHOW_ForgotPasswordModal');
    self.props.update_start('SHOW_ForgotPasswordEmailModal');
  }

  modal_phone_show() {
    var self = this;
    self.props.notify_stop('SHOW_ForgotPasswordModal');
    self.props.update_start('SHOW_ForgotPasswordPhoneModal');
  }

  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={true}
        onRequestClose={() => {
          this.props.notify_stop('SHOW_ForgotPasswordModal');
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
              <Text style={styles.modalTextStyle}>
                it&apos;s OK. we forget our passwords all the time too! let us know
                how we should reach you with your password.
              </Text>
              <Row>
                <Col style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ marginRight: 5 }}
                    onPress={() => this.modal_show()}
                  >
                    <Image
                      style={styles.BtnStyle}
                      source={ICONS.FORGOT_MAIL}
                    />
                  </TouchableOpacity>
                </Col>
                <Col style={{ alignItems: 'flex-start' }}>
                  <TouchableOpacity
                    style={{ marginLeft: 5 }}
                    onPress={() => this.modal_phone_show()}
                  >
                    <Image
                      style={styles.BtnStyle}
                      source={ICONS.FORGOT_PHONE}
                    />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row style={{ alignSelf: 'center', marginTop: 60 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.notify_stop('SHOW_ForgotPasswordModal');
                  }}
                >
                  <Image
                    style={styles.removeBtnStyle}
                    source={ICONS.REMOVE_ICON_OTH}
                  />
                </TouchableOpacity>
              </Row>
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: deviceWidth,
    height: deviceWidth * 856 / 621
  },
  forgotModalStyle: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    marginTop: deviceHeight / 3,
    height: deviceHeight / (Platform.OS === 'ios' ? 2.3 : 1.82),
    width: deviceWidth / 1.3,
    marginHorizontal: deviceWidth / 8
  },
  modalTextStyle: {
    fontFamily: 'avenir',
    fontSize: 5 * PixelRatio.get(),
    textAlign: 'center',
    margin: 10 * PixelRatio.get(),
    marginTop: 15 * PixelRatio.get()
  },
  BtnStyle: {
    width: 26 * PixelRatio.get(),
    height: 26 * PixelRatio.get()
  },
  removeBtnStyle: {
    width: 13 * PixelRatio.get(),
    height: 13 * PixelRatio.get()
  }
});

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

export default connect(mapStateToProps, bindAction)(ForgotPasswordModal);
