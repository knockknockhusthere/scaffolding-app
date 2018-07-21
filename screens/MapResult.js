import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Map from '../components/Map';

const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

const color = ["#0652ce", "#0a842d", "#ad1f1f"];

export default class LinksScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      routesArray: [1,2,3]
    }

    this.decodePolylines = this.decodePolylines.bind(this);
  }

  componentDidMount() {
    let routeProps = this.props.navigation.getParam('routes', 'default value');
    console.log('inside routes function');

    this.setState(
      { routesArray: routeProps }
    )
    // console.log(this.state.routesArray);
  }

  decodePolylines() {

    let allRoutes = this.state.routesArray;

    console.log(allRoutes);


    // for (let i = 0; i < this.state.routesArray.length; i++) {
    //   console.log(this.state.routesArray);
    //   console.log(color[i]);
    // }
  }

  render() {

    // const { navigation } = this.props;
    // const routes = navigation.getParam('routes', 'NO-ID');

    return (
      <View>
        <Button
          onPress={ this.decodePolylines }
          title="HELP"
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
