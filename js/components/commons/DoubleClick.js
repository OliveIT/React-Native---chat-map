import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, Alert } from 'react-native';

class DoubleClicker extends Component {
  constructor() {
    super();

    this.myPanResponder = {};

    this.prevTouchInfo = {
      prevTouchX: 0,
      prevTouchY: 0,
      prevTouchTimeStamp: 0
    };

    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
  }

  componentWillMount() {
    this.myPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this.handlePanResponderGrant
    });
  }

  distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
  }

  isDoubleTap(currentTouchTimeStamp, { x0, y0 }) {
    const { prevTouchX, prevTouchY, prevTouchTimeStamp } = this.prevTouchInfo;
    const dt = currentTouchTimeStamp - prevTouchTimeStamp;
    const { delay, radius } = this.props;

    return dt < delay && this.distance(prevTouchX, prevTouchY, x0, y0) < radius;
  }

  handlePanResponderGrant(evt, gestureState) {
    const currentTouchTimeStamp = Date.now();

    if (this.isDoubleTap(currentTouchTimeStamp, gestureState)) {
      this.props.onClick();
    } else {
      this.props.onPress();
    }

    this.prevTouchInfo = {
      prevTouchX: gestureState.x0,
      prevTouchY: gestureState.y0,
      prevTouchTimeStamp: currentTouchTimeStamp
    };
  }

  render() {
    return (
      <View {...this.myPanResponder.panHandlers}>{this.props.children}</View>
    );
  }
}

DoubleClicker.defaultProps = {
  delay: 300,
  radius: 20,
  onClick: () => Alert.alert('Double Tap Succeed')
};

DoubleClicker.propTypes = {
  delay: PropTypes.number,
  radius: PropTypes.number,
  onClick: PropTypes.func
};

module.exports = DoubleClicker;
