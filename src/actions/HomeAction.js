import {verifyUserData} from '../APIS/iServiceAPI';

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
