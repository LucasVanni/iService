import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';

export default class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.view}>
        <Text>Lista de Converssas</Text>
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
