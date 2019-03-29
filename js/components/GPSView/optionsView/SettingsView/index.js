import React, { PureComponent } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Switch, Platform, WebView } from 'react-native';
import { Container } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource';
import styles from './styles';
import { COLORS, ICONS } from '../../../../constants';
import BackButton from '../../../commons/BackButton';
import Title from '../../../commons/Title';
import NbIcon from '../../../commons/NbIcon';
import headerStyle from '../../../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const toggleSetting = {
  activeButtonBackgroundColor: 'rgba(216, 216, 216, 1)',
  inactiveButtonBackgroundColor: 'rgba(216, 216, 216, 1)',
  inactiveBackgroundColor: 'rgba(230, 230, 230, 1)',
  switchWidth: 70,
  switchHeight: 20,
  switchBorderColor: 'rgba(0, 0, 0, 1)',
  switchBorderRadius: 10,
  switchBorderWidth: 0,
  buttonWidth: 30,
  buttonHeight: 30,
  buttonBorderColor: 'rgba(0, 0, 0, 1)',
  buttonBorderWidth: 0,
  buttonBorderRadius: 15,
  animationTime: 120
};

setCustomSourceTransformer(function (resolver) {
  if (Platform.OS === 'android'
    && !resolver.serverUrl
    && !resolver.bundlePath
    && resolver.asset.type === 'html') {
    resolver.bundlePath = '/android_asset/';
  }
  return resolver.defaultAsset();
});

class SettingsView extends React.PureComponent {
  constructor(props) {
    super(props);
    let form = {
      public_chat: true,
      private_chat: true,
      ninja_account: true,
      notification: true
    };

    if (props.user && props.user.alert) form = props.user.alert;
    this.state = {
      form: form
    };
  }

  onToggleSwitch = (field, value) => {
    const { form } = this.state;
    form[field] = value;
    this.setState({ form: form }, () => {
      this.props.actions.updateNotification(form);
    });
  };

  renderAndroidSnippet() {
    return (
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <WebView source={{ uri: 'file:///android_asset/html/settingsViewAndroidSnippet.html' }}/>
      </View>
    );
  }

  renderIosSnippet() {
    return (
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <Text style={styles.snippetTextStyle}>
          ninja mode means you are not searchable by others. you will have to manually add friends to your Connections list. vedios are restricted to either Private or
          Friends-only. public access vedios are disabled.
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    StatusBar.setHidden(true);
  }

  render() {
    const { form } = this.state;

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Platform.select({ android: COLORS.BRIGHT_ORANGE, ios: COLORS.TRANSPARENT })} barStyle="light-content"/>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={<BackButton color={COLORS.WHITE} onPress={() => Actions.pop()}/>}
          centerComponent={<Title title={'settings'}/>}
          rightComponent={
            <View style={{ width: deviceWidth / 8 }}>
              <TouchableOpacity
                style={styles.logoutTouchStyle}
                onPress={this.props.actions.onLogout}
              >
                <NbIcon
                  family={'MaterialCommunityIcons'}
                  name={'logout'}
                  style={{
                    color: COLORS.WHITE,
                    backgroundColor: COLORS.TRANSPARENT,
                    fontSize: 25
                  }}
                />
              </TouchableOpacity>
            </View>
          }
          {...headerStyle}
        />

        <View style={styles.headerViewStyle}>
          <Text style={styles.headerTextStyle}>
            alerts
          </Text>
        </View>

        <View style={styles.itemStyle}>
          <View width="15%">
            <Image
              source={ICONS.SETTINGS_PUSHNOTIF}
              style={{
                height: deviceWidth * 0.05,
                width: deviceWidth * 0.05 * 47 / 54,
                marginLeft: deviceWidth * 0.05
              }}
            />
          </View>
          <View width="55%">
            <Text
              style={{
                color: COLORS.TEXT_GREY,
                fontFamily: 'avenir'
              }}
            >
              push notifications
            </Text>
          </View>
          <View width="30%" style={{ alignItems: 'center' }}>
            <Switch
              value={form.notification}
              {...toggleSetting}
              // activeBackgroundColor={'rgba(83, 88, 95, 1)'}
              // padding={true}
              // onChangeValue={value => {
              //   this.onToggleSwitch('notification', value);
              // }}
              thumbTintColor={'rgba(216, 216, 216, 1)'}
              tintColor={'rgba(216, 216, 216, 1)'}
              onTintColor={'rgba(83, 88, 95, 1)'}
              onValueChange={value => {
                this.onToggleSwitch('notification', value);
              }}
            />
          </View>
        </View>
        <View style={styles.itemStyle}>
          <View width="15%">
            <Image
              source={ICONS.SETTINGS_PUBLICCHAT}
              style={{
                height: deviceWidth * 0.05,
                width: deviceWidth * 0.05,
                marginLeft: deviceWidth * 0.05
              }}
            />
          </View>
          <View width="55%">
            <Text
              style={{
                color: COLORS.PURPLE,
                fontFamily: 'avenir'
              }}
            >
              public chat channels
            </Text>
          </View>
          <View width="30%" style={{ alignItems: 'center' }}>
            <Switch
              value={form.public_chat}
              {...toggleSetting}
              // activeBackgroundColor={'rgba(83, 27, 147, 1)'}
              // onChangeValue={value => {
              //   this.onToggleSwitch('public_chat', value);
              // }}
              thumbTintColor={'rgba(216, 216, 216, 1)'}
              tintColor={'rgba(216, 216, 216, 1)'}
              onTintColor={'rgba(83, 27, 147, 1)'}
              onValueChange={value => {
                this.onToggleSwitch('public_chat', value);
              }}
            />
          </View>
        </View>

        {/*
        <View style={styles.itemStyle}>
          <View width="15%">
            <Image
              source={ICONS.SETTINGS_EVENTCHAT}
              style={{
                height: deviceWidth * 0.05,
                width: deviceWidth * 0.05 * 50 / 47,
                marginLeft: deviceWidth * 0.05
              }}
            />
          </View>
          <View width="55%">
            <Text
              style={{
                color: '#84b943',
                fontFamily: 'avenir'
              }}
            >
              event chat channels
            </Text>
          </View>
          <View width="30%" style={{ alignItems: 'center' }}>
            <Switch
              value={form.event_chat}
              // {...toggleSetting}
              // activeBackgroundColor={'rgba(132, 185, 67, 1)'}
              // onChangeValue={value => {
              //   this.onToggleSwitch('event_chat', value);
              // }}
              thumbTintColor={'rgba(216, 216, 216, 1)'}
              tintColor={'rgba(216, 216, 216, 1)'}
              onTintColor={'rgba(132, 185, 67, 1)'}
              onValueChange={value => {
                this.onToggleSwitch('event_chat', value);
              }}
            />
          </View>
        </View>
        */}

        <View style={styles.itemStyle}>
          <View width="15%">
            <Image
              source={ICONS.SETTINGS_PRIVATECHAT}
              style={{
                height: deviceWidth * 0.05,
                width: deviceWidth * 0.05,
                marginLeft: deviceWidth * 0.05
              }}
            />
          </View>
          <View width="55%">
            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                fontFamily: 'avenir'
              }}
            >
              private chat channels
            </Text>
          </View>
          <View width="30%" style={{ alignItems: 'center' }}>
            <Switch
              value={form.private_chat}
              {...toggleSetting}
              // activeBackgroundColor={'rgba(243, 144, 25, 1)'}
              // onChangeValue={value => {
              //   this.onToggleSwitch('private_chat', value);
              // }}
              thumbTintColor={'rgba(216, 216, 216, 1)'}
              tintColor={'rgba(216, 216, 216, 1)'}
              onTintColor={'rgba(243, 144, 25, 1)'}
              onValueChange={value => {
                this.onToggleSwitch('private_chat', value);
              }}
            />
          </View>
        </View>

        <View style={styles.headerViewStyle}>
          <Text style={styles.headerTextStyle}>
            anonymity
          </Text>
        </View>
        <View style={styles.itemStyle1}>
          <View width="15%">
            <Image
              source={ICONS.SETTINGS_NINJA}
              style={{
                height: deviceWidth * 0.05,
                width: deviceWidth * 0.05,
                marginLeft: deviceWidth * 0.05
              }}
            />
          </View>
          <View width="55%">
            <Text
              style={{
                color: COLORS.TEXT_GREY,
                fontFamily: 'avenir'
              }}
            >
              ninja account
            </Text>
          </View>
          <View width="30%" style={{ alignItems: 'center' }}>
            <Switch
              disabled={true}
              value={form.ninja_account}
              {...toggleSetting}
              // activeBackgroundColor={'rgba(83, 88, 95, 1)'}
              // onChangeValue={value => {
              //   this.onToggleSwitch('ninja_account', value);
              // }}
              thumbTintColor={'rgba(216, 216, 216, 1)'}
              tintColor={'rgba(216, 216, 216, 1)'}
              onTintColor={'rgba(83, 88, 95, 1)'}
              onValueChange={value => {
                this.onToggleSwitch('ninja_account', value);
              }}
            />
          </View>
        </View>

        {Platform.OS === 'ios'
          ? this.renderIosSnippet()
          : this.renderAndroidSnippet()
        }

        <View style={styles.spaceFiller}/>
      </Container>
    );
  }
}

export default SettingsView;
