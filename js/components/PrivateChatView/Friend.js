import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { COLORS, ICONS } from '../../constants';
import MultiMemberAvatar from '../commons/MultiMemberAvatar';

const Friend = ({
  data,
  isEmpty,
  onRemoveChat,
  canRemove = true,
  pending = false
}) => {
  if (isEmpty) {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <TouchableHighlight
          style={styles.noItem}
          underlayColor={COLORS.TRANSPARENT}
        >
          <Text style={styles.roomLabel} />
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={{ marginHorizontal: 5 }}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (pending) {
            Actions.pendingChatDetail({ data: data });

            return;
          }

          Actions.chatRoom({
            channelName: data.room_name,
            isPublic: false,
            id: data._id,
            isVideoHead: data.isVideoHead
          });
        }}
      >
        {data.active_users.length > 2 ? (
          <MultiMemberAvatar
            images={[
              data.active_users[0].photo_url
                ? { uri: data.active_users[0].photo_url }
                : ICONS.DEFAULT_AVATAR,
              data.active_users[1].photo_url
                ? { uri: data.active_users[1].photo_url }
                : ICONS.DEFAULT_AVATAR,
              data.active_users[2].photo_url
                ? { uri: data.active_users[2].photo_url }
                : ICONS.DEFAULT_AVATAR
            ]}
          />
        ) : (
          <Image
            source={
              data.active_users[0].photo_url
                ? { uri: data.active_users[0].photo_url }
                : ICONS.DEFAULT_AVATAR
            }
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>
      {canRemove && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 25,
            height: 25,
            borderRadius: 20,
            borderWidth: 3,
            justifyContent: 'center',
            borderColor: COLORS.WHITE,
            backgroundColor: COLORS.WHITE,
            right: 0
          }}
          onPress={() =>
            Alert.alert('confirm', 'do you want to leave this group?', [
              { text: 'OK', onPress: () => onRemoveChat(data._id) },
              { text: 'Cancel', style: 'cancel' }
            ])
          }
        >
          <Image
            source={ICONS.REMOVE_ICON}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Friend;
