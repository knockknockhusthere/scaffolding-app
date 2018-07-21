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

  constructor() {
    super();

    this.state = {
      routesArray: [1,2,3]
    }

    this.renderPolylines = this.renderPolylines.bind(this);
  }

  componentDidMount() {
    let routeProps = this.props.navigation.getParam('routes', 'default value');
    console.log('inside routes function');

    this.setState(
      { routesArray: routeProps }
    )
    // console.log(this.state.routesArray);
  }

renderPolylines() {
    let allRoutes = this.state.routesArray;
  
    // for (let i = 0; i < this.state.routesArray.length; i++) {
    //   console.log(this.state.routesArray);
    //   console.log(color[i]);
    // }
  }


  render() {

    // const { navigation } = this.props;
    // const routes = navigation.getParam('routes', 'NO-ID');



    return (
      <View>
        <Button
          onPress={ this.renderPolylines }
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
