const initialState = {
  profileUrlImage: null,
  name: null,
  profileImages: null,
  render: false,
};

const HomeReducer = (state = initialState, action) => {
  if (action.type === 'setUserData') {
    return {
      ...state,
      profileUrlImage: action.payload.profileUrlImage,
      name: action.payload.name,
    };
  }

  if (action.type === 'setProfileImages') {
    return {...state, profileImages: action.payload.profileImages};
  }

  if (action.type === 'setRender') {
    return {...state, render: action.payload.render};
  }

  return state;
};

export default HomeReducer;
