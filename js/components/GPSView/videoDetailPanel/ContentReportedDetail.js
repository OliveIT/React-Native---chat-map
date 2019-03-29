import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Modal, Platform, StatusBar } from 'react-native';
import { Container } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import { COLORS, ICONS } from '../../../constants';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import headerStyle from '../../../utils/headerStyle';
import { onReport } from '../../../actions/activities';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ContentReportedView extends Component {
  render() {
    const {
      title,
      content
    } = this.props;
    return (
      <Container style={styles.reportingContainer}>
        <StatusBar backgroundColor={COLORS.TRANSPARENT} barStyle="dark-content"/>
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={<BackButton onPress={() => Actions.pop()}/>}
          centerComponent={
            <Title title={'report'} color={COLORS.BRIGHT_ORANGE}/>
          }
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />

        <View style={styles.headContent}>
          <Text style={styles.headContentTextStyle}>{title}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: deviceHeight * 0.05
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.BRIGHT_RED,
              width: deviceWidth * 0.25,
              height: deviceWidth * 0.25,
              justifyContent: 'center',
              ...Platform.select({
                android: { borderRadius: deviceWidth * 0.475 },
                ios: { borderRadius: deviceWidth * 0.125 }
              })
            }}
            onPress={() =>
              this.props.actions.onReport(this.props.id, title)
                .then(() => {
                  Actions.videoDetail({ id: this.props.id });
                })
            }
          >
            <Text
              style={{
                color: COLORS.WHITE,
                backgroundColor: COLORS.TRANSPARENT,
                fontFamily: 'avenir',
                fontSize: 16,
                textAlign: 'center'
              }}
            >
              REPORT
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: COLORS.TEXT_GREY,
                fontFamily: 'avenir',
                fontSize: 14,
                textAlign: 'justify',
                margin: deviceWidth * 0.1
              }}
            >
              {content}
            </Text>
          </View>

          {/*
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.TRANSPARENT,
              width: deviceWidth * 0.25,
              height: deviceWidth * 0.25,
              justifyContent: 'center',
              ...Platform.select({
                android: { borderRadius: deviceWidth * 0.475 },
                ios: { borderRadius: deviceWidth * 0.125 }
              })
            }}
            onPress={
              null
            }
          >
            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                backgroundColor: COLORS.TRANSPARENT,
                fontFamily: 'avenir',
                fontSize: 16,
                textAlign: 'center'
              }}
            >
              BLOCK
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: COLORS.TEXT_GREY,
                fontFamily: 'avenir',
                fontSize: 14,
                textAlign: 'justify',
                margin: deviceWidth * 0.1
              }}
            >
              {blocked_content}
            </Text>
          </View>
          */}
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      { onReport },
      dispatch
    )
  };
}

const mapStateToProps = (state, oldState) => {
  return {};
};

export default connect(mapStateToProps, bindActions)(ContentReportedView);
