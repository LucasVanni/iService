import React, {Component} from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Home from './Home';
import ChatList from './ChatList';
import Chats from './Chats';
import Chat from './Chat';
import Sair from '../components/Sair/';

import CustomSidebarMenu from '../components/CustomSidebarMenu/';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faBars} from '@fortawesome/free-solid-svg-icons';

global.currentScreenIndex = 0;

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={styles.viewIcon}>
        <FontAwesomeIcon
          icon={faBars}
          size={40}
          style={styles.menuBar}
          onPress={this.toggleDrawer.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBar: {
    color: '#ff9e29',
  },
  viewIcon: {
    flexDirection: 'row',
  },
});

const FirstStack = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: null,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
    }),
  },
});

const FourthStack = createStackNavigator({
  Fourth: {
    screen: Chats,
  },
  Fifty: {
    screen: Chat,
  },
});

const FiftyStatck = createStackNavigator(
  {
    Sixty: {
      screen: ChatList,
      navigationOptions: ({navigation}) => ({
        title: 'Lista de prestadores',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

        headerStyle: {
          backgroundColor: '#1f33c9',
        },
        headerTintColor: '#fff',
      }),
    },
  },
  {
    headerLayoutPreset: 'center',
  },
);

const SecondStack = createBottomTabNavigator({
  Second: {
    screen: FiftyStatck,
    navigationOptions: ({navigation}) => ({
      title: 'Prestadores disponíveis',
    }),
  },
  FourthStack: {
    screen: FourthStack,
    navigationOptions: {
      title: 'Conversas',
    },
  },
});

const ThirdStack = createStackNavigator({
  Third: {
    screen: Sair,
    navigationOptions: ({navigation}) => ({
      title: 'Sair',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#1f33c9',
      },
      headerTintColor: '#fff',
    }),
  },
});

export const HomeDrawer = createDrawerNavigator(
  {
    Home: {
      screen: FirstStack,
      navigationOptions: {
        drawerLabel: 'HOME',
      },
    },
    ChatList: {
      screen: SecondStack,
      navigationOptions: {
        drawerLabel: 'ChatList',
      },
    },
    Sair: {
      screen: ThirdStack,
      navigationOptions: {
        drawerLabel: 'Sair',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  },
);
