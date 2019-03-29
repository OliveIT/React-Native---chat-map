import createReducers from '../utils/createReducers';
import types from '../constants/chat';
import _ from 'lodash';

const initialState = {
  roomName: 'Public Channel',
  numberOfPerson: 0,
  message: [],
  isFetching: false,
  zones: {},
  availableZones: {},
  memberCount: 0,
  isSearching: false
};

export default createReducers(initialState, {
  [types.SET_PUBLICCHATROOMNAME]: (state, { payload }) => {
    return {
      ...state,
      roomName: payload
    };
  },
  [types.ON_FETCHING_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.ON_FETCHING_SEARCH_REQUEST]: state => {
    return { ...state, isSearching: true };
  },
  [types.ON_FETCHING_COMPLETED]: state => {
    return { ...state, isFetching: false };
  },
  [types.ON_FETCHING_ZONE_FILTER_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      isSearching: false,
      zones: _.groupBy(payload, 'type')
    };
  },
  [types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      availableZones: payload
    };
  },
  [types.ON_JOIN_ZONE_SUCCESS]: (state, { amount }) => {
    return {
      ...state,
      memberCount: amount
    };
  }
});
