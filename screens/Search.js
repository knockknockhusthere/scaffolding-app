import React from 'react';
import { View, Image, Text } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//
// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};



const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
    placeholder='Enter Location'
    minLength={2}
    autoFocus={false}
    returnKeyType={'default'}
    fetchDetails={true}
    styles={{
      textInputContainer: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth:0
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      },
    }}
    currentLocation={false}
  />

);
}

export default class HomeScreen extends React.Component {

  render() {
    return(
      <View
        style={{
          backgroundColor:'green'}}
        >
        <Text>Hello</Text>
      {this.GooglePlacesInput}
      </View>
    );
  }
}
