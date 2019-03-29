import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import headerStyle from '../../../utils/headerStyle';
import TermCondtion from '../modal/TermCondtion';
import LoadingSpinner from '../../commons/LoadingSpinner';
import Title from '../../commons/Title';
import NbIcon from '../../commons/NbIcon';
import { checkUserName, onUpdateUsername } from '../../../actions/user';
import { COLORS } from '../../../constants';

class UsernameView extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { checkUserName } = this.props;

    return (
      <Container>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          centerComponent={
            <Title
              title={'add username'}
            />
          }
          {...headerStyle}
        />

        <Content>
          <TermCondtion />
          <Text style={styles.textPlaceholderStyle}>
            choose your username
          </Text>
          <View style={styles.usernameInputAreaStyle}>
            <TextInput
              underlineColorAndroid={COLORS.TRANSPARENT}
              style={styles.usernameInputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="username"
              onEndEditing={() => {
                this.props.actions.checkUserName(this.state.username);
              }}
              onChangeText={username => {
                this.setState({ username });
              }}
            />
          </View>


          {!this.state.username == '' ?
            <View style={styles.usernameStatusViewStyle}>
              <Text style={styles.usernameStatusStyle}>
                {!checkUserName.isFetching && (
                  <NbIcon
                    family={'Ionicons'}
                    name={checkUserName.isValid ? 'md-checkmark' : 'md-close'}
                    style={
                      checkUserName.isValid ? (
                        styles.usernameStatusAvailableIconStyle
                      ) : (
                        styles.usernameStatusUnavailableIconStyle
                      )
                    }
                  />
                )} username {checkUserName.isValid ? 'available' : 'unavailable'}
              </Text>
            </View>
            :
            <View style={styles.usernameStatusViewStyle}/>
          }

          <View style={styles.confirmBtnViewStyle}>
            <Button
              style={styles.confirmBtnStyle}
              onPress={() => {
                this.props.actions.onUpdateUsername(this.state.username);
              }}
            >
              <Text style={styles.textStyle1}>confirm</Text>
            </Button>
          </View>
          {this.props.isFetching && <LoadingSpinner />}
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators({checkUserName, onUpdateUsername}, dispatch)
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isFetching: state.user.isFetching,
    showTermCondition: state.user.showTermCondition,
    checkUserName: state.user.checkUserName
  };
};

export default connect(mapStateToProps, bindActions)(UsernameView);
