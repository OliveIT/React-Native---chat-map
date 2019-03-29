import createConstants from '../utils/createConstants';

const types = createConstants(
  'ON_FETCHING_REQUEST',
  'ON_FETCHING_COMPLETED',
  'ON_FETCHING_ZONE_FILTER_SUCCESS',
  'SET_PUBLICCHATROOMNAME',
  'ON_FETCHING_AVAILABLE_ZONES_SUCCESS',
  'ON_JOIN_ZONE_SUCCESS',
  'ON_FETCHING_SEARCH_REQUEST'
);

export default types;
