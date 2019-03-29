import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Content } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { COLORS } from '../../../constants';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import headerStyle from '../../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class OptionsView extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={COLORS.TRANSPARENT} barStyle="dark-content"/>
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={
            <BackButton
              onPress={() => Actions.pop({
                refresh: {
                  refresh: Math.random()
                }
              })}
            />
          }
          centerComponent={
            <Title title={'options'} color={COLORS.BRIGHT_ORANGE}/>
          }
          rightComponent={
            <View style={{ width: deviceWidth / 8 }}/>
          }
          {...headerStyle}
        />

        <View
          style={{
            alignItems: 'center',
            marginTop: deviceHeight * 0.2
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.buttonStyle1}
              onPress={() => Actions.settingsView()}
            >
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir'
                }}
              >
                settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle2}
              onPress={() => Actions.detailsView()}
            >
              <Text
                style={{
                  fontFamily: 'avenir'
                }}
              >
                details
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.buttonStyle2}
              onPress={() => Actions.friendFinderView()}
            >
              <Text
                style={{
                  fontFamily: 'avenir'
                }}
              >
                friend finder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle1}
              onPress={() => Actions.securityView()}
            >
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir'
                }}
              >
                security
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

export default OptionsView;
