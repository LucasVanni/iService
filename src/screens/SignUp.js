import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import {connect} from 'react-redux';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import UserSignUp from '../components/UserSignUp';

import ProviderSignUp from '../components/ProviderSignUp';

import CheckBox from '../components/CheckBox';

export class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {checkedTomador: true, checkedPrestador: false};
  }

  render() {
    return (
      <AnimatedLinearGradient
        customColors={['#15bddb', '#1f33c9']}
        points={{start: {x: 0.5, y: 0}, end: {x: 0.5, y: 1}}}
        speed={1600}>
        <StatusBar backgroundColor="#1f33c9" barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Cadastrar-se</Text>
          </View>
          <CheckBox objeto={this} />

          <View style={styles.intersectionSignUp}>
            {this.state.checkedTomador === true &&
            this.state.checkedPrestador === false ? (
              <UserSignUp navigation={this.props.navigation} />
            ) : (
              <ProviderSignUp navigation={this.props.navigation} />
            )}
          </View>
        </View>
      </AnimatedLinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  imgHeader: {
    paddingLeft: 20,
  },
  intersectionSignUp: {
    flex: 4,
    borderTopColor: '#fff',
    borderTopWidth: 3,
  },
});

const mapStateToProps = state => {
  return {
    status: state.auth.status,
  };
};

const SignUpConnect = connect(mapStateToProps)(SignUp);

export default SignUpConnect;
