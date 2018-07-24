import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class Instruction extends Component {

  render() {
    let htmlInstruction = this.props.htmlInstruction;
    return(
      <View style= { styles.container }>
        <View style={ styles.sentence }>
          <Text style={{
            fontWeight: 'bold', backgroundColor:'transparent',
            paddingBottom: 5,
            fontSize: 18
            }}>
            Step { this.props.step }:
          </Text>
          <HTMLView
            value={`<text>${htmlInstruction} </text>` }
            stylesheet={ htmlStyle }
          />

        </View>
        <View style={ styles.distanceView }>
          <Text style={ styles.distance }>
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
      minHeight: 100,
      fontSize: 25,
      backgroundColor: 'transparent',
      marginLeft: 10,
      marginBottom: 5
    },
    sentence: {
      width: '81%',
      backgroundColor: '#FFFFFF90',
      borderRadius: 5,
      padding: 6,
    },
    distanceView: {
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      marginLeft: 5
    },
    distance: {
      alignSelf: 'center',
      fontWeight: 'bold',
      color: 'white',
      fontSize: 16
    }
});

const htmlStyle = StyleSheet.create({

  text: {
    fontSize: 16.5
  }

})
