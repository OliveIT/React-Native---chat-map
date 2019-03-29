import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import config from '../config/appConfig';
import types from '../constants/video';
import { startGroupChat } from './privateChat';

export const onLikeSuccess = payload => ({
  type: types.ON_LIKE_VIDEO_SUCCESS,
  payload,
});

export const realTimeComment = payload => ({
  type: types.ON_REAL_TIME_COMMENT,
  payload,
});

export function onUploadVideo(userId, file, object, options) {
  return (dispatch) => {
    const formdata = new FormData();
    formdata.append('path', file);

    Object.keys(object).map(key => formdata.append(key, object[key]));
    if (file) {
      dispatch({ type: types.ON_UPLOAD_VIDEO_REQUEST });
      axios
        .post(config.uploadVideoPath.replace(':userId', userId), formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
        })
        .then((response) => {
          const data = response.data.vedio;
          dispatch({
            type: types.ON_UPLOAD_VIDEO_SUCCESS,
            payload: {
              data,
              uploadDone: true,
            },
          });
          if (Object.keys(options).length > 0) {
            dispatch(
              startGroupChat(
                {
                  room_name: options.room_name,
                  user_ids: options.user_ids,
                },
                options.thumbUrl,
                data.url
              )
            );
            return;
          }
          Actions.gpsMainView({
            focusOnPin: new Date().getTime(),
            position: {
              lat: object.lat,
              lon: object.lon,
            }
          });
        })
        .catch((error) => {
          dispatch({ type: types.ON_VIDEO_FETCHING_COMPLETED });
          alert(JSON.stringify(error.response.data));
        });
    } else {
      Alert.alert('file missing', 'please try again.');
    }
  };
}

const requests = new Map();
export function getVideos(location = { lat: 0.0, lon: 0.0 }, callback) {
  return (dispatch) => {
    const key = `${location.lat}-${location.lon}-${location.distance}`;
    if (requests.has(key)) {
      return;
    }
    requests.set(key, true);
    dispatch({ type: types.ON_VIDEO_FETCHING_REQUEST });
    axios
      .get(config.videosPath, { params: { ...location } })
      .then((response) => {
        const { vedios } = response.data;
        callback(vedios);
        dispatch({ type: types.ON_FETCHING_VIDEOS_SUCCESS, payload: vedios, key });
      })
      .catch((error) => {
        dispatch({ type: types.ON_VIDEO_FETCHING_COMPLETED });
      }).finally(() => {
        requests.delete(key);
      });
  };
}
