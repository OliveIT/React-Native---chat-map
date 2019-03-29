import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Container, Content, Grid, Row, Col, Footer } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import IntroducePage from './introductionPages';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class FirstScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  clickSignUp = () => {
    Actions.signup();
  };

  clickLogIn = () => {
    Actions.login();
  };

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View
            style={{
              width: deviceWidth,
              height: deviceWidth * 1712 / 1242 * 1.15
            }}
          >
            <IntroducePage />
          </View>
          <Grid>
            <Row>
              <Col
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10
                }}
              >
                <TouchableOpacity
                  onPress={this.clickSignUp}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.LIGHT_BLUE,
                      borderRadius: 5,
                      width: 80,
                      height: 36,
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.WHITE,
                        fontFamily: 'avenir',
                        fontSize: 18,
                        justifyContent: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                      }}
                    >
                      sign up
                    </Text>
                  </View>
                </TouchableOpacity>
              </Col>
              <Col
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginHorizontal: 10
                }}
              >
                <TouchableOpacity
                  onPress={this.clickLogIn}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.LIGHT_GREEN_200,
                      borderRadius: 5,
                      width: 80,
                      height: 36,
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.WHITE,
                        fontFamily: 'avenir',
                        fontSize: 18,
                        justifyContent: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                      }}
                    >
                      log in
                    </Text>
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer
          style={{
            backgroundColor: COLORS.BRIGHT_ORANGE,
            borderTopColor: COLORS.TRANSPARENT,
            height: 14
          }}
        >
          {/* app version number goes right below */}
          <View style={{
            alignItems: 'center',
            borderWidth: 0
          }}>
            <Text style={styles.appVerTextStyle}>
              1.1.6
            </Text>
          </View>
        </Footer>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {};
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, bindActions)(FirstScreen);
