import React from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Videos from './Videos';
import { COLORS, ICONS } from '../../../constants';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  _onChange(text) {
    if (__DEV__) {
      console.log({ text });
    }
    this.props.actions.updateDescription(text);
  }

  _resetTextInput() {
    this._textInput.clear();
    this._textInput.resetHeightToMin();
  }

  _keyboardDidShow = () => {};

  _keyboardDidHide = (text) => {
    // when uncommented, updates to statusText will work upon dismissing keyboard, but leads to another issue causing results of friend search queries to disappear
    // this.props.actions.updateDescription(text);
  };

  updateTextInput() {
    this._keyboardDidHide();
    // this.props.actions.updateDescription(this.props.statusText);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const {
      videos: data,
      videoFetching,
      profile,
    } = this.props;
    const videos = (data && data.get && data.get(profile._id)) || [];
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          accessible={false}
          activeOpacity={1}
        >
          <View style={styles.statusTextInputContainer}>
            <AutoGrowingTextInput
              editable={this.props.isOwner}
              value={profile && profile.description || ''}
              onChangeText={this._onChange.bind(this)}
              style={styles.statusTextInputStyle}
              placeholder=""
              placeholderTextColor={COLORS.TEXT_GREY}
              keyboardType="default"
              autoCorrect
              autoFocus={false}
              maxHeight={80}
              minHeight={45}
              maxLength={100}
              enableScrollToCaret
              ref={(r) => {
                this._textInput = r;
              }}
              underlineColorAndroid={COLORS.TRANSPARENT}
            />
          </View>

        </TouchableOpacity>
        <View style={styles.videoListView}>
          <Videos
            data={videos}
            isFetching={videoFetching}
            emptyLabel="no vedios"
            onPress={(url) => {
              this.props.onPlayVideo(url);
            }}
            refreshing={videoFetching}
            onRefresh={() => {
              this.props.actions.accountVideos({
                userId: this.props.userId,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  statusTextInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginTop: 15,
  },
  statusTextInputStyle: {
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 4,
    borderWidth: 0,
    flex: 1,
    fontSize: 17,
    padding: 10,
  },
  videoListView: {
    flex: 1,
    marginTop: 10,
  },
};

export default Home;
