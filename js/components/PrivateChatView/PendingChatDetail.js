'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import BackButton from '../commons/BackButton';
import Title from '../commons/Title';
import { COLORS, ICONS } from '../../constants';
import LoadingSpinner from '../commons/LoadingSpinner';
import headerStyle from '../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class PendingChatDetail extends Component {
  render() {
    const { data, actions, isFetching } = this.props;

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={<BackButton onPress={() => Actions.pop()} />}
          centerComponent={
            <Title
              title={'back to private chat sessions'}
              color={COLORS.BRIGHT_ORANGE}
            />
          }
          rightComponent={<View style={{ width: deviceWidth / 8 }} />}
          {...headerStyle}
        />
        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>
            looks like someone wants to add you to a chat group. would you like to accept the invitation?
          </Text>
        </View>
        <View style={styles.rows}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => actions.onAccptChat(data._id)}
          >
            <Text style={styles.buttonLabel}>connect</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={() => actions.onRejectChat(data._id)}
          >
            <Text style={styles.buttonLabel}>reject</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View
            style={{
              padding: 15,
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 60
            }}
          >
            {data.active_users
              .filter(user => user.user_id !== this.props.userId)
              .map((item, index) => {
                return (
                  <Image
                    key={index}
                    style={styles.avatarInvitees}
                    source={
                      data.active_users[0].photo_url
                        ? { uri: data.active_users[0].photo_url }
                        : ICONS.DEFAULT_AVATAR
                    }
                  />
                );
              })}
          </View>
        </ScrollView>
        {isFetching && <LoadingSpinner />}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  messageContainer: {
    backgroundColor: COLORS.BRIGHT_ORANGE_200,
    paddingHorizontal: 14,
    paddingVertical: 20
  },
  messageLabel: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: deviceWidth * 0.066
  },
  rows: {
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 5,
    backgroundColor: 'blue',
    width: deviceWidth * 0.33,
    borderRadius: 10
  },
  primaryButton: {
    backgroundColor: COLORS.GREEN,
    marginHorizontal: 15
  },
  dangerButton: {
    backgroundColor: COLORS.RED,
    marginHorizontal: 15
  },
  buttonLabel: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 18,
    textAlign: 'center'
  },
  avatarInvitees: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    ...Platform.select({
      android: { borderRadius: 95 },
      ios: { borderRadius: 45 }
    }),
    marginRight: 10,
    marginTop: 10
  }
};

export default PendingChatDetail;
