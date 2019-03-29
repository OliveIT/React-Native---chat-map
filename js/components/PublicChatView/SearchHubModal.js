import React, { Component } from 'react';
import { Text, View, Dimensions, PermissionsAndroid, StatusBar, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, Input } from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FusedLocation from 'react-native-fused-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import styles from './styles';
import ChannelRow from './ChannelRow';
import { COLORS, ICONS } from '../../constants';

const { height: deviceHeight } = Dimensions.get('window');

class SearchHubModal extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = {
    query: '',
    location: {
      lat: 0.0,
      lng: 0.0
    }
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.WHITE);
      StatusBar.setTranslucent(true);
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000
      })
        .then(data => {
          this.requestLocation();
        })
        .catch(err => {
          alert(err.message);
        });
    } else {
      this.getAvailableZones();
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }

  getAvailableZones = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            location: {
              lat: position.coords.latitude,
              long: position.coords.longitude
            }
          },
          () => {
            this.props.actions.getAvailableZones({
              lat: position.coords.latitude,
              long: position.coords.longitude
            });
          }
        );
      },
      error => console.log(new Date(), error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 }
    );
  };

  async requestLocation() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION], {
        title: 'vediohead app permission',
        message: 'vediohead needs access to your location ' + 'so you can share your wonderful moments with everyone.'
      });
      if (granted) {
        FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
        const location = await FusedLocation.getFusedLocation();
        this.setState(
          {
            location: {
              lat: location.latitude,
              long: location.longitude
            }
          },
          () => {
            this.props.actions.getAvailableZones({
              lat: location.latitude,
              long: location.longitude
            });
          }
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  get displaySearchResults() {
    const { isFetching, zones } = this.props;
    if (_.isEmpty(zones) && this.state.query === '') {
      return (
        <Text style={styles.textStyle1}>
          want to know conditions{'\n'}
          at the place you are{'\n'}
          heading to? why not{'\n'}
          check in advance? look{'\n'}
          for the public channel!
        </Text>
      );
    } else if (_.isEmpty(zones) && this.state.query !== '') {
      return (
        <Text style={styles.textStyle1}>
          no zones matching your search{'\n'}
          were found
        </Text>
      );
    } else {
      return Object.keys(zones).map((key, index) => {
        if (zones[keys].length <= 0) return;
        return (
          <ChannelRow
            data={zones[key]}
            onSetPublicChatName={this.props.actions.setPublicChatName}
            key={index}
            onJoinPublicZone={this.props.actions.onJoinPublicZone}
          />
        );
      });
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    const { availableZones, actions } = this.props;
    const { setPublicChatName } = actions;
    const { location } = this.state;

    return (
      <Container>
        <ScrollView ref={ref => (this._scrollRef = ref)}>
          <View style={styles.headerAreaStyle1}>
            <Text style={styles.headerStyle}>available public channels</Text>
          </View>
          <View style={styles.textAreaStyle2}>
            <Text style={styles.textStyle2}>
              these channels change depending on your{'\n'}
              location and surroundings
            </Text>
          </View>
          <View style={styles.listAreaStyle}>
            {this.props.isFetching && <ActivityIndicator color={COLORS.BRIGHT_ORANGE} size="small"/>}
            {Object.keys(availableZones).map((key, index) => {
              return (
                <ChannelRow
                  data={availableZones[key]}
                  onSetPublicChatName={setPublicChatName}
                  key={index}
                  onJoinPublicZone={this.props.actions.onJoinPublicZone}
                />
              );
            })}
          </View>

          <View style={styles.headerAreaStyle1}>
            <Text style={styles.headerStyle}>look for a public channel</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Input
              style={styles.textInputStyle}
              keyboardType="default"
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor="#ccc"
              autoCorrect={false}
              onChangeText={query => {
                this.setState({ query: query }, () => {
                  this.props.actions.getZones(query, this._scrollRef, location);
                });
              }}
              returnKeyType={'search'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View style={styles.listAreaStyle2}>
            {this.props.isSearching && <ActivityIndicator color={COLORS.BRIGHT_ORANGE} size="small"/>}
            {this.displaySearchResults}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default SearchHubModal;
