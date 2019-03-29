import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SwagDetailPanel from '../components/swags/SwagDetailPanel';
import { bidding } from '../actions/swag';

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        bidding
      },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    swagData: state.swag.get('data'),
    credit: state.user.credit,
    minimumBid: state.swag.credit,
    value: state.swag.value,
    description: state.swag.description
  };
};

export default connect(mapStateToProps, bindActions)(SwagDetailPanel);
