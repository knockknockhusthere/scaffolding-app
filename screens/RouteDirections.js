import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import Map from '../components/Map';

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

        <MapView

          style={styles.container}
          region={region}
          showsUserLocation
          showsMyLocationButton>
          <Polyline
            coordinates={[
              { latitude: 40.7551951, longitude: -73.98390049999999 },
              { latitude: 40.7699309, longitude: -73.99268739999999 },

            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={5}
            />
            <Text>Testing: {JSON.stringify(intro)}</Text>
            <Text>Testing: {JSON.stringify(int)}</Text>
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
