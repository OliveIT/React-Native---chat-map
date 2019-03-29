import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  StatusBar
} from 'react-native';
import { Container } from 'native-base';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { COLORS, ICONS } from '../../../constants';
import BackButton from '../../commons/BackButton';
import Title from '../../commons/Title';
import headerStyle from '../../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ContentReporting extends Component {
  render() {
    return (
      <Container style={styles.reportingContainer}>
        <StatusBar
          backgroundColor={COLORS.TRANSPARENT}
          barStyle="dark-content"
        />
        <Header
          backgroundColor={COLORS.WHITE}
          leftComponent={<BackButton onPress={() => Actions.pop()} />}
          centerComponent={
            <Title title={'report'} color={COLORS.BRIGHT_ORANGE} />
          }
          rightComponent={<View style={{ width: deviceWidth / 8 }} />}
          {...headerStyle}
        />

        <View style={styles.headContent}>
          <Text style={styles.headContentTextStyle}>
            why are you reporting this post?
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: deviceHeight * 0.1 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.reportButtonStyle2}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'self injury',
                  content:
                    'we want to provide a safe place for everyone here at vediohead.  we will remove vedios encouraging or promoting self injury (including suicide, cutting, bulima, anorexia and other eating disorders).  vedios that identify and make fun of victims of self injury will also be removed.  help us keep the community safe.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.TEXT_GREY,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                self injury
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportButtonStyle1}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'harassment',
                  content:
                    'we take harassment very seriously at vediohead.  vedios that contain credible threats, target people to degrade or shame them, or share personal information to blackmail or harass will be taken down.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                harassment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportButtonStyle2}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'sale / promotion of drugs',
                  content:
                    'vedios offering to buy, sell or distribute prohibited substances will be taken down.  relevant authorities may also be notified.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.TEXT_GREY,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                sale /{'\n'}promotion of{'\n'}drugs
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.reportButtonStyle1}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'sale / promotion of firearms',
                  content:
                    'vedios offering to buy or sell firearms, ammunition, explosives, or ingredients to build explosives will be taken down.  relevant authorities may also be notified.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                sale /{'\n'}promotion of{'\n'}firearms
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportButtonStyle2}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'pornography',
                  content:
                    'let’s keep vediohead clean.  We take down vedios of sexual intercourse and/or genitalia.  definitely no videos of nude or partially nude children.  we do not view breastfeeding as pornography.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.TEXT_GREY,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                pornography
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportButtonStyle1}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'violence / harm',
                  content:
                    'an eye for an eye makes the world blind.  we do not condone vedios of explicit violence, or specific threats of physical, and financial harm.  the reported account may also be deactivated.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                violence /{'\n'}harm
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.reportButtonStyle2}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'hate speech / symbols',
                  content:
                    'there is no place for hate in vediohead.  if you feel that a vedio encourages hate, physical harm or contains hate speech and/or symbolism, let us know. the reported account may also be deactivated.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.TEXT_GREY,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                hate speech / symbols
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportButtonStyle1}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'intellectual property violation',
                  content:
                    'we remove vedios that include copyright or trademark infringement.  if another user is using your vedios without your permission or is impersonating you, we will remove the content, and may deactivate the account.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                intellectual{'\n'}property{'\n'}violation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportButtonStyle2}
              onPress={() =>
                Actions.contentReportedDetail({
                  id: this.props.id,
                  title: 'i just don’t like it',
                  content:
                    'do you want to consider disconnecting from `username`? you won’t see anymore pin drops or vedios from them anymore.'
                })
              }
            >
              <Text
                style={{
                  color: COLORS.TEXT_GREY,
                  fontFamily: 'avenir',
                  textAlign: 'center'
                }}
              >
                i just {"don't"} like{'\n'}it
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

export default ContentReporting;
