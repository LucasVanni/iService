import {combineReducers} from 'redux';

import AuthReducer from './reducers/AuthReducer';
import ChatReducer from './reducers/ChatReducer';
import HomeReducer from './reducers/HomeReducer';

const Reducers = combineReducers({
  auth: AuthReducer,
  chat: ChatReducer,
  home: HomeReducer,
});

export default Reducers;
