import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { MapView } from 'expo';
// import Map from '../components/Map';
// import Polyline from '@mapbox/polyline';
import Instruction from '../components/Instruction';

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
    const routeInfo = this.props.navigation.getParam('routeInfo', 'default value');
    const coveredPercent = routeInfo.covered_percent;
    const routeSteps = routeInfo.legs[0].steps;

    console.log(routeSteps);

    return(
      <ScrollView>
        <Text
          style = {styles.percent}>{ (coveredPercent*100).toFixed(2) }%</Text>
        {this.renderSteps(routeSteps)}
      </ScrollView>

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
  percent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'blue',
    fontSize: 40,
    alignSelf: 'center'

  }
}
