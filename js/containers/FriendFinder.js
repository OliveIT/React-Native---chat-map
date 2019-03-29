import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendFinderView from '../components/GPSView/optionsView/FriendFinderView';

import {
  getActiveFriends,
  getAtciveChats,
  startGroupChat,
  searchFriends,
  onRemoveChat,
  onRemoveMember
} from '../actions/privateChat';

function bindAction(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getFriends: getActiveFriends,
        getAtciveChats,
        startGroupChat,
        searchFriends,
        onRemoveChat,
        onRemoveMember
      },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    friends: state.privateChat.get('friends'),
    activeChatsSession: state.privateChat.get('activeChatsSession'),
    searchResult: state.privateChat.get('searchResult'),
    user: state.user.user
  };
};

export default connect(mapStateToProps, bindAction)(FriendFinderView);
