'use strict';
import React from 'react';
import { View, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import NbIcon from '../commons/NbIcon';
import { COLORS } from '../../constants';

const MemberCircle = ({ onRemove, canRemove = true, isMind, avatar }) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <TouchableOpacity style={{ justifyContent: 'center' }} activeOpacity={1}>
        <Image
          source={avatar}
          style={{
            width: 80,
            height: 80,
            resizeMode: 'cover',
            marginLeft: 10,
            ...Platform.select({
              android: { borderRadius: 90 },
              ios: { borderRadius: 40 }
            })
          }}
        />
      </TouchableOpacity>
      {canRemove && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: COLORS.TRANSPARENT,
            top: 5,
            right: 0,
            width: 20,
            height: 20
          }}
          onPress={() => {
            Alert.alert(
              'confirm',
              'do you want to remove this user from group?',
              [
                { text: 'Ok', onPress: onRemove },
                { text: 'Cancel', style: 'cancel' }
              ]
            );
          }}
        >
          <NbIcon
            family={'Ionicons'}
            name={'md-remove-circle'}
            style={{ fontSize: 20, color: isMind ? 'blue' : COLORS.RED }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MemberCircle;
