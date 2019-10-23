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

import {
  setEmailField,
  doSendEmail,
  setErrorForgotPass,
  setEmailBorderColorForgot,
} from '../actions/AuthActions';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import CamposLogin from '../components/CamposLogin/';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

import LoadingItem from '../components/LoadingItem';

export class ForgotPassword extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    function sendEmailAction(objeto) {
      if (objeto.props.emailValid == true) {
        objeto.props.doSendEmail(objeto);
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
              borderBottomColor={this.props.emailBorderColorForgot}
              color={'#fff'}
              secureTextEntry={false}
              value={this.props.email}
              validState={this.props.emailValid}
              actions={this.props.setEmailField}
            />

            {this.props.errorForgotPass == null ? null : (
              <View style={styles.viewError}>
                <Text style={styles.error}>{this.props.errorForgotPass}</Text>
              </View>
            )}

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

            <LoadingItem visible={this.state.loading} />
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

    errorForgotPass: state.auth.errorForgotPass,

    email: state.auth.email,
    emailBorderColorForgot: state.auth.emailBorderColorForgot,
    emailValid: state.auth.emailValid,
  };
};

const ForgotPasswordConnect = connect(
  mapStateToProps,
  {
    doSendEmail,
    setEmailField,
    setErrorForgotPass,
    setEmailBorderColorForgot,
  },
)(ForgotPassword);

export default ForgotPasswordConnect;
