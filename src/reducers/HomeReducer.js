const initialState = {
  profileUrlImage: null,
  name: null,
};

const HomeReducer = (state = initialState, action) => {
  if (action.type == 'setUserData') {
    return {
      ...state,
      profileUrlImage: action.payload.profileUrlImage,
      name: action.payload.name,
    };
  }

  return state;
};

export default HomeReducer;
