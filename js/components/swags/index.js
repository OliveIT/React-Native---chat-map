'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Platform, Image, ScrollView, TouchableHighlight, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import pluralize from 'pluralize';
import moment from 'moment';
import styles from './styles';
import Circle from './Circle';
import Items from './Items';
import IncompleteProfile from './IncompleteProfile';
import BackButton from '../commons/BackButton';
import Title from '../commons/Title';
import headerStyle from '../../utils/headerStyle';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class SwagPanel extends Component {
  state = {
    weeklyCountDown: '0:0',
    isEnd: false
  };

  componentDidMount() {
    this.countDown();
  }

  countDown() {
    this.countDownCalculate();
    this.interval = setInterval(() => {
      this.countDownCalculate();
    }, 30000);
  }

  countDownCalculate() {
    const sunday = moment(
      `${moment()
        .weekday(7)
        .format('YYYY-MM-DD')} 23:59`
    );

    const today = moment();
    let diffDay = 0;

    if (sunday.month() > today.month()) {
      diffDay = sunday.diff(today, 'days');
    } else {
      diffDay = sunday.date() - today.date();
    }
    const diffHour = sunday.hour() - today.hour();
    let diffInHour = diffDay * 24 + diffHour;
    let diffInMinute = sunday.minute() - today.minute();

    this.setState({ weeklyCountDown: `${diffInHour}:${diffInMinute}` });
  }

  componentWillMount() {
    this.props.actions.getSwagLists();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.WHITE);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    // if (Platform.OS === 'android') {
    //   StatusBar.setTranslucent(true);
    // }
    StatusBar.setHidden(false);
  }

  render() {
    const { weeklyCountDown } = this.state;
    const { user, data, credit, isFullProfile } = this.props;
    if (__DEV__) {
      console.log(`is full profile ${isFullProfile}`);
    }
    const [...keys] = data.keys();
    let userAvatar = ICONS.DEFAULT_AVATAR;
    if (user.photoUrl && (user.photoUrl.includes('http://') || user.photoUrl.includes('https://'))) {
      userAvatar = { uri: user.photoUrl };
    }
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={<View style={{ width: deviceWidth / 8 }}/>}
          centerComponent={<Title title={user.username} color={COLORS.BRIGHT_ORANGE}/>}
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />
        <View style={styles.headContent}>
          <Image style={styles.avatar} source={userAvatar} borderRadius={45}/>
          <Circle credit={credit} label={pluralize('token', credit)}/>
          <Circle credit={weeklyCountDown} label={'left / wk'} labelStyle={{ fontSize: weeklyCountDown.length > 5 ? 18 : 22 }}/>
        </View>
        {isFullProfile ? <Items data={data}/> : <IncompleteProfile />}
      </View>
    );
  }
}

export default SwagPanel;
