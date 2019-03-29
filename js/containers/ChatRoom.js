import { connect } from 'react-redux';
import ChatRoom from '../components/Chatroom';
import { bindActionCreators } from 'redux';

import {
  getActiveFriends,
  getAtciveChats,
  startGroupChat,
  searchFriends,
  onAddMember,
  onRemoveMember
} from '../actions/privateChat';
import { pushNotification } from '../actions/configure';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchFriends,
        onAddMember,
        onRemoveMember,
        pushNotification
      },
      dispatch
    )
  };
}

const mapStateToProps = (state, oldState) => {
  const { id } = oldState;
  let data = [];
  if (id) {
    const index = state.privateChat
      .get('activeChatsSession')
      .findIndex(item => item.get('_id') === id);
    data = state.privateChat.getIn([
      'activeChatsSession',
      index,
      'active_users'
    ]);
  }
  return {
    user: state.user.data,
    routes: state.routes,
    searchResult: state.privateChat.get('searchResult'),
    activeUsers: data,
    publicMemberCount: state.publicChat.memberCount
  };
};

export default connect(mapStateToProps, bindActions)(ChatRoom);
