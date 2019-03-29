import { Record, fromJS, Map } from 'immutable';
import createReducers from '../utils/createReducers';
import types from '../constants/privateChat';
import _ from 'lodash';

const Form = Record({
  isFetching: false,
  activeFriends: fromJS([]),
  searchResult: fromJS([]),
  friends: fromJS([]),
  activeChatsSession: fromJS([])
});

let initialState = new Form();

export default createReducers(initialState, {
  [types.ON_FETCHING_REQUEST]: state => {
    return state.set('isFetching', true);
  },
  [types.ON_FETCHING_COMPLETED]: state => {
    return state.set('isFetching', false);
  },
  [types.ON_FETCHING_ACTIVE_FRIENDS_SUCCESS]: (state, { payload }) => {
    return state.set('isFetching', false).set('activeFriends', fromJS(payload));
  },
  [types.ON_FETCHING_FRIENDS_SUCCESS]: (state, { payload }) => {
    return state
      .set('isFetching', false)
      .set('searchResult', fromJS(payload))
      .set('friends', fromJS(payload));
  },
  [types.ON_GET_ACTIVE_CHAT_SESSION]: (state, { payload }) => {
    return state
      .set('isFetching', false)
      .updateIn(['activeChatsSession'], item => fromJS(payload).concat(item));
  },
  [types.ON_ADD_CHAT_SESSION]: (state, { payload }) => {
    return state.updateIn(['activeChatsSession'], item =>
      fromJS([payload]).concat(item)
    );
  },
  [types.ON_SEARCH_FRIEND_SUCCESS]: (state, { payload, reset = false }) => {
    if (reset) {
      return state.set('searchResult', state.get('friends'));
    }
    return state.set('searchResult', fromJS(payload));
  },
  [types.ON_ADD_MEMBER_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('activeChatsSession')
      .findIndex(item => item.get('_id') === payload._id);
    return state.setIn(
      ['activeChatsSession', index, 'active_users'],
      payload.active_users
    );
  },
  [types.ON_REMOVE_MEMBER_SUCCESS]: (state, { payload, isMind }) => {
    const index = state
      .get('activeChatsSession')
      .findIndex(item => item.get('_id') === payload._id);

    if (isMind) return state.deleteIn(['activeChatsSession', index]);

    return state.setIn(
      ['activeChatsSession', index, 'active_users'],
      payload.active_users
    );
  },
  [types.ON_REMOVE_CHAT_SESSION]: (state, { id }) => {
    const index = state
      .get('activeChatsSession')
      .findIndex(item => item.get('_id') === id);

    return state.deleteIn(['activeChatsSession', index]);
  },
  [types.ON_ACCEPT_CHAT_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('activeChatsSession')
      .findIndex(item => item.get('_id') === payload._id);

    return state
      .setIn(['activeChatsSession', index], fromJS(payload))
      .set('isFetching', false);
  },
  [types.ON_REJECT_CHAT_SUCCESS]: (state, { payload }) => {
    var index = state
      .get('activeChatsSession')
      .findIndex(item => item.get('_id') === payload._id);

    return state
      .deleteIn(['activeChatsSession', index])
      .set('isFetching', false);
  },
  [types.ON_UPDATE_CHAT_SESSION]: (state, { payload, index }) => {
    return state.setIn(['activeChatsSession', index], fromJS(payload));
  }
});
