import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {connect} from 'react-redux';

import {StackActions, NavigationActions} from 'react-navigation';

import {
  setEmailField,
  setEmailBorderColorLogin,
  setPasswordField,
  setPassBorderColorLogin,
  doLogin,
  setErrorGeralLogin,
} from '../actions/AuthActions';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import CamposLogin from '../components/CamposLogin/';

import Logo from '../components/Logo/';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

import LoadingItem from '../components/LoadingItem/';

export class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  UNSAFE_componentWillUpdate() {
    if (this.props.status == 1) {
      //Manda o user para a tela home
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'HomeDrawer'})],
        }),
      );
    }
  }

  render() {
    function loginAction(objeto) {
      if (objeto.props.emailValid == true && objeto.props.passValid == true) {
        return () => {
          objeto.setState({loading: true});
          objeto.props.doLogin(objeto, () => {
            objeto.setState({loading: false});
          });
        };
      }

      return null;
    }

    let SignInButtonOpacity = 0.2;

    if (this.props.emailValid == true && this.props.passValid == true) {
      SignInButtonOpacity = 1;
    }

    return (
      <AnimatedLinearGradient
        customColors={['#15bddb', '#1f33c9']}
        points={{start: {x: 0.5, y: 0}, end: {x: 0.5, y: 1}}}
        speed={1600}>
        <StatusBar backgroundColor="#1f33c9" barStyle="light-content" />
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={styles.KeyboardAvoidingViewContainer}>
            <View style={styles.header}>
              <View style={styles.viewTextHeader}>
                <Text style={styles.textHeader}>Login</Text>
              </View>
              <View style={styles.imgHeader}>
                <Logo />
              </View>
            </View>
            <CamposLogin
              nomeCampo={'E-MAIL'}
              borderBottomColor={this.props.emailBorderColorLogin}
              color={'#fff'}
              secureTextEntry={false}
              value={this.props.email}
              validState={this.props.emailValid}
              actions={this.props.setEmailField}
            />
            <CamposLogin
              nomeCampo={'SENHA'}
              borderBottomColor={this.props.passBorderColorLogin}
              color={'#fff'}
              secureTextEntry={true}
              value={this.props.pass}
              validState={this.props.passValid}
              actions={this.props.setPasswordField}
            />

            <View style={styles.footer}>
              <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}
                underlayColor={null}>
                <Text style={styles.signUpText}>Cadastrar-se</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('ForgotPassword');
                }}
                underlayColor={null}>
                <Text style={styles.forgotPasswortText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight
              style={[{opacity: SignInButtonOpacity}, styles.signInButton]}
              underlayColor={null}>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={60}
                style={styles.signInButtonIcon}
                onPress={loginAction(this)}
              />
            </TouchableHighlight>
            {this.props.errorGeralLogin == null ? null : (
              <View style={styles.viewError}>
                <Text style={styles.error}>{this.props.errorGeralLogin}</Text>
              </View>
            )}
          </KeyboardAvoidingView>
          <LoadingItem visible={this.state.loading} />
        </View>
      </AnimatedLinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  KeyboardAvoidingViewContainer: {
    flex: 1,
  },
  textHeader: {
    color: '#fff',
    fontSize: 30,
  },
  viewTextHeader: {
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  imgHeader: {
    paddingLeft: 20,
  },
  footer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },
  forgotPasswortText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },

  signInButtonIcon: {
    color: '#fff',
  },
  signInButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewError: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const mapStateToProps = state => {
  return {
    status: state.auth.status,

    errorGeralLogin: state.auth.errorGeralLogin,

    email: state.auth.email,
    emailBorderColorLogin: state.auth.emailBorderColorLogin,
    emailValid: state.auth.emailValid,

    pass: state.auth.pass,
    passBorderColorLogin: state.auth.passBorderColorLogin,
    passValid: state.auth.passValid,
  };
};

const LoginConnect = connect(
  mapStateToProps,
  {
    setEmailField,
    setEmailBorderColorLogin,
    setPasswordField,
    setPassBorderColorLogin,
    doLogin,
    setErrorGeralLogin,
  },
)(Login);

export default LoginConnect;
