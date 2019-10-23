import React, {Component} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {getListaConversas, setActiveChat} from '../actions/ChatActions';

import ConversasItem from '../components/ConversasItem/index';

export class Chats extends Component {
  static navigationOptions = {
    title: 'Conversas',
    tabBarLabel: 'Conversas',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getListaConversas(this.props.uid, () => {
      this.setState({loading: false});
    });
  }

  componentDidUpdate() {
    if (this.props.chatAtivo !== '') {
      this.props.navigation.navigate('Fifty', {
        titulo: this.props.tituloChatAtivo,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <ActivityIndicator size="large" />}
        <FlatList
          data={this.props.conversas}
          renderItem={({item}) => (
            <ConversasItem
              data={item}
              onPress={items => conversas(this, items)}
            />
          )}
        />
      </View>
    );
  }
}

const conversas = (objeto, data) => {
  objeto.props.setActiveChat(data.key);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    chatAtivo: state.chat.chatAtivo,
    tituloChatAtivo: state.chat.tituloChatAtivo,
    conversas: state.chat.conversas,
  };
};

const ChatsConnection = connect(
  mapStateToProps,
  {getListaConversas, setActiveChat},
)(Chats);

export default ChatsConnection;
