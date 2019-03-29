'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';
import pluralize from 'pluralize';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FbShareModal from './FbShareModal';
import SettingModal from './SettingModal';
import ViewModal from './ViewModal';
import CommentModal from './Comment';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ActionHeader extends React.Component {
  constructor(props) {
    super(props);

    const { count } = props;
    this.state = {
      isLike: false,
      isSharedPopUp: false,
      isShowSetting: false,
      isComment: false,
      likeCount: count.like,
      commentCount: count.comment,
      viewCount: count.view,
      isVoiceRecord: false,
      isCameraRecord: false,
      isViewModal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { count } = nextProps;
    const { likeCount, commentCount, viewCount } = this.state;

    if (
      count.like !== likeCount ||
      count.comment !== commentCount ||
      count.view !== viewCount
    ) {
      this.setState({
        likeCount: count.like,
        commentCount: count.comment,
        viewCount: count.view
      });
    }
  }

  onToggleLike = () => {
    const { onLike, data } = this.props;
    if (__DEV__) {
      console.log(data.toJS());
    }
    onLike(data.get('id'));
  };

  // onComment = () => {
  //   this.setState({
  //     isComment: !this.state.isComment,
  //     isShowSetting: false
  //   });
  // };

  onShared = () => {
    this.setState({
      isSharedPopUp: true,
      isComment: false,
      isShowSetting: false
    });
  };

  onShowSetting = () => {
    this.setState({
      isShowSetting: !this.state.isShowSetting,
      isComment: false
    });
  };

  onSendComment = path => {
    alert('comment');
  };

  render() {
    const {
      likeCount,
      commentCount,
      viewCount,
      isVoiceRecord,
      isCameraRecord,
      isComment
    } = this.state;
    const {
      onReport,
      onComment,
      data,
      isLike
    } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          right: 15,
          width: 70
        }}
      >
        <Col
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <Row
            style={{
              position: 'absolute',
              justifyContent: 'flex-end',
              top: 30
            }}
          >
            <TouchableOpacity
              onPress={this.onShowSetting}
              activeOpacity={1}
            >
              <FontAwesome5Pro
                name="exclamation-circle"
                style={{
                  backgroundColor: COLORS.TRANSPARENT
                }}
                size={25}
                color={COLORS.BRIGHT_ORANGE}
                light
              />
            </TouchableOpacity>
          </Row>

          <Row
            style={{
              position: 'absolute',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: deviceHeight * 0.59
            }}
          >
            <View style={styles.likeChatShareTouchable}>
              <FontAwesome5Pro
                name="eye"
                style={{
                  backgroundColor: COLORS.TRANSPARENT
                }}
                size={25}
                color={COLORS.BRIGHT_ORANGE}
                light
              />
              <Text style={styles.metricsTextStyle}>
                {viewCount}
              </Text>
            </View>

            <View style={styles.likeChatShareTouchable}>
              <TouchableOpacity
                onPress={() => Actions.comment({ id: data.get('id') })}
                activeOpacity={1}
              >
                <FontAwesome5Pro
                  name="comment"
                  style={{
                    backgroundColor: COLORS.TRANSPARENT
                  }}
                  size={25}
                  color={COLORS.BRIGHT_ORANGE}
                  solid={commentCount !== 0 ? true : false}
                  light={commentCount == 0 ? true : false}
                />
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={this.onComment}
                activeOpacity={1}
              >
                <Text style={styles.metricsTextStyle}>
                  {commentCount}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.likeChatShareTouchable}>
              <TouchableOpacity
                onPress={this.onToggleLike}
                activeOpacity={1}
              >
                <FontAwesome5Pro
                  name="heart"
                  style={{
                    backgroundColor: COLORS.TRANSPARENT
                  }}
                  size={25}
                  color={isLike ? COLORS.BRIGHT_RED : COLORS.BRIGHT_ORANGE}
                  solid={isLike ? true : false}
                  light={!isLike ? true : false}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ isViewModal: true })}
                activeOpacity={1}
              >
                <Text style={styles.metricsTextStyle}>
                  {likeCount}
                </Text>
              </TouchableOpacity>
            </View>

            {/*
            <TouchableOpacity
              style={styles.likeChatShareTouchable}
              onPress={this.onShared}
            >
              <Image style={styles.likeChatShare} source={ICONS.SHARE_ICON}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.likeChatShareTouchable}
              onPress={this.onShowSetting}
            >
              <Image style={styles.likeChatShare} source={ICONS.MORE_OPTIONS}/>
            </TouchableOpacity>
            */}

          </Row>
        </Col>

        {/*
        <FbShareModal
          visible={this.state.isSharedPopUp}
          onClose={() => this.setState({ isSharedPopUp: false })}
        />
        */}

        {this.state.isShowSetting && (
          <SettingModal
            visible={this.state.isShowSetting}
            onClose={() => this.setState({
              isShowSetting: false,
              isComment: false
            })}
            onReport={onReport}
            id={this.props.data.get('id')}
            canReport={data.get('canReport')}
          />
        )}

        {/*
        {this.state.isComment && (
          <CommentModal
            visible={this.state.isComment}
            onClose={() => this.setState({
              isComment: false,
              isShowSetting: false
            })}
            onComment={onComment}
            id={this.props.data.get('id')}
            user={this.props.user}
          />
        )}
        */}

        {this.state.isViewModal && (
          <ViewModal
            visible={this.state.isViewModal}
            onClose={() => this.setState({
              isViewModal: false
            })}
            data={data.get('likes') ? data.get('likes').toJS() : []}
          />
        )}
      </View>
    );
  }
}

const styles = {
  likeChatShareTouchable: {
    paddingVertical: 5,
    paddingLeft: 5
  },
  like: {
    width: deviceWidth / 15,
    height: deviceWidth / 15 * 0.8961
  },
  likeChatShare: {
    width: deviceWidth / 15,
    height: deviceWidth / 15
  },
  metricsTextStyle: {
    color: COLORS.BRIGHT_ORANGE,
    fontFamily: 'avenir',
    textAlign: 'center',
    width: 27
  }
};

export default ActionHeader;
