import type { Action } from '../actions/types';
import createReducers from '../utils/createReducers';
import types from '../constants/user';

const initialState = {
  user: {
    success: 0,
    error_message: '',
    token: '',
    createdBy: '',
    username: '',
    email: '',
    userID: '',
    finder: '',
    alert: {
      ninja_account: false,
      event_chat: true,
      private_chat: true,
      public_chat: true,
      notification: true
    },
    blockedFriends: [],
    receivedRequest: [],
    sentRequest: [],
    friends: [],
    group: [],
    vedios: new Map(),
    lastEditdAt: '',
    createdAt: '',
    status: 0,
    exportCounterAnalytics: 0,
    exportCounterDatabase: 0
  },
  loading: {
    isLoading: 0
  },
  current_page: {
    page: 0 // 1: login, 2: confirm
  },
  isFetching: false,
  showTermCondition: false,
  checkUserName: {
    isFetching: false,
    isValid: true,
    message: ''
  },
  userId: '',
  users: [],
  data: {},
  credit: 0,
  isFullProfile: false,
  videos: [],
  videoFetching: false,
  likeVideos: new Map(),
  isFetchingProfile: false,
  isInternalError: false,
  friends: [],
  friendsResult: [],
  isFetchingFriend: false
};

export default createReducers(initialState, {
  [types.SET_USER]: (state, action) => {
    return {
      ...state,
      name: action.payload
    };
  },
  [types.ON_SIGNUP_REQUEST]: state => {
    return {
      ...state,
      isFetching: true
    };
  },
  [types.ON_SIGNUP_SUCCESS]: (state, { payload, token }) => {
    return {
      ...state,
      isFetching: false,
      user: Object.assign({}, state.user, {
        success: payload.status,
        token: token,
        userID: payload._id
      }),
      data: Object.assign({}, state.data, payload)
    };
  },
  [types.ON_SIGNUP_FAILURE]: state => {
    return {
      ...state,
      isFetching: false,
      user: Object.assign({}, state.user, { success: 0 })
    };
  },
  [types.SIGN_UP]: (state, action) => {
    var temp = Object.assign({}, state.user);
    temp.success = action.data.status;
    temp.token = action.data.token;
    temp.userID = action.data.user._id;
    var loading = Object.assign({}, state.loading);
    loading.isLoading = 3;

    return {
      ...state,
      user: temp,
      loading: loading
    };
  },
  [types.LOG_IN]: (state, action) => {
    var temp = Object.assign({}, state.user);
    temp.success = action.data.status;
    temp.token = action.data.token;
    temp.userID = action.data.user._id;
    temp.status = action.data.user.status;
    var loading = Object.assign({}, state.loading);
    loading.isLoading = 3;
    return {
      ...state,
      user: temp,
      loading: loading,
      data: action.data.user
    };
  },
  [types.LOGIN_SUCCESS]: (state, { payload, token }) => {
    let isFullProfile = false;

    if (
      payload.mobileNo &&
      payload.mobileNo !== '' &&
      payload.gender &&
      payload.gender !== '' &&
      payload.email !== '' &&
      payload.dob &&
      payload.dob !== ''
    ) {
      if (
        !payload.email.includes('@google.com') ||
        payload.email.includes('@facebook.com')
      ) {
        isFullProfile = true;
      }
    }
    return {
      ...state,
      user: Object.assign({}, state.user, {
        success: 1,
        token: token,
        userID: payload._id,
        ...payload
      }),
      isFetching: false,
      loading: Object.assign({}, state.loading, { isLoading: 3 }),
      data: payload,
      users: [payload],
      isFullProfile: isFullProfile
    };
  },
  [types.LOGIN_SIGNUP_FAILED]: (state, action) => {
    var temp = Object.assign({}, state.user);
    temp.success = action.data.status;
    temp.error_message = action.data.message;
    var loading = Object.assign({}, state.loading);
    loading.isLoading = 2;
    return {
      ...state,
      user: temp,
      loading: loading
    };
  },
  [types.LOGIN_FAILURE]: (state, action) => {
    return {
      ...state,
      user: Object.assign({}, state.user, {
        success: 0,
        error_message: action.data.message
      }),
      isFetching: false,
      loading: Object.assign({}, state.loading, { isLoading: 2 })
    };
  },
  [types.LOG_OUT]: (state, action) => {
    return {
      ...state,
      user: {}
    };
  },
  [types.CONFIRM_EMAIL]: (state, action) => {
    var temp = Object.assign({}, state.user);
    temp.success = action.data.status;
    // temp.error_message = action.data.message;
    var loading = Object.assign({}, state.loading);
    loading.isLoading = 3;
    let showTermCondition = action.data.acceptTermCondition ? false : true;
    if (action.data.data.username.includes('_FAKE_USERNAME_')) {
      showTermCondition = false;
    }
    return {
      ...state,
      user: temp,
      loading: loading,
      isFetching: false,
      showTermCondition: showTermCondition
    };
  },
  [types.RESET_SIGN]: (state, action) => {
    var temp = Object.assign({}, state.user);
    var loading = Object.assign({}, state.loading);
    loading.isLoading = 0;
    return {
      ...state,
      user: temp,
      loading: loading,
      isFetching: false
    };
  },
  [types.START_LOADING]: (state, action) => {
    var temp = Object.assign({}, state.loading);
    temp.isLoading = 1;

    return {
      ...state,
      loading: temp
    };
  },
  [types.END_LOADING]: (state, action) => {
    var temp = Object.assign({}, state.loading);
    temp.isLoading = 2;
    return {
      ...state,
      loading: temp
    };
  },
  [types.SET_CURRENT_PAGE]: (state, action) => {
    var temp = Object.assign({}, state.current_page);
    temp.page = action.page;
    return {
      ...state,
      current_page: temp
    };
  },
  [types.ON_PHONE_SIGNUP_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.ON_PHONE_SIGNUP_SUCCESS]: (state, { payload, token }) => {
    return {
      ...state,
      user: Object.assign({}, state.user, {
        success: 1,
        token: token,
        userID: payload._id,
        status: payload.status
      }),
      data: Object.assign({}, state.data, payload),
      isFetching: false
    };
  },
  [types.ON_LOGIN_REQUEST]: state => {
    return { ...state, isFetching: true };
  },
  [types.ON_TOGGLE_TERM_CONDITION]: state => {
    return {
      ...state,
      showTermCondition: false
    };
  },
  [types.ON_SHOW_TOGGLE_TERM_CONDITION]: state => {
    return {
      ...state,
      isFetching: false,
      showTermCondition: true
    };
  },
  [types.ON_CHECK_USERNAME_REQUEST]: state => {
    return {
      ...state,
      checkUserName: Object.assign({}, state.checkUserName, {
        isFetching: true
      })
    };
  },
  [types.ON_CHECK_USERNAME_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      checkUserName: Object.assign({}, state.checkUserName, {
        isFetching: false,
        isValid: payload.is_valid,
        message: payload.message
      })
    };
  },
  [types.ON_CHECK_USERNAME_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      checkUserName: Object.assign({}, state.checkUserName, {
        isFetching: false,
        isValid: true,
        message: 'Username is valid.'
      })
    };
  },
  [types.ON_UPDATE_USERNAME_REQUEST]: state => {
    return {
      ...state,
      isFetching: true
    };
  },
  [types.ON_UPDATE_USERNAME_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      user: Object.assign({}, state.user, { username: payload.data.username }),
      data: Object.assign({}, state.data, { username: payload.data.username })
    };
  },
  [types.ON_UPDATE_USERNAME_FAILURE]: state => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.ON_FETCHING_REQUEST]: state => {
    return {
      ...state,
      isFetching: true
    };
  },
  [types.ON_FETCHING_COMPLETED]: state => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.ON_RESET_PASSWORD_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      userId: payload
    };
  },
  [types.ON_RESET_PASSWORD_FAILUE]: state => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.ON_FETCH_USER_PROFILE_SUCCESS]: (state, { payload }) => {
    const index = state.users.findIndex(item => item._id === payload._id);
    if (index > -1) {
      const users = state.users;
      users[index] = payload;

      return {
        ...state,
        users: users,
        isFetchingProfile: false,
        isInternalError: false
      };
    }
    return {
      ...state,
      users: state.users.concat(payload),
      isFetchingProfile: false,
      isInternalError: false
    };
  },
  [types.ON_FETCHING_CREDIT_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      credit: payload.amount
    };
  },
  [types.ON_FETCHING_CREDIT_FAILURE]: state => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.REAL_TIME_CREDIT_UPDATE]: (state, { payload }) => {
    let credit = state.credit;
    if (payload.type !== 'deposit') credit -= payload.amount;
    else credit += payload.amount;

    return {
      ...state,
      credit: credit
    };
  },
  [types.ON_UPDATE_DETAIL_SUCCESS]: (state, { payload }) => {
    let isFullProfile = false;

    if (
      payload.mobileNo !== '' &&
      payload.gender !== 'Other' &&
      payload.gender !== '' &&
      payload.email !== '' &&
      payload.dob !== ''
    ) {
      if (
        !payload.email.includes('@google.com') ||
        payload.email.includes('@facebook.com')
      ) {
        isFullProfile = true;
      }
    }
    return {
      ...state,
      isFetching: false,
      data: payload,
      isFullProfile: isFullProfile
    };
  },
  [types.ON_UPDATE_DETAIL_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.ON_UPLOAD_AVATAR_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      data: payload
    };
  },
  [types.ON_UPLOAD_AVATAR_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.ON_FETCHING_ACCOUNT_VIDEOS_REQUEST]: state => {
    return {
      ...state,
      videoFetching: true,
      isFetching: false
    };
  },
  [types.ON_FETCHING_ACCOUNT_VIDEOS_SUCCESS]: (
    state,
    { payload, options = {} }
  ) => {
    let videos;
    if (options.like) {
      videos = ((state.likeVideos && state.likeVideos.set && state.likeVideos) || new Map());
      videos.set(options.userId, payload);
      return {
        ...state,
        videoFetching: false,
        likeVideos: videos,
        isFetching: false
      };
    }
    videos = ((state.videos && state.videos.set && state.videos) || new Map());
    videos.set(options.userId, payload);
    return {
      ...state,
      videoFetching: false,
      videos,
      isFetching: false
    };
  },
  [types.ON_FETCHING_ACCOUNT_VIDEO_COMPLETED]: state => {
    return {
      ...state,
      videoFetching: false,
      isFetching: false
    };
  },
  [types.ON_FETCHING_PROFILE_REQUEST]: state => {
    return {
      ...state,
      isFetchingProfile: true,
      isInternalError: false
    };
  },
  [types.ON_FETCHING_PROFILE_FAILURE]: state => {
    return {
      ...state,
      isFetchingProfile: false,
      isInternalError: true
    };
  },
  [types.ON_UPDATE_NOTIFICATION_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      data: Object.assign({}, state.data, { notificationSettings: payload })
    };
  },
  [types.ON_UPDATE_NOTIFICATION_FAILURE]: state => {
    return {
      ...state,
      isFetching: false
    };
  },
  [types.ON_FETCHING_USER_FRIENDS_REQUEST]: state => {
    return {
      ...state,
      isFetchingFriend: true
    };
  },
  [types.ON_FETCHING_USER_FRIENDS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetchingFriend: false,
      friends: payload
    };
  },
  [types.ON_UPDATE_DESCRIPTION_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        description: payload,
      }
    };
  },
  [types.ON_LOGOUT_SUCCESS]: state => {
    return {
      ...initialState
    };
  },
  [types.ON_USER_SEARCH_FRIEND_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      friendsResult: payload
    };
  },
  [types.REMOVE_VIDEOS]: (state, { payload }) => {
    const videos = state.videos || new Map();
    const likeVideos = state.likeVideos || new Map();
    if (videos.has && videos.has(payload)) {
      videos.delete(payload);
    }
    if (likeVideos.has && likeVideos.has(payload)) {
      likeVideos.delete(payload);
    }
    return {
      ...state,
      videos,
      likeVideos,
    };
  },
  [types.ON_FETCH_USER_DETAILS_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
      data: {
        ...state.data,
        ...payload
      }
    };
  }
});
