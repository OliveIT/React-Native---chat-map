'use strict';
import React, { Component } from 'react';
import { View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class PinListView extends Component {
  render() {
    const { data } = this.props;
    const middle = data[(data.length / 2) | 0];

    return (
      <Marker
        coordinate={{
          latitude: data[0].position.lat,
          longitude: data[0].position.lon
        }}
        onPress={() => alert('onPress')}
      >
        <View style={styles.markerContainer}>
          <View style={styles.pinContainer}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{
                paddingVertical: 0
              }}
              style={{
                marginHorizontal: 10
              }}
            >
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginRight: 20,
                      marginTop: middle._id === item._id ? 0 : 7,
                      marginVertical: 0,
                      paddingVertical: 0,
                      borderColor:
                        item.sharedWith === 'everyone'
                          ? COLORS.PURPLE
                          : COLORS.BRIGHT_ORANGE,
                      borderRadius:
                        deviceHeight *
                        (middle._id === item._id ? 0.04 : 0.03),
                      borderWidth: 1,
                      height:
                        deviceHeight * (middle._id === item._id ? 0.08 : 0.06)
                    }
                    onPress={() => {
                      // this.setState({ modalVisible_pin: false, isPin: true });
                      Actions.videoDetail({ id: item._id });
                    }}
                  >
                    <Image
                      style={[
                        middle._id === item._id
                          ? styles.biggerAvatar
                          : styles.otherImageStyle
                      ]}
                      source={ICONS.DEFAULT_AVATAR}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View>
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              top: 0,
              right: 0,
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
                  height: 25,
                  width: 25
                }}
                source={ICONS.REMOVE_ICON}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Marker>
    );
  }
}

export default PinListView;
