import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

import {Avatar} from 'react-native-elements';

export class UserSignUp extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewPersonalInfo}>
          <Text style={styles.txtPersonalInfo}>Informações Pessoais</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  viewPersonalInfo: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPersonalInfo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStatetoProps = state => {
  return {};
};

const UserSignUpConnect = connect(
  mapStatetoProps,
  {},
)(UserSignUp);

export default UserSignUpConnect;
