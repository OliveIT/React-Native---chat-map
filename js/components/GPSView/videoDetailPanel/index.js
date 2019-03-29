import React, { PureComponent } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Video from 'react-native-video';
import { fromJS } from 'immutable';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import ActionHeader from './ActionHeader';
import { COLORS, ICONS } from '../../../constants';
import { getActivity, onComment, onReport, onLike, onUpdateViewCounter } from '../../../actions/activities';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class VideoDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'cover',
      duration: 0.0,
      currentTime: 0.0,
      controls: false,
      paused: true,
      skin: 'custom',
      ignoreSilentSwitch: null,
      isBuffering: false,
      isComment: false,
      isShowSetting: false,
      isViewModal: false,
    };

    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }

  componentWillMount() {
    this.props.actions.getActivity(this.props.id);
    StatusBar.setHidden(true);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.routes) !== JSON.stringify(this.props.routes)) {
      this.setState({
        paused: true,
      });
    }
  }

  componentDidMount() {
    this.props.actions.onUpdateViewCounter(this.props.id);
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    this.setState({
      isComment: false,
      isShowSetting: false,
      isViewModal: false,
    });
  }

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
    this.setState({ isBuffering });
  };

  loadStart = () => {
    if (__DEV__) {
      console.log('load start');
    }
  };

  unpauseVedio = () => {
    this.setState({
      paused: !this.state.paused,
      isComment: false,
      isShowSetting: false,
      isViewModal: false,
    });
  };
  getAvatar() {
    const { data } = this.props;
    if (data.size === 0) {
      return ICONS.DEFAULT_AVATAR;
    }
    return data.get('userId').has('photoUrl') ? { uri: data.get('userId').get('photoUrl') } : ICONS.DEFAULT_AVATAR;
  }

  render() {
    const {
      isBuffering,
      paused,
    } = this.state;
    const {
      actions,
      data,
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.unpauseVedio}
        >
          {data.size > 0 ? (
            <Video
              source={{
                uri: data.get('url'),
              }}
              style={styles.fullScreen}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              ignoreSilentSwitch={this.state.ignoreSilentSwitch}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onBuffer={this.onBuffer}
              onProgress={this.onProgress}
              onLoadStart={this.loadStart}
              repeat
            />
          ) : null}

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: deviceHeight / 3.5,
            }}
          >
            {(paused && !isBuffering) && (
              <FontAwesome5Pro
                name="play-circle"
                style={{
                  backgroundColor: COLORS.TRANSPARENT,
                }}
                size={deviceWidth / 3.9}
                color={COLORS.BRIGHT_ORANGE}
                light
              />
            )}

            {isBuffering ? (
              <View
                style={{
                  backgroundColor: COLORS.TRANSPARENT,
                  padding: 10,
                  marginHorizontal: 10,
                }}
              >
                <Image
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.TRANSPARENT,
                    width: 40,
                    height: 40,
                    marginBottom: 10,
                  }}
                  source={ICONS.LOADING_ICON}
                />
                <Text style={styles.loadingTextStyle}>
                  Loading...
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        {(data.get('description') && data.get('description') !== '') ? (
          <View
            style={styles.descriptionViewStyle}
            opacity={paused ? 1 : 0.4}
          >
            <Text style={styles.descriptionTextStyle}>
              {data.get('description')}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            position: 'absolute',
            left: 15,
            width: 70,
          }}
        >
          <Col
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Row
              style={{
                position: 'absolute',
                justifyContent: 'flex-start',
                top: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => Actions.pop()}
                activeOpacity={1}
              >
                <FontAwesome5Pro
                  name="chevron-circle-left"
                  style={{
                    backgroundColor: COLORS.TRANSPARENT,
                  }}
                  size={25}
                  color={COLORS.BRIGHT_ORANGE}
                  light
                />
              </TouchableOpacity>
            </Row>

            <Row
              style={{
                position: 'absolute',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: deviceHeight * 0.842,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => Actions.accountView({ userId: data.get('userId').get('_id') })}
              >
                <Image
                  source={this.getAvatar()}
                  style={{
                    borderRadius: Platform.OS === 'ios' ? 25 : 90,
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            </Row>
          </Col>
        </View>

        <ActionHeader
          count={{
            comment: data.get('comments') ? data.get('comments').size : 0,
            like: data.get('likes') ? data.get('likes').size : 0,
            view: data.get('views') ? data.get('views').size : 0,
          }}
          data={data}
          onReport={actions.onReport}
          onComment={actions.onComment}
          onLike={actions.onLike}
          isLike={data.get('isLike')}
          user={this.props.user}
        />
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      {
        onReport,
        onComment,
        getActivity,
        onLike,
        onUpdateViewCounter,
      },
      dispatch
    ),
  };
}

const mapStateToProps = (state, oldState) => {
  const { id } = oldState;
  const index = state.activities
    .get('data')
    .findIndex(item => item.get('id') === id);

  return {
    isFetching: state.activities.isFetching,
    data: index >= 0 ? state.activities.getIn(['data', index]) : fromJS({}),
    routes: state.routes,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, bindActions)(VideoDetail);
