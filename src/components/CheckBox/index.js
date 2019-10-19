import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {CheckBox} from 'react-native-elements';

export default class extends Component {
  render() {
    const {viewCheckBox, img, botao, textoBotao} = styles;
    return (
      <View style={viewCheckBox}>
        <CheckBox
          center
          title="Tomador de serviços"
          containerStyle={{
            paddingTop: 5,
            backgroundColor: null,
            borderWidth: 0,
          }}
          checkedColor="#ff9e29"
          textStyle={{color: '#fff', fontWeight: 'bold'}}
          onPress={() =>
            this.props.objeto.setState({
              checkedPrestador: false,
              checkedTomador: true,
            })
          }
          checked={this.props.objeto.state.checkedTomador}
        />
        <CheckBox
          center
          title="Prestador de serviços"
          containerStyle={{
            paddingTop: 5,
            backgroundColor: null,
            borderWidth: 0,
          }}
          checkedColor="#ff9e29"
          textStyle={{color: '#fff'}}
          onPress={() =>
            this.props.objeto.setState({
              checkedPrestador: true,
              checkedTomador: false,
            })
          }
          checked={this.props.objeto.state.checkedPrestador}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewCheckBox: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  img: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  botao: {
    margin: 10,
    flexDirection: 'row-reverse',
  },

  textoBotao: {
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#fff',
  },
});
