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

import {setEmailField, doSendEmail} from '../actions/AuthActions';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import CamposLogin from '../components/CamposLogin/';

import Logo from '../components/Logo/';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

export class ForgotPassword extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    function sendEmailAction(objeto) {
      if (objeto.props.emailValid == true) {
        objeto.props.doSendEmail(objeto.props.email, objeto);
      }

      return null;
    }

    let SignInButtonOpacity = 0.2;

    if (this.props.emailValid == true) {
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
              <Text style={styles.textHeader}>Recuperar Senha</Text>
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

            <TouchableHighlight
              style={[{opacity: SignInButtonOpacity}, styles.signInButton]}
              underlayColor={null}>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={60}
                style={styles.signInButtonIcon}
                onPress={() => sendEmailAction(this)}
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
    color: '#fff',
  },
  forgotPasswortText: {
    fontSize: 18,
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
  };
};

const ForgotPasswordConnect = connect(
  mapStateToProps,
  {
    doSendEmail,
    setEmailField,
  },
)(ForgotPassword);

export default ForgotPasswordConnect;
