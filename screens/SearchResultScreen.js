import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Map from '../components/Map';
import Polyline from '@mapbox/polyline';
import { MapView } from 'expo';

// const region = {
//   latitude: 40.74,
//   longitude: -74.003,
//   latitudeDelta: 0.02,
//   longitudeDelta: 0.01
// }

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
      { routesArray: routeProps }
    )
  }

  // calculateRegion = (points) => {
  //   // points should be an array of { latitude: X, longitude: Y }
  //   let minX, maxX, minY, maxY;
  //
  //   // init first point
  //   ((point) => {
  //     minX = point.latitude;
  //     maxX = point.latitude;
  //     minY = point.longitude;
  //     maxY = point.longitude;
  //   })(points[0]);
  //
  //   // calculate rect
  //   points.map((point) => {
  //     minX = Math.min(minX, point.latitude);
  //     maxX = Math.max(maxX, point.latitude);
  //     minY = Math.min(minY, point.longitude);
  //     maxY = Math.max(maxY, point.longitude);
  //   });
  //
  //   const midX = (minX + maxX) / 2;
  //   const midY = (minY + maxY) / 2;
  //   const deltaX = (maxX - minX);
  //   const deltaY = (maxY - minY);
  //
  //   return {
  //     latitude: midX,
  //     longitude: midY,
  //     latitudeDelta: deltaX,
  //     longitudeDelta: deltaY
  //   };
  // }
  // calculateRegion = (routes) => {
  //   console.log(routes[0]);
  //  let boundaries = routes[0].bounds;
  //  let centerLat =  bounds.northeast.lat + bounds.southwest.lat;
  //   let centerLng = bounds.northeast.lng + bounds.southwest.lng;

  //   let mapRegion = {
  //     latitude: centerLat,
  //     longitude: centerLng,
  //     latitudeDelta: 0.02,
  //     longitudeDelta: 0.01
  //   }
  //   return mapRegion
  // }

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
    console.log(this.state.routesPolylines[0])
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

  render() {

    return (
      <View>

        <MapView
          style={ styles.map }
          region={this.state.region}
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
