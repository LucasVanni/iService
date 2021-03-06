import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {checkLogin} from '../actions/AuthActions';
import {StackActions, NavigationActions} from 'react-navigation';

import Logo from '../components/Logo/index.js';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

class Preload extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.props.checkLogin();

    window.globalNavigator = this.props.navigation;

    this.verifyStatus = this.verifyStatus.bind(this);
  }

  componentDidMount() {
    // Faz verificação e modifica o status
    this.verifyStatus();
  }

  componentDidUpdate() {
    this.verifyStatus();
  }

  verifyStatus() {
    // Faz verificação do status e envia até a tela que o status dizer.

    switch (this.props.status) {
      case 1:
        //Manda o user para a tela home
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeDrawer'})],
          }),
        );
        break;
      case 2:
        //Manda o usuário para o Login

        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})],
          }),
        );

        break;
    }
  }

  render() {
    return (
      <>
        <AnimatedLinearGradient
          customColors={['#15bddb', '#1f33c9']}
          points={{start: {x: 0.3, y: 0.3}, end: {x: 0.7, y: 0.7}}}
          speed={2000}>
          <View style={styles.view}>
            <StatusBar backgroundColor="#1f33c9" barStyle="light-content" />
            <Logo />
          </View>
        </AnimatedLinearGradient>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {flex: 1},
});

const mapStateToProps = state => {
  return {status: state.auth.status, uid: state.auth.uid};
};

const PreloadConnect = connect(
  mapStateToProps,
  {
    checkLogin,
  },
)(Preload);

export default PreloadConnect;
