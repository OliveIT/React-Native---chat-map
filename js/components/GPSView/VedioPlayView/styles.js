import { COLORS } from '../../../constants';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controls: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    position: 'absolute',
    bottom: 100,
    left: 4,
    right: 4
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden'
  },
};
