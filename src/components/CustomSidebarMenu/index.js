import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';

import {connect} from 'react-redux';

import {getUserData, getUid} from '../../actions/HomeAction';

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
        navOptionThumb: 'chat',
        navOptionName: 'Conversas',
        screenToNavigate: 'ChatList',
      },
      {
        navOptionThumb: 'exit-to-app',
        navOptionName: 'Sair',
        screenToNavigate: 'Sair',
      },
    ];

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor = key => {
    if (global.currentScreenIndex == key) {
      return '#1f33c9';
    } else {
      return 'black';
    }
  };

  UNSAFE_componentWillMount() {
    this.props.getUserData();
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

        <View style={{paddingTop: 10}}>
          <Text style={{color: '#1f33c9', fontSize: 17, fontWeight: 'bold'}}>
            {this.props.name}
          </Text>
        </View>

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
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:
                  global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <TouchableHighlight
                underlayColor={null}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                <>
                  <View style={{marginRight: 10, marginLeft: 20}}>
                    <Icon
                      name={item.navOptionThumb}
                      size={25}
                      color={this.changeColor(key)}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color:
                        global.currentScreenIndex === key ? '#1f33c9' : 'black',
                    }}>
                    {item.navOptionName}
                  </Text>
                </>
              </TouchableHighlight>
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
  return {
    name: state.home.name,
    profileUrlImage: state.home.profileUrlImage,
  };
};

const CustomSidebarMenuConnect = connect(
  mapStateToProps,
  {getUserData, getUid},
)(CustomSidebarMenu);

export default CustomSidebarMenuConnect;
