import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Map from '../components/Map';
import Polyline from '@mapbox/polyline';
import { MapView } from 'expo';

const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}
const color = ["#0652ce", "#0a842d", "#ad1f1f"];

export default class SearchResultScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      routesArray: [],
      routesPolylines: []
    }

    this.decodePolylines = this.decodePolylines.bind(this);
    // this.displayButtons = this.displayButtons.bind(this);

  }

  componentDidMount() {
    let routeProps = this.props.navigation.getParam('routes', 'default value');
    console.log('inside routes function');

    this.setState(
      { routesArray: routeProps }
    )
  }

  decodePolylines(route) {
    return Polyline
      .decode(route.overview_polyline.points)
      .map((point) => {
        return  {
          latitude: point[0],
          longitude: point[1]
        }
      })
  }

  // renderRouteInfo = (i) => {
  //   console.log(`hit renderRouteInfo for route: ${i}`);
  //   console.log(this.state.routesArray[i]);
  //
  //   this.props.navigation.navigate('RouteDirections',
  //     {
  //       num: {i},
  //       routeInfo: this.state.routesArray[i] ,
  //       coords: this.state.routesPolylines
  //     })
  // }

  renderPolylines(routes) {
    return routes.map((route) => (
      <MapView.Polyline
        coordinates={ this.decodePolylines(route) }
        strokeColor={color[1]}
        strokeWidth={4}
        onPress={() => console.log(route)}
      />
    ))
  }

  render() {

    return (
      <View>

        <MapView
          style={ styles.map }
          region={region}
          showsUserLocation
          showsMyLocationButton>
          {this.renderPolylines(this.state.routesArray)}
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
