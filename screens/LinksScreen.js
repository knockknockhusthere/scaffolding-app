import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Map from '../components/Map';
import axios from 'axios';

const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

export default class LinksScreen extends React.Component {

  state = {
     region: null,
     scaffoldLocations: []
   }

   componentDidMount(){
       axios.get('http://localhost:3000/scaffolds')
       .then((response)=>{
         this.setState({ scaffoldLocations: response.data.data });
         console.log( response.data.data );
         // this.props.updateStatusCallback(`Successfully loaded ${response.data.length} movies!`);
       })
       .catch((error)=>{
         console.log(error);
       });
     }

   render() {
    return (
      <SafeAreaView style={ styles.container }>
        <Map
          region={ region }
          places={ this.state.scaffoldLocations }
        />
      </SafeAreaView>
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
