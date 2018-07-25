import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Map from '../components/Map';
import Polyline from '@mapbox/polyline';
import { MapView, Marker } from 'expo';


const color = ["#0652ce", "#0a842d", "#ad1f1f", "#6d039e", "#db7c00"];

export default class SearchResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Route Results',
  };


  constructor() {
    super();

    this.state = {
      routesArray: [],
      routesPolylines: [],
      region: {
        latitude: 40.74,
        longitude: -74.003,
        latitudeDelta: 0.1,
        longitudeDelta: 0.0421
      }
    }

    this.decodePolylines = this.decodePolylines.bind(this);
    // this.displayButtons = this.displayButtons.bind(this);

  }

  componentDidMount() {
    let routeProps = this.props.navigation.getParam('routes', 'default value');
    console.log('inside routes function');

    this.setState(
      { routesArray: routeProps,
        region: routeProps[0].region
      }
    )
  }

  decodePolylines = (route) => {

    return Polyline
      .decode(route.overview_polyline.points)
      .map((point) => {
        return  {
          latitude: point[0],
          longitude: point[1]
        }
      })
  }

  renderRouteInfo = (route) => {
    // console.log(`hit renderRouteInfo for route:`);
    // console.log(route);
    // console.log(this.state.routesPolylines[0])
    this.props.navigation.navigate('RouteDirections',
      {
        routeInfo: route
      })
  }

  renderPolylines = (routes) => {
    return routes.map((route, i) => (
      <MapView.Polyline
        key={i}
        coordinates={ this.decodePolylines(route) }
        strokeColor={color[i]}
        strokeWidth={4}
        onPress={ () => this.renderRouteInfo(route) }
      />
    ))
  }

  renderStartMarker = (routes) => {

    let route = routes[0];
    console.log('inside renderStartMarker');
    console.log(route);

    if (route && route.legs) {
      const startLocation = route.legs[0].start_location;
      console.log(startLocation);

      return <MapView.Marker
        coordinate={
          {latitude: startLocation.lat,
          longitude: startLocation.lng}
        }
      />
    }
  }

  renderEndMarker = (routes) => {
    let route = routes[0];
    console.log('inside renderEndMarker');
    console.log(route);

    if (route && route.legs) {
      const endLocation = route.legs[0].end_location;
      console.log(endLocation);

      return <MapView.Marker
        coordinate={
          {latitude: endLocation.lat,
          longitude: endLocation.lng}
        }
      />
    }
  }

  render() {

    return (
      <View>

        <MapView
          style={ styles.map }
          region={ this.state.region }
          showsUserLocation
          showsMyLocationButton>
          { this.renderPolylines(this.state.routesArray) }
          { this.renderStartMarker(this.state.routesArray) }
          { this.renderEndMarker(this.state.routesArray) }
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});

// <Map
//   renderObj="polyline"
//   region={ region }
//   polylines={ this.state.routesPolylines }
//   callBack={ this.renderRouteInfo }
// />
