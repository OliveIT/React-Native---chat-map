import React, { PureComponent } from "react";
import { Text, View, TextInput, Image, StatusBar, Platform } from "react-native";
import { Drawer } from "native-base";
import { connect } from "react-redux";
import { Router, Scene, ActionConst, Actions, Reducer } from "react-native-router-flux";
import PropTypes from "prop-types";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import { closeDrawer } from "./actions/drawer";
import { COLORS, ICONS } from "./constants";
// login and registration screens
import FirstScreen from "./components/FirstScreen";
import Login from "./components/FirstScreen/login";
import Signup from "./components/FirstScreen/signup";
import PhoneSignup from "./components/FirstScreen/phoneSignupPage";
import ConfirmCodePage from "./components/FirstScreen/confirmcodePage";
import UsernameView from "./components/FirstScreen/setUsernamePage";
import NewPassword from "./components/FirstScreen/newPassword";
// rewards panel
import SwagPanel from "./containers/SwagPanel";
import SwagDetailPanel from "./containers/SwagDetailPanel";
// activity feed screens
import GPSView from "./components/GPSView";
import VedioPlayView from "./components/GPSView/VedioPlayView";
import VideoDetail from "./components/GPSView/videoDetailPanel";
import ContentReporting from "./components/GPSView/videoDetailPanel/ContentReporting";
import ContentReportedDetail from "./components/GPSView/videoDetailPanel/ContentReportedDetail";
import OptionsView from "./components/GPSView/optionsView";
import DetailsView from "./components/GPSView/optionsView/DetailsView";
import SettingsView from "./containers/SettingsView";
import SecurityView from "./containers/SecurityView";
import Account from "./containers/Account";
// private and public chat screens
import PublicChat from "./containers/PublicChat";
import PrivateChat from "./containers/PrivateChat";
import ChatRoom from "./containers/ChatRoom";
import FriendFinder from "./containers/FriendFinder";
import RecordVedioView from "./containers/RecordVedio";
import Comment from "./containers/Comment";
import PendingChatDetail from "./containers/PendingChatDetail";
// verification screens
import BountyVerificationList from "./components/BountyVerificationView";
// navigation
import TabIcon from "./components/subComponents/TabIcon";
// import SideBar from "./components/sideBar";
// alerts and warning screens
import GPSAlert from "./components/commons/GPSAlert";
import NbIcon from "./components/commons/NbIcon";

// const RouterWithRedux = connect(state => ({ state: state.route }))(Router);
const prefix =
  Platform.OS === "android" ? "vediohead://vediohead/" : "vediohead://";
const SceneConfig = {
  cardStyle: {
    backgroundColor: COLORS.WHITE,
    margin: 0
  }
};

const navigator = Actions.create(
  <Scene key="root" {...SceneConfig} hideNavBar>
    <Scene key="FirstScreenMain" initial type={ActionConst.REPLACE} hideNavBar>
      <Scene key="firstScreen" component={FirstScreen} hideNavBar />
      <Scene key="login" component={Login} hideNavBar />
      <Scene key="signup" component={Signup} hideNavBar />
      <Scene key="phonesignup" component={PhoneSignup} hideNavBar />
      <Scene key="usernameScreen" component={UsernameView} hideNavBar />
      <Scene key="newPassword" component={NewPassword} hideNavBar />
      <Scene key="confirmcodepage" component={ConfirmCodePage} hideNavBar />
    </Scene>

    <Scene
      key="tabbar"
      tabs
      type={ActionConst.RESET}
      lazy
      tabBarPosition="bottom"
      tabBarStyle={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.TRANSPARENT,
        height: Platform.OS === "ios" ? 40 : 30,
        margin: 0
      }}
      showLabel={false}
      swipeEnabled={false}
      animationEnabled={false}
    >
      <Scene
        key="recordMainView"
        icon={({ focused }) => (
          <FontAwesome5Pro
            name="video-plus"
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.TRANSPARENT,
              marginVertical: Platform.OS === "ios" ? 40 : 0,
              width: 36,
              height: 30
            }}
            size={28}
            color={focused ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
            light={focused ? false : true}
          />
        )}
        hideNavBar
      >
        <Scene
          key="recordView"
          type={ActionConst.REPLACE}
          component={RecordVedioView}
          hideNavBar
          animationEnabled={false}
        />
      </Scene>

      <Scene
        key="gpsMainView"
        onEnter={() => console.log('trigger me')}
        icon={({ focused }) => (
          <FontAwesome5Pro
            name="map-marker-smile"
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.TRANSPARENT,
              marginVertical: Platform.OS === "ios" ? 40 : 0,
              marginLeft: Platform.OS === "ios" ? 8 : 0, // only applicable to map-marker-smile
              width: 36,
              height: 30
            }}
            size={28}
            color={focused ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
            light={focused ? false : true}
          />
        )}
        hideNavBar
      >
        <Scene key="gpsView" component={GPSView} hideNavBar />
        <Scene key="accountView" component={Account} hideNavBar />
        <Scene key="optionsView" component={OptionsView} hideNavBar />
        <Scene key="settingsView" component={SettingsView} hideNavBar />
        <Scene key="detailsView" component={DetailsView} hideNavBar />
        <Scene key="securityView" component={SecurityView} hideNavBar />
        <Scene key="friendFinderView" component={FriendFinder} hideNavBar />
        <Scene key="videoDetail" component={VideoDetail} hideNavBar />
        <Scene key="comment" hideTabBar component={Comment} hideNavBar />
        <Scene
          key="contentReporting"
          hideTabBar
          component={ContentReporting}
          hideNavBar
        />
        <Scene
          key="contentReportedDetail"
          hideTabBar
          component={ContentReportedDetail}
          hideNavBar
        />
        <Scene key="vedioplayView" component={VedioPlayView} hideNavBar />
        <Scene key="privateView" component={PrivateChat} hideNavBar />
        <Scene
          key="pendingChatDetail"
          component={PendingChatDetail}
          hideNavBar
        />
      </Scene>

      <Scene
        key="publicView"
        component={PublicChat}
        icon={({ focused }) => (
          <FontAwesome5Pro
            name="bullhorn"
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.TRANSPARENT,
              marginVertical: Platform.OS === "ios" ? 40 : 0,
              width: 36,
              height: 30
            }}
            size={28}
            color={focused ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
            light={focused ? false : true}
          />
        )}
        hideNavBar
      />

      <Scene
        key="bountyVerificationView"
        component={BountyVerificationList}
        icon={({ focused }) => (
          <FontAwesome5Pro
            name="gavel"
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.TRANSPARENT,
              marginVertical: Platform.OS === "ios" ? 40 : 0,
              width: 36,
              height: 30
            }}
            size={28}
            color={focused ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
            light={focused ? false : true}
          />
        )}
        hideNavBar
      />

      <Scene
        key="privateMainView"
        icon={({ focused }) => (
          <FontAwesome5Pro
            name="gift"
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.TRANSPARENT,
              marginVertical: Platform.OS === "ios" ? 40 : 0,
              width: 36,
              height: 30
            }}
            size={28}
            color={focused ? COLORS.TEXT_GREY : COLORS.BRIGHT_ORANGE}
            light={focused ? false : true}
          />
        )}
        hideNavBar
      >
        <Scene key="swagPanel" component={SwagPanel} hideNavBar />
        <Scene key="swagDetailPanel" component={SwagDetailPanel} hideNavBar />
      </Scene>
    </Scene>

    <Scene key="chatRoom" component={ChatRoom} hideNavBar />
  </Scene>
);

class AppNavigator extends React.PureComponent {
  static propTypes = {
    drawerState: PropTypes.string,
    closeDrawer: PropTypes.func
  };

  constructor() {
    super();

    console.ignoredYellowBox = [
      // TODO, temporarily ignored
      "Setting a timer",
      "You are setting the style `{ borderWidth: ... }` as a prop."
    ];

    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  componentDidUpdate() {
    if (this.props.drawerState === "opened") this.openDrawer();
    if (this.props.drawerState === "closed") this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === "opened") this.props.closeDrawer();
  }

  // componentWillUnmount() {
  //   if (Platform.OS === "android") {
  //     StatusBar.setTranslucent(true);
  //   }
  //   StatusBar.setHidden(true);
  // }

  render() {
    const reducerCreate = params => {
      const defaultReducer = new Reducer(params);
      return (state, action) => {
        this.props.dispatch(action);
        return defaultReducer(state, action);
      };
    };

    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        type="overlay"
        tweenDuration={150}
        content={<View />}
        // content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        tweenHandler={ratio => {
          // eslint-disable-line
          return {
            main: { opacity: (2 - ratio) / 2 }
          };
        }}
        negotiatePan
      >
        <GPSAlert visible={true} onClose={() => {}} />
        <Router
          createReducer={reducerCreate}
          navigator={navigator}
          uriPrefix={prefix}
        />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    dispatch: dispatch
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation
});

export default connect(
  mapStateToProps,
  bindAction
)(AppNavigator);
