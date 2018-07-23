import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Instruction extends Component {


  render() {
    return(
      <View
        style= { styles.container }>
        <Text
          style={ styles.sentence }>
          <Text
            style={{fontWeight: 'bold'}}
            >
            Step{ this.props.step }:
          </Text>
          <Text>
            { this.props.htmlInstruction }
          </Text>
        </Text>
        <View style={styles.distanceView}>
          <Text
            style={ styles.distance }>
            { this.props.distance }
          </Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: '35%',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: 'white',
    },
    sentence: {
      width: '80%',
      backgroundColor: 'lightgrey'
    },
    distanceView: {
      backgroundColor: 'lightblue',
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center'
    },
    distance: {
      alignSelf: 'center',
      fontWeight: 'bold'
    }
});
