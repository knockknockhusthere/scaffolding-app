import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Map from '../components/Map';
import axios from 'axios';

const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

const scaf1 = {
  cartodb_id: 1147,
  borough_name: "MANHATTAN",
  first_permit_date: "7/6/2016 12:00",
  current_date: "7/5/2018",
  sidewalk_shed_linear_feet: 140,
  current_job_status: "R",
  latitude_point: 40.7772598266602,
  longitude_point: -73.9773712158203,
  house_number: "27",
  street_name: "WEST 72 STREET",
  borough_digit: 1,

};

const scaf2 = {
  cartodb_id: 4088,
  borough_name: "MANHATTAN",
  first_permit_date: "9/20/2017 12:00",
  current_date: "7/5/2018",
  sidewalk_shed_linear_feet: 380,
  current_job_status: "R",
  latitude_point: 40.7050018310547,
  longitude_point: -74.0096206665039,
  house_number: "2",
  street_name: "WILLIAM STREET",
  borough_digit: 1,

};

export default class LinksScreen extends React.Component {

  state = {
     region: null,
     scaffoldLocations: [scaf1, scaf2]
   }

   componentDidMount(){
       axios.get('http://localhost:3000/scaffolds')
       .then((response)=>{
         this.setState({ scaffoldLocations: response.data.data });
         console.log(response.data.data);
         // this.props.updateStatusCallback(`Successfully loaded ${response.data.length} movies!`);
       })
       .catch((error)=>{
         console.log(error);
       });
     }

   render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={region}
          places={this.state.scaffoldLocations}
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
