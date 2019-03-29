'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Platform } from 'react-native';
import { COLORS, ICONS } from '../../constants';
import moment from 'moment';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const MessageContainer = ({ type, data, date }) => {
  // if (type === 'incoming') return;

  return (
    <View style={styles.descriptorContainer}>
      <Text style={[styles.descriptorLabel, styles.descriptorLabelSpacing]}>
        {data && data.get('publishDescription').size > 0 && data.get('publishDescription')}
        {type === 'incoming' && <Text style={styles.descriptorLabel}>incoming descriptor</Text>}
        {type === 'weekly' && (
          <Text style={styles.descriptorLabel}>
            {moment(date).format('DD/MM/YYYY')}
            {` `}to{` `}
            {moment(date)
              .add(7, 'days')
              .format('DD/MM/YYYY')}
          </Text>
        )}
        {type === 'quarterly' && (
          <Text style={styles.descriptorLabel}>
            {moment(date).format('DD/MM/YYYY')}
            {` `}at{` `}
            {moment(date).format('hh:mm')}
          </Text>
        )}
      </Text>
    </View>
  );
};

const styles = {
  descriptorContainer: {
    height: deviceHeight * 0.09,
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderWidth: 1,
    borderRadius: 11,
    marginHorizontal: deviceWidth / 22,
    marginBottom: 25
  },
  descriptorLabel: {
    color: COLORS.WHITE,
    fontSize: 14,
    textAlign: 'center'
  },
  descriptorLabelSpacing: {
    ...Platform.select({
      android: { marginTop: deviceHeight * 0.005 },
      ios: { marginTop: deviceHeight * 0.027 }
    })
  }
};

export default MessageContainer;
