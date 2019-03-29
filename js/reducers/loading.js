import type { Action } from '../actions/types';

export type State = {
  loading: {
    isLoading: 0
  }
}

const initialState = {
  loading: {
    isLoading: 0
  }
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === "START_LOADING") {
    var temp = Object.assign({},state.loading);
    temp.isLoading = 1;
    return {
      ...state,
      loading: temp
    };
  }
  if (action.type === "END_LOADING") {
    var temp = Object.assign({},state.loading);
    temp.isLoading = 2;
    return {
      ...state,
      loading: temp
    }
  }
  return state;
}
