import createConstants from '../utils/createConstants';

const types = createConstants(
  'ON_UPLOAD_VIDEO_REQUEST',
  'ON_VIDEO_FETCHING_REQUEST',
  'ON_VIDEO_FETCHING_COMPLETED',
  'ON_UPLOAD_VIDEO_SUCCESS',
  'ON_FETCHING_VIDEOS_SUCCESS',
  'ON_LIKE_VIDEO_SUCCESS',
  'ON_REAL_TIME_COMMENT'
);

export default types;
