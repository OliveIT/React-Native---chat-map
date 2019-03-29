import { ActionConst } from 'react-native-router-flux';
import firebase from '../components/firebase';
import createReducers from '../utils/createReducers';

const initialState = {
  routeName: '',
  params: {}
};

export default createReducers(initialState, {
  [ActionConst.FOCUS]: (state, action) => {
    firebase.analytics().setCurrentScreen(action.routeName);
    return Object.assign({}, state, {
      params: action.params,
      routeName: action.routeName
    });
  }
});
