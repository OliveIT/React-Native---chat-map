import { Record, fromJS, Map } from 'immutable';
import createReducers from '../utils/createReducers';
import types from '../constants/activities';

const Form = Record({
  isFetching: false,
  data: fromJS([])
});

let initialState = new Form();

export default createReducers(initialState, {
  [types.ON_FETCHING_REQUEST]: state => {
    return state.set('isFetching', true);
  },
  [types.ON_FETCHING_COMPLETED]: state => {
    return state.set('isFetching', false);
  },
  [types.ON_FETCH_ACTIVITY_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('data')
      .findIndex(item => item.get('id') === payload.id);

    if (index > -1) {
      return state
        .set('isFetching', false)
        .setIn(['data', index], fromJS(payload));
    }

    return state
      .set('isFetching', false)
      .updateIn(['data'], item => fromJS([payload]).concat(item));
  },
  [types.ON_LIKE_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('data')
      .findIndex(item => item.get('id') === payload.id);

    return state
      .set('isFetching', false)
      .setIn(['data', index, 'likes'], fromJS(payload.likes))
      .setIn(['data', index, 'likeCount'], fromJS(payload.likeCount))
      .setIn(['data', index, 'isLike'], payload.isLike);
  },
  [types.ON_UPDATE_COUNTER_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('data')
      .findIndex(item => item.get('id') === payload.id);

    return state
      .setIn(['data', index, 'views'], fromJS(payload.views))
      .setIn(['data', index, 'viewCount'], payload.viewCount);
  },
  [types.ON_COMMENT_SUCCESS]: (state, { payload }) => {
    const index = state
      .get('data')
      .findIndex(item => item.get('id') === payload.id);

    return state
      .setIn(['data', index, 'commentCount'], payload.commentCount)
      .setIn(['data', index, 'comments'], fromJS(payload.comments))
      .setIn(['data', index, 'commentsData'], fromJS(payload.commentsData));
  }
});
