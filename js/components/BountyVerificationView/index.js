import React, { PureComponent } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StatusBar, Platform, FlatList } from 'react-native';
import { Container, Col, Row, Grid } from 'native-base';
import { Header } from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import { BountyVerificationData } from './dataForBounty';
import Title from '../commons/Title';
import { COLORS } from '../../constants';
import headerStyle from '../../utils/headerStyle';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class BountyVerificationList extends React.PureComponent {
  state = {
    showNotifications: true,
    showBarcodeOnly: true,
    showInfoHubOnly: true,
    showSurveysOnly: true,
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.BRIGHT_ORANGE);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('light-content');
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.BRIGHT_ORANGE);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('light-content');
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  clickBellButton = () => {
    this.state.showNotifications !== false && this.setState({ showNotifications: false });
    this.state.showNotifications !== true && this.setState({ showNotifications: true });
  };

  clickBarcodeOnlyButton = () => {
    this.state.showBarcodeOnly !== false && this.setState({ showBarcodeOnly: false });
    this.state.showBarcodeOnly !== true && this.setState({ showBarcodeOnly: true });
  };

  clickInfoHubOnlyButton = () => {
    this.state.showInfoHubOnly !== false && this.setState({ showInfoHubOnly: false });
    this.state.showInfoHubOnly !== true && this.setState({ showInfoHubOnly: true });
  };

  clickSurveyOnlyButton = () => {
    this.state.showSurveysOnly !== false && this.setState({ showSurveysOnly: false });
    this.state.showSurveysOnly !== true && this.setState({ showSurveysOnly: true });
  };

  renderBountyItem = ({ item }) => {
    if (item.type !== 'surveyEntry') {
      return (
        <View
          style={{
            backgroundColor: item.type === 'barcodeEntry'
              ? COLORS.BRIGHT_ORANGE
              : COLORS.PURPLE,
            margin: 5,
            borderRadius: 10,
            width: deviceWidth * 0.91,
          }}
        >
          <Grid>
            <Col style={{ width: '15%' }}>
              <FontAwesome5Pro
                name={item.type === 'barcodeEntry'
                  ? 'scanner-touchscreen'
                  : 'bullhorn'
                }
                style={styles.entryLeftColIconStyle}
                size={20}
                color={COLORS.WHITE}
              />
            </Col>
            <Col style={{ width: '60%' }}>
              <Row style={styles.entryCenterColRowStyle}>
                <Text style={styles.entryCenterColTextStyle}>
                  {item.bounty} VEDs
                </Text>
              </Row>
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.entryCenterColTextStyle}>
                  <FontAwesome5Pro
                    name={'hand-point-right'}
                    style={styles.entryFingerPointerStyle}
                    size={14}
                    color={COLORS.WHITE}
                  />
                  {' '}{item.submittedBy}
                </Text>
              </Row>
            </Col>
            <Col style={{ width: '25%' }}>
              <Row>
                <View style={styles.entryRightColViewStyle}>
                  <Text
                    style={{
                      color: COLORS.LIGHT_GREEN,
                      fontFamily: 'avenir',
                      fontSize: 12,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {item.verifiedCounts} / 2
                  </Text>
                </View>
              </Row>
              <Row>
                <View style={styles.entryRightColViewStyle}>
                  <Text
                    style={{
                      color: COLORS.BRIGHT_RED,
                      fontFamily: 'avenir',
                      fontSize: 12,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {item.notVerifiedCounts} / 2
                  </Text>
                </View>
              </Row>
            </Col>
          </Grid>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: COLORS.GREEN,
            margin: 5,
            borderRadius: 10,
            width: deviceWidth * 0.91,
          }}
        >
          <Grid>
            <Col style={{ width: '15%' }}>
              <FontAwesome5Pro
                name={'poll-h'}
                style={styles.entryLeftColIconStyle}
                size={20}
                color={COLORS.WHITE}
              />
            </Col>
            <Col style={{ width: '60%' }}>
              <Row style={styles.entryCenterColRowStyle}>
                <Text style={styles.entryBountySum}>
                  {item.bounty} VEDs
                </Text>
              </Row>
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.entryCenterColTextStyle}>
                  <FontAwesome5Pro
                    name={'hand-point-right'}
                    style={styles.entryFingerPointerStyle}
                    size={14}
                    color={COLORS.WHITE}
                  />
                  {' '}{item.surveyCompany}
                </Text>
              </Row>
            </Col>
            <Col style={{ width: '25%' }}>
              <Row>
                <View style={styles.entryRightColViewStyle}>
                  <Text style={styles.entrySurveyTextStyle}>
                    {item.surveySize} Qns
                  </Text>
                </View>
              </Row>
              <Row>
                <View style={styles.entryRightColViewStyle}>
                  <Text style={styles.entrySurveyTextStyle}>
                    {item.surveyDuration} mins
                  </Text>
                </View>
              </Row>
            </Col>
          </Grid>
        </View>
      );
    }
  }

  render() {
    const {
      showBarcodeOnly,
      showInfoHubOnly,
      showSurveysOnly,
      showNotifications,
    } = this.state;

    return (
      <Container style={styles.container}>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          centerComponent={<Title title={'bounty'}/>}
          {...headerStyle}
        />
        <Row
          style={{
            height: 50,
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          <View style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginHorizontal: 30,
          }}>
            <Text
              style={{
                fontFamily: 'avenir',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              earn VED tokens when you help the Vediohead community to self-moderate content
            </Text>
          </View>
        </Row>

        <Row style={{ height: 50, width: deviceWidth }}>
          <Col style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: showBarcodeOnly
                  ? COLORS.BRIGHT_ORANGE
                  : COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 36,
              }}
              onPress={this.clickBarcodeOnlyButton}
            >
              <FontAwesome5Pro
                name={'scanner-touchscreen'}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                size={20}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>

          <Col style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: showInfoHubOnly
                  ? COLORS.PURPLE
                  : COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 36,
              }}
              onPress={this.clickInfoHubOnlyButton}
            >
              <FontAwesome5Pro
                name={'bullhorn'}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 8,
                }}
                size={20}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>

          <Col style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: showSurveysOnly
                  ? COLORS.GREEN
                  : COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 36,
              }}
              onPress={this.clickSurveyOnlyButton}
            >
              <FontAwesome5Pro
                name={'poll-h'}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 8,
                }}
                size={20}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>

          <Col style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: showNotifications
                  ? COLORS.TRANSPARENT
                  : COLORS.DARK_GREY,
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 36,
              }}
              onPress={this.clickBellButton}
            >
              <FontAwesome5Pro
                name={showNotifications ? 'bell' : 'bell-slash'}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 8,
                }}
                size={20}
                color={showNotifications ? COLORS.DARK_GREY : COLORS.WHITE}
              />
            </TouchableOpacity>
          </Col>
        </Row>

        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <FlatList
            data={BountyVerificationData.filter((item) => {
              if (showBarcodeOnly && !showInfoHubOnly && !showSurveysOnly) {
                return item.type === 'barcodeEntry';
              } else if (!showBarcodeOnly && showInfoHubOnly && !showSurveysOnly) {
                return item.type === 'infoHubEntry';
              } else if (!showBarcodeOnly && !showInfoHubOnly && showSurveysOnly) {
                return item.type === 'surveyEntry';
              } else if (showBarcodeOnly && showInfoHubOnly && !showSurveysOnly) {
                return item.type !== 'surveyEntry';
              } else if (showBarcodeOnly && !showInfoHubOnly && showSurveysOnly) {
                return item.type !== 'infoHubEntry';
              } else if (!showBarcodeOnly && showInfoHubOnly && showSurveysOnly) {
                return item.type !== 'barcodeEntry';
              } else if (showBarcodeOnly && showInfoHubOnly && showSurveysOnly) {
                return item.type !== null;
              }
              return null;
            })}
            renderItem={this.renderBountyItem}
            keyExtractor={item => item.key}
          />
        </View>
      </Container>
    );
  }
}

export default BountyVerificationList;
