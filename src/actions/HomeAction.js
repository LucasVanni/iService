import {verifyUserImageUrl} from '../APIS/iServiceAPI';

export const getUrlProfileImage = () => {
  return dispatch => {
    verifyUserImageUrl()
      .then(resolveProps => {
        dispatch({
          type: 'setUrlProfileImage',
          payload: {
            profileUrlImage: resolveProps,
          },
        });
      })
      .catch(rejectProps => {
        dispatch({
          type: 'setUrlProfileImage',
          payload: {
            profileUrlImage: rejectProps,
          },
        });
      });
  };
};
