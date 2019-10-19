const initialState = {
  status: 0, // 0 -> Não verificado, 1 -> Logado, 2 -> Não logado.

  errorGeral: null,

  emailBorderColorForgot: '#fff',
  errorForgotPass: null,

  emailBorderColorLogin: '#fff',
  passBorderColorLogin: '#fff',
  errorGeralLogin: null,

  name: '',
  nameBorderColor: '#fff',
  errorName: null,

  email: '',
  emailBorderColor: '#fff',
  emailValid: false,
  errorEmail: null,

  pass: '',
  passBorderColor: '#fff',
  passValid: false,
  errorPass: null,

  passConfirm: '',
  passConfirmBorderColor: '#fff',
  passConfirmValid: false,
  errorPassConfirm: null,

  avatar: null,
  avatarBorderColor: '#fff',
  messageAvatarError: null,

  listaProfissoes: [{key: '0', nomeProfissao: 'Carregando...'}],
  professionChoose: 0,
  pickerBorderColor: '#fff',
  errorPicker: null,
};

const AuthReducer = (state = initialState, action) => {
  if (action.type == 'changeStatus') {
    return {...state, status: action.payload.status};
  }

  if (action.type == 'setEmailField') {
    let re = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;

    if (re.test(action.payload.email.toLowerCase())) {
      state.emailValid = true;
    } else {
      state.emailValid = false;
    }

    state.errorEmail = null;
    state.emailBorderColor = '#fff';
    state.errorGeral = null;

    //Aplicado apenas na tela de login
    state.errorGeralLogin = null;
    state.emailBorderColorLogin = '#fff';
    state.passBorderColorLogin = '#fff';

    //Aplicado somente na tela Recuperar Senha
    state.emailBorderColorForgot = '#fff';
    state.errorForgotPass = null;

    return {...state, email: action.payload.email};
  }

  if (action.type == 'setPasswordField') {
    if (action.payload.pass.length < 6) {
      state.passValid = false;
      //state.passBorderColor = '#f00';

      if (action.payload.pass == '') {
        state.passValid = false;
        state.passBorderColor = '#fff';
      }
    } else {
      state.passValid = true;
      state.passBorderColor = '#fff';
    }

    state.passBorderColor = '#fff';
    state.errorPass = null;
    state.passConfirmBorderColor = '#fff';
    state.errorPassConfirm = null;
    state.errorGeral = null;

    //Aplicado apenas na tela de login
    state.errorGeralLogin = null;
    state.emailBorderColorLogin = '#fff';
    state.passBorderColorLogin = '#fff';

    return {...state, pass: action.payload.pass};
  }

  if (action.type == 'setPasswordConfirmField') {
    if (action.payload.passConfirm.length < 6) {
      state.passConfirmValid = false;
      //state.passBorderColor = '#f00';

      if (action.payload.passConfirm == '') {
        state.passConfirmValid = false;
        state.passConfirmBorderColor = '#fff';
      }
    } else {
      state.passConfirmValid = true;
      state.passConfirmBorderColor = '#fff';
    }

    state.passBorderColor = '#fff';
    state.errorPass = null;
    state.passConfirmBorderColor = '#fff';
    state.errorPassConfirm = null;

    return {...state, passConfirm: action.payload.passConfirm};
  }

  if (action.type == 'setUriAvatar') {
    // Em teste
    state.avatarBorderColor = '#fff';
    state.messageAvatarError = null;

    return {...state, avatar: action.payload.uri};
  }

  if (action.type == 'setErrorAvatar') {
    return {...state, messageAvatarError: action.payload.messageAvatarError};
  }

  if (action.type == 'setCorErrorAvatar') {
    return {...state, avatarBorderColor: action.payload.avatarBorderColor};
  }

  if (action.type == 'setNameField') {
    // Incompleto
    state.nameBorderColor = '#fff';
    state.errorName = null;

    return {...state, name: action.payload.name};
  }

  if (action.type == 'setErroName') {
    return {...state, errorName: action.payload.errorName};
  }

  if (action.type == 'setListaProfissoes') {
    return {...state, listaProfissoes: action.payload.listaProfissoes};
  }

  if (action.type === 'editProfessionChoose') {
    return {
      ...state,
      professionChoose: action.payload.professionChoose,
    };
  }

  if (action.type == 'setErrorPicker') {
    return {...state, errorPicker: action.payload.errorPicker};
  }

  if (action.type == 'setPickerBorderColor') {
    return {
      ...state,
      pickerBorderColor: action.payload.pickerBorderColor,
    };
  }

  if (action.type === 'editTextAdicionarProfissao') {
    return {
      ...state,
      textoProfissao: action.payload.textoProfissao,
    };
  }

  if (action.type === 'setNameBorderColor') {
    return {...state, nameBorderColor: action.payload.nameBorderColor};
  }

  if (action.type === 'setErrorName') {
    return {...state, errorName: action.payload.errorName};
  }

  if (action.type === 'setEmailBorderColor') {
    return {...state, emailBorderColor: action.payload.emailBorderColor};
  }

  if (action.type === 'setErrorEmail') {
    return {...state, errorEmail: action.payload.errorEmail};
  }

  if (action.type === 'setEmailBorderColorLogin') {
    return {
      ...state,
      emailBorderColorLogin: action.payload.emailBorderColorLogin,
    };
  }

  if (action.type === 'setPassBorderColor') {
    return {
      ...state,
      passBorderColor: action.payload.passBorderColor,
    };
  }

  if (action.type === 'setPassBorderColorLogin') {
    return {
      ...state,
      passBorderColorLogin: action.payload.passBorderColorLogin,
    };
  }

  if (action.type === 'setErrorPass') {
    return {
      ...state,
      errorPass: action.payload.errorPass,
    };
  }

  if (action.type === 'setPassConfirmBorderColor') {
    return {
      ...state,
      passConfirmBorderColor: action.payload.passConfirmBorderColor,
    };
  }

  if (action.type === 'setErrorPassConfirm') {
    return {
      ...state,
      errorPassConfirm: action.payload.errorPassConfirm,
    };
  }

  if (action.type === 'setErrorGeralLogin') {
    return {
      ...state,
      errorGeralLogin: action.payload.errorGeralLogin,
    };
  }

  if (action.type === 'setErrorGeral') {
    return {
      ...state,
      errorGeral: action.payload.errorGeral,
    };
  }

  if (action.type === 'setErrorForgotPass') {
    return {
      ...state,
      errorForgotPass: action.payload.errorForgotPass,
    };
  }

  if (action.type === 'setEmailBorderColorForgot') {
    return {
      ...state,
      emailBorderColorForgot: action.payload.emailBorderColorForgot,
    };
  }

  return state;
};

export default AuthReducer;
