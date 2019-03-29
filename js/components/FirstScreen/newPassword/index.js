import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Title,
  Header
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { onResetPassword } from '../../../actions/user';
import LoadingSpinner from '../../commons/LoadingSpinner';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class confirmcodepage extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onResetPassword = () => {
    const { password, passwordConfirmation } = this.state;
    if (password === passwordConfirmation) {
      this.props.actions.onResetPassword(
        password,
        passwordConfirmation,
        this.props.token
      );
    } else {
      Alert.alert('password mismatch', 'password inputs do not match.');
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: COLORS.BRIGHT_ORANGE }}>
          <Title
            style={{
              fontFamily: 'avenir',
              fontSize: 23,
              color: COLORS.WHITE,
              marginTop: 10
            }}
          >
            new password
          </Title>
        </Header>

        <Content>
          <Item
            style={{
              alignItems: 'center',
              marginHorizontal: 60,
              marginTop: 50
            }}
          >
            <Input
              style={{
                height: 40,
                textAlign: 'center',
                fontFamily: 'avenir'
              }}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="new password"
              secureTextEntry
              onChangeText={password => {
                this.setState({ password });
              }}
            />
          </Item>
          <Item
            style={{
              alignItems: 'center',
              marginHorizontal: 60
            }}
          >
            <Input
              style={{
                height: 40,
                textAlign: 'center',
                fontFamily: 'avenir'
              }}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="reconfirm password"
              secureTextEntry
              onChangeText={passwordConfirmation => {
                this.setState({ passwordConfirmation });
              }}
            />
          </Item>
          <View style={{ marginTop: 50 }}>
            <Button
              style={styles.signupBtnStyle}
              onPress={this.onResetPassword}
            >
              <Text style={styles.textStyle1}>update</Text>
            </Button>
          </View>
          {this.props.isFetching && <LoadingSpinner />}
        </Content>
      </Container>
    );
  }
}

const styles = {
  navbarStyle: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    height: 50,
    width: deviceWidth
  },
  codeInputstyle: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    marginTop: 10,
    marginHorizontal: 30,
    fontFamily: 'avenir',
    fontSize: 15,
    height: 30,
    paddingLeft: 10
  },
  textStyle: {
    textAlign: 'center',
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 15
  },
  textStyle1: {
    fontFamily: 'avenir',
    fontSize: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    color: COLORS.WHITE
  },
  signupBtnStyle: {
    width: deviceWidth / 2,
    alignSelf: 'center',
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 5,
    marginTop: 15 * PixelRatio.get(),
    height: 15 * PixelRatio.get(),
    justifyContent: 'center'
  }
};

function bindActions(dispatch) {
  return {
    actions: bindActionCreators({ onResetPassword }, dispatch)
  };
}

const mapStateToProps = state => {
  return {
    token: state.user.user.token,
    isFetching: state.user.isFetching
  };
};

export default connect(mapStateToProps, bindActions)(confirmcodepage);
