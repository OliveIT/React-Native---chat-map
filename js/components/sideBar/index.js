import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Content, Text, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import styles from './style';
import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';

class SideBar extends PureComponent {

  static propTypes = {
    // setIndex: PropTypes.func,
    closeDrawer: PropTypes.func,
    navigateTo: PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        <ListItem button onPress={() => { Actions.home(); this.props.closeDrawer(); }} >
          <Text>Home</Text>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

export default connect(null, bindAction)(SideBar);
