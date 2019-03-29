import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PublicChatView from '../components/PublicChatView';
import { setPublicChatName, getZones, onJoinPublicZone, getAvailableZones } from '../actions/publicChat';

function bindAction(dispatch) {
  return {
    actions: bindActionCreators({ getZones, setPublicChatName, onJoinPublicZone, getAvailableZones }, dispatch)
  };
}

const mapStateToProps = state => {
  return {
    zones: state.publicChat.zones,
    isFetching: state.publicChat.isFetching,
    userId: state.user.user.userID,
    availableZones: state.publicChat.availableZones,
    isSearching: state.publicChat.isSearching
  };
};

export default connect(mapStateToProps, bindAction)(PublicChatView);
