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
    const { navigation } = this.props;
    const intro = navigation.getParam('intro', 'NO-ID');
    const int = navigation.getParam('num', 'who cares');

    return(
      <View>
        <Text>Testing: {JSON.stringify(intro)}</Text>
        <Text>Testing: {JSON.stringify(int)}</Text>

        <MapView
          style={styles.container}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >

          <Polyline
            coordinates={[
              { latitude: 40.743, longitude: -74.0351431 },
              { latitude: 40.74, longitude: -74.0091646 },
              { latitude: 40.74, longitude: -74.0 },
              { latitude: 40.7309, longitude: -73.9877787 },
              { latitude: 40.729, longitude: -73.902965 },
              { latitude: 40.706, longitude: -73.9351431 }
            ]}
            strokeColor="#000"
            strokeColors={[
              '#7F0000',
              '#00000000',
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={3}
            />

        </MapView>
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
