import createConstants from '../utils/createConstants';

const types = createConstants(
  'ON_REWARD_FETCHING_REQUEST',
  'ON_REWARD_FETCHING_COMPLETED',
  'ON_FETCHING_SWAG_SUCCESS',
  'REAL_TIME_BIDDING_UPDATE',
  'ON_BIDDING_SWAG_SUCCESS',
  'ON_BIDDING_SWAG_FAILURE'
);

export default types;
