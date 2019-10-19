import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {connect} from 'react-redux';

import {getUrlProfileImage, setUrlProfileImage} from '../../actions/HomeAction';
import {TouchableHighlight} from 'react-native-gesture-handler';

export class CustomSidebarMenu extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar

    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'exit-to-app',
        navOptionName: 'Sair',
        screenToNavigate: 'Sair',
      },
    ];
  }

  UNSAFE_componentWillMount() {
    this.props.getUrlProfileImage();
    global.currentScreenIndex = 0;
  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}

        <Image
          source={{uri: `${this.props.profileUrlImage}`}}
          style={styles.sideMenuProfileIcon}
        />

        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{width: '100%'}}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:
                  global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{marginRight: 10, marginLeft: 20}}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
    borderWidth: 4,
    borderColor: '#1f33c9',
    //marginTop: 20,
    borderRadius: 150,
  },
});

const mapStateToProps = state => {
  return {profileUrlImage: state.home.profileUrlImage};
};

const CustomSidebarMenuConnect = connect(
  mapStateToProps,
  {getUrlProfileImage},
)(CustomSidebarMenu);

export default CustomSidebarMenuConnect;
