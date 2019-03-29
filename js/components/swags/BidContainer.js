'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { COLORS, ICONS } from '../../constants';
import BiddingPopup from '../commons/BiddingPopup';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class BidContainer extends Component {
  static defaultProps = {
    isDisabled: false
  };
  state = {
    isBid: false,
    visible: false,
    isValid: true,
    amount: 1
  };

  onBidding = amount => {
    const { maxBid, totalCredit } = this.props;
    if (amount > 1 || totalCredit < maxBid) {
      this.setState({
        visible: true,
        isValid: totalCredit >= maxBid,
        amount: amount
      });
      return;
    }

    this.setState({ amount: amount });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  onConfirm = () => {
    const { isValid } = this.state;
    if (!isValid) {
      return this.setState({ visible: false });
    }
    this.setState({ isBid: false, visible: false }, () => {
      this.props.onBidding(this.props.id, this.state.amount);
    });
  };

  render() {
    const { isBid } = this.state;
    const { totalCredit, topBid } = this.props;

    if (topBid) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight
            style={[
              styles.buttonContainer,
              {
                backgroundColor: COLORS.GREY,
                borderColor: COLORS.DARK_GREY_100,
                borderWidth: 1
              }
            ]}
            underlayColor={COLORS.BRIGHT_ORANGE}
          >
            <Text style={styles.resultsLabel}>
              top bid
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {isBid ? (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonSmallContainer}
              underlayColor={COLORS.TRANSPARENT}
              onPress={() => this.onBidding(1)}
            >
              <Text style={styles.buttonLabel}>+1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSmallContainer}
              underlayColor={COLORS.TRANSPARENT}
              onPress={() => this.onBidding(totalCredit)}
            >
              <Text style={styles.buttonLabel}>+all</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonBackContainer}
              underlayColor={COLORS.TRANSPARENT}
              onPress={() => this.setState({ isBid: false })}
            >
              <Text
                style={[styles.buttonLabel, { color: COLORS.BRIGHT_ORANGE }]}
              >
                back
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableHighlight
            style={[
              styles.buttonContainer,
              this.props.isDisabled ? { opacity: 0.5 } : {}
            ]}
            onPress={() => {
              this.setState({ isBid: true });
            }}
            underlayColor={COLORS.BRIGHT_ORANGE}
          >
            <Text style={styles.buttonLabel}>bid</Text>
          </TouchableHighlight>
        )}
        <BiddingPopup
          isValid={this.state.isValid}
          visible={this.state.visible}
          onClose={this.onClose}
          onPress={this.onConfirm}
        />
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 18,
    textAlign: 'center'
  },
  resultsLabel: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonContainer: {
    width: deviceWidth * 0.56,
    height: 44,
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 22,
    marginTop: 25,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSmallContainer: {
    height: 44,
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 22,
    marginTop: 25,
    marginHorizontal: 5,
    padding: 5,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonBackContainer: {
    height: 44,
    borderWidth: 2,
    borderColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 22,
    marginTop: 25,
    marginHorizontal: 5,
    padding: 5,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default BidContainer;
