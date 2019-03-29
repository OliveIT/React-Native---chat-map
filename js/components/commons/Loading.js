'use strict';
import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: COLORS.WHITE,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View style={{ marginTop: -150 }}>
        <Image
          source={ICONS.LOADING_ICON}
          style={{
            width: 180,
            height: 180,
            resizeMode: 'contain'
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'avenir',
            color: COLORS.BRIGHT_ORANGE,
            textAlign: 'center'
          }}
        >
          just a moment…
        </Text>
      </View>
    </View>
  );
};

export default Loading;
