import React, {Component} from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
  TextInput,
  Text,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {connect} from 'react-redux';

import Permissions from 'react-native-permissions';

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'rn-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

import {
  setActiveChat,
  setInputMessage,
  enviarMensagem,
  monitoraConversa,
  monitoraConversaOff,
  enviarImagem,
  enviarAudio,
} from '../actions/ChatActions';

import {Icon} from 'react-native-elements';

import MensagemItem from '../components/MensagemItem/';

import Sound from 'react-native-sound';

import AudioRecord from 'react-native-audio-record';

export class Chat extends Component {
  sound = null;

  state = {
    audioFile: '',

    recording: false,

    loaded: false,

    paused: true,

    pct: 0,
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.titulo,
    headerLeft: (
      <TouchableHighlight
        onPress={() => navigation.state.params.voltar()}
        underlayColor={'transparent'}>
        <Icon
          name={'arrow-back'}
          size={25}
          color={'#1f33c9'}
          containerStyle={styles.imageBotaoVoltar}
        />
      </TouchableHighlight>
    ),
  });

  checkPermission = async () => {
    const p = await Permissions.check('android.permission.RECORD_AUDIO');

    if (p === 'granted') return;

    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('android.permission.RECORD_AUDIO');
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,

      channels: 1,

      bitsPerSample: 16,

      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {});

    this.props.navigation.setParams({voltar: this.voltar});
    BackHandler.addEventListener('hardwareBackPress', this.voltar);

    this.props.monitoraConversa(this.props.chatAtivo);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.voltar);
  }

  voltar = () => {
    this.props.monitoraConversaOff(this.props.chatAtivo);
    this.props.setActiveChat('');
    this.props.navigation.goBack();
    return true;
  };

  render() {
    const {
      view,
      viewBotoesImagemVoz,
      areaConversa,
      areaEnvio,
      inputEnvio,
      botaoEnvio,
      progressBar,
      progressBarView,
      textPCT,
    } = styles;

    let AreaBehavior = Platform.select({ios: 'padding', android: null});

    let AreaOffset = Platform.select({ios: 64, android: null});

    return (
      <KeyboardAvoidingView
        style={view}
        behavior={AreaBehavior}
        keyboardVerticalOffset={AreaOffset}>
        <FlatList
          ref={referencia => {
            this.flatConversas = referencia;
          }}
          // Quando houver mudanças no conteúdo muda
          onContentSizeChange={() =>
            this.flatConversas.scrollToEnd({animated: true})
          }
          // Quando houver mudanças no layout
          onLayout={() => {
            this.flatConversas.scrollToEnd({animated: true});
          }}
          style={areaConversa}
          data={this.props.mensagensConversasAtivas}
          renderItem={({item}) => (
            <MensagemItem data={item} userUid={this.props.uid} />
          )}
        />
        {this.state.pct > 0 && (
          <View style={progressBarView}>
            <View style={[{width: `${this.state.pct}%`}, progressBar]}>
              <Text style={textPCT}>{this.state.pct}%</Text>
            </View>
          </View>
        )}
        <View style={areaEnvio}>
          <TextInput
            value={this.props.mensagem}
            onChangeText={mensagem => this.props.setInputMessage(mensagem)}
            style={inputEnvio}
            placeholder={'Digite seu mensagem...'}
            placeholderTextColor={'#1f33c9'}
            multiline={true}
          />
          {exibirComponentes(viewBotoesImagemVoz, botaoEnvio, this)}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const exibirComponentes = (viewBotoesImagemVoz, botaoEnvio, objeto) => {
  if (objeto.props.mensagem != '' && objeto.state.recording == false) {
    return (
      <TouchableHighlight
        style={botaoEnvio}
        underlayColor={'#ff9e29'}
        onPress={() =>
          objeto.props.enviarMensagem(
            'text',
            objeto.props.mensagem,
            objeto.props.uid,
            objeto.props.chatAtivo,
          )
        }>
        <Icon name="send" type="material" color={'#1f33c9'} />
      </TouchableHighlight>
    );
  }
  if (objeto.state.recording == false) {
    return (
      <View style={viewBotoesImagemVoz}>
        <TouchableHighlight
          style={botaoEnvio}
          underlayColor={'#ff9e29'}
          onPress={() => escolherImagem(objeto)}>
          <Icon name="image-plus" type="material-community" color={'#1f33c9'} />
        </TouchableHighlight>
        <TouchableHighlight
          style={botaoEnvio}
          underlayColor={'#ff9e29'}
          onPress={() => comecarGravacao(objeto)}
          disabled={objeto.state.recording}>
          <Icon name="keyboard-voice" type="material" color={'#1f33c9'} />
        </TouchableHighlight>
      </View>
    );
  } else {
    return (
      <TouchableHighlight
        style={botaoEnvio}
        underlayColor={'#ff9e29'}
        onPress={() => {
          pararGravacao(objeto);
        }}
        disabled={!objeto.state.recording}>
        <View>
          <Icon name="stop" color={'#1f33c9'} />
        </View>
      </TouchableHighlight>
    );
  }
};

const comecarGravacao = objeto => {
  objeto.setState({audioFile: '', recording: true, loaded: false});

  AudioRecord.start();
};

const pararGravacao = async objeto => {
  if (!objeto.state.recording) return;

  let audioFile = await AudioRecord.stop();

  objeto.setState({audioFile, recording: false});

  carregar(objeto);
};

const carregar = objeto => {
  objeto.sound = new Sound(objeto.state.audioFile);

  RNFetchBlob.fs
    .readFile(objeto.sound._filename, 'base64')
    .then(data => {
      return RNFetchBlob.polyfill.Blob.build(data, {
        type: 'application/mp4;BASE64',
      });
    })
    .then(blob => {
      objeto.props.enviarAudio(
        blob,
        snapshot => {
          let pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          let state = objeto.state;
          state.pct = pct;
          objeto.setState(state);
        },
        nomeAudio => {
          let state = objeto.state;
          state.pct = 0;
          objeto.setState(state);
          objeto.props.enviarMensagem(
            'audio',
            nomeAudio,
            objeto.props.uid,
            objeto.props.chatAtivo,
          );
        },
      );
    });
};

const escolherImagem = objeto => {
  const options = {
    title: 'Selecionar foto de perfil',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar uma foto...',
    chooseFromLibraryButtonTitle: 'Escolher uma foto de sua biblioteca...',
  };
  ImagePicker.showImagePicker(options, imagem => {
    if (imagem.uri) {
      let uri = imagem.uri.replace('file://', '');

      RNFetchBlob.fs
        .readFile(uri, 'base64')
        .then(data => {
          return RNFetchBlob.polyfill.Blob.build(data, {
            type: 'image/jpeg;BASE64',
          });
        })
        .then(blob => {
          objeto.props.enviarImagem(
            blob,
            snapshot => {
              let pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              let state = objeto.state;
              state.pct = pct;
              objeto.setState(state);
            },
            nomeImagem => {
              let state = objeto.state;
              state.pct = 0;
              objeto.setState(state);
              objeto.props.enviarMensagem(
                'image',
                nomeImagem,
                objeto.props.uid,
                objeto.props.chatAtivo,
              );
            },
          );
        });
    }
  });
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  areaConversa: {
    flex: 7,
  },
  areaEnvio: {
    height: 55,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: '#fffafa',
    borderColor: '#1f33c9',
    borderWidth: 2,
    borderRadius: 50,
  },
  imageBotaoVoltar: {
    marginLeft: 20,
  },
  inputEnvio: {
    flex: 7,
    padding: 10,
    color: '#1f33c9',
    fontSize: 20,
  },
  botaoEnvio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 2,
    marginVertical: 1,
    borderColor: '#1f33c9',
    borderWidth: 3,
    backgroundColor: '#ff9e29',
  },
  viewBotoesImagemVoz: {
    flexDirection: 'row',
    flex: 3,
  },
  progressBarView: {
    height: 20,
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#ff9e29',
  },
  textPCT: {
    fontWeight: 'bold',
    color: '#1f33c9',
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(000, 000, 000, 0.3)',
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    nome: state.auth.nome,
    uid: state.auth.uid,
    mensagem: state.chat.mensagem,
    chatAtivo: state.chat.chatAtivo,
    recording: state.chat.recording,
    mensagensConversasAtivas: state.chat.mensagensConversasAtivas,
  };
};

const ChatConnection = connect(
  mapStateToProps,
  {
    setActiveChat,
    setInputMessage,
    enviarMensagem,
    monitoraConversa,
    monitoraConversaOff,
    enviarImagem,
    enviarAudio,
  },
)(Chat);

export default ChatConnection;
