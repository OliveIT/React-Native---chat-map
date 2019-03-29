import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput, TouchableOpacity, PermissionsAndroid, StatusBar, Platform, ScrollView, FlatList, ActivityIndicator, Image } from 'react-native';
import { Container, Col, Grid } from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FusedLocation from 'react-native-fused-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import ChannelRow from './ChannelRow';
// import CategoryRow from './CategoryRow';
import { CategoryRowData } from './dataForCategoryRow';
import { InfoHubData } from './dataForInfoHub';
import { COLORS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class PublicChatView extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  state = {
    query: '',
    location: {
      lat: 0.0,
      lng: 0.0,
    },
    showWeatherOnly: true,
    showLawAndOrderOnly: true,
    showGeneralOnly: true,
    showEventsOnly: true,
    showTrafficOnly: true,
    showNewsworthy: true,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.WHITE);
      StatusBar.setTranslucent(true);
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then((data) => {
          this.requestLocation();
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      this.getAvailableZones();
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  clickWeatherOnlyButton = () => {
    this.state.showWeatherOnly !== false && this.setState({ showWeatherOnly: false });
    this.state.showWeatherOnly !== true && this.setState({ showWeatherOnly: true });
  };

  clickLawAndOrderOnlyButton = () => {
    this.state.showLawAndOrderOnly !== false && this.setState({ showLawAndOrderOnly: false });
    this.state.showLawAndOrderOnly !== true && this.setState({ showLawAndOrderOnly: true });
  };

  clickGeneralOnlyButton = () => {
    this.state.showGeneralOnly !== false && this.setState({ showGeneralOnly: false });
    this.state.showGeneralOnly !== true && this.setState({ showGeneralOnly: true });
  };

  clickEventsOnlyButton = () => {
    this.state.showEventsOnly !== false && this.setState({ showEventsOnly: false });
    this.state.showEventsOnly !== true && this.setState({ showEventsOnly: true });
  };

  clickTrafficOnlyButton = () => {
    this.state.showTrafficOnly !== false && this.setState({ showTrafficOnly: false });
    this.state.showTrafficOnly !== true && this.setState({ showTrafficOnly: true });
  };

  clickNewsworthyOnlyButton = () => {
    this.state.showNewsworthy !== false && this.setState({ showNewsworthy: false });
    this.state.showNewsworthy !== true && this.setState({ showNewsworthy: true });
  };

  getAvailableZones = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
      }, () => {
        this.props.actions.getAvailableZones({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    },
    error => console.log(new Date(), error),
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 3000,
    });
  };

  async requestLocation() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION], {
        title: 'Vediohead app permission',
        message: 'Vediohead needs access to your location ' + 'so you can share your wonderful moments with everyone.',
      });
      if (granted) {
        FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
        const location = await FusedLocation.getFusedLocation();
        this.setState(
          {
            location: {
              lat: location.latitude,
              long: location.longitude,
            },
          },
          () => {
            this.props.actions.getAvailableZones({
              lat: location.latitude,
              long: location.longitude,
            });
          }
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  get displaySearchResults() {
    const { zones } = this.props;

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
        if (zones[keys].length <= 0) return (
          <View>
            <Text>Loading ...</Text>
          </View>
        );
        return (
          <ChannelRow
            key={index}
            data={zones[key]}
            onSetPublicChatName={this.props.actions.setPublicChatName}
            onJoinPublicZone={this.props.actions.onJoinPublicZone}
          />
        );
      });
    }
  }

  renderCategoryItem = ({ item: category }) => {
    return (
      <Col
        style={{
          marginHorizontal: 20,
          marginVertical: 5,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: category.iconBackgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 36,
          }}
          onPress={category.iconOnPress}
        >
          <FontAwesome5Pro
            name={category.iconName}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
            }}
            size={20}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
      </Col>
    );
  };

  renderPostingItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          minWidth: deviceWidth * 0.29,
          maxWidth: deviceWidth * 0.3,
          minHeight: deviceWidth * 0.26 * 1.778,
          maxHeight: deviceWidth * 0.27 * 1.778,
          marginHorizontal: 5,
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: item.infoBorderColor,
            borderRadius: 5,
            borderWidth: 1,
            width: deviceWidth * 0.298,
            height: deviceWidth * 0.26 * 1.778,
          }}
        >
          <Image
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: '100%',
            }}
            source={{ uri: 'https://viaplaceholder.com/720x1280.png/56a/fff' }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      location,
      showWeatherOnly,
      showLawAndOrderOnly,
      showGeneralOnly,
      showEventsOnly,
      showTrafficOnly,
      showNewsworthy,
    } = this.state;
    const {
      availableZones,
      actions,
      data,
      isFetching,
    } = this.props;
    const {
      setPublicChatName,
      onJoinPublicZone,
    } = actions;

    return (
      <Container style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ScrollView>
            {Object.keys(availableZones).map((key, index) => {
              return (
                <ChannelRow
                  key={index}
                  data={availableZones[key]}
                  onSetPublicChatName={setPublicChatName}
                  onJoinPublicZone={onJoinPublicZone}
                />
              );
            })}

{/*
          <View style={styles.headerAreaStyle1}>
            <Text style={styles.headerStyle}>available public channels</Text>
          </View>
          <View style={styles.textAreaStyle2}>
            <Text style={styles.textStyle2}>
              these channels change depending on your{'\n'}
              location and surroundings
            </Text>
          </View>
*/}

{/*
          <View style={styles.listAreaStyle}>
            {this.props.isFetching && <ActivityIndicator color={COLORS.BRIGHT_ORANGE} size="small"/>}
            {Object.keys(availableZones).map((key, index) => {
              return (
                <ChannelRow
                  key={index}
                  data={availableZones[key]}
                  onSetPublicChatName={setPublicChatName}
                  onJoinPublicZone={onJoinPublicZone}
                />
              );
            })}
          </View>
*/}

{/*
          <View style={styles.headerAreaStyle1}>
            <Text style={styles.headerStyle}>look for a public channel</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextInput
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
*/}
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 8,
            height: 48,
          }}
        >
          <Col
            style={{
              width: '64%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextInput
              style={{
                textAlign: 'center',
                fontFamily: 'avenir',
                height: 28,
                width: deviceWidth * 0.56,
                borderColor: 'rgba(0,0,0,0.5)',
                borderWidth: 0.7,
                borderRadius: 10,
              }}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="search hubs"
              returnKeyType="search"
              underlineColorAndroid={COLORS.TRANSPARENT}
              clearButtonMode="while-editing"
            />
          </Col>
          <Col style={styles.filterIconColStyle}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: 32,
                paddingTop: 3,
              }}
            >
              <FontAwesome5Pro
                name={'stopwatch'}
                style={styles.filterIconStyle}
                size={16}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>
          <Col style={styles.filterIconColStyle}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: 32,
                paddingTop: 2,
              }}
            >
              <FontAwesome5Pro
                name={'eye'}
                style={styles.filterIconStyle}
                size={16}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>
          <Col style={styles.filterIconColStyle}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: 32,
                paddingTop: 3,
              }}
            >
              <FontAwesome5Pro
                name={'heart'}
                style={styles.filterIconStyle}
                size={16}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
          }}
        >
{/*
          <CategoryRow />
*/}

          <Grid
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <FlatList
              data={CategoryRowData}
              renderItem={this.renderCategoryItem}
              keyExtractor={category => category.key}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </Grid>

        </View>

        <View
          style={{
            justifyContent: 'center',
            height: deviceHeight * 0.75,
            maxHeight: deviceHeight * 0.75,
          }}
        >
          <FlatList
            data={InfoHubData.filter((item) => {
              if (!showWeatherOnly && showLawAndOrderOnly && showGeneralOnly && showEventsOnly && showTrafficOnly && showNewsworthy) {
                item.type !== 'weather';
              } else if (showWeatherOnly && !showLawAndOrderOnly && showGeneralOnly && showEventsOnly && showTrafficOnly && showNewsworthy) {
                item.type !== 'law and order';
              } else if (showWeatherOnly && showLawAndOrderOnly && !showGeneralOnly && showEventsOnly && showTrafficOnly && showNewsworthy) {
                return item.type !== 'general';
              } else if (showWeatherOnly && showLawAndOrderOnly && showGeneralOnly && !showEventsOnly && showTrafficOnly && showNewsworthy) {
                return item.type !== 'events';
              } else if (showWeatherOnly && showLawAndOrderOnly && showGeneralOnly && showEventsOnly && !showTrafficOnly && showNewsworthy) {
                return item.type !== 'traffic';
              } else if (showWeatherOnly && showLawAndOrderOnly && showGeneralOnly && showEventsOnly && showTrafficOnly && !showNewsworthy) {
                return item.type !== 'newsworthy';
              } else if (showWeatherOnly && showLawAndOrderOnly && showGeneralOnly && showEventsOnly && showTrafficOnly && showNewsworthy) {
                return item.type !== null;
              }
              return null;
            })}
            contentContainerStyle={{
              justifyContent: 'space-between',
              marginHorizontal: 5,
            }}
            renderItem={this.renderPostingItem}
            keyExtractor={item => item.key}
            numColumns={3}
            horizontal={false}
          />
        </View>
      </Container>
    );
  }
}

export default PublicChatView;
