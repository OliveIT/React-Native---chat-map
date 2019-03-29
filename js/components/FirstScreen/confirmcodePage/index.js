import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput, Platform, StatusBar } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import {
  setUser,
  confirmEmail,
  resetSign,
  setCurrentPage,
  onCloseTermCondition,
  onAcceptTermCondition
} from '../../../actions/user';
import TermCondtion from '../modal/TermCondtion';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import RightButton from '../../commons/RightButton';
import LoadingSpinner from '../../commons/LoadingSpinner';
import { COLORS } from '../../../constants';
import headerStyle from '../../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class confirmcodepage extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
      modalVisible: false
    };
  }
  componentWillMount() {
    this.props.setCurrentPage(2);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  clickAgreeBtn = () => {
    this.props.onCloseTermCondition();
    this.props.onAcceptTermCondition();
    Actions.tabbar();
  };

  clickNextBtn() {
    var data = {
      userId: this.props.user.user.userID,
      code: this.state.code
    };
    this.props.confirmEmail(data);
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={COLORS.TRANSPARENT} barStyle="light-content"/>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={
            <BackButton color={COLORS.WHITE} onPress={() => Actions.pop()}/>
          }
          centerComponent={
            <Title title={'confirmation code'}/>
          }
          rightComponent={
            <RightButton title={'next'} onPress={() => this.clickNextBtn()}/>
          }
          {...headerStyle}
        />

        <Content>
          <TermCondtion />

          <View style={styles.codeInputAreaStyle}>
            <TextInput
              returnKeyType={'go'}
              underlineColorAndroid={COLORS.TRANSPARENT}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="code"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={code => this.setState({ code })}
              style={styles.codeInputStyle}
            />
          </View>
          <Text style={styles.textPlaceholderStyle}>
            please input your 4-digit code above.
          </Text>
          {this.props.isFetching && <LoadingSpinner />}
        </Content>
      </Container>
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

export default connect(mapStateToProps, bindActions)(confirmcodepage);
