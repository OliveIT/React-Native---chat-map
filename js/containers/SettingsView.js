import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettingsView from '../components/GPSView/optionsView/SettingsView';

import { updateNotification, onLogout } from '../actions/user';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateNotification,
        onLogout
      },
      dispatch
    )
  };
}

const mapStateToProps = (state, oldState) => {
  const index = state.user.users.findIndex(
    item => item._id === oldState.userId
  );

  return {
    user: state.user.data,
    isFetching: state.user.isFetching
  };
};

export default connect(mapStateToProps, bindActions)(SettingsView);
