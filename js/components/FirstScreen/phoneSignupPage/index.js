import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';
import {
  Container,
  Content,
  Input,
  Item,
  Button,
  Icon
} from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import CountryPicker from 'react-native-country-picker-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSignUpViaPhone } from '../../../actions/user';
import { COLORS } from '../../../constants';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import RightButton from '../../commons/RightButton';
import LoadingSpinner from '../../commons/LoadingSpinner';
import headerStyle from '../../../utils/headerStyle';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const countryPickerCustomStyles = {};
const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

class PhoneSignupPage extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      enterCode: false,
      spinner: false,
      phone: '',
      country: {
        cca2: 'SG',
        callingCode: '65'
      }
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  clickAgreeBtn() {
    this.setModalVisible(false);
    Actions.tabbar();
  }

  _changeCountry = country => {
    this.setState({ country });
    // this.refs.form.refs.textInput.focus();
  };

  _renderCountryPicker = () => {
    if (this.state.enterCode) return <View />;

    return (
      <CountryPicker
        ref={'countryPicker'}
        closeable
        style={styles.countryPicker}
        onChange={this._changeCountry}
        cca2={this.state.country.cca2}
        styles={countryPickerCustomStyles}
        translation="eng"
      />
    );
  };

  _renderCallingCode = () => {
    if (this.state.enterCode) return <View />;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: '#F18F2E',
            fontFamily: 'avenir',
            fontWeight: 'bold',
            paddingRight: 10
          }}
        >
          +{this.state.country.callingCode}
        </Text>
      </View>
    );
  };

  _onChangeText = val => {
    this.setState({ phone: val });
  };

  _getSubmitAction = () => {
    this.onConfirmPhoneNumber();
  };

  onConfirmPhoneNumber = () => {
    const { phone, country } = this.state;
    if (phone.length >= 8) {
      const pp = phoneUtil.parse(phone, country.cca2);
      const newPhone = `+${pp.values_['1']}${pp.values_['2']}`;
      this.props.actions.onSignUpViaPhone(newPhone);
    } else {
      this.refs['textInput'].focus();
    }
  };

  render() {
    let textStyle = this.state.enterCode
      ? {
          height: 50,
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          fontFamily: 'avenir'
        }
      : {};
    return (
      <Container>
        <StatusBar backgroundColor={COLORS.TRANSPARENT} barStyle="light-content"/>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={
            <BackButton color={COLORS.WHITE} onPress={() => Actions.pop()}/>
          }
          centerComponent={
            <Title title={'mobile number'}/>
          }
          rightComponent={
            <RightButton title={'next'} onPress={this.onConfirmPhoneNumber}/>
          }
          {...headerStyle}
        />

        <Content>
          <Item
            style={{
              alignItems: 'center',
              marginHorizontal: 60,
              marginTop: 100,
              borderColor: COLORS.TRANSPARENT
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              {this._renderCountryPicker()}
              {this._renderCallingCode()}

              <TextInput
                ref={'textInput'}
                name={'phoneNumber'}
                type={'TextInput'}
                returnKeyType={'go'}
                underlineColorAndroid={COLORS.TRANSPARENT}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={this._onChangeText}
                placeholder="your phone number"
                keyboardType="numeric"
                style={[styles.textInput, textStyle]}
                autoFocus
                placeholderTextColor={COLORS.DARK_GREY}
                selectionColor={COLORS.DARK_GREY}
                maxLength={20}
                onSubmitEditing={this._getSubmitAction}
              />
            </View>
          </Item>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.DARK_GREY,
              fontFamily: 'avenir',
              fontSize: 18,
              marginHorizontal: 60,
              marginTop: 30
            }}
          >
            please confirm your country code and enter your phone number
          </Text>

          {this.props.isFetching && <LoadingSpinner />}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    color: COLORS.DARK_GREY,
    textAlign: 'center',
    fontFamily: 'avenir',
    fontSize: 20
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: COLORS.DARK_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: COLORS.DARK_GREY,
    fontFamily: 'avenir',
    fontWeight: 'bold',
    paddingRight: 10
  }
});

function mapStateToProps(state) {
  return {
    isFetching: state.user.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ onSignUpViaPhone }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneSignupPage);
