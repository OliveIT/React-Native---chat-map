import React, { PureComponent } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TermsAndCondition from './TermsAndCondition';
import {
  setUser,
  confirmEmail,
  resetSign,
  setCurrentPage,
  onCloseTermCondition,
  onAcceptTermCondition
} from '../../../actions/user';
import { resetToken } from '../../../utils/auth';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class TermCondtion extends React.PureComponent {
  clickAgreeBtn = () => {
    this.props.onCloseTermCondition();
    this.props.onAcceptTermCondition();
    Actions.tabbar();
  };

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.props.showTermCondition}
        onRequestClose={() => {
          this.props.onCloseTermCondition();
        }}
      >
        <Container
          style={{
            backgroundColor: 'rgba(64, 64, 64, 0.92)',
            marginHorizontal: 10,
            marginTop: 90,
            marginBottom: 10,
            height: deviceHeight - 40,
            borderRadius: 8
          }}
        >
          <Content>
            <TermsAndCondition onAgree={this.clickAgreeBtn}/>
          </Content>
        </Container>
        <View
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 54,
            right: 2,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            borderRadius: 15,
            borderWidth: 3,
            borderColor: COLORS.WHITE
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.onCloseTermCondition();
              resetToken();
              Actions.signup();
            }}
          >
            <Image
              style={{
                alignSelf: 'flex-end',
                width: 25,
                height: 25
              }}
              source={ICONS.REMOVE_ICON}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

function bindActions(dispatch) {
  return {
    confirmEmail: data => dispatch(confirmEmail(data)),
    resetSign: () => dispatch(resetSign()),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    onCloseTermCondition: () => dispatch(onCloseTermCondition()),
    onAcceptTermCondition: () => dispatch(onAcceptTermCondition())
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isFetching: state.user.isFetching,
    showTermCondition: state.user.showTermCondition
  };
};

export default connect(mapStateToProps, bindActions)(TermCondtion);
