'use strict';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  images: PropTypes.array.isRequired
};

const MultiMemberAvatar = ({ images }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.wrapper1}>
          <View style={styles.wrapper2}>
            <View style={styles.partner1}>
              <Image source={images[0]} style={styles.partner1Image} />
            </View>
            <View style={{ marginLeft: 1 }}>
              <View style={styles.partner2}>
                <Image source={images[1]} style={styles.partner2Image} />
              </View>
              <View style={styles.partner2}>
                <Image source={images[2]} style={styles.partner2Image} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

MultiMemberAvatar.propTypes = propTypes;

const styles = {
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    borderRadius: 90
  },
  wrapper: {
    width: 90,
    height: 90
  },
  wrapper1: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 90,
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  wrapper2: {
    width: 90,
    height: 90,
    flex: 1,
    flexDirection: 'row'
  },
  partner1: {
    width: 55,
    overflow: 'hidden'
  },
  partner2: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    backgroundColor: '#fff'
  },
  partner1Image: {
    width: 55,
    height: 90,
    resizeMode: 'cover'
  },
  partner2Image: {
    width: 35,
    height: 45,
    resizeMode: 'cover'
  }
};

export default MultiMemberAvatar;
