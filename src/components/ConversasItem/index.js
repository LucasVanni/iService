import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class ConversasItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // states do projeto
    };

    // Códigos firebase
  }

  render() {
    const {buttonArea} = styles;
    return (
      <View>
        <TouchableHighlight
          underlayColor="#DDD"
          style={buttonArea}
          onPress={() => this.props.onPress(this.props.data)}>
          <View>
            <Text>{this.props.data.nome}</Text>
            <Text>{this.props.data.nomeProfissao}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonArea: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
});
