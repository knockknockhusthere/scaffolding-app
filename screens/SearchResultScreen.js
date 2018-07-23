import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Map from '../components/Map';
import Polyline from '@mapbox/polyline';

const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

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
      { routesArray: routeProps }, this.decodePolylines
    )
  }

  decodePolylines() {

    let allRoutes = this.state.routesArray;

    let coordsArray = allRoutes.map((route) => (

      Polyline.decode(route.overview_polyline.points).map((point) => {
        return  {
          latitude: point[0],
          longitude: point[1]
        }
      })

    ))

    this.setState(
      { routesPolylines: coordsArray }
    )
  }

  renderRouteInfo = (i) => {
    console.log(`hit renderRouteInfo for route: ${i}`);
    console.log(this.state.routesArray[i]);
    this.props.navigation.navigate('RouteDirections', { routeInfo: this.state.routesArray[i] })
  }

  render() {

    // const { navigation } = this.props;
    // const routes = navigation.getParam('routes', 'NO-ID');

    return (
      <View>

        <Map
          renderObj="polyline"
          region={ region }
          places={ this.state.routesPolylines }
          callBack={ this.renderRouteInfo }
        />

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
});
