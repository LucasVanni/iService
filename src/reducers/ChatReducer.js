const initialState = {
  conversas: [],
  chatAtivo: '',
  tituloChatAtivo: '',
  mensagem: '',
  mensagensConversasAtivas: [],
  recording: false,
  prestadores: [],
};

const ChatReducer = (state = initialState, action) => {
  if (action.type === 'setActiveChat') {
    let tituloChat = '';

    for (var i in state.conversas) {
      if (state.conversas[i].key === action.payload.conversaId) {
        tituloChat = state.conversas[i].nome;
      }
    }

    return {
      ...state,
      tituloChatAtivo: tituloChat,
      chatAtivo: action.payload.conversaId,
    };
  }
  if (action.type === 'setListaConversas') {
    return {...state, conversas: action.payload.conversas};
  }

  if (action.type === 'setInputMessage') {
    return {...state, mensagem: action.payload.mensagem};
  }

  if (action.type === 'limparMensagem') {
    return {...state, mensagem: action.payload.mensagem};
  }

  if (action.type === 'setPrestadores') {
    return {
      ...state,
      prestadores: action.payload.prestadores,
    };
  }

  if (action.type === 'setAtivarMensagemConversa') {
    return {
      ...state,
      mensagensConversasAtivas: action.payload.mensagensConversasAtivas,
    };
  }

  return state;
};

export default ChatReducer;
