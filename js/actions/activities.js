import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { onLikeSuccess } from './video';
import config from '../config/appConfig';
import types from '../constants/activities';

export const onReport = (id, name) => {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    return axios
      .post(config.onReportPath.replace(':id', id), { category: name })
      .then(response => {
        Alert.alert('thank you for helping to report this post.');
        return Promise.resolve(true);
      })
      .catch(error => {
        dispatch({ type: types.ON_FETCHING_COMPLETED });
        Alert.alert(
          'something went wrong while you were reporting the post. please try again.'
        );
        return Promise.resolve(true);
      });
  };
};

export const onUpdateViewCounter = id => {
  return dispatch => {
    axios
      .patch(config.updateVedioViewCounterPath.replace(':id', id))
      .then(response => {
        dispatch({
          type: types.ON_UPDATE_COUNTER_SUCCESS,
          payload: response.data.data
        });
      });
  };
};

export const onComment = (id, data, isAudio = true) => {
  return dispatch => {
    const URI = isAudio
      ? config.audioCommentPath.replace(':id', id)
      : config.vedioCommentPath.replace(':id', id);

    axios
      .patch(URI, {
        path: isAudio ? data.audio : data.video,
        thumb: data.thumb
      })
      .then(response => {
        dispatch({
          type: types.ON_COMMENT_SUCCESS,
          payload: response.data.data
        });
      })
      .catch(error => {
        alert('something went wrong.');
      });
  };
};

export const onLike = id => {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });

    axios
      .patch(config.likeVideoPath.replace(':id', id))
      .then(response => {
        dispatch({
          type: types.ON_LIKE_SUCCESS,
          payload: response.data.data
        });
      })
      .catch(error => {
        dispatch({ type: types.ON_FETCHING_COMPLETED });
      });
  };
};

export const getActivity = (id, callback = () => {}) => {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });

    axios
      .get(config.activityPath.replace(':id', id))
      .then(response => {
        dispatch({
          type: types.ON_FETCH_ACTIVITY_SUCCESS,
          payload: response.data.data
        });
        callback && callback();
      })
      .catch(error => {
        dispatch({ type: types.ON_FETCHING_COMPLETED });
      });
  };
};
