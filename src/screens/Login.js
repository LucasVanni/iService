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

import {setEmailField, setPasswordField} from '../actions/AuthActions';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import CamposLogin from '../components/CamposLogin/';

import Logo from '../components/Logo/';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

export class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
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
              borderBottomColor={this.props.emailBorderColor}
              color={'#fff'}
              secureTextEntry={false}
              value={this.props.email}
              validState={this.props.emailValid}
              actions={this.props.setEmailField}
            />
            <CamposLogin
              nomeCampo={'SENHA'}
              borderBottomColor={this.props.passBorderColor}
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
                onPress={() => {}}
              />
            </TouchableHighlight>
          </KeyboardAvoidingView>
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
});

const mapStateToProps = state => {
  return {
    status: state.auth.status,
    email: state.auth.email,
    emailBorderColor: state.auth.emailBorderColor,
    emailValid: state.auth.emailValid,
    pass: state.auth.pass,
    passBorderColor: state.auth.passBorderColor,
    passValid: state.auth.passValid,
  };
};

const LoginConnect = connect(
  mapStateToProps,
  {
    setEmailField,
    setPasswordField,
  },
)(Login);

export default LoginConnect;
