import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Friend from './Friend';

const defaultProps = {
  pending: false
};

class ChatItems extends Component {
  render() {
    const { data, onRemoveMember, userId, pending } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {data.map((array, index) => {
          return (
            <View
              style={styles.rows}
              key={`${pending ? 'pending' : 'active'}-${index}`}
            >
              {Array.apply(null, { length: 3 }).map((value, i) => {
                return (
                  <Friend
                    key={`${pending ? 'pending' : 'active'}-${index}-${i}`}
                    data={array[i]}
                    isEmpty={array[i] === undefined}
                    canRemove={!pending}
                    pending={pending}
                    onRemoveChat={chatId => {
                      onRemoveMember(chatId, userId, true);
                    }}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

ChatItems.defaultProps = defaultProps;

const styles = {
  rows: {
    ...Platform.select({
      android: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
      },
      ios: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
      }
    })
  }
};

export default ChatItems;
