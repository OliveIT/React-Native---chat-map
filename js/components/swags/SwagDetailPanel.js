'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Image, Platform, ScrollView, TouchableOpacity, WebView } from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import pluralize from 'pluralize';
import moment from 'moment';
import Circle from './Circle';
import BidContainer from './BidContainer';
import BackButton from '../commons/BackButton';
import Title from '../commons/Title';
import NbIcon from '../commons/NbIcon';
import { COLORS, ICONS } from '../../constants';
import headerStyle from '../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class SwagDetailPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      index: props.index,
      isBid: false,
      weeklyCountDown: '0:0'
    };
  }

  componentDidMount() {
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

  onPrevious = () => {
    const { swagData, status } = this.props;
    const { index } = this.state;
    const totalIndex = swagData.get(status).size - 1;
    if (index - 1 > -1) {
      this.setState({
        index: index - 1
      });
    } else {
      this.setState({
        index: totalIndex
      });
    }
  };

  onNext = () => {
    const { swagData, status } = this.props;
    const { index } = this.state;
    const totalIndex = swagData.get(status).size - 1;
    if (index + 1 <= totalIndex) {
      this.setState({
        index: index + 1
      });
    } else {
      this.setState({
        index: 0
      });
    }
  };

  render() {
    const { user, credit, actions, swagData, status } = this.props;
    const { isBid, weeklyCountDown, index } = this.state;
    const data = swagData.getIn([status, index]);
    const isIncoming = data.get('type') === 'incoming';
    const maxBidObj = data.get('biddings').maxBy(bidding => bidding.get('amount'));
    const maxBid = data.get('biddings').size > 0 ? (maxBidObj ? maxBidObj.get('amount') : 0) : 0;
    const maxBidBy = data.get('biddings').maxBy(bidding => bidding.get('amount'));
    const isTopBid = maxBidBy ? maxBidBy.get('user_id') === user._id : false;
    let userAvatar = ICONS.DEFAULT_AVATAR;
    if (user.photoUrl && (user.photoUrl.includes('http://') || user.photoUrl.includes('https://'))) {
      userAvatar = { uri: user.photoUrl };
    }

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={<BackButton onPress={() => Actions.pop()}/>}
          centerComponent={<Title title={user.username} color={COLORS.BRIGHT_ORANGE}/>}
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />
        <View style={styles.headContent}>
          <Image
            source={userAvatar}
            style={styles.avatar}
          />
          <Circle
            credit={credit}
            label={pluralize('token', credit)}
          />
          <Circle
            credit={weeklyCountDown}
            label={'left / wk'}
            labelStyle={{
              fontSize: weeklyCountDown.length > 5 ? 18 : 22
            }}
          />
        </View>
        <Text style={styles.valueLabel}>$ {data.get('value')}</Text>

        <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={this.onPrevious}>
              <NbIcon family={'Ionicons'} name={'ios-arrow-back'} style={styles.arrow}/>
            </TouchableOpacity>
            <Image
              source={{ uri: data.get('filePath') }}
              style={styles.rewardImage}
            />
            <TouchableOpacity style={styles.button} onPress={this.onNext}>
              <NbIcon family={'Ionicons'} name={'ios-arrow-forward'} style={styles.arrow}/>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.nameLabel}>
              {data.get('name')}
            </Text>
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionLabel}>
                {data.get('description')}
              </Text>
              {/*
              <WebView
                source={{ html:`
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                  <p style="
                    color: #53585f;
                    font-family: 'avenir';
                    font-size: 14px;
                    text-align: justify;
                  ">
                    ${data.get('description')}
                  </p>
                `}}
                scrollEnabled={false}
              />
              */}
            </View>
            {!isIncoming && (
              <View style={[styles.bidContainer, isTopBid ? styles.topBidContainer : {}]}>
                <Text style={styles.buttonLabel}>
                  {maxBid <= 0
                    ? 'bid now before someone does'
                    : `highest bid ${maxBid} ${pluralize('token', maxBid)}`
                  }
                </Text>
              </View>
            )}
          </View>
          {!isIncoming &&
            <BidContainer
              onBidding={actions.bidding}
              totalCredit={credit}
              id={data.get('_id')}
              topBid={isTopBid}
              maxBid={maxBid}
            />
          }
          <View style={{ height: Platform.OS === 'android' ? 26 : 78 }}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  arrow: {
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 25
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headContent: {
    height: 108,
    backgroundColor: COLORS.LIGHT_GREY,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center'
  },
  avatar: {
    resizeMode: 'cover',
    width: 90,
    height: 90,
    borderRadius: 45
  },
  scrollView: {
    height: deviceHeight * 0.088 // locking the height of the reward logos
  },
  valueLabel: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5
  },
  rewardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: deviceWidth * 0.254,
    marginTop: 8,
    marginBottom: 12,
    ...Platform.select({
      android: { borderRadius: 110 },
      ios: { borderRadius: 50 }
    })
  },
  nameLabel: {
    fontSize: 14,
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    textAlign: 'center',
    padding: 5
  },
  descriptionView: {
    height: deviceHeight * 0.178, // locking the height of the textbox, initial value of 0.237
    paddingBottom: 5,
    paddingHorizontal: 10
  },
  descriptionLabel: {
    fontSize: 14,
    color: COLORS.TEXT_GREY,
    fontFamily: 'avenir',
    textAlign: 'justify'
  },
  buttonLabel: {
    fontSize: 16,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'avenir',
    backgroundColor: 'transparent'
  },
  bidContainer: {
    padding: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT_ORANGE
  },
  topBidContainer: {
    backgroundColor: COLORS.LIGHT_GREEN
  }
};

export default SwagDetailPanel;
