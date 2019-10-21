import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, Modal} from 'react-native';

import {
  getPrestadores,
  criarConversa,
  setActiveChat,
} from '../actions/ChatActions';

import {connect} from 'react-redux';

import ListaPrestadoresItems from '../components/ListaPrestadoresItems/';

export class ChatList extends Component {
  static navigationOptions = {
    title: 'Prestadores disponíveis',
  };

  async UNSAFE_componentWillMount() {
    await getPrestadores();
  }

  render() {
    const {view, flatListStyle} = styles;
    return (
      <View style={view}>
        <Text style={{textAlign: 'center'}}>
          LISTA DE PRESTADORES DISPONÍVEIS
        </Text>
        <View style={flatListStyle}>
          <FlatList
            data={this.props.prestadores}
            renderItem={({item}) => (
              <ListaPrestadoresItems
                objeto={this}
                data={item}
                onPress={items => prestadorClick(this, items)}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const prestadorClick = (objeto, item) => {
  objeto.props.criarConversa(objeto.props.uid, item.key);
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  viewItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    prestadores: state.chat.prestadores,
    conversas: state.chat.conversas,
    chatAtivo: state.chat.chatAtivo,
  };
};

const ChatListConnection = connect(
  mapStateToProps,
  {criarConversa, setActiveChat, getPrestadores},
)(ChatList);

export default ChatListConnection;
