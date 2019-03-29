import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { to3dArray } from '../../../../utils/converter';
import { addFriend } from '../../../../actions/user';
import { COLORS, ICONS } from '../../../../constants';
import headerStyle from '../../../../utils/headerStyle';
import BackButton from '../../../commons/BackButton';
import Title from '../../../commons/Title';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const NoFriendLabel = () => (
  <Text
    style={{
      color: COLORS.GREY,
      fontFamily: 'avenir',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 40,
      ...Platform.select({
        android: { fontWeight: 'normal' },
        ios: { fontWeight: '500' },
      }),
    }}
  >
    you have no friends{'\n'}whom go by this username
  </Text>
);

const Friend = ({
  data,
  isEmpty,
  onAddToGroup,
  onProfilePicturePress,
  isSelect,
  onPress,
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

class FriendFindView extends React.Component {
  state = {
    query: ''
  };
  onSearch(text) {
    this.setState({ query: text }, () => {
      this.props.actions.searchFriends(this.state.query);
    });
  }
  onPress = data => {
    // alert('Request Actions');
    const { onFinishAdd } = this.props;
    if (__DEV__) {
      console.log(onFinishAdd);
    }
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
  };

  render() {
    const data = this.props.searchResult.toJS();
    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor={
            Platform.select({
              android: COLORS.BRIGHT_ORANGE,
              ios: COLORS.TRANSPARENT
            })
          }
          barStyle="light-content"
        />
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={
            <BackButton color={COLORS.WHITE} onPress={() => Actions.pop()}/>
          }
          centerComponent={<Title title={'friend finder'}/>}
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />

        <Content>
{/*
          <View style={styles.sectionHeaderViewStyle}>
            <Text style={styles.sectionHeaderTextStyle}>
              automated search
            </Text>
          </View>
          <View style={{ backgroundColor: COLORS.WHITE }}>
            <Text style={styles.textStyle1}>
              do you like what you see? then let your friends know{'\n'}about
              vediohead!
            </Text>
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                flexDirection: 'row'
              }}
            >
              <View width="33%" style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                  <Image
                    style={styles.iconStyle}
                    source={ICONS.GOOGLE_ICON}
                  />
                </TouchableOpacity>
              </View>
              <View width="33%" style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                  <Image
                    style={styles.iconStyle}
                    source={ICONS.FACEBOOK_ICON}
                  />
                </TouchableOpacity>
              </View>
              <View width="33%" style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                  <Image
                    style={styles.iconStyle}
                    source={ICONS.PHONE_ICON}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
*/}

          <View style={styles.sectionHeaderViewStyle}>
            <Text style={styles.sectionHeaderTextStyle}>manual search</Text>
          </View>
          <View style={{ backgroundColor: COLORS.WHITE }}>
            <Text style={styles.textStyle2}>
              type in your friend's username and let's start the search!
            </Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="@username"
              onChangeText={text => this.onSearch(text)}
              returnKeyType={'search'}
              underlineColorAndroid={COLORS.TRANSPARENT}
              clearButtonMode={'while-editing'}
              maxLength={20}
              value={this.state.query}
            />
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
          </View>
        </Content>
      </Container>
    );
  }
}

export default FriendFindView;
