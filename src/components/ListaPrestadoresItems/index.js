import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';

import {Overlay} from 'react-native-elements';

const setVisible = (objeto, visible) => {
  objeto.setState({isVisible: visible});
};

class ListaPrestadoresItems extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  render() {
    const {
      buttonArea,
      viewGeralModal,
      viewFecharModal,
      toFecharModal,
      textFecharModal,
      viewBotaoAdicionar,
      btnAdicionar,
      txtBtnAdicionar,
    } = styles;
    return (
      <View style={viewGeralModal}>
        <View>
          <TouchableHighlight
            underlayColor="#DDD"
            style={buttonArea}
            onPress={() => setVisible(this, true)}>
            <View>
              <Text>{this.props.data.nome}</Text>
              <Text>{this.props.data.nomeProfissao}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Overlay
          isVisible={this.state.isVisible}
          overlayBackgroundColor="rgb(255,255,255)"
          borderRadius={20}
          overlayStyle={{borderColor: '#1f33c9', borderWidth: 6}}
          width="auto"
          onBackdropPress={() => setVisible(this, false)}
          height="auto">
          <View>
            <View style={viewFecharModal}>
              <TouchableHighlight
                underlayColor={'#fff'}
                style={toFecharModal}
                onPress={() => setVisible(this, false)}>
                <Text style={textFecharModal}>X</Text>
              </TouchableHighlight>
            </View>
            <View>
              <Text>Métodos de pagamento</Text>
            </View>
            <View style={viewBotaoAdicionar}>
              <TouchableHighlight
                style={btnAdicionar}
                underlayColor={'#1f33c9'}
                onPress={() => {
                  this.props.onPress(this.props.data);
                  this.props.objeto.props.navigation.navigate('QuartaRota');
                  setVisible(this, false);
                }}>
                <Text style={txtBtnAdicionar}>Conversar com prestador</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const ConexaoListaPrestadoresItems = connect(
  mapStateToProps,
  {},
)(ListaPrestadoresItems);

export default ConexaoListaPrestadoresItems;

const styles = StyleSheet.create({
  buttonArea: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderColor: '#8B6914',
    borderWidth: 1,
    color: '#1f33c9',
    backgroundColor: '#ff9e29',
    borderRadius: 20,
  },
  viewFecharModal: {
    alignItems: 'flex-end',
  },
  toFecharModal: {
    borderColor: '#1f33c9',
    borderWidth: 3,
    margin: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fafafa',
  },
  textFecharModal: {
    color: '#1f33c9',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'FiraCode-Bold',
    fontSize: 20,
  },
  viewGeralModal: {
    justifyContent: 'center',
  },
  viewGeralDentro: {
    //backgroundColor: 'rgba(255,255,255, 0.93)',
    backgroundColor: '#fff',
    //justifyContent: 'center',
    //alignItems: 'center',
    borderColor: 'rgba(255,000,000,0.9)',
    borderWidth: 4,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  viewDentroDoModal: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  viewBotaoAdicionar: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdicionar: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8B6919',
  },
  txtBtnAdicionar: {
    color: '#ff9e29',
    fontFamily: 'Fira Code',
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
});
