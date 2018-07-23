import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
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
      startLocation: "1 Bryant Park, New York",
      endLocation: "Madison Square Park",
      routes: []
    }
  }

  _getRoutesMaps = () => {
    let URL = `http://localhost:3000/routes?start_location=${this.state.startLocation}&end_location=${this.state.endLocation}`;
    console.log("Pressed!");

    axios.get(URL)
    .then((response)=>{
      console.log(response.data);

      this.setState({
        routes: response.data
      }, () => this.props.navigation.navigate('SearchResultScreen', { routes: this.state.routes })
    );

  })
  .catch((error)=>{
    console.log(`failed with errors: ${ error }`);
  });
}

  _showAlert = () => {
    Alert.alert(
      'Hey New Yorkers!',
      "I know the weather can be all sorts of crazy and you can't always be carrying umbrellas and raincoats all the time! That's why I'm here to help you take advantage of all the scaffolding that has taken over the city! Enter where you are and where you're going to find out which route has the most scaffolding cover! Have fun and stay dry!",
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ]
    )
  };

  render() {

    const resizeMode = 'cover';

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={{
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
            marginTop: '5%',
            marginLeft: '80%',
            height: '18%'

          }}
          >

          <Entypo.Button
            onPress={this._showAlert}
            name='info-with-circle'
            size={40}
            color='white'
            backgroundColor='transparent'

            />

        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              color: 'white',
            }}
            >

            <FormLabel
              labelStyle={{color: '#fff'}}
              >Start Location</FormLabel>
            <FormInput onChangeText={(text) => this.setState({ startLocation: text })}/>

            <FormLabel
              labelStyle={{color: '#fff'}}
              >
              End Location</FormLabel>
            <FormInput onChangeText={(text) => this.setState({ endLocation: text })}/>

            <Button
              onPress={ this._getRoutesMaps }
              title="Check out Routes"
              color='white'
              />
            
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: 'white',
    height: 40,
    width: 200
  }
});
