import React, {Component} from 'react';

import {View, Image, StyleSheet} from 'react-native';

const logo = require('./images/IService.png');

export default class Logo extends Component {
  render() {
    const {view} = styles;

    return (
      <View style={view}>
        <Image resizeMode="contain" source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
