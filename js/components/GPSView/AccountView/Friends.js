import React, { PureComponent } from 'react';
import { View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class Friends extends React.PureComponent {
  onAddNewFriend = () => {
    this.props.onAddFriend();
  };

  onShowFriendProfile = (id) => {
    Actions.accountView({ userId: id });
  };

  renderNew() {
    return (
      <TouchableOpacity
        style={styles.addNewFriend}
        activeOpacity={1}
        onPress={this.onAddNewFriend}
      >
        <Image
          style={styles.imageAddStyle}
          source={ICONS.ACCOUNT_ADD}
        />
      </TouchableOpacity>
    );
  }

  renderFriendSent(value, index) {
    return (
      <TouchableOpacity
        key={`item-${index}`}
        style={styles.activeAvatarStyle}
        onPress={() =>
          this.onShowFriendProfile(value._id)
        }
      >
        <Image
          style={styles.avatar}
          source={
            _.isEmpty(value.photoUrl)
              ? ICONS.DEFAULT_AVATAR
              : { uri: value.photoUrl }
          }
        />
      </TouchableOpacity>
    );
  }
  renderFriendRequest(value, index) {
    return (
      <TouchableOpacity
        key={`item-${index}`}
        style={styles.activeAvatarStyle}
        onPress={() =>
          this.onShowFriendProfile(value._id)
        }
      >
        <Image
          style={styles.avatar}
          source={
            _.isEmpty(value.photoUrl)
              ? ICONS.DEFAULT_AVATAR
              : { uri: value.photoUrl }
          }
        />
      </TouchableOpacity>
    );
  }
  renderFriend(value, index) {
    return (
      <TouchableOpacity
        key={`item-${index}`}
        style={styles.activeAvatarStyle}
        onPress={() =>
          this.onShowFriendProfile(value._id)
        }
      >
        <Image
          style={styles.avatar}
          source={
            _.isEmpty(value.photoUrl)
              ? ICONS.DEFAULT_AVATAR
              : { uri: value.photoUrl }
          }
        />
      </TouchableOpacity>
    );
  }

  renderItem({ item: value, index }) {
    if (value.isNew) return this.renderNew();
    switch (value.friendType) {
      case 'receivedRequest':
        return this.renderFriendRequest(value, index);
      case 'friend':
        return this.renderFriend(value, index);
      case 'sentRequest': // just in case, as of now it won't be accessed
        return this.renderFriendSent(value, index);
      default: // this means if the user is stranger, you probably need to define a new method
        return this.renderFriend(value, index);
    }
  }

  render() {
    const { data } = { ...this.props };
    const friends = [...data];
    friends.unshift({ isNew: true });

    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={friends}
          numColumns={4}
          keyExtractor={(item, index) => `friend-${index}`}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: deviceWidth,
    paddingHorizontal: 10,
  },
  emptyFriend: {
    margin: 10,
    backgroundColor: COLORS.LIGHT_ORANGE,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  addNewFriend: {
    margin: 10,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAddStyle: {
    width: deviceWidth / 8,
    height: deviceWidth / 8 * 119 / 139,
    resizeMode: 'contain',
  },
  activeAvatarStyle: {
    margin: 10,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
  },
};

export default Friends;
