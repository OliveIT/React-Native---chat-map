import axios from 'axios';
import config from '../config/appConfig';
import types from '../constants/chat';

export function setPublicChatName(name) {
  return {
    type: types.SET_PUBLICCHATROOMNAME,
    payload: name
  };
}

export function onJoinPublicZone(name, id) {
  return dispatch => {
    axios
      .post(config.joinPublicZone.replace(':zoneName', id))
      .then(response => {
        dispatch({
          type: types.ON_JOIN_ZONE_SUCCESS,
          amount: response.data.data.count
        });
      })
      .catch(error => {});
  };
}

export function getZones(query = '', scrollRef, location) {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_SEARCH_REQUEST });
    axios
      .get(config.zonesPath, { params: { query: query, ...location } })
      .then(response => {
        const { data } = response;
        dispatch({
          type: types.ON_FETCHING_ZONE_FILTER_SUCCESS,
          payload: data.zones ? data.zones : []
        });

        setTimeout(() => {
          scrollRef.scrollToEnd({ animated: true });
        }, 50);
      })
      .catch(error => {
        dispatch({ type: types.ON_FETCHING_ZONE_FILTER_SUCCESS, payload: [] });
      });
  };
}

export function getAvailableZones(position) {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });

    axios
      .get(config.availableZonesPath, { params: position })
      .then(response => {
        const { data } = response;
        if (data.status) {
          return dispatch({
            type: types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS,
            payload: {
              // mini: data.mini,
              // minor: data.minor,
              major: data.major,
            }
          });
        }

        dispatch({
          type: types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS,
          payload: {}
        });
      })
      .catch(error => {
        dispatch({
          type: types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS,
          payload: {}
        });
      });
  };
}
