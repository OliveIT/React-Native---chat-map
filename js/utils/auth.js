import { AsyncStorage, Platform, AppState } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Sentry, SentrySeverity } from 'react-native-sentry';
import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult } from 'react-native-fcm';
import axios from 'axios';
import config from '../config/appConfig';
import firebase from '../components/firebase';
import { getActivity } from '../actions/activities';
import { getStore } from '../configureStore';
import { getNotifications, markNotificationAsRead } from '../actions/configure';
import { getCurrentUserDetail } from '../actions/user';

const STORAGE_KEY = '@vedioHead:token';

let actions;
let observers = [];
let token = '';
export function resetToken() {
  clearToken().finally(() => {

  });
}

export function setHeader(token) {
  axios.defaults.baseURL = config.baseUrl;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.defaults.headers.common.accept = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post.accept = 'application/json';
  AsyncStorage.setItem(STORAGE_KEY, token);
}

export async function clearToken() {
  if (token !== '') {
    await axios.delete(config.createTokenPath, {
      device: {
        token,
        platform: Platform.OS,
      },
    });
  }
  delete axios.defaults.headers.common.Authorization;
  await firebase.auth().signOut();
  observers = [];
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function getToken() {
  axios.defaults.baseURL = config.baseUrl;
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    if (value !== null) {
      setHeader(value);
    }
    return value;
  } catch (e) {
    return null;
  }
}

export async function saveDeviceToken() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    token = await firebase.messaging().getToken();
    await axios.post(config.createTokenPath, {
      token,
      platform: Platform.OS,
    });
    listenMessages();
  } else {
    try {
      await firebase.messaging().requestPermission();
      await saveDeviceToken();
    } catch (error) {
      console.log({ error });
    }
  }
}
export function listenMessages() {
  FCM.getInitialNotification().then((notification) => {
    if (notification) {
      processNotification(notification.opened_from_tray, { ...notification, data: notification });
    }
  });
  FCM.on(FCMEvent.Notification, (notification) => {
    processNotification(notification.opened_from_tray, { ...notification, data: notification });
  });
  // firebase.notifications().onNotificationOpened(({ notification }) => processNotification(true, notification));
  // firebase.notifications().onNotification(async (notification) => {
  //   processNotification(false, notification);
  //   try {
  //     await firebase.notifications().displayNotification(notification);
  //   } catch (e) {
  //     console.log({ error: e });
  //   }
  // });
  actions = bindActionCreators({
    getActivity, markNotificationAsRead, getCurrentUserDetail,
  }, getStore().dispatch);
}


function processNotification(isOpened, { data }) {
  if (Platform.OS === 'ios') {
    switch (data._notificationType) {
      case NotificationType.Remote:
        data.finish(RemoteNotificationResult.NewData); // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
        break;
      case NotificationType.NotificationResponse:
        data.finish();
        break;
      case NotificationType.WillPresent:
        data.finish(WillPresentNotificationResult.All); // other types available: WillPresentNotificationResult.None
        break;
      default:
        break;
    }
  }
  if (!isOpened) {
    getStore().dispatch(getNotifications());
    actions.getCurrentUserDetail();
    return;
  }

  switch (data.type) {
    case 'video':
      if (data.referenceInfo === 'comment') {
        actions.getActivity(data.video_id, () => {
          Actions.comment({ id: data.video_id });
        });
        actions.markNotificationAsRead(data.notification_id);
      } else {
        // Actions.videoDetail({
        //   id: data.video_id,
        // });
        Actions.gpsView({
          focusOnPin: new Date().getTime() + 200,
          location: JSON.parse(data.location),
          position: JSON.parse(data.position),
          type: 'replace'
        });
      }
      break;
    case 'chat':
      actions.getActivity(data.video_id, () => {
        Actions.comment({ id: data.video_id });
      });
      actions.markNotificationAsRead(data.notification_id);
      break;
    case 'friend':
      Actions.accountView({ userId: data.user_id });
      actions.markNotificationAsRead(data.notification_id);
      break;
    case 'friend-connect':
      Actions.accountView({ userId: data.user_id });
      actions.markNotificationAsRead(data.notification_id);
      break;
    case 'friend-reject':
      Actions.accountView({ userId: data.user_id });
      actions.markNotificationAsRead(data.notification_id);
      break;
    case 'friend-block':
      Actions.accountView({ userId: data.user_id });
      actions.markNotificationAsRead(data.notification_id);
      break;
  }
}
