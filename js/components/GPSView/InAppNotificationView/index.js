import React from 'react';
import {
  Text, View, TouchableOpacity, Image, ScrollView, Dimensions,
} from 'react-native';
import { ICONS } from '../../../constants';
import styles from '../styles';

const LIMIT_GROUP_NOTIFICATIONS = 5;
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class InAppNotificationView extends React.Component {
  renderVideo(notification) {
    let { vedio_id: reference, reference: video } = notification;
    if (!video && reference) {
      video = reference;
    }
    if (!video) {
      return null;
    }
    const style = ((video && video.sharedWith) || 'everyone') === 'friends' ? styles.orangeCountStyle : styles.purpleCountStyle;
    const avatar = video.user_id.photoUrl ? { uri: video.user_id.photoUrl } : ICONS.DEFAULT_AVATAR;
    return (
      <TouchableOpacity
        style={styles.candidateStyle}
        onPress={this.props.onPinPress.bind(null, notification)}
      >
        <Image
          style={styles.otherImageStyle}
          source={avatar}
        />
        <View style={style}>
          <Text style={styles.notifCountStyle}>{notification.count > LIMIT_GROUP_NOTIFICATIONS ? '+' : notification.count}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderComment(notification) {
    let { vedio_id: reference, reference: video } = notification;
    if (!video && reference) {
      video = reference;
    }
    if (!video && reference) {
      video = reference;
    }
    if (!video) return null;
    const avatar = video.user_id.photoUrl ? { uri: video.user_id.photoUrl } : ICONS.DEFAULT_AVATAR;
    const style = ((video && video.sharedWith) || 'everyone') === 'friends' ? styles.orangeBubbleStyle2 : styles.purpleBubbleStyle2;
    return (
      <TouchableOpacity
        style={styles.candidateStyle}
        onPress={this.props.onCommentPress.bind(null, notification)}
      >
        <Image
          style={styles.otherImageStyle}
          source={avatar}
        />
        <View style={styles.commentNotifViewStyle}>
          <Image
            style={style}
            source={ICONS.COMMENTNOTIF_PURPLE}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderFriendRequest(notification) {
    const { reference: user } = notification;
    if (!user) {
      return null;
    }
    const style = styles.blueCountStyle;
    const avatar = user.photoUrl ? { uri: user.photoUrl } : ICONS.DEFAULT_AVATAR;
    return (
      <TouchableOpacity
        style={styles.candidateStyle}
        onPress={this.props.onFriendRequestPress.bind(null, notification)}
      >
        <Image
          style={styles.otherImageStyle}
          source={avatar}
        />
        <View
          style={style}
        />
      </TouchableOpacity>
    );
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.notifications) !== JSON.stringify(nextProps.notifications);
  }

  reducedNotifications() {
    if (!this.props.notifications || !this.props.notifications.map) {
      return [];
    }
    const maps = new Map();
    return this.props.notifications.reduce((all, notification) => {
      if (notification.type === 'video' && notification.referenceInfo !== 'comment') {
        const { user_id, sharedWith } = notification.reference || notification.vedio_id;
        const uniqueKey = `${user_id._id}-${sharedWith}`;
        if (maps.has(uniqueKey)) {
          all[maps.get(uniqueKey)].count += 1;
          all[maps.get(uniqueKey)].notifications.push(notification);
        } else {
          maps.set(uniqueKey, all.length);
          all.push({
            ...notification,
            count: 1,
            notifications: [notification],
          });
        }
      } else {
        all.push(notification);
      }
      return all;
    }, []);
  }

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
        style={{
          marginLeft: 20 + deviceHeight * 0.1 + deviceWidth * 0.05,
          marginRight: 20,
        }}
      >
        {this.reducedNotifications().map((notification) => {
          switch (notification.type) {
            case 'video':
              if (notification.referenceInfo === 'comment') {
                return this.renderComment(notification);
              }
              return this.renderVideo(notification);
            case 'chat':
              return this.renderComment(notification);
            case 'friend':
              return this.renderFriendRequest(notification);
          }
          return null;
        })}
      </ScrollView>
    );
  }
}
