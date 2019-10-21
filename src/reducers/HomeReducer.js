const initialState = {
  profileUrlImage: null,
  name: null,
  profileImages: null,
  userUid: null,
};

const HomeReducer = (state = initialState, action) => {
  if (action.type == 'setUserData') {
    return {
      ...state,
      profileUrlImage: action.payload.profileUrlImage,
      name: action.payload.name,
    };
  }

  if (action.type == 'setProfileImages') {
    return {...state, profileImages: action.payload.profileImages};
  }

  if (action.type == 'setUdi') {
    return {...state, userUid: action.payload.userUid};
  }

  return state;
};

export default HomeReducer;
