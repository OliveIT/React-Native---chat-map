import React, { PureComponent } from 'react';
import {
  Text, View, Dimensions, Image, ScrollView, DeviceEventEmitter, TouchableOpacity, Modal, StatusBar, Platform,
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// import FusedLocation from 'react-native-fused-location';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import _ from 'lodash';
import SuperCluster from 'supercluster';
import geoViewport from '@mapbox/geo-viewport';
import styles from './styles';
// import MapView from '../commons/MapWithClustering';
import { getVideos } from '../../actions/video';
import { getNotifications, markNotificationAsRead } from '../../actions/configure';
import { COLORS, ICONS } from '../../constants';
import skins from '../../themes/GoogleMaps/mapSkins';
// import { to3dArray } from '../../utils/converter';
import LocationManager from '../../services/LocationManager';
import InAppNotificationView from './InAppNotificationView';
import { getActivity } from '../../actions/activities';

const { light: lightSkin, dark: darkSkin } = skins;
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
// const LIMIT_PINS_PER_USER = 4;
const DISTANCE = 170; // increase this if you want zoom out, and decrease it to zoom in
const LATITUDE_DELTA = 0.004 * (DISTANCE / 100);
const LONGITUDE_DELTA = LATITUDE_DELTA * deviceWidth / deviceHeight;

class GPSViewPage extends React.PureComponent {
  radius = deviceWidth / 24;

  lastRegion = null;

  regionUpdateTime = 1;

  constructor(props) {
    super(props);
    this.superCluster = SuperCluster({
      radius: this.radius,
      maxZoom: 16,
    });
    this.state = {
      pinReferences: [],
      markerRendered: [],
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
      forceUpdateMarker: false,
      private_chat_session_array: [],
      public_chat_session_array: [],
      modalVisible: false,
      modalVisible_pin: false,
      focusOnPin: null,
      is_public: false,
      isPrivate: false,
      region: {
        latitude: 1.29027,
        longitude: 103.851959,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      modalPosition: { x: 0, y: 0 },
      pinStickMargin: 0,
      isPin: true,
      modalData: [],
      currentTime: null,
      openPins: [],
      data: [],
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.TRANSPARENT);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle(
      this.state.currentTime > '07:00:00' && this.state.currentTime < '19:00:00'
        ? 'dark-content'
        : 'light-content'
    );
  }

  async componentDidMount() {
    this.props.actions.getNotifications();
    this.eventSubscription = DeviceEventEmitter.addListener('onEnterAgain', () => {
      this.getCurrentLocation();
    });
    if (Platform.OS === 'android') {
      try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        });
      } catch (e) {
        return;
      }
    }
    console.log('me triggered yo');
    this.getCurrentLocation();
    this.getCurrentTime();
  }

  calculateBBox() {
    return [
      this.state.region.longitude - (this.state.region.longitudeDelta * 2),
      this.state.region.latitude - (this.state.region.latitudeDelta * 2),
      this.state.region.longitude + (this.state.region.longitudeDelta * 2),
      this.state.region.latitude + (this.state.region.latitudeDelta * 2),
    ];
  }

  watchInterval = null;

  watchPosition() {
    const limitTime = 2; // in seconds
    const limitUpdate = 10; // in times
    let updates = [];
    let timer = 0;
    const resetInterval = () => {
      if (this.watchInterval) {
        clearInterval(this.watchInterval);
        timer = 0;
      }
      this.watchInterval = setInterval(() => {
        timer += 1;
        if (timer >= limitTime && updates.length > 0) {
          updateData(updates[updates.length - 1].latitude, updates[updates.length - 1].longitude);
          timer = 0;
          updates = [];
        }
      }, 1000);
    };
    resetInterval();
    const updateData = (latitude, longitude) => {
      if (latitude !== this.state.region.latitude || longitude !== this.state.region.longitude) {
        this.setState({
          region: {
            ...this.state.region,
            latitude,
            longitude,
          },
        }, () => this.props.actions.getVideos({ lat: latitude, lon: longitude, distance: DISTANCE }, (videos) => this.updateMarkers(videos)));
        updates = [];
        timer = 0;
        resetInterval();
      }
    };
    LocationManager.subscribe(({ latitude, longitude }) => {
      updates.push({ latitude, longitude });
      if (updates.length === limitUpdate) {
        updateData(latitude, longitude);
      }
    });
  }

  componentWillUnmount() {
    LocationManager.unsubscribe();
    DeviceEventEmitter.removeSubscription(this.eventSubscription);
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
    }
  }

  onRegionChange(region) {
    this.regionUpdateTime += 1;
    // this.lastRegion = region;
    if (this.regionUpdateTime % 2 === 1) {
      this.setState({
        region,
      }, () => {
        this.props.actions.getVideos({
          lat: region.latitude,
          lon: region.longitude,
          distance: DISTANCE,
        }, (videos) => this.updateMarkers(videos));
      });
    }
  }

  getZoomLevel(bbox) {
    return geoViewport.viewport(bbox, [deviceHeight, deviceWidth]);
  }

  createMarkerTitle(everyone, friends) {
    const total = everyone > friends ? everyone : friends;
    const thresholds = [
      10,
      25,
      50,
      100,
    ];
    const text = '';
    thresholds.reduceRight((result, threshold, index) => {
      if (total > threshold && result !== '') {
        result = `${threshold}+`;
      } else if (total <= threshold && total > thresholds[index] && result !== '') {
        result = `${thresholds[index]}+`;
      }
      return result;
    }, text);
    return text;
  }

  parseMarkers(data) {
    this.superCluster.load(data);
    const markersOnTheMap = [];
    const bbox = this.calculateBBox();
    let zoom;
    if (this.state.region.longitudeDelta >= 40) {
      zoom = 0;
    } else {
      zoom = this.getZoomLevel(bbox).zoom;
    }
    if (__DEV__) {
      console.log({ zoom });
    }
    const clusters = this.superCluster.getClusters(
      [...bbox],
      zoom
    );

    clusters.forEach((cluster, index) => {
      let everyoneCount = 0;
      let friendsCount = 0;
      if (cluster.properties.cluster_id) {
        const markers = this.superCluster.getLeaves(cluster.properties.cluster_id);
        markers.sort((a, b) => (a.item.createdAt <= b.item.createdAt ? 1 : -1));
        const userCounts = new Map();
        const reducedMarkers = [];
        markers.forEach((data) => {
          const { item } = data;
          if (item.sharedWith) {
            if (item.sharedWith === 'friends') {
              friendsCount += 1;
            }
            if (item.sharedWith === 'everyone') {
              everyoneCount += 1;
            }
          }
          const count = userCounts.get(item.user_id._id);
          // if (count < LIMIT_PINS_PER_USER || !count) {
          reducedMarkers.push(data);
          userCounts.set(item.user_id._id, (count || 0) + 1);
          // }
        });
        markersOnTheMap.push({
          position: {
            lat: cluster.geometry.coordinates[1],
            lon: cluster.geometry.coordinates[0],
          },
          markerImage: everyoneCount > friendsCount ? ICONS.EVERYONE_LARGE_PIN : ICONS.FRIENDS_LARGE_PIN,
          title: this.createMarkerTitle(everyoneCount, friendsCount),
          markers: reducedMarkers,
          identifier: `marker-${index}`,
        });
      } else {
        markersOnTheMap.push({
          position: {
            lat: cluster.geometry.coordinates[1],
            lon: cluster.geometry.coordinates[0],
          },
          ...cluster.item,
          markerImage: cluster.item.sharedWith === 'everyone' ? ICONS.EVERYONE_LARGE_PIN : ICONS.FRIENDS_LARGE_PIN,
          title: this.createMarkerTitle(1, friendsCount),
          markers: [],
          identifier: `marker-${index}`,
        });
      }
    });
    return markersOnTheMap;
  }

  updateMarkers(markers) {
    let data = [...markers];
    if (data.length === 1) {
      data[0] = {
        ...data[0],
        markerImage: data[0].sharedWith === 'everyone' ? ICONS.EVERYONE_LARGE_PIN : ICONS.FRIENDS_LARGE_PIN,
      };
    }
    if (data.length > 1) {
      data = data
        .filter(item => item.position)
        .map(item => ({
          item,
          properties: {
            point_count: 0,
          },
          geometry: {
            type: 'Point',
            coordinates: [
              item.position.lon,
              item.position.lat,
            ],
          },
        }));
      data = this.parseMarkers(data);
    }
    this.setState({
      data,
      markers,
      forceUpdateMarker: true,
    }, () => {
      this.lastRegion = null;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focusOnPin && this.state.focusOnPin !== nextProps.focusOnPin) {
      LocationManager.unsubscribe();
      this.setState({
        focusOnPin: nextProps.focusOnPin,
      }, () => {
        setTimeout(() => {
          this.updateRegion(nextProps.position.lat, nextProps.position.lon);
        }, 1000);
      });
    }
  }

  getCurrentLocation() {
    LocationManager.getCurrentLocation()
      .then(({ latitude, longitude }) => {
        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        this.setState(
          {
            markerRendered: [],
            forceUpdateMarker: true,
            data: [],
            region: initialRegion,
            markerPosition: initialRegion,
          },
          () => {
            this.animate();
            this.regionUpdateTime += 1;
            this.watchPosition();
            this.props.actions.getVideos({
              lat: initialRegion.latitude,
              lon: initialRegion.longitude,
              distance: DISTANCE,
            }, (videos) => this.updateMarkers(videos));
          }
        );
      }).catch((err) => {
        this.props.actions.getVideos({
          lat: this.state.region.latitude,
          lon: this.state.region.longitude,
          distance: DISTANCE,
        }, (videos) => this.updateMarkers(videos));
      });
  }

  updateRegion(latitude, longitude) {
    this.setState({
      markerRendered: [],
      data: [],
      forceUpdateMarker: true,
      region: {
        ...this.state.region,
        latitude,
        longitude,
      },
    }, () => {
      this.animate(() => {
        this.props.actions.getVideos({
          lat: latitude,
          lon: longitude,
          distance: DISTANCE,
        }, (videos) => this.updateMarkers(videos));
      });
      LocationManager.unsubscribe();
    });
  }

  animate(callback) {
    this.mapView._root.animateToRegion(this.state.region, 100);
    this.setState({
      markerRendered: [],
      data: [],
    }, () => callback && callback());
  }

  // onTemp3(region) {}

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setModalVisiblePin(visible) {
    this.setState({
      modalVisible_pin: visible,
      data: this.state.data.map(item => ({ ...item, hidden: false })),
    });
  }

  clickPublicIcon() {
    this.setState({
      isPrivate: false,
      is_public: true,
      modalVisible: true,
    });
  }

  clickPrivateIcon() {
    this.setState({
      isPrivate: true,
      is_public: false,
      modalVisible: true,
    });
  }

  clickChatViewImage(value1) {
    Actions.push({ key: 'accountView', userId: this.props.userId });
    this.setModalVisible(false);
  }

  // displayChatList(array) {
  //   const data = to3dArray(array);
  //
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center' }}>
  //       {data.map((array, index) => {
  //         return (
  //           <View style={styles.rows} key={index}>
  //             {Array.apply(null, { length: 3 }).map((value, i) => {
  //               if (array[i] !== undefined) {
  //                 return (
  //                   <TouchableOpacity
  //                     style={styles.active_avatarStyle}
  //                     key={`${index}-${i}`}
  //                   >
  //                     <Image
  //                       style={styles.imageStyle}
  //                       source={ICONS.DEFAULT_AVATAR}
  //                     />
  //                   </TouchableOpacity>
  //                 );
  //               }
  //             })}
  //           </View>
  //         );
  //       })}
  //     </View>
  //   );
  // }

  // tapPin() {}

  // for pin callouts
  clickMyAvatar() {
    Actions.accountView({ userId: this.props.userId });
  }

  // for notifications
  // clickPinStickAvatar(id) {
  //   Actions.friendAccountView2({ userId: id });
  //   this.setModalVisiblePin(false);
  // }

  navigateToVideoDetail(item) {
    const references = this.state.pinReferences;
    let id;
    if (references.length > 0) {
      id = item._id;
      const reference = references.find(notification => (notification.reference || notification.vedio_id)._id === item._id);
      if (reference) {
        this.props.actions.markNotificationAsRead(reference._id);
      }
    } else {
      id = (item.reference || item)._id;
    }
    this.setState({
      pinReferences: references,
      modalVisible_pin: false,
      data: this.state.data.map(resource => ({ ...resource, hidden: false })),
    });
    Actions.videoDetail({ id });
  }

  clickMarker(pin, index) {
    if (!pin.markers || pin.markers.length === 0) {
      this.navigateToVideoDetail(pin);
      return;
    }
    this.mapView._root.pointForCoordinate({
      latitude: pin.position.lat,
      longitude: pin.position.lon,
    }).then((response) => {
      const markers = [...this.state.data];
      markers[index].hidden = true;
      this.setState({
        isPin: false,
        data: markers,
        markerRendered: this.state.markerRendered.filter(item => pin.identifier !== item),
        modalData: pin.markers.map(marker => marker.item),
        modalPosition: response,
        modalVisible_pin: true,
      });
    }).catch(err => console.log({ err }));
  }

  getCurrentTime() {
    const date = new Date();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hour < 10) hour = `0${hour}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    this.setState({ currentTime: `${hour}:${minutes}:${seconds}` });
  }

  populateUserAvatar(item, defaultAvatar) {
    return item.user_id && item.user_id.photoUrl
      ? { uri: item.user_id.photoUrl }
      : (
        defaultAvatar
      );
  }

  onPinPress(notification) {
    let { reference: video } = notification;
    if (!video) {
      video = notification.vedio_id;
    }
    this.setState({
      pinReferences: notification.notifications,
      markerRendered: [],
      forceUpdateMarker: true,
      data: [],
    }, () => {
      if (video.position && video.position.lat && video.position.lon) {
        this.updateRegion(video.position.lat, video.position.lon);
      }
    });
  }

  onCommentPress(notification) {
    let { reference: video } = notification;
    if (!video) {
      video = notification.vedio_id;
    }
    if (video) {
      this.props.actions.getActivity(video._id, () => {
        Actions.comment({ id: video._id });
      });
    }
    this.props.actions.markNotificationAsRead(notification._id);
  }

  onFriendRequestPress(notification) {
    const { reference: user } = notification;
    Actions.accountView({ userId: user._id });
  }

  render() {
    const {
      notifications,
      user,
    } = this.props;
    const {
      data,
      isPin,
      currentTime,
    } = this.state;
    const middle = this.state.modalData[(this.state.modalData.length / 2) | 0];
    const userAvatar = this.props.user.photoUrl !== ''
      ? { uri: this.props.user.photoUrl }
      : ICONS.DEFAULT_AVATAR;
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => this.mapView = { _root: ref }}
          region={{ ...this.state.region }}
          initialRegion={this.state.initialRegion}
          provider={PROVIDER_GOOGLE}
          customMapStyle={
            currentTime > '07:00:00' && currentTime < '19:00:00'
              ? lightSkin
              : darkSkin
          }
          style={styles.map}
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          showCompass={false}
          showScale={false}
          showsTraffic={false}
          showsIndoors={false}
          showsIndoorLevelPicker={false}
          toolbarEnabled={false}
          loadingEnabled={false}
        >
          {/* comment the circles if you want to remove them */}
          {/*
          <Circle
            center={this.state.region}
            fillColor={'rgba(0,0,255,0.2)'}
            strokeColor={'rgba(0,0,255,0.2)'}
            radius={DISTANCE}
          />
          <Circle
            center={this.state.region}
            fillColor={'rgba(0,0,0,1)'}
            strokeColor={'rgba(0,0,0,1)'}
            radius={DISTANCE/20}
          />
          */}
          {data.map((item, index) => (item.hidden
            ? null
            : (
              <Marker
                key={`marker-${index}`}
                coordinate={{ latitude: item.position.lat, longitude: item.position.lon }}
                onPress={this.clickMarker.bind(this, item, index)}
                title={item.title}
                ref={() => {
                  if (!this.state.markerRendered.includes(item.identifier) && !item.hidden) {
                    setTimeout(() => {
                      this.setState({ markerRendered: this.state.markerRendered.concat(item.identifier) });
                    }, 200);
                  }
                }}
                tracksViewChanges={!this.state.markerRendered.includes(item.identifier)}
                tracksInfoWindowChanges={false}
                description=""
              >
                <Image
                  source={item.markerImage}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </Marker>
            )))}
        </MapView>

        <View style={styles.avatarStickStyle}>
          <TouchableOpacity onPress={() => this.clickMyAvatar()}>
            <Image style={styles.myImageStyle} source={userAvatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.stickStyle}>
          <InAppNotificationView
            onPinPress={this.onPinPress.bind(this)}
            onCommentPress={this.onCommentPress.bind(this)}
            onFriendRequestPress={this.onFriendRequestPress.bind(this)}
            notifications={notifications || []}
          />

          {/* in-app notification when user receives regarding the bidding of rewards */}
          {/*
            <TouchableOpacity style={styles.candidateStyle}>
            */}
          {/* inactive state */}
          {/*
              <View style={styles.rewardInactiveCircleStyle}>
                <Image style={styles.rewardImageStyle} source={ICONS.REWARD_BID}/>
              </View>
              */}
          {/* active state when pressed */}
          {/*
              <View style={styles.rewardActiveCircleStyle}>
                <Image
                  style={styles.rewardImageStyle}
                  source={ICONS.REWARD_BID_ACTIVE}
                />
              </View>
              */}
          {/*
            </TouchableOpacity>
            */}

          {/* in-app notification when user has received a new message under public chats */}
          {/*
            <TouchableOpacity style={styles.candidateStyle} onPress={() => this.clickPublicIcon()}>
              <View style={styles.publicStyle}/>
              <View style={styles.redCountStyle}>
                <Text style={styles.notifCountStyle}>{notifications.get('public') > 5 ? '+' : notifications.get('public')}</Text>
              </View>
            </TouchableOpacity>
            */}

          {/* in-app notification when user has received a new message under private chats or a new private chat invite */}
          {/*
            <TouchableOpacity style={styles.candidateStyle} onPress={() => this.clickPrivateIcon()}>
              <View style={styles.privateStyle}/>
              <View style={styles.redCountStyle}>
                <Text style={styles.notifCountStyle}>{notifications.get('private') > 5 ? '+' : notifications.get('private')}</Text>
              </View>
            </TouchableOpacity>
            */}
        </View>

        {/*
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <Container style={this.state.is_public == true ? styles.publicContainerStyle : styles.privateContainerStyle}>
            <Content>
              <View style={{ alignSelf: 'center' }}>
                {this.state.isPrivate ? (
                  <Text style={styles.privateTextStyle}>active private chat</Text>
                ) : (
                  <Text style={styles.publicTextStyle}>available public chat channels</Text>
                )}
              </View>
              {this.state.isPrivate ? (
                <View style={{ marginTop: 10, margin: 10 }}>
                  {this.displayChatList(data.filter(item => item.sharedWith === 'friends'))}
                </View>
              ) : (
                <View style={{ marginTop: 10, margin: 10 }}>
                  {this.displayChatList(data.filter(item => item.sharedWith === 'everyone'))}
                </View>
              )}
            </Content>
          </Container>

          <View
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              top: deviceHeight / 4.9,
              right: 18,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.WHITE,
              borderRadius: 15,
              borderWidth: 3,
              borderColor: COLORS.WHITE
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Image
                style={{
                  alignSelf: 'flex-end',
                  width: 25,
                  height: 25
                }}
                source={ICONS.REMOVE_ICON}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        */}

        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible_pin}
          onRequestClose={() => this.setModalVisiblePin(false)}
        >
          <View style={styles.pinStickStyle}>
            <View
              style={[
                styles.scrollViewStyle,
                {
                  marginTop: this.state.modalPosition.y - Math.floor((deviceHeight * 0.085) / 2),
                },
              ]}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.scrollViewContainer}
                style={{ marginHorizontal: 10 }}
              >
                {this.state.modalData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.candidateStyle,
                      {
                        borderColor: item.sharedWith === 'everyone' ? COLORS.PURPLE : COLORS.BRIGHT_ORANGE,
                        borderWidth: 1,
                        marginTop: index === 0 ? 0.2 : 7.7,
                        borderRadius: deviceHeight * (index === 0 ? 0.056 : 0.034),
                        height: deviceHeight * (index === 0 ? 0.08 : 0.06),
                      },
                    ]}
                    onPress={() => {
                      this.navigateToVideoDetail(item);
                    }}
                  >
                    <Image
                      style={[index === 0 ? styles.biggerAvatar : styles.otherImageStyle]}
                      source={this.populateUserAvatar(item, ICONS.DEFAULT_AVATAR)}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              height: 30,
              width: 30,
              position: 'absolute',
              marginTop: this.state.modalPosition.y - (Math.floor((deviceHeight * 0.085) / 2) + 16),
              right: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.WHITE,
              borderRadius: 15,
              borderWidth: 3,
              borderColor: COLORS.WHITE,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setModalVisiblePin(!this.state.modalVisible_pin);
              }}
            >
              <Image
                style={{
                  alignSelf: 'flex-end',
                  width: 25,
                  height: 25,
                }}
                source={ICONS.REMOVE_ICON}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getVideos, getNotifications, getActivity, markNotificationAsRead,
      }, dispatch
    ),
  };
}

const mapStateToProps = state => ({
  userId: state.user.user.userID,
  isFetching: state.video.isFetching,
  user: state.user.data,
  notifications: state.configure.notifications.toJS(),
});

export default connect(mapStateToProps, bindActions)(GPSViewPage);
