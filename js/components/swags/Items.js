'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-timezone';
import MessageContainer from './MessageContainer';
import styles from './styles';
import ModalCondition from './ModalCondition';
import { COLORS, ICONS } from '../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class Items extends Component {
  state = {
    modalVisible: false
  };

  constructor(props) {
    super(props);
    // this.scrollView = null;
  }

  // componentDidMount() {
  //   const _scrollView = this.scrollView;
  //   if (_scrollView) {
  //     _scrollView.scrollTo({ x: 3, y: 1, animated: true })
  //   }
  //   setTimeout(() => {
  //     this.scrollView.scrollTo({ y: 3, animated: true })
  //   }, 1)
  // }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  groupByData = (data, type) => {
    const groupData = data.groupBy(d => {
      if (d.get('publishDate')) {
        return moment(d.get('publishDate'))
          .tz('Asia/Singapore')
          .format('DD-MM-YYYY');
      } else {
        return 'pending';
      }
    });
    const [...keys] = groupData;

    return (
      <View>
        {keys.map((key, index) => {
          if (__DEV__) {
            console.log(key);
          }
          return (
            <View key={index}>
              {key[0] !== 'pending' &&
                <MessageContainer
                  type={type}
                  date={key[0]}
                  data={key[1][0]}
                />
              }
              <View style={styles.gridView}>
                {key[1].map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      key={index}
                      onPress={() => {
                        Actions.swagDetailPanel({
                          index: index,
                          data: item,
                          status: type,
                          ableToBid: key !== 'pending'
                        });
                      }}
                      underlayColor={COLORS.TRANSPARENT}
                    >
                      <Image
                        source={{ uri: item.get('filePath') }}
                        style={styles.swagImage}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    const { modalVisible } = this.state;
    const { data } = this.props;
    const [...keys] = data.keys();

    return (
      <ScrollView
        contentContainerStyle={styles.scrollRewardsView}
        pagingEnabled={false}
        horizontal={false}
      >
        <View>
          <Text style={styles.swagWarning}>
            bidding has been disabled during this trial phase.
          </Text>
        </View>

        {keys.map(key => {
          if (data.get(key).size <= 0) return;
          return (
            <View key={key}>
              <Text style={styles.swagLabel}>
                {key} rewards
              </Text>
              {this.groupByData(data.get(key), key)}
            </View>
          );
        })}

        <ModalCondition closeModal={this.closeModal} modalVisible={modalVisible}/>

        <TouchableOpacity
          style={styles.rewardProgrammeTermsBox}
          onPress={this.openModal}
        >
          <Text style={styles.rewardProgrammeTermsText}>
            terms and conditions for the vediohead{'\n'}
            Rewards programme can be found here{'\n'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 46 }}/>
      </ScrollView>
    );
  }
}

export default Items;
