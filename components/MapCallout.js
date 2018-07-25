import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

class MapCallout extends Component {

  render() {
    return (
      <View>
        <Text style={styles.title}>
          { this.props.location }
        </Text>
        <Text>{ this.props.address }</Text>

      </View>
    );
  }
}

const styles = {
  thumbnailStyle: {
    flex: 1,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
};
//
// MapCallout.propTypes = {
//   name: PropTypes.string,
//   image: PropTypes.string,
//   location: PropTypes.array,
//   popular_times: PropTypes.array
// }

export default MapCallout;
