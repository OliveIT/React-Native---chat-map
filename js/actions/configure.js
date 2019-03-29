import types from '../constants/configure';
import config from '../config/appConfig';
import axios from 'axios';

export function addToken(payload) {
  return {
    type: types.ON_ADD_TOKEN,
    payload
  };
}

export function pushNotification(data) {
  return dispatch => {
    axios
      .post(config.messagePushNotificationPath, data)
      .then(response => {})
      .catch(error => {});
  };
}

export function getNotifications(page = 1, size = 100) {
  return dispatch => {
    axios.get(config.getNotificationsPath, { page, size }).then(response => {
      dispatch({
        type: types.ON_GET_NOTIFICATIONS,
        payload: response.data.data
      });
    });
  };
}

export function markNotificationAsRead(id) {
  return dispatch => {
    axios
      .put(config.markNotificationAsReadPath.replace(':id', id))
      .then(response => {
        dispatch({ type: types.ON_MARK_NOTIFICATION_AS_READ, payload: id });
      }).catch(error => console.log({error, path: config.markNotificationAsReadPath.replace(':id', id)}));
  };
}
