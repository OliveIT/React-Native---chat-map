import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import config from '../config/appConfig';
import types from '../constants/privateChat';
import firebase from '../components/firebase';
import { getFileName } from '../utils/converter';
import uuid from 'uuid';
const database = firebase.database();

export function onRealTimeChatInvited(data) {
  return (dispatch, getState) => {
    const { activeChatsSession } = getState().privateChat;
    const index = activeChatsSession.findIndex(
      item => item.get('_id') === data._id
    );
    if (index > -1) {
      dispatch({
        type: types.ON_UPDATE_CHAT_SESSION,
        payload: data,
        index: index
      });
    } else {
      dispatch({ type: types.ON_ADD_CHAT_SESSION, payload: data });
    }
  };
}
export function onAccptChat(id) {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .patch(config.onAccptChatPath.replace(':id', id))
      .then(response => {
        const data = response.data.data;
        dispatch({
          type: types.ON_ACCEPT_CHAT_SUCCESS,
          payload: data
        });

        Actions.chatRoom({
          channelName: data.room_name,
          isPublic: false,
          id: data._id
        });
      })
      .catch(error => {
        dispatch({ type: types.ON_FETCHING_COMPLETED });
        alert(error.data.message);
      });
  };
}

export function onRejectChat(id) {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .patch(config.onRejectChatPath.replace(':id', id))
      .then(response => {
        dispatch({
          type: types.ON_REJECT_CHAT_SUCCESS,
          payload: response.data.data
        });

        Actions.pop();
      })
      .catch(error => {
        dispatch({ type: types.ON_FETCHING_COMPLETED });
        alert(error.data.message);
      });
  };
}

export function getAtciveChats() {
  return dispatch => {
    axios.get(config.activeSessionsPath).then(response => {
      const { data } = response.data;
      dispatch({ type: types.ON_GET_ACTIVE_CHAT_SESSION, payload: data });
    });
  };
}

export function onRemoveChat(id) {
  return dispatch => {
    axios
      .delete(config.onRemoveChatPath.replace(':id', id))
      .then(response => {
        dispatch({ type: types.ON_REMOVE_CHAT_SESSION, id });
      })
      .catch(error => {
        alert(error.data.message);
      });
  };
}

export function onRemoveMember(chatId, userId, isMind = false) {
  return dispatch => {
    axios
      .delete(
        config.onRemovePrivateChatMemberPath
          .replace(':chatId', chatId)
          .replace(':id', userId)
      )
      .then(response => {
        dispatch({
          type: types.ON_REMOVE_MEMBER_SUCCESS,
          payload: response.data.data,
          isMind
        });
        Actions.pop();
      })
      .catch(error => {
        alert(error.data.message);
      });
  };
}

export function onAddMember(id, userIds) {
  return dispatch => {
    axios
      .patch(config.onAddMemberPath.replace(':id', id), { user_ids: userIds })
      .then(response => {
        dispatch({
          type: types.ON_ADD_MEMBER_SUCCESS,
          payload: response.data.data
        });
      })
      .catch(error => {
        alert(error.data.message);
      });
  };
}

export function searchFriends(query) {
  return (dispatch, getState) => {
    if (query === '') {
      dispatch({
        type: types.ON_SEARCH_FRIEND_SUCCESS,
        payload: [],
        reset: true
      });
      return;
    }
    axios
      .get(config.searchFriendsPath, { params: { query: query } })
      .then(response => {
        dispatch({
          type: types.ON_SEARCH_FRIEND_SUCCESS,
          payload: response.data.data
        });
      });
  };
}

export function startGroupChat(params, thumbUrl, url) {
  return (dispatch, getState) => {
    const user = getState().user.data;
    axios.post(config.createGroupName, params).then(response => {
      const { data } = response.data;
      let name = `private/channels/${data.room_name}/messages`;
      dispatch({ type: types.ON_ADD_CHAT_SESSION, payload: data });

      this.ref = database.ref(name);

      const sender = {
        _id: user._id,
        name: user.username,
        avatar: user.photo_url
      };

      if (url)
        this.ref.push({
          isAttachment: true,
          video: url,
          thumb: thumbUrl,
          fileName: getFileName(url),
          user: sender,
          _id: uuid.v4()
        });

      Actions.chatRoom({
        channelName: data.room_name,
        isPublic: false,
        id: data._id
      });
    });
  };
}

export function getActiveFriends() {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .get(config.activeFriendsPath)
      .then(response => {
        const { data } = response.data;
        dispatch({
          type: types.ON_FETCHING_FRIENDS_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: types.ON_FETCHING_FRIENDS_SUCCESS,
          payload: []
        });
      });
  };
}

export function getAvailableZones(userId) {
  return dispatch => {
    dispatch({ type: types.ON_FETCHING_REQUEST });
    axios
      .get(config.availableZonesPath, { params: { userId: userId } })
      .then(response => {
        const { data } = response;
        if (data.status) {
          return dispatch({
            type: types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS,
            payload: {
              mini: data.mini,
              minor: data.minor,
              major: data.major
            }
          });
        }

        dispatch({
          type: types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS,
          payload: {}
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.ON_FETCHING_AVAILABLE_ZONES_SUCCESS,
          payload: {}
        });
      });
  };
}
