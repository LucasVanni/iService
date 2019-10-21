import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';
import tz from 'moment-timezone';

import {Icon} from 'react-native-elements';

import SoundPlayer from 'react-native-sound-player';

import {AbrirModalImagem} from '../AbrirModalImagem/';

export default class MensagemItem extends Component {
  constructor(props) {
    super(props);

    let borderColor = '#1f33c9';
    let color = '#1f33c9';
    let align = 'flex-start';
    let textAlign = 'left';

    if (this.props.data.uid == this.props.userUid) {
      borderColor = '#ff9e29';
      color = '#ff9e29';
      align = 'flex-end';
      textAlign = 'right';
    }

    this.state = {
      borderColor,
      color,
      align,
      textAlign,
      dataMensagem: this.getFormattedDate(this.props.data.data),
    };
  }

  getFormattedDate(originalDateEpoch) {
    let date = moment(originalDateEpoch)
      .locale('pt-br')
      .tz('America/Sao_Paulo');
    if (
      new Date().setHours(0, 0, 0, 0) ===
      new Date(originalDateEpoch).setHours(0, 0, 0, 0)
    ) {
      return date.format('LT');
    } else {
      return date.format('L') + ' ' + date.format('LT');
    }
  }

  render() {
    const {view, text, dateTxt, imagem} = styles;
    return (
      <View
        style={[
          view,
          {
            alignSelf: this.state.align,
            borderColor: this.state.borderColor,
          },
        ]}>
        {this.props.data.tipoMensagem == 'text' && (
          <Text
            style={[
              text,
              {textAlign: this.state.textAlign, color: this.state.color},
            ]}>
            {this.props.data.mensagem}
          </Text>
        )}

        {this.props.data.tipoMensagem == 'image' && (
          <AbrirModalImagem caminho={this.props.data.imgSrc} />
        )}

        {this.props.data.tipoMensagem == 'audio' && (
          <TouchableHighlight>
            <Icon
              color="#1f33c9"
              name="play-arrow"
              onPress={() => tocarAudio(this.props.data.audioSrc)}
            />
          </TouchableHighlight>
        )}

        <Text style={[dateTxt, {color: this.state.color}]}>
          {this.state.dataMensagem}
        </Text>
      </View>
    );
  }
}

const tocarAudio = audio => {
  SoundPlayer.playUrl(`${audio}`);
};

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 35,
    backgroundColor: '#fafafa',
    borderWidth: 4,
    padding: 10,
    maxWidth: '60%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateTxt: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  audioView: {
    backgroundColor: '#999',
  },
});
