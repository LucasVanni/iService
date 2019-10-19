import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

export default class CamposLogin extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      secure: this.props.secureTextEntry,
      hiddenImage: require('../../assets/images/passHidden.png'),
    };
  }

  render() {
    function hidden(objeto) {
      if (
        objeto.state.hiddenImage ==
        require('../../assets/images/passHidden.png')
      ) {
        objeto.setState({
          secure: false,
          hiddenImage: require('../../assets/images/passUnHidden.png'),
        });
      } else {
        objeto.setState({
          secure: true,
          hiddenImage: require('../../assets/images/passHidden.png'),
        });
      }
    }

    return (
      <View
        style={[
          styles.fieldArea,
          {borderBottomColor: this.props.borderBottomColor},
        ]}>
        <Text style={styles.fieldTitle}>{this.props.nomeCampo}</Text>
        <View style={styles.fieldItemArea}>
          <TextInput
            style={[styles.fieldItem, {color: this.props.color}]}
            secureTextEntry={this.state.secure}
            value={this.props.value}
            onChangeText={text => this.props.actions(text)}
          />

          {this.props.nomeCampo == 'SENHA' && (
            <TouchableHighlight
              style={styles.btnHidden}
              underlayColor={null}
              onPress={() => hidden(this)}>
              <Image
                source={this.state.hiddenImage}
                style={styles.imgSenha}
                resizeMode="contain"
              />
            </TouchableHighlight>
          )}

          <View style={styles.fieldItemStatus}>
            {this.props.validState && (
              <Image
                style={styles.fieldItemStatusIMG}
                source={require('../../assets/images/checked.png')}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldArea: {
    marginBottom: 20,
    borderBottomWidth: 3,
  },
  fieldTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  fieldItemArea: {
    flexDirection: 'row',
    height: 50,
  },
  fieldItem: {
    flex: 1,
    fontSize: 20,
  },
  fieldItemStatus: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldItemStatusIMG: {
    width: 25,
    height: 25,
  },
  imgSenha: {
    width: 40,
    height: 40,
  },
  btnHidden: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
