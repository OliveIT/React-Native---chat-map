import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Videos from './Videos';
import styles from './styles';

class Likes extends React.Component {
  render() {
    const {
      likeVideos: data,
      videoFetching,
      profile,
    } = this.props;
    const likeVideos = (data && data.get && data.get(profile._id)) || [];

    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <Videos
          data={likeVideos}
          isFetching={videoFetching}
          isLike={true}
          emptyLabel={'no favourite vedios'}
          onPress={id => {
            Actions.videoDetail({ id: id });
          }}
          refreshing={videoFetching}
          onRefresh={() => {
            this.props.actions.accountVideos({
              userId: this.props.userId,
              like: true
            });
          }}
        />
      </View>
    );
  }
}

export default Likes;
