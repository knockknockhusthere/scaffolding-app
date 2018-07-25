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
  AppLoading,
  ScrollView
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

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
      something: "hi",
    }
  }

  _getRoutesMaps = () => {
    let URL = `https://scaffolding-app-api.herokuapp.com/routes?start_location=${this.state.startLocation}&end_location=${this.state.endLocation}`;
    console.log("Pressed!");
    console.log(this.state.something);

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
        <ScrollView>
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

          <View
            style={{
              marginTop: 80
            }}>
            <View
              style={{
                minHeight: 150,
                width: '100%',
              }}
              zIndex= {3}
              >
              <FormLabel
                labelStyle={{color: '#fff'}}
                >Start Location</FormLabel>
              <GooglePlacesAutocomplete
                placeholder="Enter where you are..."
                minLength={3}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                textInputProps={{
                  onChangeText:(text) => {
                    this.setState({
                      something: text.description
                    });
                  }
                }}
                onPress={(text) => this.setState({ startLocation: text.description })}
                styles={{
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                  description: {
                    color: '#fff',
                    fontWeight: 'bold'
                  }
                }}
                currentLocation={false}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: GOOGLE_API_KEY,
                  language: 'en',
                  location:'40.7589,-73.9851',
                  radius: 20000,

                }}
                />
            </View>

            <View
              style={{
                minHeight: 150,
                width: '100%',
                marginTop: -50
              }}
              zIndex= {2}>

              <FormLabel
                labelStyle={{color: '#fff'}}
                >End Location
              </FormLabel>

              <GooglePlacesAutocomplete
                placeholder="...and where you're going!"
                minLength={3}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                textInputProps={{
                  onChangeText:(text) => {
                    this.setState({
                      something: text.description
                    });
                  }
                }}
                onPress={(text) => this.setState({ endLocation: text.description })}
                styles={{
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                  description: {
                    color: '#fff',
                    fontWeight: 'bold'
                  }
                }}
                currentLocation={false}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: GOOGLE_API_KEY,
                  language: 'en',
                  location:'40.7589,-73.9851',
                  radius: 20000,

                }}
                />
            </View>

            <View
              style={{

                borderColor: '#fff',
                borderWidth: 2,
                width: '50%',
                borderRadius: 5,
                backgroundColor: '#00000070',

              }}
              zIndex= {1}
              alignSelf='center'>
              <Button
                onPress={ this._getRoutesMaps }
                title="Check out Routes"
                color='white'
                />
            </View>
          </View>

          <View
            style={{
              height: 300
            }}>
          </View>
        </ScrollView>
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
