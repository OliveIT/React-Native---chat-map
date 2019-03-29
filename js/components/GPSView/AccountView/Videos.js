import React from 'react';
import { Image, Text, View, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { COLORS, ICONS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const RenderItem = ({ item }) => {
  const hasThumbnail = item.thumbnailUrl && item.thumbnailUrl !== 'undefined' && item.thumbnailUrl !== undefined;
  return (
    <TouchableOpacity
      onPress={() => {
        Actions.videoDetail({ id: item._id });
      }}
      underlayColor={COLORS.TRANSPARENT}
      style={styles.buttonContainer}
    >
      {hasThumbnail
        ? (
          <Image
            style={styles.videoStyle}
            source={{ uri: item.thumbnailUrl }}
          />
        )
        : (
          <Image
            style={styles.videoEmptyStyle}
            source={ICONS.ACCOUNT_VIDEOEMPTY}
          />
        )
      }
      {hasThumbnail
        ? (
          <View style={styles.playIconView}>
            <Image
              style={styles.playIcon}
              source={ICONS.ACCOUNT_VIDEOPLAY}
            />
          </View>
        )
        : (
          <View style={styles.playIconView}>
            <Image
              style={styles.playIcon}
              source={ICONS.ACCOUNT_VIDEOEMPTY}
            />
          </View>
        )
      }
    </TouchableOpacity>
  );
};

class Videos extends React.Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
  }

  render() {
    const {
      data,
      isFetching,
      onPress,
      refreshing,
      onRefresh,
      emptyLabel = 'empty',
    } = this.props;
    if (data.length <= 0 && !isFetching && !refreshing) {
      return (
        <View style={styles.emptyLabelViewStyle}>
          <Text style={styles.emptyLabelStyle}>
            {emptyLabel}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.gridView}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={3}
          renderItem={RenderItem}
          keyExtractor={item => item._id}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.BRIGHT_ORANGE, COLORS.BRIGHT_ORANGE]}
              tintColor={COLORS.BRIGHT_ORANGE}
            />
          )}
        />
      </View>
    );
  }
}

const actualWidth = deviceWidth - 70;
const styles = {
  gridView: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  emptyLabelViewStyle: {
    alignSelf: 'center',
    flex: 1,
    marginTop: deviceHeight * 0.25,
  },
  emptyLabelStyle: {
    color: COLORS.BRIGHT_ORANGE_200,
    fontFamily: 'avenir',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: COLORS.WHITE,
    width: actualWidth / 3,
    height: actualWidth / 3,
    borderWidth: 1,
    borderColor: COLORS.BRIGHT_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  videoStyle: {
    width: actualWidth / 3,
    height: actualWidth / 3,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoEmptyStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  playIconView: {
    position: 'absolute',
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 30,
    height: 30,
  },
};

export default Videos;
