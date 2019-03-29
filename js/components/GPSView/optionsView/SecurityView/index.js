import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StatusBar, Platform, TextInput } from 'react-native';
import { Container, Content } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { COLORS } from '../../../../constants';
import BackButton from '../../../commons/BackButton';
import Title from '../../../commons/Title';
import NbIcon from '../../../commons/NbIcon';
import headerStyle from '../../../../utils/headerStyle';
import ChangePassword from './ChangePassword';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class SecurityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      },
      username: props.user.username
    };
  }

  backHandler = () => {
    const { user, actions } = this.props;
    const { username, form } = this.state;

    if (user.username !== username && username !== '') {
      actions.onUpdateUsername(username, true);
    }
    if (
      form.password !== '' &&
      form.passwordConfirmation !== '' &&
      form.currentPassword !== ''
    ) {
      if (form.password !== form.passwordConfirmation) {
        alert("password doesn't match");
        return;
      }
      actions.onUpdatePassword(form);
      return;
    }
    Actions.pop();
  };

  onFormChange = (field, value) => {
    const { form } = this.state;
    form[field] = value;
    this.setState({ form: form });
  };

  render() {
    const { checkUserName, user } = this.props;
    const { form } = this.state;

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Platform.select({ android: COLORS.BRIGHT_ORANGE, ios: COLORS.TRANSPARENT })} barStyle="light-content"/>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={
            <BackButton color={COLORS.WHITE} onPress={this.backHandler}/>
          }
          centerComponent={<Title title={'security'}/>}
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />

        <Content>
          <View style={styles.alertsTextstyle}>
            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                fontSize: 20,
                alignSelf: 'center',
                fontWeight: '600',
                fontFamily: 'avenir'
              }}
            >
              change username
            </Text>
          </View>
          <View style={{ backgroundColor: COLORS.WHITE }}>
            <TextInput
              style={styles.usernameInputStyle}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="@username"
              value={this.state.username}
              onEndEditing={() => {
                this.props.actions.checkUserName(this.state.username);
              }}
              onChangeText={username => {
                this.setState({ username: username });
              }}
              returnKeyType={'go'}
              underlineColorAndroid={COLORS.TRANSPARENT}
            />


            {!this.state.username == '' ?
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={styles.usernameStatusStyle}>
                  {!checkUserName.isFetching && (
                    <NbIcon
                      family={'Ionicons'}
                      name={checkUserName.isValid ? 'md-checkmark' : 'md-close'}
                      style={
                        checkUserName.isValid ? (
                          styles.usernameStatusAvailableIconStyle
                        ) : (
                          styles.usernameStatusUnavailableIconStyle
                        )
                      }
                    />
                  )} username {checkUserName.isValid ? 'available' : 'unavailable'}
                </Text>
              </View>
              :
              <View />
            }

            <View>
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir',
                  fontSize: 12,
                  textAlign: 'center',
                  marginBottom: deviceWidth * 0.07
                }}
              >
                change your username as often as your whims fancy
              </Text>
            </View>
          </View>

          {user.provider === 'email' && (
            <ChangePassword
              {...this.props}
              onFormChange={this.onFormChange}
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default SecurityView;
