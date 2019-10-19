import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './Reducers';

import Preload from './screens/Preload';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp';

// Criando as rotas iniciais de navegação

const AppNavigator = createStackNavigator({
  Preload,
  Login,
  ForgotPassword,
  SignUp,
});

// Criando o AppContainer
const AppContainer = createAppContainer(AppNavigator);

// Criando a store (Reducers e o thunk)

const store = createStore(Reducers, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
