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
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
  Asset,
  AppLoading
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import Background from '../assets/images/patrick-hend.jpg';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'Search',
    };

  constructor() {
    super();

    this.state = {
      startLocation: "1 Bryant Park, New York",
      endLocation: "Madison Square Park",
      routes: [],
      isReady: false
    }
  }

  _getRoutesMaps = () => {
    let URL = `https://scaffolding-app-api.herokuapp.com/routes?start_location=${this.state.startLocation}&end_location=${this.state.endLocation}`;
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

async _cacheResourcesAsync() {
  // const images = [
  //   require('./assets/images/expo-icon.png'),
  //   require('./assets/images/slack-icon.png'),
  // ];

  const image = require('../assets/images/patrick-hend.jpg')

  const cacheImage = Asset.fromModule(image).downloadAsync();

  return Promise.all(cacheImage)
}

render() {

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{
        flex: 1,
        backgroundColor: 'transparent',
      }}
      >
      <ImageBackground source={ Background } style={{flex: 1, width: '100%', height: '100%'}}>

      <View
        style={{
          marginTop: '7%',
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
          }}
          >

          <FormLabel
            labelStyle={{color: '#fff'}}
            >Start Location</FormLabel>
          <FormInput
            clearButtonMode="always"
            inputStyle={{color: '#fff',
              fontWeight: 'bold'}}
              onChangeText={(text) => this.setState({ startLocation: text })}/>

            <FormLabel
              labelStyle={{color: '#fff'}}
              >
              End Location</FormLabel>
            <FormInput
              clearButtonMode="always"
              inputStyle={{color: '#fff',
                fontWeight: 'bold'}}
                onChangeText={(text) => this.setState({ endLocation: text })}/>


              <View
                style={{
                  borderColor: '#fff',
                  width: '50%',
                  marginTop:20,
                  borderRadius: 5,
                }}
                  alignSelf='center'>
                <Button
                  onPress={ this._getRoutesMaps }
                  title="Check out Routes"
                  color='white'
                  />
              </View>
            </View>
          </TouchableWithoutFeedback>
          </ImageBackground>
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
