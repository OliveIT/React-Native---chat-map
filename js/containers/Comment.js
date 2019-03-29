import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentView from '../components/GPSView/commentView';
import { onComment } from '../actions/activities';

function mapStateToProps(state, oldState) {
  const { id } = oldState;
  const index = state.activities
    .get('data')
    .findIndex(item => item.get('id') === id);

  return {
    user: state.user.data,
    data: state.activities.getIn(['data', index])
  };
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators({ onComment }, dispatch)
  };
}

export default connect(mapStateToProps, bindActions)(CommentView);
