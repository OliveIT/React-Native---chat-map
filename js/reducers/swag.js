import { Record, fromJS, Map } from 'immutable';
import createReducers from '../utils/createReducers';
import types from '../constants/swag';

const Form = Record({
  isFetching: false,
  data: fromJS({}),
  currentBid: fromJS({}),
  error: fromJS({})
});

let initialState = new Form();

export default createReducers(initialState, {
  [types.ON_REWARD_FETCHING_REQUEST]: state => {
    return state.set('isFetching', true);
  },
  [types.ON_REWARD_FETCHING_COMPLETED]: state => {
    return state.set('isFetching', false);
  },
  [types.ON_FETCHING_SWAG_SUCCESS]: (state, { payload }) => {
    return state.set('data', fromJS(payload)).set('isFetching', false);
  },
  [types.REAL_TIME_BIDDING_UPDATE]: (state, { payload }) => {
    const index = state
      .getIn(['data', payload.type])
      .findIndex(swag => swag.get('_id') === payload.id);
    if (index > -1) {
      return state.updateIn(['data', payload.type, index, 'biddings'], item =>
        fromJS([payload.bidding]).concat(item)
      );
    }
    return state;
  },
  [types.ON_BIDDING_SWAG_SUCCESS]: (state, { payload }) => {
    const index = state
      .getIn(['data', payload.type])
      .findIndex(reward => reward._id === payload.id);
    if (index > -1) {
      return state
        .set('isFetching', false)
        .updateIn(['data', payload.type, index, 'biddings'], item =>
          fromJS(payload.bidding).concat(item)
        );
    }
    return state.set('isFetching', false);
  },
  [types.ON_BIDDING_SWAG_FAILURE]: (state, { payload }) => {
    return state.set('isFetching', false).set('error', fromJS(payload));
  }
});
