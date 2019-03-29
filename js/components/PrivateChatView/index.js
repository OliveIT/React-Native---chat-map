import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Modal, Dimensions, Platform, StatusBar } from 'react-native';
import { Container, Content, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import ChatItems from './ChatItems';
import Friends from './Friends';
import Friend from './Friend';
import { getActiveFriends, getAtciveChats, startGroupChat, searchFriends } from '../../actions/privateChat';
import config from '../../config/appConfig';
import { to3dArray } from '../../utils/converter';
import { COLORS, ICONS } from '../../constants';
import NbIcon from '../commons/NbIcon';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class PrivateChatView extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      groupName: '',
      groupIds: [],
      data: [],
      query: '',
      modalHeight: 250
    };
  }

  componentDidMount() {
    // this.props.actions.getFriends();
    this.props.actions.getAtciveChats();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.WHITE);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.data.size === 0 &&
      nextProps.friends.size > 0 &&
      this.state.query === ''
    ) {
      this.setState({ data: nextProps.friends });
    }
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
  }

  onSearch() {
    const { query } = this.state;
    this.props.actions.searchFriends(query);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onAddToGroup = id => {
    if (!this.state.groupIds.includes(id)) {
      this.setState({
        groupIds: this.state.groupIds.concat(id)
      });
    } else {
      const index = this.state.groupIds.findIndex(i => i === id);
      let { groupIds } = this.state;
      groupIds.splice(index, 1);
      this.setState({ groupIds: groupIds });
    }
  };

  activeChatSessionsArray() {
    const { userID } = this.props.user;

    const data = this.props.activeChatsSession.filter(item => {
      const items = item.get('active_users').filter(item1 => {
        return (
          item1.get('user_id') === userID && item1.get('accepted') === true
        );
      });
      return items.size > 0;
    });

    return to3dArray(data.toSet().toJS());
  }

  clickPlusIcon = () => {
    this.props.actions.getFriends();
    this.setModalVisible(true);
  };

  render() {
    const { userID } = this.props.user;
    const activeChatsSession = this.props.activeChatsSession.toSet().toJS();
    const pendingData = this.props.activeChatsSession.filter(item => {
      const items = item.get('active_users').filter(item1 => {
        return (
          item1.get('user_id') === userID && item1.get('accepted') === false
        );
      });
      return items.size > 0;
    });
    const activeChats = this.activeChatSessionsArray();
    const threeDArray = to3dArray(pendingData.toSet().toJS());

    return (
      <View style={{ flex: 1 }}>
        <Container
          style={{
            ...Platform.select({
              ios: {
                alignSelf: 'center',
                left: -7,
                right: -7,
                marginHorizontal: 0,
                width: deviceWidth
              }
            })
          }}
        >
          <Content>
            <Grid>
              <Col style={{ left: Platform.OS === 'ios' ? 22 : 16, width: '30%' }}>
                <TouchableOpacity
                  onPress={() => Actions.pop()}
                  activeOpacity={1}
                >
                  <FontAwesome5Pro
                    name="chevron-circle-left"
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: COLORS.TRANSPARENT,
                      marginTop: 25
                    }}
                    size={25}
                    color={COLORS.BRIGHT_ORANGE}
                    light
                  />
                </TouchableOpacity>
              </Col>
              <Col style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, width: '40%' }}>
                <Text style={styles.textStyle}>start a new chat</Text>
              </Col>
              <Col style={{ width: '30%' }}/>
            </Grid>

            <View style={styles.groupNameSectionStyle}>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.plusIconTouchStyle}
                  onPress={this.clickPlusIcon}
                >
                  <Text style={styles.plusIconTextStyle}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 15 }}>
                <TextInput
                  style={styles.groupNameInputStyle}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.groupName}
                  placeholder="name of chat group"
                  onChangeText={value => this.setState({ groupName: value })}
                  returnKeyType={'go'}
                  underlineColorAndroid={COLORS.TRANSPARENT}
                />
                <View style={styles.groupNameUnderlineStyle}/>
              </View>
            </View>

            {pendingData.size > 0 && [
              <View
                style={{ alignItems: 'center', marginTop: deviceHeight * 0.05 }}
                key={'pending-header'}
              >
                <Text style={styles.textStyle}>new chat sessions</Text>
              </View>,

              <View
                style={{
                  alignItems: 'center',
                  marginTop: deviceHeight * 0.03,
                  margin: deviceWidth * 0.1,
                  justifyContent: 'center',
                  marginBottom: 10
                }}
                key={'pending-body'}
              >
                <ChatItems
                  data={threeDArray}
                  onRemoveMember={this.props.actions.onRemoveMember}
                  userId={this.props.user.userID}
                  pending={true}
                />
              </View>
            ]}

            <View style={{
              alignItems: 'center',
              marginTop: deviceHeight * 0.05
            }}>
              <Text style={styles.textStyle}>
                active chat sessions
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: deviceWidth * 0.1,
                marginTop: deviceHeight * 0.03,
                marginBottom: 70
              }}
            >
              {activeChats.length <= 0 && (
                <Text style={styles.noChatLabel}>
                  {
                    "it looks like you don't have any\nactive chat sessions. try the\nvediohead private chat!"
                  }
                </Text>
              )}

              <ChatItems
                data={activeChats}
                onRemoveMember={this.props.actions.onRemoveMember}
                userId={this.props.user.userID}
              />
            </View>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('modal has been closed.');
              }}
            >
              <Container style={styles.friendModalContainerStyle}>
                <View
                  onLayout={e => {
                    this.setState({ modalHeight: e.nativeEvent.layout.height });
                  }}
                  style={{ flex: 1 }}
                >
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={styles.textStyle1}>
                      who do you want to add?
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      margin: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: this.state.modalHeight - 100
                    }}
                  >
                    <Friends
                      data={this.props.searchResult}
                      query={this.state.query}
                      onSelect={this.onAddToGroup}
                      selected={this.state.groupIds}
                      onChange={value => {
                        this.setState({ query: value });
                        setTimeout(() => {
                          this.onSearch();
                        }, 200);
                      }}
                    />
                  </View>
                  {this.props.searchResult.size > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: -5,
                        alignItems: 'center',
                        flex: 1,
                        width: deviceWidth - 70
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 20,
                          paddingBottom: 20,
                          alignItems: 'center'
                        }}
                        onPress={() => {
                          if (this.state.groupName === '') {
                            this.setModalVisible(!this.state.modalVisible);
                            return;
                          }
                          if (
                            this.state.groupName !== '' &&
                            this.state.groupIds.length > 0
                          ) {
                            this.props.actions.startGroupChat({
                              room_name: this.state.groupName,
                              user_ids: this.state.groupIds
                            });
                            this.setState({
                              groupName: '',
                              groupIds: [],
                              modalVisible: false
                            });
                            return;
                          } else {
                            this.setState({ modalVisible: true });
                            return;
                          }
                        }}
                      >
                        <NbIcon
                          family={'Ionicons'}
                          name={'md-checkmark'}
                          style={{
                            color: COLORS.GREEN,
                            fontSize: 44
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </Container>

              <View
                style={{
                  position: 'absolute',
                  top: deviceHeight / 9 - 15,
                  right: 16,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.WHITE,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'rgba(52, 52, 52, 0.2)'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Image
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: COLORS.TRANSPARENT,
                      borderRadius: 15,
                      borderWidth: 3,
                      borderColor: COLORS.WHITE,
                      width: 30,
                      height: 30
                    }}
                    source={ICONS.REMOVE_ICON}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
          </Content>
        </Container>
      </View>
    );
  }
}

export default PrivateChatView;
