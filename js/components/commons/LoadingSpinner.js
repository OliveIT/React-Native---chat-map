'use strict';
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Spinner } from 'native-base';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const LoadingSpinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spinner color="#f39019" style={{ alignSelf: 'center' }} />
    </View>
  );
};

export default LoadingSpinner;
