'use strict';
import React, { Component } from 'react';
import { Text, View, TextInput, PixelRatio, Dimensions, Platform, Image, TouchableHighlight, ScrollView } from 'react-native';
import { to3dArray } from '../../utils/converter';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const NoFriendLabel = () => (
  <Text style={styles.noItemLabel}>
    you have no friends{'\n'}whom go by this username
  </Text>
);

const Friend = ({ data, isEmpty, onAddToGroup, isSelect }) => {
  if (isEmpty) {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.noItem}/>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <TouchableHighlight
        onPress={() => {
          onAddToGroup(data._id);
        }}
        underlayColor={COLORS.TRANSPARENT}
        style={{ marginTop: 10 }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            style={styles.avatar}
            source={
              _.isEmpty(data.photoUrl)
                ? ICONS.DEFAULT_AVATAR
                : { uri: data.photoUrl }
            }
          />
          {isSelect && (
            <View
              style={{
                backgroundColor: COLORS.GREY,
                position: 'absolute',
                top: 0,
                width: deviceWidth / 5.5,
                height: deviceWidth / 5.5,
                opacity: 0.7,
                ...Platform.select({
                  android: { borderRadius: deviceWidth / 5.5 + 5 },
                  ios: { borderRadius: deviceWidth / 11 }
                }),
              }}
            />
          )}

          <View
            style={{
              alignItems: 'center',
              width: 50,
            }}
          >
            <Text style={{ fontFamily: 'avenir' }} numberOfLines={1}>{data.username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const Items = ({ data, onAddToGroup, selected }) => {
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
                onAddToGroup={onAddToGroup}
                isEmpty={array[i] === undefined}
                isSelect={array[i] ? selected.includes(array[i]._id) : false}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
};

class Friends extends React.Component {
  render() {
    const { query, data } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'search username'}
            maxLength={20}
            style={styles.textInputStyle}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            clearButtonMode={'while-editing'}
            onChangeText={this.props.onChange}
            returnKeyType={'search'}
            underlineColorAndroid={COLORS.TRANSPARENT}
          />
        </View>
        <ScrollView>
          {data.size > 0 ? (
            <Items
              data={data.toJS()}
              selected={this.props.selected}
              onAddToGroup={this.props.onSelect}
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
  textInputStyle: {
    fontFamily: 'avenir',
    fontSize: 15,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 6 * PixelRatio.get(),
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 10,
    height: 12 * PixelRatio.get(),
    paddingLeft: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  inputContainer: {
    width: deviceWidth / 1.5,
    marginVertical: 5,
  },
  avatar: {
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    margin: 10,
    backgroundColor: COLORS.TRANSPARENT,
    width: deviceWidth / 5.5,
    height: deviceWidth / 5.5,
    borderRadius: deviceWidth / 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  noItemLabel: {
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
};

export default Friends;
