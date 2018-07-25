import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { MapView } from 'expo';
// import Map from '../components/Map';
// import Polyline from '@mapbox/polyline';
import Instruction from '../components/Instruction';

import Background from '../assets/images/header.jpg';
const background = 'https://images.unsplash.com/photo-1523912173627-51977fc34d1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e311195cb6ec2cf83330c9fe498d450e&auto=format&fit=crop&w=2134&q=80'

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            >
            <Image
              style={{
                flex: 1,
                resizeMode,

              }}
              source={{ uri: background }}
              />
          </View>

          <View
            style={styles.percentContainer}>
            <Text
              style={styles.percent}>
               { (coveredPercent*100).toFixed(2) }% of Route Covered</Text>
          </View>
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
