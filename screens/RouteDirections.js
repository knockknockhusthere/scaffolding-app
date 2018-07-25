import React, { Component } from 'react';
import { ScrollView, Text, View, ImageBackground } from 'react-native';
import { MapView } from 'expo';
// import Map from '../components/Map';
// import Polyline from '@mapbox/polyline';
import Instruction from '../components/Instruction';

import Background from '../assets/images/patrick-hend.jpg';

const Polyline = MapView.Polyline
const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

export default class RouteDirections extends Component {

  renderSteps = (steps) => {
    return steps.map((step, i) => (
      <Instruction
        key={i}
        step={i+1}
        distance={step.distance.text}
        htmlInstruction={step.html_instructions}>
      </Instruction>

    ))
  }

  render() {

    const resizeMode = 'cover';

    const routeInfo = this.props.navigation.getParam('routeInfo', 'default value');
    const coveredPercent = routeInfo.covered_percent;
    const routeSteps = routeInfo.legs[0].steps;

    // console.log(routeSteps);

    return(
      <ImageBackground source={ Background } style={{flex: 1, width: '100%', height: '100%'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>

          <View
            style={styles.percentContainer}>
            <Text
              style={styles.percent}>
               { (coveredPercent*100).toFixed(2) }% of Route Covered</Text>
          </View>
          {this.renderSteps(routeSteps)}

      </ScrollView>
    </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  percentContainer: {
    paddingTop: 30,
    paddingLeft: 3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00281750',
    minHeight:100,
    width: '100%'
  },
  percent: {
    color: '#fff',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  }
}
