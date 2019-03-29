'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput, Keyboard, PixelRatio, Platform, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { to3dArray } from '../../../utils/converter';
import { addFriend } from '../../../actions/user';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const NoFriendLabel = () => (
  <Text style={styles.noFriendLabelStyle}>
    you have no friends{'\n'}whom go by this username
  </Text>
);

const Friend = ({
  data,
  isEmpty,
  onAddToGroup,
  onProfilePicturePress,
  isSelect,
  onPress
}) => {
  if (isEmpty) {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.noItem}/>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <View style={{ marginTop: 10 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => onProfilePicturePress(data)}>
            <Image
              style={styles.avatar}
              source={
                _.isEmpty(data.photoUrl)
                  ? ICONS.DEFAULT_AVATAR
                  : { uri: data.photoUrl }
              }
            />
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              width: 77,
            }}
          >
            <Text style={{ fontFamily: 'avenir', textAlign: 'center' }} numberOfLines={2}>
              {data.username}
            </Text>
{/*
            {!data.isFriend && (
              <TouchableOpacity onPress={() => onPress(data)}>
                <Text style={{ fontFamily: 'avenir' }} numberOfLines={1}>
                  {data.isReceiveRequest && 'Accept'}
                  {data.isSentRequest && 'Request Sent'}
                  {!data.isReceiveRequest &&
                    !data.isSentRequest &&
                    'Add Friend'}
                </Text>
              </TouchableOpacity>
            )}
  */}
          </View>
        </View>
      </View>
    </View>
  );
};

const Items = ({ data, onPress, onProfilePicturePress, selected }) => {
  const threeDArray = to3dArray(data);
  return (
    <View style={{ flex: 1 }}>
      {threeDArray.map((array, index) => {
        return (
          <View style={styles.rows} key={index}>
            {Array.apply(null, { length: 3 }).map((value, i) => (
              <Friend
                key={i}
                data={array[i]}
                onPress={onPress}
                onProfilePicturePress={onProfilePicturePress}
                isEmpty={array[i] === undefined}
                isSelect={false}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
};

class Friends extends React.Component {
  onPress = data => {
    // alert('Request Actions');
    const { onFinishAdd } = this.props;
    addFriend(
      data._id,
      function() {
        Alert.alert('success', 'added a friend!');
        onFinishAdd();
      // },
      // function() {
      //   Alert.alert('error', 'while adding friend');
      }
    );
  };

  onProfilePicturePress = data => {
    Actions.accountView({ userId: data._id });
    this.props.closeModal();
  };

  render() {
    const {
      data,
      query
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInputStyle}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="search username"
            onChangeText={this.props.onChange}
            returnKeyType={'search'}
            underlineColorAndroid={COLORS.TRANSPARENT}
            clearButtonMode={'while-editing'}
            maxLength={20}
            value={query}
          />
        </View>
        <ScrollView>
          {data.length > 0 ? (
            <Items
              data={data}
              selected={false}
              onPress={this.onPress}
              onProfilePicturePress={this.onProfilePicturePress}
            />
          ) : (
            <NoFriendLabel />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  noFriendLabelStyle: {
    color: COLORS.GREY,
    fontFamily: 'avenir',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '500' },
    }),
  },
  searchInputStyle: {
    fontFamily: 'avenir',
    fontSize: 15,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 10,
    height: 16 * PixelRatio.get(),
    paddingLeft: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  searchInputContainer: {
    marginVertical: 5,
    width: deviceWidth / 1.5,
  },
  avatar: {
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: deviceWidth / 5,
    flex: 1,
  },
  rows: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  noItem: {
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: deviceWidth / 11,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginRight: 20,
  }
};

export default Friends;
