import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountView from '../components/GPSView/AccountView';
import {
  getProfile,
  uploadAvatar,
  accountVideos,
  addFriend,
  acceptFriend,
  removeVideos,
  blockFriend,
  rejectFriend,
  getCurrentUserDetail,
  getActiveFriends,
  updateDescription,
  searchFriends,
} from '../actions/user';
import { getNotifications } from '../actions/configure';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getProfile,
        uploadAvatar,
        accountVideos,
        removeVideos,
        addFriend,
        acceptFriend,
        blockFriend,
        rejectFriend,
        getCurrentUserDetail,
        getNotifications,
        getActiveFriends,
        updateDescription,
        searchFriends,
      },
      dispatch
    ),
  };
}

const mapStateToProps = (state, oldState) => {
  const index = state.user.users.findIndex(
    item => item._id === oldState.userId
  );
  let isOwner = false;
  if (
    index > -1 &&
    state.user.users[index] &&
    state.user.users[index]._id === state.user.data._id
  ) { isOwner = true; }
  return {
    isOwner,
    user: state.user.data,
    routes: state.routes,
    profile: state.user.users[index],
    isFetching: state.user.isFetching,
    videos: state.user.videos,
    videoFetching: state.user.videoFetching,
    likeVideos: state.user.likeVideos,
    isFetchingProfile: state.user.isFetchingProfile,
    isInternalError: state.user.isInternalError,
    friends: state.user.data.friends,
    friendsResult: state.user.friendsResult,
    isFetchingFriend: state.user.isFetchingFriend,
  };
};

export default connect(mapStateToProps, bindActions)(AccountView);
