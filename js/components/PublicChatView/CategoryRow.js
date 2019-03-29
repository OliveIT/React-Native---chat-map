import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Col, Row, Grid } from 'native-base';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { CategoryRowData } from './dataForCategoryRow';
import { COLORS } from '../../constants';

class CategoryRow extends React.PureComponent {
  render() {
    return (
      <View>
        <Grid
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <FlatList
            data={CategoryRowData.filter(item =>
              item.type !== null
            )}
            renderItem={({ item }) => (
              <Col style={{ marginHorizontal: 20, marginVertical: 5, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: item.iconBackgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 36,
                  }}
                >
                  <FontAwesome5Pro
                    name={item.iconName}
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
            )}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Grid>
      </View>
    );
  }
}

export default CategoryRow;
