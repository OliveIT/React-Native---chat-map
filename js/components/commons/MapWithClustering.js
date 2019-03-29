import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import SuperCluster from 'supercluster';
import geoViewport from '@mapbox/geo-viewport';
import CustomMarker from './CustomMarker';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class MapWithClustering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clustering: props.clustering,
      radius: props.radius ? props.radius : deviceWidth / 22,
      region: props.region,
      initRegion: props.initialRegion ? props.initialRegion : props.region,
      mapProps: '',
      markers: [],
      markersOnMap: [],
      otherChildren: [],
      numberOfMarkers: 0
    };
    if (!this.state.region && this.state.initRegion) {
      this.state.region = this.state.initRegion;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.onClusterPress = nextProps.onClusterPress;
    this.createMarkersOnMap(nextProps);
    if (nextProps.clustering !== this.state.clustering) {
      this.setState({ clustering: nextProps.clustering });
    }
  }

  componentWillMount() {
    this.state.onClusterPress = this.props.onClusterPress;
    this.createMarkersOnMap(this.props);
  }

  createMarkersOnMap(propsData) {
    this.state.markers = [];
    this.state.mapProps = propsData;
    this.state.otherChildren = [];

    if (propsData.children !== undefined) {
      let size = propsData.children.length;

      if (size === undefined) {
        // No need for clustering if it is just one marker
        if (
          propsData.children.props &&
          propsData.children.props.coordinate
        ) {
          this.state.markers.push({
            item: propsData.children,
            properties: { point_count: 0 },
            geometry: {
              type: 'Point',
              coordinates: [
                propsData.children.props.coordinate.longitude,
                propsData.children.props.coordinate.latitude
              ]
            }
          });
          this.state.numberOfMarkers = 1;
        } else {
          this.state.otherChildren = propsData.children;
        }
      } else {
        let newArray = [];
        propsData.children.map(item => {
          if (!item) return;
          if (item.length === 0 || item.length === undefined) {
            newArray.push(item);
          } else {
            item.map(child => {
              newArray.push(child);
            });
          }
        });
        this.state.numberOfMarkers = newArray.length;
        newArray.map(item => {
          let canBeClustered = true;
          item.props.cluster === undefined
            ? (canBeClustered = true)
            : (canBeClustered = item.props.cluster);
          if (item.props && item.props.coordinate && canBeClustered) {
            this.state.markers.push({
              item: item,
              properties: { point_count: 0 },
              geometry: {
                type: 'Point',
                coordinates: [
                  item.props.coordinate.longitude,
                  item.props.coordinate.latitude
                ]
              }
            });
          } else {
            this.state.otherChildren.push(item);
          }
        });
      }
      GLOBAL.superCluster = SuperCluster({
        radius: this.state.radius,
        maxZoom: 20
      });
      superCluster.load(this.state.markers);
      this.calculateClustersForMap();

      // Zoom to cluster of markers on the map
      if (this.state.markers.length > 0) {
        // Get the first marker coordinate
        let coordinate = this.state.markers[0].geometry.coordinates;

        // Calculate the region to focus
        let region = this.calculateRegion(coordinate[1], coordinate[0], 40000);

        // Focus map point to where markers are pinned
        // this.animateToRegion(region);
      }
    }
  }

  // Calculate region of given latitude and longitude on distance
  calculateRegion(latitude, longitude, distance){
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));

    return {
       latitude: latitude,
       longitude: longitude,
       latitudeDelta: latitudeDelta,
       longitudeDelta: longitudeDelta,
    }
  }

  // Moves the map position to specified region
  animateToRegion(region) {
    if (this._root != undefined) {
      this._root.animateToRegion(region, 1500);
    }
  }

  onRegionChangeComplete(region) {
    // console.log(region);
    this.state.region = region;
    if (region.longitudeDelta <= 80) {
      if (
        Math.abs(
          region.latitudeDelta - this.state.initRegion.latitudeDelta
        ) >
          this.state.initRegion.latitudeDelta / 7 ||
        Math.abs(
          this.state.region.longitude - this.state.initRegion.longitude
        ) >=
          this.state.initRegion.longitudeDelta / 4 ||
        Math.abs(
          this.state.region.latitude - this.state.initRegion.latitude
        ) >=
          this.state.initRegion.latitudeDelta / 4
      ) {
        this.state.initRegion = region;
        this.calculateClustersForMap();
        this.setState(this.state);
      }
    }
  }

  calculateBBox() {
    return [
      this.state.region.longitude - this.state.region.longitudeDelta,
      this.state.region.latitude - this.state.region.latitudeDelta,
      this.state.region.longitude + this.state.region.longitudeDelta,
      this.state.region.latitude + this.state.region.latitudeDelta
    ];
  }

  getZoomLevel(bbox) {
    return geoViewport.viewport(bbox, [deviceHeight, deviceWidth]);
  }

  calculateClustersForMap() {
    this.state.markersOnMap = [];
    if (this.state.clustering) {
      let bbox = this.calculateBBox();
      let zoom;
      if (this.state.region.longitudeDelta >= 40) {
        zoom = 0;
      } else {
        zoom = this.getZoomLevel(bbox).zoom;
      }
      let cluster = superCluster.getClusters(
        [bbox[0], bbox[1], bbox[2], bbox[3]],
        zoom
      );

      for (let i = 0; i < cluster.length; i++) {
        let everyoneCount = 0;
        let friendsCount = 0;
        if (cluster[i].properties.cluster_id) {
          let markers = superCluster.getLeaves(
            cluster[i].properties.cluster_id
          );

          _.map(markers, marker => {
            if (marker.item.props && marker.item.props.data) {
              const data = marker.item.props.data;
              if (
                data.sharedWith &&
                data.sharedWith === 'friends'
              )
                friendsCount += 1;

              if (
                data.sharedWith &&
                data.sharedWith === 'everyone'
              )
                everyoneCount += 1;
            }
          });
        }

        const customClusterMarkerDesign =
          everyoneCount > friendsCount
            ? this.props.customClusterMarkerEveryoneDesign
            : this.props.customClusterMarkerFriendsDesign;

        this.state.markersOnMap.push(
          <CustomMarker
            key={i}
            onClusterPress={this.state.onClusterPress}
            clusteringCount={this.props.clusteringCount}
            customClusterMarkerDesign={customClusterMarkerDesign}
            {...cluster[i]}
          >
            {cluster[i].properties.point_count === 0 && cluster[i].item}
          </CustomMarker>
        );
      }
    } else {
      for (let i = 0; i < this.state.markers.length; i++) {
        this.state.markersOnMap.push(
          <CustomMarker
            key={i}
            {...this.state.markers[i]}
            clusteringCount={this.props.clusteringCount}
          >
            {this.state.markers[i].properties.point_count === 0 && this.state.markers[i].item}
          </CustomMarker>
        );
      }
    }
  }

  render() {
    this.state.clustering = this.props.clustering;
    GLOBAL.clusterColor = this.props.clusterColor;
    GLOBAL.clusterTextColor = this.props.clusterTextColor;
    GLOBAL.clusterBorderColor = this.props.clusterBorderColor;
    GLOBAL.clusterBorderWidth = this.props.clusterBorderWidth;
    GLOBAL.clusterTextSize = this.props.clusterTextSize;

    return (
      <MapView
        {...this.state.mapProps}
        region={this.state.region}
        initialRegion={this.state.initRegion}
        ref={ref => (this._root = ref)}
        onRegionChangeComplete={region => {
          if (this.state.mapProps.onRegionChangeComplete) {
            this.state.mapProps.onRegionChangeComplete(region);
          }
          this.onRegionChangeComplete(region);
        }}
      >
        {this.state.markersOnMap}
        {this.state.otherChildren}
      </MapView>
    );
  }
}

MapWithClustering.defaultProps = {
  clusterColor: '#F5F5F5',
  clusterTextColor: '#FF5252',
  clusterBorderColor: '#FF5252',
  clusterBorderWidth: 1,
  clusterTextSize: '',
  clustering: true,
  clusteringCount: false
};

export default MapWithClustering;
