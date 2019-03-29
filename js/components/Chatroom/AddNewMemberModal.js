'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import { Container, Content } from 'native-base';
import Friends from '../PrivateChatView/Friends';
import { COLORS, ICONS } from '../../constants';
import NbIcon from '../commons/NbIcon';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class AddNewMemberModal extends Component {
  state = {
    modalVisible: false,
    groupName: '',
    groupIds: [],
    data: [],
    query: '',
    modalHeight: 250
  };

  onSearch() {
    const { query } = this.state;
    this.props.searchFriends(query);
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

  render() {
    const { visible, data, query } = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={visible}
        onRequestClose={this.props.onClose}
      >
        <Container
          style={{
            position: 'absolute',
            borderWidth: 2,
            borderColor: 'rgba(52, 52, 52, 0.2)',
            alignSelf: 'center',
            marginTop: deviceHeight / 4,
            width: deviceWidth / 1.2,
            height: deviceHeight / 1.6,
            backgroundColor: COLORS.WHITE,
            borderRadius: 5
          }}
        >
          <View
            onLayout={e => {
              this.setState({ modalHeight: e.nativeEvent.layout.height });
            }}
            style={{ flex: 1 }}
          >
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={styles.textStyle1}>who do you want to add?</Text>
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
                data={data}
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
            {data.size > 0 && (
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
                    alignItems: 'center',
                    padding: 20
                  }}
                  underlayColor={COLORS.TRANSPARENT}
                  onPress={() => {
                    if (this.state.groupIds.length > 0) {
                      this.setState({
                        groupIds: []
                      });
                      this.props.onAddMember(
                        this.props.id,
                        this.state.groupIds
                      );
                      this.props.onClose();
                      return;
                    } else {
                      this.props.onClose();
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
            width: 30,
            height: 30,
            position: 'absolute',
            top: deviceHeight / 4.3,
            right: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            borderRadius: 15,
            borderWidth: 3,
            borderColor: COLORS.WHITE
          }}
        >
          <TouchableOpacity onPress={this.props.onClose}>
            <Image
              style={{
                alignSelf: 'flex-end',
                width: 25,
                height: 25
              }}
              source={ICONS.REMOVE_ICON}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = {
  textStyle1: {
    color: COLORS.LIGHT_ORANGE,
    fontFamily: 'avenir',
    fontSize: 16,
    ...Platform.select({
      android: { fontWeight: 'normal' },
      ios: { fontWeight: '500' }
    })
  }
};

export default AddNewMemberModal;
