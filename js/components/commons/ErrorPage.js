'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

const ErrorPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headLabel}>Something</Text>
        <Text style={styles.headLabel}>went</Text>
        <Text style={styles.headLabel}>wrong!</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.textLabel}>please give us a</Text>
        <Text style={styles.textLabel}>little time to fix this.</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D5D5'
  },
  headLabel: {
    fontSize: 24,
    fontFamily: 'avenir',
    color: '#fff',
    textAlign: 'center'
  },
  textLabel: {
    fontSize: 18,
    fontFamily: 'avenir',
    color: '#fff',
    textAlign: 'center'
  }
};

export default ErrorPage;
