import React, {Component} from 'react';

import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';

import {Overlay} from 'react-native-elements';

const setVisible = (objeto, visible) => {
  objeto.setState({isVisible: visible});
};

export class AbrirModalImagem extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  setVisible = (objeto, status) => {
    let state = objeto.state;
    state.isVisible = status;
    objeto.setState(state);
  };

  render() {
    const {imagem, viewModal, imagemModal} = styles;

    return (
      <View>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => setVisible(this, true)}>
          <Image style={imagem} source={{uri: this.props.caminho}} />
        </TouchableHighlight>

        <Overlay
          animationType="slide"
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(000, 000, 000, .3)"
          overlayBackgroundColor={'#999'}
          onBackdropPress={() => setVisible(this, false)}>
          <TouchableHighlight
            underlayColor={'transparent'}
            style={viewModal}
            onPress={() => setVisible(this, false)}>
            <Image
              style={imagemModal}
              resizeMode="contain"
              source={{uri: this.props.caminho}}
            />
          </TouchableHighlight>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewModal: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 100,
  },

  imagemModal: {width: '100%', height: '100%'},
});
