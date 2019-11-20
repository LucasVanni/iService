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

import {
  editTextAdicionarProfissao,
  botaoAdicionarProfissao,
} from '../../actions/AuthActions';

const setVisible = (objeto, visible) => {
  objeto.setState({isVisible: visible});
};

export class AdicionarProfissao extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  render() {
    const {
      viewGeralModal,
      input,
      viewBotaoAdicionar,
      btnAdicionar,
      txtBtnAdicionar,
      textFecharModal,
      toFecharModal,
      viewFecharModal,
      intraOverlay,
    } = styles;

    return (
      <View style={viewGeralModal}>
        <View style={viewBotaoAdicionar}>
          <TouchableHighlight
            style={btnAdicionar}
            underlayColor={'#1f33c9'}
            onPress={() => setVisible(this, true)}>
            <Text style={txtBtnAdicionar}>CADASTRAR NOVA PROFISSÃO</Text>
          </TouchableHighlight>
        </View>
        <Overlay
          isVisible={this.state.isVisible}
          overlayBackgroundColor="rgb(255,255,255)"
          borderRadius={20}
          overlayStyle={intraOverlay}
          width="auto"
          onBackdropPress={() => setVisible(this, false)}
          height="auto">
          <View>
            <View style={viewFecharModal}>
              <TouchableHighlight
                underlayColor={'#1f33c9'}
                style={toFecharModal}
                onPress={() => setVisible(this, false)}>
                <Text style={textFecharModal}>X</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TextInput
                style={input}
                autoCapitalize="characters"
                autoFocus={false}
                value={this.props.adicionarProfissao}
                onChangeText={profissao =>
                  this.props.editTextAdicionarProfissao(profissao)
                }
                placeholder="Digite a profissão exercida..."
                placeholderTextColor={'#1f33c9'}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={viewBotaoAdicionar}>
              <TouchableHighlight
                style={styles.btnAdicionarProfissao}
                underlayColor={'#1f33c9'}
                onPress={() =>
                  this.props.botaoAdicionarProfissao(
                    this,
                    this.props.textoProfissao,
                  )
                }>
                <Text style={styles.txtBtnAdicionarProfissao}>
                  ADICIONAR PROFISSÃO DIGITADA
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {textoProfissao: state.auth.textoProfissao};
};

const ConexaoAdicionarProfissao = connect(
  mapStateToProps,
  {
    editTextAdicionarProfissao,
    botaoAdicionarProfissao,
  },
)(AdicionarProfissao);

export default ConexaoAdicionarProfissao;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderColor: '#ff9e29',
    borderWidth: 4,
    color: '#1f33c9',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  viewFecharModal: {
    alignItems: 'flex-end',
  },
  toFecharModal: {
    borderColor: '#ff9e29',
    borderWidth: 3,
    margin: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fafafa',
  },
  textFecharModal: {
    color: '#f00',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'FiraCode-Bold',
    fontSize: 20,
  },
  viewGeralModal: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewGeralDentro: {
    //backgroundColor: 'rgba(255,255,255, 0.93)',
    backgroundColor: '#fff',
    //justifyContent: 'center',
    //alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.9)',
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
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },

  txtBtnAdicionar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 7,
    textAlign: 'center',
  },

  btnAdicionarProfissao: {
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: '#ff9e29',
  },

  txtBtnAdicionarProfissao: {
    color: '#ff9e29',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 7,
    textAlign: 'center',
  },
});
