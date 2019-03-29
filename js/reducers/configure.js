import { PushNotificationIOS, Platform } from 'react-native';
import { Record, fromJS } from 'immutable';
import createReducers from '../utils/createReducers';
import types from '../constants/configure';

const Form = Record({
  token: fromJS({}),
  notifications: fromJS([])
});

let initialState = new Form();

export default createReducers(initialState, {
  [types.ON_ADD_TOKEN]: (state, { payload }) => {
    return state.set('token', fromJS(payload));
  },
  [types.ON_GET_NOTIFICATIONS]: (state, { payload }) => {
    return state.set('notifications', fromJS(payload));
  },
  [types.ON_MARK_NOTIFICATION_AS_READ]: (state, { payload }) => {
    const data = state.get('notifications').toJS();
    const notifications = (data.filter ? data : []).filter(item => item._id !== payload);
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(notifications.length);
    }
    return state.set('notifications', fromJS(notifications));
  }
});
