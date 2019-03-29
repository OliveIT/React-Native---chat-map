import React from 'react';

import { View } from 'react-native';
import styles from './styles';

export default class Modal extends React.PureComponent {
  render() {
    if (this.props.visible) {
      return (<View style={styles.modalContainer}>
        {this.props.children}
      </View>);
    }
    return null;
  }
}
