import React, {Component} from 'react';

import {View, Button, StyleSheet} from 'react-native';

export default class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.view}>
        <Button
          title={'ir para chat'}
          onPress={() => this.props.navigation.navigate('Fifty')}
        />
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
