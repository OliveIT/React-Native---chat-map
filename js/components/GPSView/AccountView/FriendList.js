import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, ActivityIndicator, Platform } from 'react-native';
import { Container } from 'native-base';
import Friends from './Friends';
import FriendsModal from './FriendsModal';
import Modal from '../../Modal';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class FriendList extends React.Component {
  state = {
    addFriendModal: false,
    query: ''
  };

  onSearch = () => {
    this.props.actions.searchFriends(this.state.query);
  };

  render() {
    const { addFriendModal, query } = this.state;

    return (
      <View style={styles.friendListViewStyle}>
        <ActivityIndicator
          color={COLORS.BRIGHT_ORANGE}
          size="small"
          animating={this.props.isFetchingFriend}
        />
        <Friends
          data={this.props.friends || []}
          onAddFriend={() => this.setState({ addFriendModal: true })}
        />

        <Modal
          visible={addFriendModal}
        >
          <Container style={styles.friendModalContainerStyle}>
            <View
              onLayout={e => {
                this.setState({ modalHeight: e.nativeEvent.layout.height });
              }}
              style={{ flex: 1 }}
            >
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.textStyle4}>
                  who do you want to add?
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: this.state.modalHeight - 100
                }}
              >
                <FriendsModal
                  data={this.props.friendsResult}
                  query={this.state.query}
                  onSelect={() => {}}
                  closeModal={() => this.setState({ addFriendModal: false })}
                  selected={[]}
                  onChange={value => {
                    this.setState({ query: value });
                    setTimeout(() => {
                      this.onSearch();
                    }, 200);
                  }}
                />
              </View>
            </View>
          </Container>
          <View
            style={{
              position: 'absolute',
              top: -16,
              right: 2,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.WHITE,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'rgba(52, 52, 52, 0.2)',
              zIndex: 999
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ addFriendModal: false })}
            >
              <Image
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: COLORS.TRANSPARENT,
                  borderRadius: 15,
                  borderWidth: 3,
                  borderColor: COLORS.WHITE,
                  width: 30,
                  height: 30
                }}
                source={ICONS.REMOVE_ICON}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  friendListViewStyle: {
    alignItems: 'center',
    marginHorizontal: deviceWidth * 0.04,
    marginTop: deviceWidth * 0.03,
    justifyContent: 'space-between',
    height: deviceHeight / 1.5,
    flex: 1
  },
  friendModalContainerStyle: {
    backgroundColor: COLORS.WHITE,
    borderColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'center',
    position: 'absolute',
    width: deviceWidth / 1.2,
    height: deviceHeight / 1.6
  },
  textStyle4: {
    color: COLORS.BRIGHT_ORANGE_200,
    fontFamily: 'avenir',
    fontSize: 16,
    ...Platform.select({ ios: { fontWeight: '500' } })
  }
};

export default FriendList;
