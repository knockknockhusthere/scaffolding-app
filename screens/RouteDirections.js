import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import Map from '../components/Map';
// import Polyline from '@mapbox/polyline';

const Polyline = MapView.Polyline
const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

export default class RouteDirections extends Component {


  render() {
    let routeInfo = this.props.navigation.getParam('routeInfo', 'default value');
    console.log(routeInfo);

    return(
      <View>
        <Text>Hello</Text>
      </View>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%',

  }
}
