import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';

export default class CalloutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.objeto.state.modalVisible,
    };
    this.criarConversa = this.criarConversa.bind(this);
    this.clickContratarPrestador = this.clickContratarPrestador.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  criarConversa(objeto, uid, prestadorUid) {
    objeto.props.criarConversa(uid, prestadorUid);
    objeto.props.navigation.navigate('Fourth');
    objeto.setState({modalVisible: false});
  }

  clickContratarPrestador() {
    this.props.contratarPrestador(
      this.props.objeto.state.prestadorItemSelecionado,
    );
  }

  doSearch() {
    makeSearchLocations(this.props.infos.id).then(results => {});
  }

  render() {
    const {
      viewDentroDoModal,
      viewTextoAviso,
      toFecharModal,
      textFecharModal,
      toConversar,
      textConversar,
    } = styles;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.objeto.state.modalVisible}
        onRequestClose={() => {
          this.setState({modalVisible: false});
        }}>
        <View style={viewDentroDoModal}>
          <View style={viewTextoAviso}>
            <TouchableHighlight
              underlayColor={'#1f33c9'}
              style={toConversar}
              onPress={() =>
                this.criarConversa(
                  this.props.objeto,
                  this.props.uid,
                  this.props.infos.id,
                )
              }>
              <Text style={textConversar}>Conversar com prestador</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight
              underlayColor={'#1f33c9'}
              style={toConversar}
              onPress={() => {
                this.clickContratarPrestador();
              }}>
              <Text style={textConversar}>Contratar prestador</Text>
            </TouchableHighlight> */}
            <TouchableHighlight
              underlayColor={'#1f33c9'}
              style={toFecharModal}
              onPress={() => this.props.objeto.setState({modalVisible: false})}>
              <Text style={textFecharModal}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  viewGeralModal: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toAbrirModal: {
    borderColor: '#ff9e29',
    borderWidth: 2,
    marginTop: 5,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  textAbrirModal: {
    color: '#ff9e29',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'FiraCode-Bold',
    fontSize: 20,
  },
  viewDentroDoModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toConversar: {
    borderColor: '#1f33c9',
    borderWidth: 2,
    marginTop: 5,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  textConversar: {
    color: '#ff9e29',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  toFecharModal: {
    borderColor: '#f00',
    borderWidth: 3,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  viewTextoAviso: {
    //backgroundColor: 'rgba(255,255,255, 0.93)',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255,000,000,0.9)',
    borderWidth: 6,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  textFecharModal: {
    color: '#f00',
    fontWeight: 'bold',
    textAlign: 'center',

    fontSize: 20,
  },
  tituloAviso: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  textoAviso: {
    color: '#1f33c9',
    margin: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
