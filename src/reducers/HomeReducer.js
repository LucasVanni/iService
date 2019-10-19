const initialState = {
  profileUrlImage: null,
};

const HomeReducer = (state = initialState, action) => {
  if (action.type == 'setUrlProfileImage') {
    return {...state, profileUrlImage: action.payload.profileUrlImage};
  }

  return state;
};

export default HomeReducer;
