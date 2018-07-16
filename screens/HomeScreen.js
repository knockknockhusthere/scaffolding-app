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
  TextInput,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import axios from 'axios';


// const background = '../assets/images/patrick-hendry-633205-unsplash.jpg'
const background = 'https://images.unsplash.com/photo-1523912173627-51977fc34d1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e311195cb6ec2cf83330c9fe498d450e&auto=format&fit=crop&w=2134&q=80'


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

    const resizeMode = 'cover';

    return (
      <View style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
      >
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
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
        <FormLabel>Starts</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ startValue: text })}/>
        <FormValidationMessage>Error message</FormValidationMessage>

        <FormLabel>Ends</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ endValue: text })}/>

        <Button
          onPress={ this.onInputChange }
          title="Check out Routes"

          />
        <Button
          onPress={ this.getRoutesMaps }
          title="Press Me"
          color='white'
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    flex: 1,

    color: '#999',
  },
  textField: {
    flex: 1,
    backgroundColor: '#4286f4',
    height: 40,
    width: 200
  }
});
