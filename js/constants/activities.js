import createConstants from '../utils/createConstants';

const types = createConstants(
  'ON_FETCHING_REQUEST',
  'ON_FETCHING_COMPLETED',
  'ON_FETCH_ACTIVITY_SUCCESS',
  'ON_LIKE_SUCCESS',
  'ON_UPDATE_COUNTER_SUCCESS',
  'ON_COMMENT_SUCCESS',
  'ON_REPORT_SUCCESS'
);

export default types;
