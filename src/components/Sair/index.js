import React, {Component} from 'react';
import {View} from 'react-native';

import {NavigationActions, StackActions} from 'react-navigation';

import {connect} from 'react-redux';
import {SignOut} from '../../actions/AuthActions';

export class Sair extends Component {
  constructor(props) {
    super(props);

    logout(this);
  }

  render() {
    return <View />;
  }
}

const logout = objeto => {
  objeto.props.SignOut();

  objeto.props.navigation.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    }),
  );

  window.globalNavigator.navigate('Principal');
};

const SairConnect = connect(
  null,
  {SignOut},
)(Sair);

export default SairConnect;
