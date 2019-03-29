'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class BidWinner extends Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <Icon
            name="ios-close-circle-outline"
            style={{
              fontSize: 32,
              color: COLORS.BRIGHT_ORANGE,
              textAlign: 'left'
            }}
          />
        </View>
        <Image
          source={{ uri: data.get('filePath') }}
          style={styles.imageFile}
        />

        <Text style={styles.creditLabel}>100 tokens</Text>
        <View style={styles.congratsContainer}>
          <Text style={styles.headLabel}>congratulations!</Text>
          <Text style={styles.description}>
            vediohead will be contacting you very soon to follow up about your
            incentive. stay tuned!
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>redeemed!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginBottom: 50
  },
  imageFile: {
    resizeMode: 'contain',
    width: deviceWidth / 1.5,
    height: deviceWidth / 1.5,
    marginHorizontal: 15
  },
  closeContainer: {
    alignItems: 'flex-start',
    width: deviceWidth - 30
  },
  congratsContainer: {
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 25,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center'
  },
  headLabel: {
    color: COLORS.BRIGHT_ORANGE,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },
  description: {
    fontSize: 18,
    color: COLORS.BRIGHT_ORANGE,
    textAlign: 'center'
  },
  buttonLabel: {
    textAlign: 'center',
    color: COLORS.WHITE
  },
  button: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 10,
    width: 150,
    padding: 10,
    marginTop: 15
  },
  creditLabel: {
    fontSize: 18,
    color: COLORS.BRIGHT_ORANGE,
    marginBottom: 15
  }
};

export default BidWinner;
