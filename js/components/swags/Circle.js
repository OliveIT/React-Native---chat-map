import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { COLORS } from '../../constants';

const Circle = ({ credit, label = 'token', labelStyle = {} }) => {
  return (
    <View style={styles.circle}>
      <Text style={[styles.labelNumber, labelStyle]}>{credit}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = {
  circle: {
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 45,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  labelNumber: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 24,
    backgroundColor: COLORS.TRANSPARENT
  },
  label: {
    color: COLORS.TEXT_GREY,
    fontFamily: 'avenir',
    backgroundColor: COLORS.TRANSPARENT
  }
};

export default Circle;
