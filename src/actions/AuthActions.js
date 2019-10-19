import {
  verifyLogin,
  makeLogin,
  makeSendEmail,
  makeProviderSignUp,
  makeUserSignUp,
  makeSignOut,
} from '../APIS/iServiceAPI';
import firebase from '../APIS/FireApi';

const nomeCompleto = /^[a-zA-Z]+ +[a-zA-Z]+$/;
const nomeCompleto2 = /^[a-zA-Z]+ +[a-zA-Z]+ +[a-zA-Z]+$/;
const nomeCompleto3 = /^[a-zA-Z]+ +[a-zA-Z]+ +[a-zA-Z]+ +[a-zA-Z]+$/;
const nomeCompleto4 = /^[a-zA-Z]+ +[a-zA-Z]+ +[a-zA-Z]+ +[a-zA-Z]+ +[a-zA-Z]+$/;

const re = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;

export const checkLogin = () => {
  return dispatch => {
    verifyLogin()
      .then(resolveProps => {
        dispatch({
          type: 'changeStatus',
          payload: {
            status: resolveProps,
          },
        });
      })
      .catch(rejectProps => {
        dispatch({
          type: 'changeStatus',
          payload: {
            status: rejectProps,
          },
        });
      });
  };
};

export const setEmailField = email => {
  return {
    type: 'setEmailField',
    payload: {
      email,
    },
  };
};

export const setPasswordField = pass => {
  return {
    type: 'setPasswordField',
    payload: {
      pass,
    },
  };
};

export const setPasswordConfirmField = passConfirm => {
  return {
    type: 'setPasswordConfirmField',
    payload: {
      passConfirm,
    },
  };
};

export const setUriAvatar = uri => {
  return {
    type: 'setUriAvatar',
    payload: {
      uri,
    },
  };
};

export const setNameField = name => {
  return {
    type: 'setNameField',
    payload: {
      name,
    },
  };
};

export const doSendEmail = objeto => {
  objeto.setState({loading: true});
  return dispatch => {
    makeSendEmail(objeto.props.email, () => {
      objeto.setState({loading: false});
    })
      .then(resolveProps => {
        dispatch({
          type: 'changeStatus',
          payload: {
            status: resolveProps.status,
          },
        });
      })
      .catch(rejectProps => {
        switch (rejectProps.error.code) {
          case 'auth/user-not-found':
            objeto.props.setErrorForgotPass('Usuário não encontrado');
            objeto.props.setEmailBorderColorForgot('#f00');
            break;
          default:
            alert(rejectProps.error.code);
            break;
        }

        dispatch({
          type: 'changeStatus',
          payload: {
            status: rejectProps.status,
          },
        });
      });
  };
};

export const getListaProfissoes = () => {
  return dispatch => {
    firebase
      .database()
      .ref('profissoes')
      .orderByChild('nomeProfissao')
      .on('value', snapshot => {
        let listaProfissoes = [
          {key: '0', nomeProfissao: 'Escolha uma profissão'},
        ];

        snapshot.forEach(chieldItem => {
          listaProfissoes.push({
            key: chieldItem.key,
            nomeProfissao: chieldItem.val().nomeProfissao,
          });
        });

        dispatch({
          type: 'setListaProfissoes',
          payload: {
            listaProfissoes,
          },
        });
      });
  };
};

export const setErrorForgotPass = errorForgotPass => {
  return {
    type: 'setErrorForgotPass',
    payload: {
      errorForgotPass,
    },
  };
};

export const setEmailBorderColorForgot = emailBorderColorForgot => {
  return {
    type: 'setEmailBorderColorForgot',
    payload: {
      emailBorderColorForgot,
    },
  };
};

export const setErrorPicker = errorPicker => {
  return {
    type: 'setErrorPicker',
    payload: {
      errorPicker,
    },
  };
};

export const setPickerBorderColor = pickerBorderColor => {
  return {
    type: 'setPickerBorderColor',
    payload: {
      pickerBorderColor,
    },
  };
};

export const editProfessionChoose = professionChoose => {
  return {
    type: 'editProfessionChoose',
    payload: {
      professionChoose,
    },
  };
};

export const botaoAdicionarProfissao = (objeto, textoProfissao) => {
  return dispatch => {
    let noProfissoes = firebase.database().ref('profissoes');

    let cadastro = true;

    noProfissoes.on('value', snapshot => {
      if (snapshot.hasChildren()) {
        Object.keys(snapshot.val()).forEach(key => {
          if (
            textoProfissao == snapshot.child(key).val().nomeProfissao ||
            textoProfissao == undefined
          ) {
            cadastro = false;
          } else if (
            textoProfissao == 'Ator Pornô' ||
            textoProfissao == 'Ator pornô'
          ) {
            alert('Profissão inválida');
            cadastro = false;
          } else {
            cadastro = true;
          }
        });
      } else {
        cadastro = true;
      }
    });

    if (cadastro == true) {
      firebase
        .database()
        .ref('profissoes')
        .push({
          nomeProfissao: textoProfissao,
        });
      objeto.setState({isVisible: false});
    } else {
      alert('Profissão já cadastrada');
    }
  };
};

export const editTextAdicionarProfissao = textoProfissao => {
  return {
    type: 'editTextAdicionarProfissao',
    payload: {
      textoProfissao,
    },
  };
};

export const setErrorPass = errorPass => {
  return {
    type: 'setErrorPass',
    payload: {
      errorPass,
    },
  };
};

export const setPassBorderColor = passBorderColor => {
  return {
    type: 'setPassBorderColor',
    payload: {
      passBorderColor,
    },
  };
};

export const setPassBorderColorLogin = passBorderColorLogin => {
  return {
    type: 'setPassBorderColorLogin',
    payload: {
      passBorderColorLogin,
    },
  };
};

export const setErrorPassConfirm = errorPassConfirm => {
  return {
    type: 'setErrorPassConfirm',
    payload: {
      errorPassConfirm,
    },
  };
};

export const setPassConfirmBorderColor = passConfirmBorderColor => {
  return {
    type: 'setPassConfirmBorderColor',
    payload: {
      passConfirmBorderColor,
    },
  };
};

export const setErrorName = errorName => {
  return {
    type: 'setErrorName',
    payload: {
      errorName,
    },
  };
};

export const setNameBorderColor = nameBorderColor => {
  return {
    type: 'setNameBorderColor',
    payload: {
      nameBorderColor,
    },
  };
};

export const setErrorAvatar = messageAvatarError => {
  return {
    type: 'setErrorAvatar',
    payload: {
      messageAvatarError,
    },
  };
};

export const setCorErrorAvatar = avatarBorderColor => {
  return {
    type: 'setCorErrorAvatar',
    payload: {
      avatarBorderColor,
    },
  };
};

export const setErrorEmail = errorEmail => {
  return {
    type: 'setErrorEmail',
    payload: {
      errorEmail,
    },
  };
};

export const setEmailBorderColor = emailBorderColor => {
  return {
    type: 'setEmailBorderColor',
    payload: {
      emailBorderColor,
    },
  };
};

export const setEmailBorderColorLogin = emailBorderColorLogin => {
  return {
    type: 'setEmailBorderColorLogin',
    payload: {
      emailBorderColorLogin,
    },
  };
};

export const setErrorGeralLogin = errorGeralLogin => {
  return {
    type: 'setErrorGeralLogin',
    payload: {
      errorGeralLogin,
    },
  };
};

export const setErrorGeral = errorGeral => {
  return {
    type: 'setErrorGeral',
    payload: {
      errorGeral,
    },
  };
};

export const providerSignUp = (objeto, callback) => {
  return dispatch => {
    let cadastro = true;

    if (objeto.props.pass != objeto.props.passConfirm) {
      objeto.props.setPassBorderColor('#f00');
      objeto.props.setErrorPass('As senhas não batem.');
      objeto.props.setPassConfirmBorderColor('#f00');
      objeto.props.setErrorPassConfirm('As senhas não batem.');
      cadastro = false;
    }

    if (objeto.props.name == '') {
      objeto.props.setErrorName('Campo nome completo obrigatório');
      objeto.props.setNameBorderColor('#f00');
      cadastro = false;
    }

    if (objeto.props.avatar == null) {
      objeto.props.setErrorAvatar('A inserção de um avatar é obrigatório');
      objeto.props.setCorErrorAvatar('#f00');
      cadastro = false;
    }

    if (objeto.props.email == '') {
      objeto.props.setEmailBorderColor('#f00');
      objeto.props.setErrorEmail('Campo e-mail obrigatório');
      cadastro = false;
    } else {
      if (re.test(objeto.props.email)) {
        objeto.props.setEmailBorderColor('#fff');
        objeto.props.setErrorEmail(null);
      } else {
        objeto.props.setEmailBorderColor('#f00');
        objeto.props.setErrorEmail('Verifique se o campo está correto');
        cadastro = false;
      }
    }

    if (objeto.props.pass == '') {
      objeto.props.setPassBorderColor('#f00');
      objeto.props.setErrorPass('Campo senha obrigatório');
      cadastro = false;
    }
    if (objeto.props.passConfirm == '') {
      objeto.props.setPassConfirmBorderColor('#f00', 4);
      objeto.props.setErrorPassConfirm('Campo confirmar senha obrigatório');
      cadastro = false;
    }
    if (
      objeto.props.professionChoose.key == 0 ||
      objeto.props.professionChoose.key == undefined
    ) {
      objeto.props.setPickerBorderColor('#f00');
      objeto.props.setErrorPicker('Selecione uma profissão');
      cadastro = false;
    } else {
      objeto.props.setPickerBorderColor('#fff');
      objeto.props.setErrorPicker(null);
    }

    if (objeto.props.name) {
      if (
        nomeCompleto.test(objeto.props.name) ||
        nomeCompleto2.test(objeto.props.name) ||
        nomeCompleto3.test(objeto.props.name) ||
        nomeCompleto4.test(objeto.props.name)
      ) {
        objeto.props.setNameBorderColor('#fff');
        objeto.props.setErrorName(null);
      } else {
        if (objeto.props.name == '') {
          objeto.props.setNameBorderColor('#fff');
          objeto.props.setErrorName(null);
        } else {
          objeto.props.setNameBorderColor('#f00');
          objeto.props.setErrorName('Digite seu nome completo');
          cadastro = false;
        }
      }
    }
    if (cadastro === false) {
      callback();
    }
    if (cadastro === true) {
      makeProviderSignUp(objeto)
        .then(resolveProps => {
          callback();

          dispatch({
            type: 'changeStatus',
            payload: {
              status: resolveProps.status,
            },
          });
        })
        .catch(rejectProps => {
          switch (rejectProps.error.code) {
            case 'auth/email-already-in-use':
              objeto.props.setEmailBorderColor('#f00');
              objeto.props.setErrorGeral('E-mail já utilizado!');
              break;
            case 'auth/invalid-email':
              objeto.props.setEmailBorderColor('#f00');
              objeto.props.setErrorGeral('E-mail inválido!');
              break;
            case 'auth/operation-not-allowed':
              objeto.props.setErrorGeral('Tente novamente mais tarde!');
              break;
            case 'auth/weak-password':
              objeto.props.setPassBorderColor('#f00');
              objeto.props.setErrorGeral('A senha deve ter mais que 6 digitos');
              break;
            default:
              objeto.props.setErrorGeral(rejectProps.error.message);
              break;
          }

          callback();

          dispatch({
            type: 'changeStatus',
            payload: {
              status: rejectProps.status,
            },
          });
        });
    }
  };
};

export const userSignUp = (objeto, callback) => {
  return dispatch => {
    let cadastro = true;

    if (objeto.props.pass != objeto.props.passConfirm) {
      objeto.props.setPassBorderColor('#f00');
      objeto.props.setErrorPass('As senhas não batem.');
      objeto.props.setPassConfirmBorderColor('#f00');
      objeto.props.setErrorPassConfirm('As senhas não batem.');
      cadastro = false;
    }

    if (objeto.props.name == '') {
      objeto.props.setErrorName('Campo nome completo obrigatório');
      objeto.props.setNameBorderColor('#f00');
      cadastro = false;
    }

    if (objeto.props.avatar == null) {
      objeto.props.setErrorAvatar('A inserção de um avatar é obrigatório');
      objeto.props.setCorErrorAvatar('#f00');
      cadastro = false;
    }

    if (objeto.props.email == '') {
      objeto.props.setEmailBorderColor('#f00');
      objeto.props.setErrorEmail('Campo e-mail obrigatório');
      cadastro = false;
    } else {
      if (re.test(objeto.props.email)) {
        objeto.props.setEmailBorderColor('#fff');
        objeto.props.setErrorEmail(null);
      } else {
        objeto.props.setEmailBorderColor('#f00');
        objeto.props.setErrorEmail('Verifique se o campo está correto');
        cadastro = false;
      }
    }

    if (objeto.props.pass == '') {
      objeto.props.setPassBorderColor('#f00');
      objeto.props.setErrorPass('Campo senha obrigatório');
      cadastro = false;
    }
    if (objeto.props.passConfirm == '') {
      objeto.props.setPassConfirmBorderColor('#f00', 4);
      objeto.props.setErrorPassConfirm('Campo confirmar senha obrigatório');
      cadastro = false;
    }

    if (objeto.props.name) {
      if (
        nomeCompleto.test(objeto.props.name) ||
        nomeCompleto2.test(objeto.props.name) ||
        nomeCompleto3.test(objeto.props.name) ||
        nomeCompleto4.test(objeto.props.name)
      ) {
        objeto.props.setNameBorderColor('#fff');
        objeto.props.setErrorName(null);
      } else {
        if (objeto.props.name == '') {
          objeto.props.setNameBorderColor('#fff');
          objeto.props.setErrorName(null);
        } else {
          objeto.props.setNameBorderColor('#f00');
          objeto.props.setErrorName('Digite seu nome completo');
          cadastro = false;
        }
      }
    }
    if (cadastro === false) {
      callback();
    }
    if (cadastro === true) {
      makeUserSignUp(objeto, callback)
        .then(resolveProps => {
          callback();
          dispatch({
            type: 'changeStatus',
            payload: {
              status: resolveProps.status,
            },
          });
        })
        .catch(rejectProps => {
          switch (rejectProps.error.code) {
            case 'auth/email-already-in-use':
              objeto.props.setEmailBorderColor('#f00');
              objeto.props.setErrorGeral('E-mail já utilizado!');
              break;
            case 'auth/invalid-email':
              objeto.props.setEmailBorderColor('#f00');
              objeto.props.setErrorGeral('E-mail inválido!');
              break;
            case 'auth/operation-not-allowed':
              objeto.props.setErrorGeral('Tente novamente mais tarde!');
              break;
            case 'auth/weak-password':
              objeto.props.setPassBorderColor('#f00');
              objeto.props.setErrorGeral('A senha deve ter mais que 6 digitos');
              break;
            default:
              objeto.props.setErrorGeral(rejectProps.error.message);
              break;
          }

          callback();

          dispatch({
            type: 'changeStatus',
            payload: {
              status: rejectProps.status,
            },
          });
        });
    }
  };
};

export const SignOut = () => {
  return dispatch => {
    makeSignOut()
      .then(status => {
        dispatch({
          type: 'changeStatus',
          payload: {
            status,
          },
        });
      })
      .catch(status => {
        dispatch({
          type: 'changeStatus',
          payload: {
            status,
          },
        });
      });
  };
};

export const doLogin = (objeto, callback) => {
  return dispatch => {
    makeLogin(objeto)
      .then(resolveProps => {
        dispatch({
          type: 'changeStatus',
          payload: {
            status: resolveProps.status,
          },
        });
        callback();
      })
      .catch(rejectProps => {
        console.log(rejectProps);
        switch (rejectProps.error.code) {
          case 'auth/user-disabled':
            objeto.props.setErrorGeralLogin('Seu usuário está desativado');
            objeto.props.setEmailBorderColorLogin('#f00');
            objeto.props.setPassBorderColorLogin('#f00');
            break;
          case 'auth/user-not-found':
            objeto.props.setErrorGeralLogin('Usuário não foi encontrado');
            objeto.props.setEmailBorderColorLogin('#f00');
            objeto.props.setPassBorderColorLogin('#f00');
            break;
          case 'auth/wrong-password':
            objeto.props.setErrorGeralLogin('E-mail e/ou senha incorretos!');
            objeto.props.setEmailBorderColorLogin('#f00');
            objeto.props.setPassBorderColorLogin('#f00');
            break;
          default:
            objeto.props.setErrorGeralLogin(rejectProps.error.message);
            objeto.props.setEmailBorderColorLogin('#f00');
            objeto.props.setPassBorderColorLogin('#f00');
            break;
        }

        dispatch({
          type: 'changeStatus',
          payload: {
            status: rejectProps.status,
          },
        });
        callback();
      });
  };
};
