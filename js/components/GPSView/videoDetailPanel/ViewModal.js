'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Platform, Image, Modal, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { to3dArray } from '../../../utils/converter';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ViewModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false
  };

  render() {
    const threeDArray = to3dArray(this.props.data);
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              borderColor: 'rgba(52, 52, 52, 0.2)',
              borderRadius: 10,
              borderWidth: 2,
              alignSelf: 'center',
              width: deviceWidth - 100,
              height: deviceHeight / 2
            }}
          >
            <Text
              style={{
                fontFamily: 'avenir',
                fontSize: 18,
                color: COLORS.BRIGHT_ORANGE,
                textAlign: 'center',
                marginVertical: 15
              }}
            >
              they like the vedio
            </Text>
            <ScrollView>
              <View style={{ flex: 1 }}>
                {threeDArray.map((array, index) => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 5
                      }}
                      key={index}
                    >
                      {Array.apply(null, { length: 3 }).map((value, i) => {
                        if (array[i] !== undefined) {
                          return (
                            <View
                              key={i}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 5,
                                width: deviceWidth / 4.3,
                                flex: 1
                              }}
                            >
                              <TouchableHighlight
                                onPress={() => {
                                  this.props.onClose();
                                  Actions.accountView({ userId: array[i] });
                                }}
                                underlayColor={COLORS.TRANSPARENT}
                                style={{ marginTop: 10 }}
                              >
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                  <Image
                                    style={{
                                      width: 70,
                                      height: 70,
                                      ...Platform.select({
                                        android: {
                                          borderRadius: 75
                                        },
                                        ios: {
                                          borderRadius: 35
                                        }
                                      })
                                    }}
                                    source={ICONS.DEFAULT_AVATAR}
                                  />
                                </View>
                              </TouchableHighlight>
                            </View>
                          );
                        } else {
                          return (
                            <View
                              key={i}
                              style={{
                                flex: 1,
                                alignItems: 'center'
                              }}
                            >
                              <TouchableHighlight
                                style={styles.noItem}
                                underlayColor={COLORS.TRANSPARENT}
                              >
                                <Text style={styles.roomLabel}/>
                              </TouchableHighlight>
                            </View>
                          );
                        }
                      })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              position: 'absolute',
              ...Platform.select({
                android: {
                  top: deviceHeight / 4.85,
                  right: deviceWidth / 10.42
                },
                ios: {
                  top: deviceHeight / 4.4,
                  right: deviceWidth / 11.4
                }
              }),
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
              onPress={this.props.onClose}
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
        </View>
      </Modal>
    );
  }
}

const styles = {
  noItem: {
    backgroundColor: COLORS.LIGHT_ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Platform.OS === 'ios' ? 35 : 80,
    width: 70,
    height: 70
  },
  roomLabel: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 20
  }
};

export default ViewModal;
