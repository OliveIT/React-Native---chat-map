'use strict';
import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { COLORS } from '../../constants';

const IncompleteProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        once you have completed your personal details, you will be able to fully
        access the rewards page
      </Text>
      <TouchableHighlight
        underlayColor={COLORS.TRANSPARENT}
        onPress={() => Actions.detailsView()}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>click here</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  container: {
    padding: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.BRIGHT_ORANGE,
    borderRadius: 15,
    marginTop: 25,
    width: 100,
    justifyContent: 'center'
  },
  buttonLabel: {
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    textAlign: 'center'
  }
};

export default IncompleteProfile;
