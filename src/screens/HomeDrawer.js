import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home';
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
      <View style={{flexDirection: 'row'}}>
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
    color: '#fff',
  },
});

const FirstStack = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1f33c9',
      },
      headerTintColor: '#fff',
    }),
  },
});

const SecondStack = createStackNavigator({
  Second: {
    screen: Sair,
    navigationOptions: ({navigation}) => ({
      title: 'Sair',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const HomeDrawer = createDrawerNavigator(
  {
    Home: {
      screen: FirstStack,
      navigationOptions: {
        drawerLabel: 'HOME',
      },
    },
    Sair: {
      screen: SecondStack,
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
export default createAppContainer(HomeDrawer);
