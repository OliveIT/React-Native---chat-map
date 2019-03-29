import React, { Component } from 'react';
import { Text, View, Dimensions, Platform, TextInput, StatusBar, Switch } from 'react-native';
import { Container, Content } from 'native-base';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import styles from './styles';
import { COLORS } from '../../../../constants';
import BackButton from '../../../commons/BackButton';
import Title from '../../../commons/Title';
import headerStyle from '../../../../utils/headerStyle';
import { updateDetail } from '../../../../actions/user';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class DetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        mobileNo: props.data.mobileNo,
        email: props.data.email,
        dob: props.data.dob,
        gender: props.data.gender || 'Male'
      },
      oldForm: {
        mobileNo: props.data.mobileNo,
        email: props.data.email,
        dob: props.data.dob,
        gender: props.data.gender || 'Male'
      },
      formChange: false
    };
  }

  getCurrentDate() {
    const todaydate = new Date();

    let day = todaydate.getDate();
    let month = todaydate.getMonth() + 1;
    let year = todaydate.getFullYear();

    this.setState({ currentDate: year + '-' + month + '-' + day });
  }

  componentWillMount() {
    this.getCurrentDate();
  }

  onSaveBeforeBack = () => {
    const { form, oldForm } = this.state;

    if (oldForm.mobileNo !== form.mobileNo || oldForm.email !== form.email || oldForm.dob !== form.dob || oldForm.gender !== form.gender) {
      if (form.gender === 'Other') {
        form.gender = 'Male';
        return this.setState({ form: form }, () => {
          this.onSaveBeforeBack();
        });
      }
      return this.props.actions.updateDetail(form);
    }
    Actions.pop(); // this action was previously disabled, it could potentially pose an error when enabled
  };

  onInputChange(field, value) {
    const { form } = this.state;
    form[field] = value;
    this.setState({ form: form });
  }

  render() {
    const {
      currentDate,
      form
    } = this.state;
    const { isFetching } = this.props;

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={Platform.select({ android: COLORS.BRIGHT_ORANGE, ios: COLORS.TRANSPARENT })} barStyle="light-content"/>
        <Header
          backgroundColor={COLORS.BRIGHT_ORANGE}
          leftComponent={<BackButton color={COLORS.WHITE} onPress={this.onSaveBeforeBack}/>}
          centerComponent={<Title title={'details'}/>}
          rightComponent={<View style={{ width: deviceWidth / 8 }}/>}
          {...headerStyle}
        />

        <View style={styles.alertsTextstyle}>
          <Text
            style={{
              color: COLORS.BRIGHT_ORANGE,
              fontFamily: 'avenir',
              fontSize: 20,
              fontWeight: '600',
              alignSelf: 'center'
            }}
          >
            user information
          </Text>
        </View>

        <Content>
          <View style={{ backgroundColor: COLORS.WHITE }}>
            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                fontSize: 12,
                textAlign: 'center',
                marginHorizontal: deviceWidth * 0.1,
                marginTop: deviceWidth * 0.07,
                fontFamily: 'avenir'
              }}
            >
              access and password retrievals will be based on the information here
            </Text>

            <View style={styles.itemStyle}>
              <View width="35%" style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    color: '#4b83be',
                    fontFamily: 'avenir'
                  }}
                >
                  male
                </Text>
              </View>
              <View width="30%" style={{ alignItems: 'center' }}>
                <Switch
                  value={form.gender === 'Female' ? true : false}
                  thumbTintColor={'rgba(216, 216, 216, 1)'}
                  tintColor={'rgba(75, 131, 190, 1)'}
                  onTintColor={'rgba(219, 75, 62, 1)'}
                  onValueChange={value => {
                    this.onInputChange('gender', value ? 'Female' : 'Male');
                  }}
                  style={{
                    ...Platform.select({
                      ios: { backgroundColor: 'rgba(75, 131, 190, 1)', borderRadius: 17 }
                    })
                  }}
                />
              </View>
              <View width="35%" style={{ alignItems: 'flex-start' }}>
                <Text
                  style={{
                    color: '#db4b3e',
                    fontFamily: 'avenir'
                  }}
                >
                  female
                </Text>
              </View>
            </View>

            <View style={{ backgroundColor: COLORS.WHITE }}>
              <DatePicker
                style={styles.dateInputStyle}
                date={form.dob}
                customStyles={{
                  btnTextConfirm: {
                    color: COLORS.TEXT_GREY,
                    fontFamily: 'avenir',
                    fontSize: 16
                  },
                  btnTextCancel: {
                    color: COLORS.TEXT_GREY,
                    fontFamily: 'avenir',
                    fontSize: 16
                  },
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    marginLeft: 5
                  },
                  dateText: {
                    color: COLORS.TEXT_GREY,
                    fontFamily: 'avenir',
                    fontSize: 16
                  },
                  placeholderText: {
                    color: COLORS.TEXT_GREY,
                    fontFamily: 'avenir',
                    fontSize: 16,
                    marginTop: 4,
                    textAlignVertical: 'center'
                  }
                }}
                mode="date"
                placeholder="date of birth"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate={currentDate}
                confirmBtnText="confirm"
                cancelBtnText="cancel"
                showIcon={false}
                onDateChange={date => {
                  this.onInputChange('dob', date);
                }}
              />
              <TextInput
                style={styles.inputStyle}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="email"
                value={form.email}
                onChangeText={value => this.onInputChange('email', value)}
                returnKeyType={'done'}
                underlineColorAndroid={COLORS.TRANSPARENT}
              />
              <TextInput
                style={styles.inputStyle}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                value={form.mobileNo}
                placeholder="mobile no."
                onChangeText={value => this.onInputChange('mobileNo', value)}
                returnKeyType={'done'}
                underlineColorAndroid={COLORS.TRANSPARENT}
              />
            </View>
            <View style={{ backgroundColor: COLORS.WHITE }}>
              <Text
                style={{
                  color: COLORS.BRIGHT_ORANGE,
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: deviceWidth * 0.05,
                  marginBottom: deviceWidth * 0.07,
                  fontFamily: 'avenir'
                }}
              >
                your details will not be shared with 3rd parties in this trial phase.
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(
      { updateDetail },
      dispatch
    )
  };
}

const mapStateToProps = state => {
  return {
    data: state.user.data,
    isFetching: state.user.isFetching
  };
};

export default connect(mapStateToProps, bindActions)(DetailsView);
