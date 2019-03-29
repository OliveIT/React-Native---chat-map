import { Record, fromJS } from 'immutable';
import type { Action } from '../actions/types';
import createReducers from '../utils/createReducers';
import types from '../constants/video';

const Form = Record({
  isFetching: false,
  data: fromJS([]),
  mapVideos: new Map(),
  accountFetching: false,
  uploadDone: true,
  accountVideos: fromJS([])
});

let initialState = new Form();

export default createReducers(initialState, {
  [types.ON_VIDEO_FETCHING_REQUEST]: state => {
    return state
      .set('isFetching', true)
      .set('data', fromJS([]))
      .set('mapVideos', new Map())
      ;
  },
  [types.ON_UPLOAD_VIDEO_REQUEST]: state => {
    return state
      .set('uploadDone', false);
  },
  [types.ON_VIDEO_FETCHING_COMPLETED]: state => {
    return state.set('isFetching', false)
      .set('uploadDone', true)
      ;
  },
  [types.ON_UPLOAD_VIDEO_SUCCESS]: (state, { payload }) => {
    return state
      .set('uploadDone', true)
      .set('isFetching', false);
  },
  [types.ON_FETCHING_VIDEOS_SUCCESS]: (state, { payload, key }) => {
    if (key) {
      const videos = new Map([
        ...Array.from(state.get('mapVideos').entries()),
      ]);
      videos.set(key, [...payload]);
      return state
        .set('mapVideos', videos)
        .set('isFetching', false);
    }
    return state
      .set('data', fromJS(payload))
      .set('isFetching', false);
  },
  [types.ON_LIKE_VIDEO_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('data')
      .findIndex(item => item.get('_id') === payload._id);

    return state.setIn(['data', index], fromJS(payload));
  },
  [types.ON_REAL_TIME_COMMENT]: (state, { payload }) => {
    const index = state
      .get('data')
      .findIndex(data => data.get('_id') === payload.videoId);
    return state.updateIn(['data', index, 'commentsData'], comments =>
      fromJS([payload]).concat(comments)
    );
  }
});
