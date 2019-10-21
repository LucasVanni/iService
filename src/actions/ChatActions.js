import firebase from '../APIS/FireApi';

export const criarConversa = (usuarioUid, prestadorUid) => {
  return dispatch => {
    firebase
      .database()
      .ref('usuarios')
      .child(usuarioUid)
      .child('conversas')
      .orderByChild('outroUsuario')
      .equalTo(prestadorUid)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() != null) {
          snapshot.forEach(childItem => {
            dispatch({
              type: 'setActiveChat',
              payload: {
                conversaId: childItem.key,
              },
            });
          });
        } else {
          // Criando o chat
          let novaConversa = firebase
            .database()
            .ref('conversas')
            .push();

          novaConversa
            .child('membros')
            .child(usuarioUid)
            .set({
              id: usuarioUid,
            });
          novaConversa
            .child('membros')
            .child(prestadorUid)
            .set({
              id: prestadorUid,
            });
          //Associando aos envolvidos
          let conversaId = novaConversa.key;
          firebase
            .database()
            .ref('usuarios')
            .child(prestadorUid)
            .on('value', snapshot => {
              firebase
                .database()
                .ref('usuarios')
                .child(usuarioUid)
                .child('conversas')
                .child(conversaId)
                .set({
                  id: conversaId,
                  nome: snapshot.val().nome,
                  nomeProfissao: snapshot.val().nomeProfissao,
                  outroUsuario: prestadorUid,
                });
            });

          firebase
            .database()
            .ref('usuarios')
            .child(usuarioUid)
            .on('value', snapshot => {
              firebase
                .database()
                .ref('usuarios')
                .child(prestadorUid)
                .child('conversas')
                .child(conversaId)
                .set({
                  id: conversaId,
                  nome: snapshot.val().nome,
                  outroUsuario: usuarioUid,
                })
                .then(() => {
                  dispatch({
                    type: 'setActiveChat',
                    payload: {
                      conversaId,
                    },
                  });
                });
            });
        }
      });
  };
};

export const setActiveChat = conversaId => {
  return {
    type: 'setActiveChat',
    payload: {
      conversaId,
    },
  };
};

export const setInputMessage = mensagem => {
  return {
    type: 'setInputMessage',
    payload: {
      mensagem,
    },
  };
};

export const enviarImagem = (blob, progressCallback, successCallback) => {
  return dispatch => {
    let tmpKey = firebase
      .database()
      .ref('conversas')
      .push().key;
    let img = firebase
      .storage()
      .ref()
      .child('images')
      .child(`${tmpKey}.jpg`);

    img.put(blob, {contentType: 'image/jpeg'}).on(
      'state_changed',
      progressCallback,
      error => {
        alert(error.code);
      },
      () => {
        img.getDownloadURL().then(url => {
          successCallback(url);
        });
      },
    );
  };
};

export const enviarAudio = (blob, progressCallback, successCallback) => {
  return dispatch => {
    let tmpKey = firebase
      .database()
      .ref('conversas')
      .push().key;
    let audio = firebase
      .storage()
      .ref()
      .child('audio')
      .child(`${tmpKey}.mp4`);

    audio.put(blob, {contentType: 'application/mp4'}).on(
      'state_changed',
      progressCallback,
      error => alert(error.code),
      () => {
        audio.getDownloadURL().then(url => {
          successCallback(url);
        });
      },
    );
  };
};

export const enviarMensagem = (
  tipoMensagem,
  conteudoMensagem,
  autor,
  conversaAtiva,
) => {
  return dispatch => {
    let mensagemId = firebase
      .database()
      .ref('conversas')
      .child(conversaAtiva)
      .child('mensagens')
      .push();

    switch (tipoMensagem) {
      case 'text':
        mensagemId.set({
          tipoMensagem,
          data: firebase.database.ServerValue.TIMESTAMP,
          mensagem: conteudoMensagem,
          uid: autor,
        });
        break;
      case 'image':
        mensagemId.set({
          tipoMensagem,
          data: firebase.database.ServerValue.TIMESTAMP,
          imgSrc: conteudoMensagem,
          uid: autor,
        });
        break;
      case 'audio':
        mensagemId.set({
          tipoMensagem,
          data: firebase.database.ServerValue.TIMESTAMP,
          audioSrc: conteudoMensagem,
          uid: autor,
        });
        break;
    }

    dispatch({
      type: 'limparMensagem',
      payload: {
        mensagem: '',
      },
    });
  };
};

export const getPrestadores = () => {
  return dispatch => {
    let usuarioId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref('usuarios')
      .orderByChild('nome')
      .on('value', snapshot => {
        let prestadores = [];
        snapshot.forEach(childItem => {
          if (
            childItem.val().type == 'User/Provider' &&
            usuarioId != childItem.key
          ) {
            prestadores.push({
              key: childItem.key,
              nome: childItem.val().nome,
              nomeProfissao: childItem.val().nomeProfissao,
            });
          }
        });

        if (prestadores.length == 0) {
          prestadores.push({
            key: '0',
            nome: 'Não há registros de mais prestadores no momento',
          });
        }

        dispatch({
          type: 'setPrestadores',
          payload: {
            prestadores,
          },
        });
      });
  };
};

export const getListaConversas = (usuarioId, callback) => {
  return dispatch => {
    firebase
      .database()
      .ref('usuarios')
      .child(usuarioId)
      .child('nomeProfissao')
      .on('value', snapshot => {
        let conversas = [];
        firebase
          .database()
          .ref('usuarios')
          .child(usuarioId)
          .child('conversas')
          .on('value', snapshot => {
            snapshot.forEach(childItem => {
              conversas.push({
                key: childItem.key,
                nome: childItem.val().nome,
                nomeProfissao: childItem.val().nomeProfissao,
                outroUsuario: childItem.val().outroUsuario,
              });
            });
          });

        callback();

        dispatch({
          type: 'setListaConversas',
          payload: {
            conversas,
          },
        });
      });
  };
};

export const monitoraConversa = conversaAtiva => {
  return dispatch => {
    firebase
      .database()
      .ref('conversas')
      .child(conversaAtiva)
      .child('mensagens')
      .orderByChild('data')
      .on('value', snapshot => {
        let mensagensConversasAtivas = [];

        snapshot.forEach(childItem => {
          switch (childItem.val().tipoMensagem) {
            case 'text':
              mensagensConversasAtivas.push({
                key: childItem.key,
                data: childItem.val().data,
                tipoMensagem: childItem.val().tipoMensagem,
                mensagem: childItem.val().mensagem,
                uid: childItem.val().uid,
              });
              break;
            case 'image':
              mensagensConversasAtivas.push({
                key: childItem.key,
                data: childItem.val().data,
                tipoMensagem: childItem.val().tipoMensagem,
                imgSrc: childItem.val().imgSrc,
                uid: childItem.val().uid,
              });
              break;
            case 'audio':
              mensagensConversasAtivas.push({
                key: childItem.key,
                data: childItem.val().data,
                tipoMensagem: childItem.val().tipoMensagem,
                audioSrc: childItem.val().audioSrc,
                uid: childItem.val().uid,
              });
              break;
          }
        });

        dispatch({
          type: 'setAtivarMensagemConversa',
          payload: {
            mensagensConversasAtivas,
          },
        });
      });
  };
};
export const monitoraConversaOff = conversaAtiva => {
  return dispatch => {
    firebase
      .database()
      .ref('conversas')
      .child(conversaAtiva)
      .child('mensagens')
      .off();
  };
};
