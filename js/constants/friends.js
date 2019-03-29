import createConstants from '../utils/createConstants';

const types = createConstants(
  'ON_FETCHING_REQUEST',
  'ON_FETCHING_COMPLETED',
  'ON_FETCHING_ACTIVE_FRIENDS_SUCCESS',
  'ON_FETCHING_FRIENDS_SUCCESS'
);

export default types;
