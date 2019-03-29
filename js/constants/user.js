import createConstants from '../utils/createConstants';

const types = createConstants(
  'SET_USER',
  'SIGN_UP',
  'LOG_IN',
  'LOGIN_SUCCESS',
  'LOGIN_SIGNUP_FAILED',
  'LOGIN_FAILURE',
  'LOG_OUT',
  'CONFIRM_EMAIL',
  'RESET_SIGN',
  'START_LOADING',
  'END_LOADING',
  'SET_CURRENT_PAGE',
  'ON_PHONE_SIGNUP_REQUEST',
  'ON_PHONE_SIGNUP_SUCCESS',
  'ON_LOGIN_REQUEST',
  'ON_TOGGLE_TERM_CONDITION',
  'ON_SIGNUP_REQUEST',
  'ON_SIGNUP_SUCCESS',
  'ON_SIGNUP_FAILURE',
  'ON_CHECK_USERNAME_REQUEST',
  'ON_CHECK_USERNAME_SUCCESS',
  'ON_CHECK_USERNAME_FAILURE',
  'ON_UPDATE_USERNAME_REQUEST',
  'ON_UPDATE_USERNAME_SUCCESS',
  'ON_UPDATE_USERNAME_FAILURE',
  'ON_RESET_PASSWORD_REQUEST',
  'ON_RESET_PASSWORD_SUCCESS',
  'ON_RESET_PASSWORD_FAILURE',
  'ON_FETCHING_REQUEST',
  'ON_FETCHING_COMPLETED',
  'ON_SHOW_TOGGLE_TERM_CONDITION',
  'ON_FETCH_USER_PROFILE_SUCCESS',
  'ON_FETCHING_CREDIT_SUCCESS',
  'ON_FETCHING_CREDIT_FAILURE',
  'REAL_TIME_CREDIT_UPDATE',
  'ON_UPDATE_DETAIL_SUCCESS',
  'ON_UPDATE_DETAIL_FAILURE',
  'ON_UPLOAD_AVATAR_SUCCESS',
  'ON_UPLOAD_AVATAR_FAILURE',
  'ON_FETCHING_ACCOUNT_VIDEOS_REQUEST',
  'ON_FETCHING_ACCOUNT_VIDEOS_SUCCESS',
  'ON_FETCHING_ACCOUNT_VIDEO_COMPLETED',
  'ON_FETCHING_PROFILE_REQUEST',
  'ON_FETCHING_PROFILE_FAILURE',
  'ON_UPDATE_NOTIFICATION_SUCCESS',
  'ON_UPDATE_NOTIFICATION_FAILURE',
  'ON_LOGOUT_SUCCESS',
  'ON_FETCHING_USER_FRIENDS_REQUEST',
  'ON_FETCHING_USER_FRIENDS_SUCCESS',
  'ON_FETCHING_USER_FRIENDS_SUCCESS',
  'ON_UPDATE_DESCRIPTION_SUCCESS',
  'ON_USER_SEARCH_FRIEND_SUCCESS',
  'ON_FETCH_USER_DETAILS_SUCCESS',
  'ON_FETCH_USER_DETAILS_FAILURE',
  'REMOVE_VIDEOS',
);

export default types;
