import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SocketIOClient from 'socket.io-client';
import type { Action } from './types';
import { notify_stop, update_start } from './notification';
import { onRealTimeChatInvited } from './privateChat';
import { realTimeBidding } from './swag';
import { realTimeComment } from './video';
// import { getAvailableZones } from './publicChat';
// import { getNotifications } from './configure';
import config from '../config/appConfig';
import Api from '../lib/api';
import { setHeader, resetToken, saveDeviceToken } from '../utils/auth';
import types from '../constants/user';

function connectSocket(userId, dispatch) {
  const socket = SocketIOClient(config.socketUrl);
  socket.on(`${userId}-credit`, (data) => {
    dispatch({
      type: types.REAL_TIME_CREDIT_UPDATE,
      payload: data,
    });
  });

  socket.on('biddings', (data) => {
    dispatch(realTimeBidding(data));
  });

  socket.on('comments', (data) => {
    if (data.userId !== userId) dispatch(realTimeComment(data));
  });

  socket.on(`${userId}-invited-chat`, (data) => {
    dispatch(onRealTimeChatInvited(data.data));
  });
}

export function addToken() {
  return (dispatch, getState) => {
    const { token } = getState().configure;

    axios
      .post(config.createTokenPath, token.toJS())
      .then((response) => {})
      .catch((error) => {});
  };
}
export function confirmed_email({ data }) {
  return {
    type: types.CONFIRM_EMAIL,
    data,
  };
}
export function onSignUpRequest() {
  return {
    type: types.ON_SIGNUP_REQUEST,
  };
}
export function onSignUpSuccess(payload, token) {
  return {
    type: types.ON_SIGNUP_SUCCESS,
    payload,
    token,
  };
}
export function getCredit() {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .get(config.userCreditPath)
      .then((response) => {
        dispatch({
          type: types.ON_FETCHING_CREDIT_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: types.ON_FETCHING_CREDIT_FAILURE });
      });
  };
}
function afterLogin(dispatch, data) {
  // dispatch(getAvailableZones());
  setTimeout(() => {
    dispatch(getCredit());
    // dispatch(getNotifications());
  }, 2000);
}
export function onLoginSuccess(payload, token) {
  return (dispatch) => {
    afterLogin(dispatch, payload);
    connectSocket(payload._id, dispatch);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload,
      token,
    });
    setTimeout(() => {
      dispatch(addToken());
    }, 1000);
  };
}
export function onLoginFailure(data) {
  return {
    type: types.LOGIN_FAILURE,
    data,
  };
}
export function login_signup_failed({ data }) {
  return {
    type: types.LOGIN_SIGNUP_FAILED,
    data,
  };
}
export function resetSign() {
  return {
    type: types.RESET_SIGN,
  };
}

export function searchFriends(query) {
  return (dispatch, getState) => {
    if (query === '') {
      dispatch({
        type: types.ON_USER_SEARCH_FRIEND_SUCCESS,
        payload: [],
        reset: true,
      });
      return;
    }
    axios
      .get(config.searchFriendsPath, { params: { query } })
      .then((response) => {
        dispatch({
          type: types.ON_USER_SEARCH_FRIEND_SUCCESS,
          payload: response.data.data,
        });
      });
  };
}

export function addFriend(friendId, callBack, errCallback) {
  return (dispatch) => {
    axios.post(config.requestFriendPath.replace(':userId', friendId))
      .then((response) => {
        callBack();
      }).catch((err) => {
        errCallback();
      });
  };
}
export function acceptFriend(friendId, callBack, errCallback) {
  return (dispatch) => {
    axios
      .post(config.addFriendPath.replace(':userId', friendId))
      .then((response) => {
        callBack();
      })
      .catch((err) => {
        errCallback();
      });
  };
}
export function rejectFriend(friendId, callBack, errCallback) {
  return (dispatch) => {
    axios
      .post(config.rejectFriendPath.replace(':userId', friendId))
      .then((response) => {
        callBack();
      })
      .catch((err) => {
        errCallback();
      });
  };
}
export function blockFriend(friendId, callBack, errCallback) {
  return (dispatch) => {
    axios
      .post(config.blockFriendPath.replace(':userId', friendId))
      .then((response) => {
        callBack();
      })
      .catch((err) => {
        errCallback();
      });
  };
}

let descriptionTimeout;
export function updateDescription(description) {
  return (dispatch) => {
    dispatch({
      type: types.ON_UPDATE_DESCRIPTION_SUCCESS,
      payload: description,
    });
    if (descriptionTimeout) {
      clearTimeout(descriptionTimeout);
    }
    descriptionTimeout = setTimeout(() => {
      axios
        .post(config.updateUserDescription, { description })
        .catch((error) => {
          const data = error.response.data;
          Alert.alert('description update failed', error.response.data.message, [
            {
              text: 'OK',
            },
          ]);
        });
    }, 500);
  };
}

export function getActiveFriends(id) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_USER_FRIENDS_REQUEST });

    axios
      .get(config.activeFriendsPath, { params: { id } })
      .then((response) => {
        const { data } = response.data;

        dispatch({
          type: types.ON_FETCHING_USER_FRIENDS_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ON_FETCHING_USER_FRIENDS_SUCCESS,
          payload: [],
        });
      });
  };
}

export function onLogout() {
  return (dispatch) => {
    dispatch({ type: types.ON_LOGOUT_SUCCESS });
    resetToken();

    setTimeout(() => {
      Actions.reset('FirstScreenMain');
    }, 500);
  };
}

export function updateNotification(data) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .patch(config.notificationPath, data)
      .then((response) => {
        dispatch({
          type: types.ON_UPDATE_NOTIFICATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
        dispatch({ type: types.ON_UPDATE_NOTIFICATION_FAILURE });
      });
  };
}

export function accountVideos(options = {}) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_ACCOUNT_VIDEOS_REQUEST });
    axios
      .get(config.accountVideosPath, { params: options })
      .then((response) => {
        const { data } = response.data;
        dispatch({
          type: types.ON_FETCHING_ACCOUNT_VIDEOS_SUCCESS,
          payload: data,
          options,
        });
      })
      .catch((error) => {
        dispatch({ type: types.ON_FETCHING_ACCOUNT_VIDEO_COMPLETED });
        alert(JSON.stringify(error.response.data));
      });
  };
}

export function uploadAvatar(avatar) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    const formdata = new FormData();
    if (avatar && avatar.includes('file://')) {
      const ext = avatar.split('.').pop();
      formdata.append('photo', {
        uri: avatar,
        name: `${+new Date()}.${ext}`,
        type: 'multipart/form-data',
      });
    }
    axios
      .patch(config.uploadAvatarPath, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch({
          type: types.ON_UPLOAD_AVATAR_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
        dispatch({ type: types.ON_UPLOAD_AVATAR_FAILURE });
      });
  };
}

export function updateDetail(data) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_REQUEST });

    axios
      .patch(config.updateDetailPath, data)
      .then((response) => {
        dispatch({
          type: types.ON_UPDATE_DETAIL_SUCCESS,
          payload: response.data.data,
        });

        setTimeout(() => {
          Actions.pop();
        }, 500);
      })
      .catch((error) => {
        alert(error.response.data.message);
        dispatch({ type: types.ON_UPDATE_DETAIL_FAILURE });
      });
  };
}

export function onAcceptTermCondition() {
  return (dispatch) => {
    axios
      .patch(config.acceptTermConditionPath)
      .then((response) => {})
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
}

export function getProfile(id) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_PROFILE_REQUEST });
    axios
      .get(config.profilePath.replace(':userId', id))
      .then((response) => {
        dispatch({
          type: types.ON_FETCH_USER_PROFILE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: types.ON_FETCHING_PROFILE_FAILURE });
      });
  };
}

export function getCurrentUserDetail() {
  return (dispatch) => {
    axios
      .get(config.updateDetailPath)
      .then((response) => {
        dispatch({
          type: types.ON_FETCH_USER_DETAILS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.log({ error });
        dispatch({ type: types.ON_FETCH_USER_DETAILS_FAILURE });
      });
  };
}

export function onUpdatePassword(password) {
  return (dispatch) => {
    axios
      .patch(config.updatePasswordPath, password)
      .then((response) => {
        Actions.pop();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
}

export function onResetPassword(password, passwordConfirmation, token) {
  return (dispatch) => {
    const user = {
      password,
      passwordConfirmation,
      reset: true,
    };
    axios
      .patch(config.updatePasswordPath, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { data } = response.data;
        setHeader(token);
        dispatch(onLoginSuccess(data, token));
        dispatch(resetSign());
        if (data.status === 1) {
          if (data.username.includes('_FAKE_USERNAME_')) {
            Actions.usernameScreen();
            return;
          }
          Actions.tabbar();
        } else {
          Actions.confirmcodepage();
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
}

export function onForgotPassword(email) {
  return (dispatch) => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .post(config.resetPasswordPath, { email })
      .then((response) => {
        dispatch(notify_stop('SHOW_ForgotPasswordEmailModal'));
        dispatch(update_start('SHOW_ForgotPasswordEmailConfirmModal'));
        dispatch({
          type: types.ON_RESET_PASSWORD_SUCCESS,
          payload: response.data.userId,
        });
      })
      .catch((error) => {
        const data = error.response.data;
        alert(data.message);
        dispatch({ type: types.ON_RESET_PASSWORD_FAILURE });
      });
  };
}

export function setUser(user: string): Action {
  return {
    type: types.SET_USER,
    payload: user,
  };
}

export function loginWithGoogle(data) {
  return (dispatch) => {
    axios
      .post(config.googleCallbackPath, { data })
      .then((response) => {
        const user = response.data.data;
        const token = response.data.token;
        setHeader(token);
        dispatch(onLoginSuccess(user, token));
        dispatch(resetSign());
        saveDeviceToken().finally(() => {});

        if (user.username.includes('_FAKE_USERNAME_')) {
          Actions.usernameScreen();
          return;
        }

        if (!user.acceptTermCondition) {
          dispatch({ type: types.ON_SHOW_TOGGLE_TERM_CONDITION });
          return;
        }
        Actions.tabbar();
      })
      .catch((error) => {
        Alert.alert('Google login failure', 'Please try again!');
      });
  };
}

export function loginWithFacebook(data) {
  return (dispatch) => {
    axios
      .post(config.facebookCallbackPath, { data })
      .then((response) => {
        const user = response.data.data;
        const token = response.data.token;
        setHeader(token);
        dispatch(onLoginSuccess(user, token));
        dispatch(resetSign());
        saveDeviceToken().finally(() => {});

        if (user.username.includes('_FAKE_USERNAME_')) {
          Actions.usernameScreen();
          return;
        }

        if (!user.acceptTermCondition) {
          dispatch({ type: types.ON_SHOW_TOGGLE_TERM_CONDITION });
          return;
        }
        Actions.tabbar();
      })
      .catch((error) => {
        Alert.alert('Facebook login failure', 'Please try again!');
      });
  };
}

export function update_finish(notify) {
  return {
    type: types.UPDATE_FINISH,
    notify,
  };
}

export function checkUserName(username) {
  return (dispatch) => {
    dispatch({ type: types.ON_CHECK_USERNAME_REQUEST });
    axios
      .post(config.checkUsernamePath, { username })
      .then((response) => {
        dispatch({
          type: types.ON_CHECK_USERNAME_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: types.ON_CHECK_USERNAME_FAILURE });
      });
  };
}

export function onUpdateUsername(username, isBack = false) {
  return (dispatch) => {
    dispatch({ type: types.ON_UPDATE_USERNAME_REQUEST });

    axios
      .post(config.updateUsernamePath, { username })
      .then((response) => {
        const data = response.data;
        dispatch({
          type: types.ON_UPDATE_USERNAME_SUCCESS,
          payload: response.data,
        });

        // if (isBack) {
        //   Actions.pop();
        //   return;
        // }

        if (!data.acceptTermCondition) {
          dispatch({ type: types.ON_SHOW_TOGGLE_TERM_CONDITION });
          return;
        }

        Actions.tabbar();
      })
      .catch((error) => {
        const data = error.response.data;
        dispatch({ type: types.ON_UPDATE_USERNAME_FAILURE });

        Alert.alert(
          'Username update failed',
          'A user with this username already exists.',
          [
            {
              text: 'OK',
            },
          ]
        );
      });
  };
}

export function validateToken() {
  return (dispatch) => {
    axios
      .get(config.validateTokenPath)
      .then((response) => {
        const data = response.data.data;
        dispatch(onLoginSuccess(data, data.tokenKey));
        dispatch(resetSign());

        if (data.status === 1) {
          if (data.username.includes('_FAKE_USERNAME_')) {
            Actions.usernameScreen();
            return;
          }

          Actions.tabbar();
        } else {
          Actions.confirmcodepage();
        }
      })
      .catch((error) => {
        resetToken();
      });
  };
}

export function signUp(data): Action {
  const params = {
    email: data.email,
    username: data.username,
    password: data.password,
  };

  return (dispatch, getState) => {
    dispatch(onSignUpRequest());
    axios
      .post(config.signupPath, params)
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        dispatch(onSignUpSuccess(user, token));
        dispatch(resetSign());
        Actions.confirmcodepage();
      })
      .catch((error) => {
        const data = error.response.data;
        dispatch({ type: types.ON_SIGNUP_FAILURE });

        Alert.alert('Signup failed', data.message, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetSign());
            },
          },
        ]);
      });
  };
}

export function onConfirmResetPasswordCode(userId, code) {
  const params = {};
  const path = `/users/${userId}/verify?code=${code}&token=true`;
  return (dispatch, getState) => {
    dispatch({ type: types.ON_LOGIN_REQUEST });
    return Api.patch(path, params).then((resp) => {
      dispatch({ type: types.ON_FETCHING_COMPLETED });
      if (resp.status === 1) {
        const user = resp.data;
        const token = resp.data.tokenKey;
        dispatch(onLoginSuccess(user, token));
        dispatch(notify_stop('SHOW_ForgotPasswordEmailConfirmModal'));
        Actions.newPassword();
      } else {
        const message = resp.message;
        Alert.alert('Confirmation failed', message, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
    });
  };
}

export function Signed_up({ data }) {
  return {
    type: types.SIGN_UP,
    data,
  };
}

export function logIn(data) {
  const params = {
    username: data.email,
    password: data.password,
  };

  return (dispatch, getState) => {
    dispatch({ type: types.ON_LOGIN_REQUEST });
    const cancelToken = axios.CancelToken.source();
    let requestComplete = false;
    let timeout = null;
    axios
      .post(`${config.baseUrl}${config.loginPath}`, params, {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        requestComplete = true;
        if (timeout) {
          clearTimeout(timeout);
        }
        const user = response.data.user;
        const token = response.data.token;
        setHeader(token);
        saveDeviceToken().finally(() => {});
        dispatch(onLoginSuccess(user, token));
        dispatch(resetSign());
        if (user.status === 1) {
          if (user.username.includes('_FAKE_USERNAME_')) {
            Actions.usernameScreen();
            return;
          }
          if (!user.acceptTermCondition) {
            dispatch({ type: types.ON_SHOW_TOGGLE_TERM_CONDITION });
            return;
          }
          Actions.tabbar();
        } else {
          Actions.confirmcodepage();
        }
      })
      .catch((error) => {
        console.log(error);
        if (axios.isCancel(error)) {
          return;
        }
        if (timeout) {
          clearTimeout(timeout);
        }
        requestComplete = true;
        const data = error.response.data;
        dispatch(onLoginFailure(data));
        Alert.alert('Login failed', data.message, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetSign());
            },
          },
        ]);
      });
    timeout = setTimeout(() => {
      if (!requestComplete) {
        cancelToken.cancel();
        Alert.alert('Login failed', 'We failed to log you in due to network error', [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetSign());
            },
          },
        ]);
      }
    }, 10 * 1000);
  };
}

export function confirmEmail(data): Action {
  const params = {};
  const path = `/users/${data.userId}/verify?code=${data.code}`;
  return (dispatch, getState) => {
    const { user } = getState().user;

    dispatch({ type: types.ON_LOGIN_REQUEST });
    return Api.patch(path, params)
      .then((resp) => {
        if (resp.status === 0) {
          const message = resp.message;

          dispatch({ type: types.ON_FETCHING_COMPLETED });

          Alert.alert(
            resp.invalid ? 'confirmation failure' : 'confirmation failure',
            message,
            [
              {
                text: 'OK',
                onPress: () => {
                  dispatch(resetSign());
                },
              },
            ]
          );
          return;
        }

        dispatch(confirmed_email({ data: resp }));

        setHeader(user.token);
        if (resp.data.username.includes('_FAKE_USERNAME_')) {
          Actions.usernameScreen();
          return;
        }

        if (resp.data.acceptTermCondition) {
          Actions.tabbar();
        }
      })
      .catch((resp) => {
        const message = resp.message;
        Alert.alert('confirmation failure', message, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetSign());
            },
          },
        ]);
      });
  };
}

export const onSignUpViaPhone = phone => (dispatch) => {
  const { phoneSignUpPath } = config;
  dispatch({ type: types.ON_PHONE_SIGNUP_REQUEST });

  axios
    .post(phoneSignUpPath, { mobileNo: phone })
    .then((response) => {
      const user = response.data.user;
      const token = response.data.token;
      dispatch({ type: types.ON_PHONE_SIGNUP_SUCCESS, payload: user, token });
      saveDeviceToken().finally(() => {});

      Actions.confirmcodepage();
    })
    .catch((error) => {
      dispatch({ type: types.ON_PHONE_SIGNUP_SUCCESS });
    });
};

export function startLoading() {
  return {
    type: types.START_LOADING,
  };
}

export function endLoading() {
  return {
    type: types.END_LOADING,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

export function setCurrentPage(page) {
  return {
    type: types.SET_CURRENT_PAGE,
    page,
  };
}

export function onCloseTermCondition() {
  return {
    type: types.ON_TOGGLE_TERM_CONDITION,
  };
}

export function removeVideos(userId) {
  return dispatch => dispatch({
    type: types.REMOVE_VIDEOS,
    payload: userId,
  });
}
