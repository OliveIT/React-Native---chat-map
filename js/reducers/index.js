import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import notification from './notification';
import drawer from './drawer';
import user from './user';
import types from '../constants/user';
import list from './list';
import publicChat from './publicChat';
import video from './video';
import privateChat from './privateChat';
import activities from './activities';
import routes from './routes';
import swag from './swag';
import configure from './configure';

const appReducer = combineReducers({
  form: formReducer,
  drawer,
  user,
  notification,
  list,
  publicChat,
  video,
  privateChat,
  activities,
  routes,
  swag,
  configure
});

const rootReducer = (state, action) => {
  let currentState = state;
  if (action.type === types.ON_LOGOUT_SUCCESS) {
    currentState = undefined;
  }
  return appReducer(currentState, action);
};

export default rootReducer;
