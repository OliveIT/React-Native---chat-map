import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Dimensions, Alert, Platform, StatusBar } from 'react-native';
import { Container, Content, Button, Grid, Row, Col } from 'native-base';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import FBSDK from 'react-native-fbsdk';
import GoogleSignIn from 'react-native-google-sign-in';
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import styles from './styles';
import { setUser, logIn, resetSign, setCurrentPage, loginWithFacebook, loginWithGoogle } from '../../../actions/user';
import BackButton from '../../commons/BackButton';
import LoadingSpinner from '../../commons/LoadingSpinner';
import { notify_stop, update_start } from '../../../actions/notification';
import ForgotPasswordModal from './forgotPasswordModal/index';
import ForgotPasswordEmailModal from './forgotPasswordModal/forgotPasswordEmailModal/index';
import ForgotPasswordEmailConfirmModal from './forgotPasswordModal/forgotPasswordEmailConfirmModal/index';
import ForgotPasswordPhoneModal from './forgotPasswordModal/forgotPasswordPhoneModal/index';
import ForgotPasswordPhoneConfirmModal from './forgotPasswordModal/forgotPasswordPhoneConfirmModal/index';
import TermCondtion from '../modal/TermCondtion';
import { COLORS, ICONS } from '../../../constants';
import headerStyle from '../../../utils/headerStyle';

const { LoginManager, GraphRequest, GraphRequestManager, AccessToken } = FBSDK;
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class Login extends React.Component {
  static propTypes = {
    setUser: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleSpinner: false,
      login_failed: false,
      email: '',
      password: '',
      name: ''
    };
  }

  componentWillMount() {
    this.props.setCurrentPage(1);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.WHITE);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }

  setUser(name) {
    // this.props.setUser(name);
  }

  clickLoginBtn = () => {
    if (this.state.email === '') {
      alert('Input your email!');
      return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      alert('Input valid email!');
      return false;
    }
    if (this.state.password === '') {
      alert('Input your password!');
      return false;
    }
    var self = this;
    var data = {
      email: self.state.email,
      password: self.state.password
    };
    self.props.login(data);
  };

  // showSpinner() {
  //   if (this.state.visibleSpinner) return <LoadingSpinner />;
  //   return null;
  // }

  setSpinnerVisible(visible) {
    this.setState({ visibleSpinner: visible });
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Something went wrong.');
    } else {
      this.props.actions.loginWithFacebook(result);
    }
  };

  onFbLogin = () => {
    const self = this;
    AccessToken.getCurrentAccessToken().then(data => {
      if (data) {
        self.getProfile();
      } else {
        self.facebookLogin();
      }
    });
  };

  facebookLogin() {
    const self = this;
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
        } else {
          self.onFbLogin();
        }
      },
      function(error) {
        alert('Something went wrong.');
      }
    );
  }

  getProfile() {
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name,id,gender'
          }
        }
      },
      this._responseInfoCallback
    );
    // Start the graph request
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  onGoogleLogin = () => {
    this.googleLoginAsync();
  };

  async googleLoginAsync() {
    await GoogleSignIn.configure({
      iosClientId:
        'com.googleusercontent.apps.1051464930028-l19g0g3ohodqumtpa713ie25n1g48vmc',
      scopes: ['openid', 'email', 'profile'],
      shouldFetchBasicProfile: true
    });
    const user = await GoogleSignIn.signInPromise();

    if (user) this.props.actions.loginWithGoogle(user);
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content"/>
        <View style={styles.container}>
          <Header
            backgroundColor={COLORS.WHITE}
            leftComponent={<BackButton onPress={() => Actions.firstScreen()}/>}
            {...headerStyle}
          />

          <Content>
            <TermCondtion />
            {this.props.notification.notification.indexOf(
              'SHOW_ForgotPasswordEmailModal'
            ) > -1 && <ForgotPasswordEmailModal />}
            {this.props.notification.notification.indexOf(
              'SHOW_ForgotPasswordEmailConfirmModal'
            ) > -1 && <ForgotPasswordEmailConfirmModal />}
            <Grid>
              <Row>
                <Image style={styles.titleStyle} source={ICONS.TITLE}/>
              </Row>
              <Row style={{ alignSelf: 'center' }}>
                <Text style={styles.welcomeTextStyle}>welcome back!</Text>
              </Row>
              <Row style={{ alignSelf: 'center' }}>
                <Col>
                  <Row style={{ alignSelf: 'center' }}>
                    <TouchableOpacity onPress={this.onGoogleLogin}>
                      <View
                        style={{
                          backgroundColor: COLORS.BRIGHT_ORANGE,
                          borderRadius: 5,
                          width: 44,
                          height: 44,
                          marginTop: 18,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesome5Pro
                          name="google"
                          style={{
                            padding: 2
                          }}
                          size={34}
                          color={COLORS.WHITE}
                        />
                      </View>
                    </TouchableOpacity>
                  </Row>
                </Col>
                <Col>
                  <Row style={{ alignSelf: 'center' }}>
                    <TouchableOpacity onPress={this.onFbLogin}>
                      <View
                        style={{
                          backgroundColor: COLORS.BRIGHT_ORANGE,
                          borderRadius: 5,
                          width: 44,
                          height: 44,
                          marginTop: 18,
                          flexDirection: 'row',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <FontAwesome5Pro
                          name="facebook-f"
                          style={{
                            paddingTop: 10,
                            paddingRight: 6
                          }}
                          size={34}
                          color={COLORS.WHITE}
                        />
                      </View>
                    </TouchableOpacity>
                  </Row>
                </Col>
                <Col>
                  <Row style={{ alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.phonesignup()}>
                      <View
                        style={{
                          backgroundColor: COLORS.BRIGHT_ORANGE,
                          borderRadius: 5,
                          width: 44,
                          height: 44,
                          marginTop: 18,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesome5Pro
                          name="mobile-android"
                          style={{
                            padding: 2
                          }}
                          size={36}
                          color={COLORS.WHITE}
                          light
                        />
                      </View>
                    </TouchableOpacity>
                  </Row>
                </Col>
              </Row>
              <Row style={{ alignSelf: 'center' }}>
                <Text style={styles.emailLoginTextStyle}>email log in</Text>
              </Row>
              <Col>
                <TextInput
                  style={styles.emailInputStyle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="email"
                  onChangeText={email => this.setState({ email })}
                  returnKeyType={'next'}
                  underlineColorAndroid={COLORS.TRANSPARENT}
                />
                <TextInput
                  style={styles.passwordInputStyle}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="password"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  returnKeyType={'go'}
                  underlineColorAndroid={COLORS.TRANSPARENT}
                />
              </Col>
              <Row style={{ alignSelf: 'center' }}>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 1.0,
                    borderBottomColor: COLORS.TEXT_GREY,
                    marginTop: 30
                  }}
                  onPress={() => {
                    this.props.update_start('SHOW_ForgotPasswordEmailModal');
                  }}
                >
                  <Text style={styles.forgotPasswordTextStyle}>
                    forgot password?
                  </Text>
                </TouchableOpacity>
              </Row>
              <Row style={{ alignSelf: 'center' }}>
                <Button
                  style={styles.loginBtnStyle}
                  onPress={this.clickLoginBtn}
                >
                  <Text style={styles.textStyle}>login</Text>
                </Button>
              </Row>
              <Row>
                <View style={{ ...Platform.select({ android: { marginVertical: 44 } }) }}/>
              </Row>
            </Grid>
          </Content>
        </View>
        {this.props.isFetching && <LoadingSpinner />}
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    update_start: notify => dispatch(update_start(notify)),
    notify_stop: notify => dispatch(notify_stop(notify)),
    login: data => dispatch(logIn(data)),
    resetSign: () => dispatch(resetSign()),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    actions: bindActionCreators(
      { loginWithFacebook, loginWithGoogle },
      dispatch
    )
  };
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification,
  isFetching: state.user.isFetching
});

export default connect(mapStateToProps, bindActions)(Login);
