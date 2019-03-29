import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SwagPanel from '../components/swags';
import { getSwagLists } from '../actions/swag';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators({ getSwagLists }, dispatch)
  };
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    data: state.swag.get('data'),
    credit: state.user.credit,
    isFullProfile: state.user.isFullProfile
  };
};

export default connect(mapStateToProps, bindActions)(SwagPanel);
