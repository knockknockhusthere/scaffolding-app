import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';

const Marker = MapView.Marker
const Circle = MapView.Circle

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

  render() {
    const { region } = this.props
    return (
      <MapView
        style={styles.container}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        { this.renderCircles() }
      </MapView>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%',

  }
}
