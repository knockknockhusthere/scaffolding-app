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

export default class LinksScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      routesArray: [1,2,3],
      routesPolylines: []
    }

    this.decodePolylines = this.decodePolylines.bind(this);
    this.consoleLog = this.consoleLog.bind(this);
  }

  componentDidMount() {
    let routeProps = this.props.navigation.getParam('routes', 'default value');
    console.log('inside routes function');

    this.setState(
      { routesArray: routeProps }
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

  render() {

    // const { navigation } = this.props;
    // const routes = navigation.getParam('routes', 'NO-ID');

    return (
      <View>
        <Button
          onPress={ this.decodePolylines }
          title="decode Polylines"
          >
          Help</Button>

          <Map
            renderObj="polyline"
            region={ region }
            places={[[
              { latitude: 40.743, longitude: -74.0351431 },
              { latitude: 40.74, longitude: -74.0091646 },
              { latitude: 40.74, longitude: -74.0 },
              { latitude: 40.7309, longitude: -73.9877787 },
              { latitude: 40.729, longitude: -73.902965 },
              { latitude: 40.706, longitude: -73.9351431 },
            ],
            [
              { latitude: 40.7073, longitude: -74.0351431 },
              { latitude: 40.7102, longitude: -74.021646 },
              { latitude: 40.72, longitude: -74.02 },
              { latitude: 40.722, longitude: -74 },
            ]]
          }
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
