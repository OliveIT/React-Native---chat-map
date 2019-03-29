import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SecurityView from '../components/GPSView/optionsView/SecurityView';

import {
  checkUserName,
  onUpdateUsername,
  onUpdatePassword
} from '../actions/user';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      { checkUserName, onUpdateUsername, onUpdatePassword },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    isFetching: state.user.isFetching,
    checkUserName: state.user.checkUserName
  };
};

export default connect(mapStateToProps, bindActions)(SecurityView);
