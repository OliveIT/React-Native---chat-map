import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Row } from 'native-base';
import PropTypes from 'prop-types';
import Item from './Item';

const propTypes = {
  data: PropTypes.array.isRequired,
  onSetPublicChatName: PropTypes.func.isRequired
};

class ChannelRow extends React.Component {
  render() {
    const {
      onSetPublicChatName,
      data,
      onJoinPublicZone,
      isFetching
    } = this.props;

    return (
      <ScrollView horizontal>
{/*
        {(data === null && isFetching) && (
          <View
            style={{
              backgroundColor: COLORS.PURPLE,
              justifyContent: 'center',
              width: deviceWidth,
              height: 20,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: COLORS.WHITE,
                textAlign: 'center',
                backgroundColor: COLORS.TRANSPARENT,
                fontFamily: 'avenir',
                fontSize: 14,
              }}
            >
              Loading...
            </Text>
          </View>
        )}
*/}
        {data.length > 2
          ? data.map((object, index) => {
              return (
                <Item
                  name={data[index].name}
                  key={index}
                  id={data[index].id || data[index]._id}
                  onJoinPublicZone={onJoinPublicZone}
                />
              );
            })
          : Array.apply(null, { length: 3 }).map((value, index) => {
            let name = '';
            let id = '';
            if (data[index]) {
              name = data[index].name;
              id = data[index].id || data[index]._id;
            }
            return (
              <Item
                name={name}
                key={index}
                id={id}
                disabled={name === ''}
                onJoinPublicZone={onJoinPublicZone}
              />
            );
          })}
      </ScrollView>
    );
  }
}

ChannelRow.propTypes = propTypes;

export default ChannelRow;
