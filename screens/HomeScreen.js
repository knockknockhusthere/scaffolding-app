import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  TextInput
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import axios from 'axios';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      startLocation: {
        "lat": 40.7551951,
        "lng": -73.98390049999999
      },
      endLocation: {
        "lat": 40.7699309,
        "lng": -73.99268739999999
      },
      startValue: "",
      endValue: ""
    }
  }

  getRoutesMaps = () => {
  let URL = 'http://localhost:3000/routes';
  let params = { start_location: this.state.startLocation, end_location: this.state.endLocation };

  // cant send get request with a json body, workarounds or send as post???

  axios.get(URL)
  .then((response)=>{
    console.log("Pressed!");
    console.log(`succeeded with response: ${ response.start_location }`);
  })
  .catch((error)=>{
    console.log(`failed with errors: ${error}`);
  });
}

onInputChange = () => {
  // this.setState({startValue: event.target.value})

  console.log(`start: ${this.state.startValue}`);
  console.log(`end: ${this.state.endValue}`);
}

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          style={{height: 40}}
          placeholder="Type where you are!"
          onChangeText={(text) => this.setState({ startValue: text })}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Type where you're going!"
          onChangeText={(text) => this.setState({ endValue: text })}
        />
        <Button
          onPress={ this.onInputChange }
          title="Check out Routes"
        />
        <Button
          onPress={ this.getRoutesMaps }
          title="Press Me"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    backgroundColor: '#4286f4',
    color: '#000',

  }
});
