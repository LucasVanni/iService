import {verifyUserData, setUid} from '../APIS/iServiceAPI';

export const getUserData = () => {
  return dispatch => {
    verifyUserData()
      .then(resolveProps => {
        dispatch({
          type: 'setUserData',
          payload: {
            profileUrlImage: resolveProps.profileImage,
            name: resolveProps.name,
          },
        });
      })
      .catch(rejectProps => {
        dispatch({
          type: 'setUserData',
          payload: {
            profileUrlImage: rejectProps,
            name: rejectProps,
          },
        });
      });
  };
};

export const getUid = () => {
  return dispatch => {
    setUid()
      .then(resolveProps => {
        dispatch({
          type: 'setUdi',
          payload: {
            userUid: resolveProps,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: 'setUid',
          payload: {
            userUid: null,
          },
        });
      });
  };
};

export const getPrestadores = usuarioId => {
  return dispatch => {
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

export const getUrlImage = () => {
  return dispatch => {
    firebase
      .database()
      .ref('usuarios')
      .on('value', snapshot => {
        let profileImages = [];
        snapshot.forEach(childItem => {
          profileImages.push({
            key: childItem.key,
            url: `${childItem.val().profileImage}`,
          });
        });

        dispatch({
          type: 'setProfileImages',
          payload: {
            profileImages,
          },
        });
      });
  };
};
