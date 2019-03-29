import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PendingChatDetail from '../components/PrivateChatView/PendingChatDetail';

import { onAccptChat, onRejectChat } from '../actions/privateChat';

function bindAction(dispatch) {
  return {
    actions: bindActionCreators(
      {
        onAccptChat,
        onRejectChat
      },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    isFetching: state.privateChat.get('isFetching'),
    userId: state.user.user.userID
  };
};

export default connect(mapStateToProps, bindAction)(PendingChatDetail);
