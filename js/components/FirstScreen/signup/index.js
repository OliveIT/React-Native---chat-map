import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { Container, Content, Button, Grid, Col, Row } from 'native-base';
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
import BackButton from '../../commons/BackButton';
import LoadingSpinner from '../../commons/LoadingSpinner';
import NbIcon from '../../commons/NbIcon';
import { setUser, signUp, resetSign, setCurrentPage, checkUserName, loginWithFacebook, loginWithGoogle } from '../../../actions/user';
import config from '../../../config/appConfig';
import { COLORS, ICONS } from '../../../constants';
import headerStyle from '../../../utils/headerStyle';

const { LoginManager, GraphRequest, GraphRequestManager, AccessToken } = FBSDK;

class Signup extends React.Component {
  static propTypes = {
    setUser: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleSpinner: false,
      signup_failed: false,
      email: '',
      username: '',
      password: '',
      name: ''
    };
  }

  componentWillMount() {
    this.props.setCurrentPage(3);
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
    this.props.setUser(name);
  }

  clickSignupButton() {
    if (this.state.email === '') {
      alert('Input your email!');
      return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      alert('Input a valid email!');
      return false;
    }
    if (this.state.password === '') {
      alert('Input your password!');
      return false;
    }
    if (this.state.username === '') {
      alert('Input your username!');
      return false;
    }
    this.setState({ visibleSpinner: true });

    var self = this;

    var data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    self.props.signUp(data);
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Something went wrong.');
    } else {
      this.props.actions.loginWithFacebook(result);
    }
  };

  onGoogleLogin = () => {
    const self = this;
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
          self.getProfile();
        }
      },
      function(error) {}
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

  // showSpinner() {
  //   if (this.state.visibleSpinner) return <LoadingSpinner />;
  //   return null;
  // }

  render() {
    const { checkUserName } = this.props;
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
            <Grid>
              <Row>
                <Image style={styles.titleStyle} source={ICONS.TITLE}/>
              </Row>
              <Row style={{ alignSelf: 'center' }}>
                <Text style={styles.welcomeTextStyle}>
                  one click registration
                </Text>
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
                <Text style={styles.emailLoginTextStyle}>email sign up</Text>
              </Row>
              <Col>
                <TextInput
                  style={styles.emailInputStyle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="email"
                  onChangeText={email => this.setState({ email: email })}
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
                  onChangeText={password =>
                    this.setState({ password: password })
                  }
                  returnKeyType={'next'}
                  underlineColorAndroid={COLORS.TRANSPARENT}
                />
                <TextInput
                  style={styles.emailInputStyle}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="username"
                  onEndEditing={() => {
                    this.props.actions.checkUserName(this.state.username);
                  }}
                  onChangeText={username => {
                    this.setState({ username: username });
                  }}
                  returnKeyType={'go'}
                  underlineColorAndroid={COLORS.TRANSPARENT}
                />
              </Col>

              <Row
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40
                }}
              >
                {!this.state.username == '' ?
                  <View>
                    <Text style={styles.usernameStatusStyle}>
                      {!checkUserName.isFetching && (
                        <FontAwesome5Pro
                          name={checkUserName.isValid ? 'check' : 'times'}
                          style={{
                            marginHorizontal: 5,
                            paddingHorizontal: 5
                          }}
                          size={17}
                          color={checkUserName.isValid ? COLORS.GREEN : COLORS.RED}
                        />
                      )}  username {checkUserName.isValid ? 'available' : 'unavailable'}
                    </Text>
                  </View>
                  :
                  null
                }
              </Row>

              <Row style={{ alignSelf: 'center' }}>
                <Button
                  style={styles.signupBtnStyle}
                  onPress={() => {
                    if (checkUserName.isValid) this.clickSignupButton();
                  }}
                >
                  <View>
                    <Text style={styles.textStyle}>
                      proceed
                    </Text>
                  </View>
                </Button>
              </Row>

              <Row style={{ alignSelf: 'center' }}>
                <Text style={styles.disclaimerStyle}>
                  by proceeding to create your account and use Vediohead, you
                  are agreeing to our Terms of Service. if you do not agree, you
                  cannot use Vediohead. sorry!
                  {'\n'}{'\n'}
                </Text>
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
    setUser: name => dispatch(setUser(name)),
    signUp: data => dispatch(signUp(data)),
    resetSign: () => dispatch(resetSign()),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    actions: bindActionCreators(
      {
        checkUserName,
        loginWithFacebook,
        loginWithGoogle
      },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isFetching: state.user.isFetching,
    checkUserName: state.user.checkUserName
  };
};

export default connect(mapStateToProps, bindActions)(Signup);
