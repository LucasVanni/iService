import {combineReducers} from 'redux';

import AuthReducer from './reducers/AuthReducer';
import HomeReducer from './reducers/HomeReducer';

const Reducers = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
});

export default Reducers;
