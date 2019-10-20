import React, {Component} from 'react';

import {View, Text, StyleSheet, Animated} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

import {
  getPosition,
  saveCurrentLocation,
  setUpdateLocation,
} from '../APIS/iServiceAPI';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDKAiL75NY_WDhGg8akwnMwM5O3Dnel95g';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.view}>
        <MapView style={styles.mapView} provider={PROVIDER_GOOGLE}></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mapView: {
    flex: 1,
    zIndex: 1,
  },
});
