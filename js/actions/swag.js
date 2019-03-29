import { Alert } from 'react-native';
import axios from 'axios';
import config from '../config/appConfig';
import types from '../constants/swag';

export function getSwagLists() {
  return dispatch => {
    dispatch({ type: types.ON_REWARD_FETCHING_REQUEST });

    axios
      .get(config.swagsPath)
      .then(response => {
        dispatch({
          type: types.ON_FETCHING_SWAG_SUCCESS,
          payload: response.data.data
        });
      })
      .catch(error => {
        dispatch({ type: types.ON_REWARD_FETCHING_COMPLETED });
        alert(error.response.data.message);
      });
  };
}

export function bidding(id, amount) {
  return dispatch => {
    dispatch({ type: types.ON_REWARD_FETCHING_REQUEST });

    axios
      .post(config.swagBiddingPath.replace(':id', id), { amount: amount })
      .then(response => {
        dispatch({
          type: types.ON_BIDDING_SWAG_SUCCESS,
          payload: response.data.data
        });
      })
      .catch(error => {
        Alert.alert('failure', error.response.data.message);
        dispatch({
          type: types.ON_BIDDING_SWAG_FAILURE,
          payload: { id: id, message: error.response.data.message }
        });
      });
  };
}

export function realTimeBidding(data) {
  if (__DEV__) {
    console.log(data);
  }
  return { type: types.REAL_TIME_BIDDING_UPDATE, payload: data };
}
