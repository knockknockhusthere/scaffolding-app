import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
// import MapBoxPolyline from '@mapbox/polyline'
;
const Marker = MapView.Marker
const Circle = MapView.Circle
const Polyline = MapView.Polyline

const color = ["#0652ce", "#0a842d", "#ad1f1f"];

export default class Map extends Component {

  renderCircles() {
    return this.props.places.map((scaffold, i) => (
      <Circle
        key={i}
        center={{ latitude: scaffold.latitude_point, longitude: scaffold.longitude_point }}
        radius={ (scaffold.sidewalk_shed_linear_feet)*0.3048/2 }

        />
    ))
  }

  renderMarkers() {
    return this.props.places.map((scaffold, i) => (
      <Marker key={i} coordinate={{ latitude: scaffold.latitude_point, longitude: scaffold.longitude_point }} />
    ))
  }

  renderPolylines() {
    // console.log(this.props.places[0]);
    return this.props.places.map((route, i) => (
      <Polyline
        key={i}
        coordinates={ route }
        strokeColor='#000'
        strokeWidth={3}
      />
  ))
  }

  render() {
    const { region } = this.props

    if (this.props.renderObj == "circles") {
      return (
        <MapView
          style={styles.container}
          region={region}
          showsUserLocation
          showsMyLocationButton
          >
          { this.renderCircles() }
        </MapView>
      );
    } else if (this.props.renderObj == "marker") {
      return (
        <MapView
          style={styles.container}
          region={region}
          showsUserLocation
          showsMyLocationButton
          >
          { this.renderMarkers() }
        </MapView>
      );
    } else if (this.props.renderObj == "polyline") {
      return (
        <MapView
          style={ styles.container }
          region={region}
          showsUserLocation
          showsMyLocationButton
          >
          { this.renderPolylines() }
        </MapView>
      );
    } else {
      return(
        <MapView
          style={ styles.container }
          region={ region }
          showsUserLocation
          showsMyLocationButton
          >
        </MapView>
      );
    }

  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%',

  }
}
