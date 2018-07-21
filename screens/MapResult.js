import React from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import Map from '../components/Map';

const region = {
  latitude: 40.74,
  longitude: -74.003,
  latitudeDelta: 0.1,
  longitudeDelta: 0.0421
}

const color = ["#0652ce", "#0a842d", "#ad1f1f"];

export default class LinksScreen extends React.Component {


  routes = () => {
    let routeProps = this.props.navigation.getParam('routes', 'devault value');
    console.log('inside routes function');
    console.log( routeProps );

  }



  render() {

    // const { navigation } = this.props;
    // const routes = navigation.getParam('routes', 'NO-ID');

    return (
      <View>
        <Button
          onPress={ this.routes }
          title="HELP"
          >
          Help</Button>
          <Map
            region={ region }
          />
      </View>
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
