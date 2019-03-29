import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecordVedioView from '../components/RecordVedioView';
import { onUploadVideo } from '../actions/video';

import {
  getActiveFriends,
  searchFriends,
  startGroupChat
} from '../actions/privateChat';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        onUploadVideo,
        getFriends: getActiveFriends,
        searchFriends,
        startGroupChat
      },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    isFetching: state.video.isFetching,
    uploadDone: state.video.uploadDone,
    friends: state.privateChat.get('friends'),
    searchResult: state.privateChat.get('searchResult'),
    routes: state.routes
  };
};

export default connect(mapStateToProps, bindActions)(RecordVedioView);
