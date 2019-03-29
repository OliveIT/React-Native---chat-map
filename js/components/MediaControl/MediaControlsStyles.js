import { COLORS } from '../../constants';

module.exports = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  controlsRow: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  toolbarRow: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  timeRow: {
    alignSelf: 'stretch'
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  playIcon: {
    fontSize: 22
  },
  replayIcon: {
    width: 25,
    height: 20,
    resizeMode: 'stretch'
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  fullScreenContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20
  },
  timerLabelsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -7
  },
  timerLabel: {
    fontSize: 12,
    color: COLORS.WHITE
  },
  progressSlider: {
    marginHorizontal: 10
  },
  track: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.GREY
  },
  thumb: {
    top: 22,
    width: 8,
    height: 16,
    borderRadius: 5,
    backgroundColor: COLORS.TEXT_GREY
  }
};
