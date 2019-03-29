import React, { PureComponent } from 'react';
import {
  Text, View, Dimensions, Platform, TouchableOpacity, Image, Modal, StatusBar, Alert, ActivityIndicator,
} from 'react-native';
import {
  Container, Grid, Row, Col,
} from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { TabViewAnimated } from 'react-native-tab-view';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import Likes from './Likes';
import Home from './Home';
import FriendList from './FriendList';
import VideoPlayer from '../VedioPlayView';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import ErrorPage from '../../commons/ErrorPage';
import { COLORS, ICONS } from '../../../constants';
import headerStyle from '../../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const MAX_FILE_SIZE = 5197152; // 5 MB limit
const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class AccountView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: props.user.photoUrl
        ? { uri: props.user.photoUrl }
        : ICONS.DEFAULT_AVATAR,
      isHeart: false,
      isHome: true,
      isFriend: false,
      playVideo: false,
      paused: false,
      modalHeight: 250,
      addFriendModal: false,
      index: 1,
      routes: [
        { key: 'first', title: 'Likes' },
        { key: 'second', title: 'Home' },
        { key: 'third', title: 'Friends' },
      ],
      isUpdate: false,
      currentTime: null,
    };
  }

  componentWillMount() {
    this.getProfile();
  }

  getProfile() {
    this.props.actions.getProfile(this.props.userId);
  }

  componentDidMount() {
    this.props.actions.accountVideos({ userId: this.props.userId });
    this.getCurrentTime();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.WHITE);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profile === undefined && nextProps.profile !== undefined) {
      const avatar = nextProps.profile.photoUrl !== ''
        ? { uri: nextProps.profile.photoUrl }
        : ICONS.DEFAULT_AVATAR;
      this.setState({ avatar });
    }
  }

  getAvatar() {
    let profile = this.getCurrentProfile();
    const user = { ...this.props.user };
    if (profile._id === user._id) {
      profile = user;
    }
    return profile.photoUrl !== '' ? { uri: profile.photoUrl } : ICONS.DEFAULT_AVATAR;
  }

  clickReturn = () => {
    Actions.popTo();
  };

  clickPrivateChat = () => {
    Actions.privateView();
  };

  editProfilePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else if (response.fileSize <= MAX_FILE_SIZE) {
        const uri = Platform.OS === 'ios' ? response.uri : `file://${response.path}`;
        this.setState({
          avatarSource: { uri },
          isUpdate: true,
        });
        this.props.actions.uploadAvatar(uri);
      } else {
        Alert.alert(
          'File too large',
          'Maximum file size of 5 MB is allowed.',
          [
            {
              text: 'OK',
              onPress: () => this.editProfilePhoto(),
            },
          ]
        );
      }
    });
  };

  _handleIndexChange = (index) => {
    if (index === 0) {
      this.setState({
        index: 0,
      });
      if (this.props.isOwner || this.isFriend()) {
        this.props.actions.accountVideos({
          like: true,
          userId: this.getCurrentProfile()._id,
        });
      } else {
        this.props.actions.addFriend(
          this.props.userId,
          () => {
            this.getProfile();
            this.props.actions.getCurrentUserDetail();
            Alert.alert('success', 'friend request sent');
            // },
            // function() {
            //   Alert.alert('error', 'while adding friend');
            // this.props.action.getActiveFriends();
          }
        );
      }
    } else if (index === 1) {
      this.setState({
        index: 1,
      });
    } else if (index === 2) {
      this.setState({
        index: 2,
      }, () => {
        if (this.props.friends.length <= 0) { this.props.actions.getCurrentUserDetail(); }
      });
    }
  };

  onPlayVideo = (url) => {
    this.setState({
      currentVideoUrl: url,
      playVideo: true,
    });
  };

  closeModal() {
    this.setState({
      addFriendModal: false,
    });
  }

  _renderHeader = props => <View />;

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <Likes
            {...this.props}
            {...this.state}
            profile={this.getCurrentProfile()}
            onPlayVideo={this.onPlayVideo}
          />
        );
      case 'second':
        return (
          <Home
            {...this.props}
            {...this.state}
            profile={this.getCurrentProfile()}
            onPlayVideo={this.onPlayVideo}
          />
        );
      case 'third':
        return (
          <FriendList
            {...this.props}
            {...this.state}
            friends={this.getFriends()}
            profile={this.getCurrentProfile()}
            closeModal={this.closeModal.bind(this)}
          />
        );
      default:
        return <View />;
    }
  };

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

  componentWillUnmount() {
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
    this.props.actions.removeVideos(this.getCurrentProfile()._id);
  }

  getCurrentProfile() {
    const profile = { ...(this.props.profile || this.props.user) };
    const user = { ...this.props.user };
    if (profile._id === user._id) {
      return user;
    }
    return profile;
  }

  getFriends() {
    const profile = this.getCurrentProfile();
    const friendReducer = (data, friendType) => Array.from(data.reduce((all, item) => {
      if (!all.has(item._id)) {
        all.set(item._id, {
          ...item,
          friendType,
        });
      }
      return all;
    }, new Map()).values());
    const friendsList = friendReducer(profile.friends || [], 'friend');
    if (this.props.isOwner) {
      return friendReducer(profile.receivedRequest || [], 'receivedRequest')
        .concat(...friendsList);
    }
    return friendsList;
  }

  hasId(items, id) {
    return items.map(item => item._id).includes(id);
  }

  isFriendRequest() {
    const profile = this.getCurrentProfile();
    const user = { ...this.props.user };
    if (profile._id === user._id) {
      return false;
    }
    return this.hasId(user.receivedRequest, profile._id);
  }

  isBlocked() {
    const profile = this.getCurrentProfile();
    const user = { ...this.props.user };
    if (profile._id === user._id) {
      return false;
    }
    return this.hasId(user.blockedFriends, profile._id)
     || this.hasId(profile.blockedFriends, user._id);
  }

  isFriend() {
    const profile = this.getCurrentProfile();
    const user = { ...this.props.user };
    if (profile._id === user._id) {
      return false;
    }
    return this.hasId(user.friends, profile._id);
  }

  hasSentRequest() {
    const profile = this.getCurrentProfile();
    const user = { ...this.props.user };
    if (profile._id === user._id) {
      return false;
    }
    return this.hasId(user.sentRequest, profile._id);
  }

  async acceptRequest() {
    this.props.actions.acceptFriend(this.props.profile._id, () => {
      this.getProfile();
      this.props.actions.getCurrentUserDetail();
      this.props.actions.getNotifications();
    });
  }

  async rejectRequest() {
    this.props.actions.rejectFriend(this.props.profile._id, () => {
      this.getProfile();
      this.props.actions.getCurrentUserDetail();
      this.props.actions.getNotifications();
    });
  }

  async blockRequest() {
    this.props.actions.blockFriend(this.props.profile._id, () => {
      this.getProfile();
      this.props.actions.getCurrentUserDetail();
      this.props.actions.getNotifications();
    });
  }

  renderFriendRequest() {
    return (
      <View style={styles.friendRequest}>
        <TouchableOpacity
          style={styles.acceptRequest}
          onPress={this.acceptRequest.bind(this)}
        >
          <Text style={styles.textButton}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ignoreRequest}
          onPress={this.rejectRequest.bind(this)}
        >
          <Text style={styles.textButton}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blockRequest}
          onPress={this.blockRequest.bind(this)}
        >
          <Text style={styles.textButton}>Block</Text>
        </TouchableOpacity>
      </View>
    );
  }

  isSelected() {
    if (!this.props.isOwner && !this.isFriend()) {
      return this.isFriendRequest();
    }
    return this.state.index === 0;
  }

  render() {
    const {
      profile,
      likeVideos,
      videos,
      videoFetching,
      user,
      isFetching,
      isOwner,
    } = this.props;
    const {
      playVideo,
      addFriendModal,
      isHeart,
      isHome,
      isFriend,
    } = this.state;

    if (this.props.isInternalError) {
      return (
        <Container style={styles.container}>
          <Header
            backgroundColor={COLORS.WHITE}
            leftComponent={(
              <BackButton
                onPress={() => Actions.pop()}
              />
            )}
            centerComponent={(
              <Title
                title={profile ? profile.username : ''}
                color={COLORS.BRIGHT_ORANGE}
              />
            )}
            rightComponent={<View style={{ width: deviceWidth / 8 }} />}
            {...headerStyle}
          />
          <ErrorPage />
        </Container>
      );
    }

    return (
      <Container style={styles.container}>
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={<BackButton onPress={() => Actions.pop()} />}
          centerComponent={(
            <Title
              title={profile ? profile.username : ''}
              color={COLORS.BRIGHT_ORANGE}
            />
          )}
          rightComponent={isOwner
            ? (
              <TouchableOpacity
                style={{
                  width: deviceWidth / 8,
                  alignItems: 'center',
                }}
                onPress={() => Actions.optionsView()}
              >
                <View style={styles.settingsTouchStyle}>
                  <FontAwesome5Pro
                    name="cog"
                    style={{
                      backgroundColor: COLORS.TRANSPARENT,
                      width: 23,
                      marginBottom: 5,
                    }}
                    size={22}
                    color={COLORS.BRIGHT_ORANGE}
                    light
                  />
                </View>
              </TouchableOpacity>
            )
            : <View style={{ width: deviceWidth / 8 }} />
          }
          {...headerStyle}
        />

        <View style={styles.accountTabsViewStyle}>
          <View style={styles.avatarPlaceholderStyle}>
            {this.state.isUpdate && (
              <View style={styles.avatarViewStyle}>
                <Image
                  style={styles.avatarStyle}
                  source={this.state.avatarSource}
                />
                {this.props.isFetching && (
                  <View style={{ position: 'absolute', left: 0, right: 0 }}>
                    <ActivityIndicator
                      color={COLORS.BRIGHT_ORANGE}
                      size="small"
                    />
                  </View>
                )}
              </View>
            )}
            {!this.state.isUpdate && (
              <View style={styles.avatarViewStyle}>
                <Image
                  style={styles.avatarStyle}
                  source={this.getAvatar()}
                />
              </View>
            )}
            {isOwner && (
            <TouchableOpacity
              onPress={this.editProfilePhoto}
              style={{ position: 'absolute' }}
            >
              <View
                style={{
                  backgroundColor: COLORS.BRIGHT_ORANGE,
                  borderColor: COLORS.WHITE,
                  borderRadius: deviceWidth / 18,
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                  width: deviceWidth / 13,
                  height: deviceWidth / 13,
                }}
              >
                <FontAwesome5Pro
                  name="pen"
                  size={16}
                  color={COLORS.WHITE}
                  light
                />
              </View>
            </TouchableOpacity>
            )}
          </View>

          <View style={styles.accountTabStyle}>
            <Grid>
              <Row
                style={{
                  marginVertical: 12,
                }}
              >
                <Col
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => (this.hasSentRequest() || this.isFriendRequest()) || this._handleIndexChange(0)}
                    style={{ marginHorizontal: deviceWidth * 0.02 }}
                  >
                    <FontAwesome5Pro
                      name={(this.props.isOwner || this.isFriend()) ? 'heart' : 'plus-circle'}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.TRANSPARENT,
                        width: 42,
                      }}
                      size={30}
                      color={(this.isSelected() || this.isFriendRequest() || this.hasSentRequest()) ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
                      light={this.isFriendRequest()}
                    />
                    {(this.hasSentRequest() || this.isFriendRequest()) && <Text style={styles.waitingApprovalText}>Waiting for Approval</Text>}
                  </TouchableOpacity>
                </Col>

                <Col
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this._handleIndexChange(1)}
                    style={{ marginHorizontal: deviceWidth * 0.02 }}
                  >
                    <FontAwesome5Pro
                      name="home-heart"
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.TRANSPARENT,
                        width: 42,
                      }}
                      size={30}
                      color={this.state.index === 1 ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
                      light={isHome != true}
                    />
                  </TouchableOpacity>
                </Col>
              </Row>
              {(this.isFriend() || isOwner) && (
                <Row
                  style={{
                    marginVertical: 12,
                  }}
                >
                  <Col
                    style={{
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this._handleIndexChange(2)}
                      style={{ marginHorizontal: deviceWidth * 0.02 }}
                    >
                      <FontAwesome5Pro
                        name="user-friends"
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: COLORS.TRANSPARENT,
                          width: 42,
                        }}
                        size={30}
                        color={this.state.index === 2 ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
                        light={this.isFriend() != true}
                      />
                    </TouchableOpacity>
                  </Col>
                  <Col
                    style={{
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.clickPrivateChat}
                      style={{ marginHorizontal: deviceWidth * 0.02 }}
                    >
                      <FontAwesome5Pro
                        name="comment"
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: COLORS.TRANSPARENT,
                          width: 42,
                        }}
                        size={30}
                        color={COLORS.BRIGHT_ORANGE}
                        light
                      />
                    </TouchableOpacity>
                  </Col>
                </Row>
              )}
            </Grid>

          </View>
        </View>
        {this.isFriendRequest() ? this.renderFriendRequest() : null}

        <TabViewAnimated
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          useNativeDriver
          animationEnabled={false}
          swipeEnabled={false}
        />

        <Modal
          animationType="fade"
          transparent={false}
          visible={playVideo}
          onRequestClose={() => {
            this.setState({ playVideo: false });
          }}
        >
          <VideoPlayer
            url={this.state.currentVideoUrl}
            onClose={() => {
              this.setState({ playVideo: false });
            }}
          />
        </Modal>
      </Container>
    );
  }
}

export default AccountView;
