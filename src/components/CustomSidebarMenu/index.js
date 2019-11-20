import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';

import {connect} from 'react-redux';

import {getUserData} from '../../actions/HomeAction';

import {getPrestadores} from '../../actions/ChatActions';

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
    if (global.currentScreenIndex === key) {
      return '#1f33c9';
    } else {
      return 'black';
    }
  };

  UNSAFE_componentWillMount() {
    this.props.getPrestadores(this.props.uid);
    this.props.getUserData(this.props.uid);
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

        <View style={styles.viewName}>
          <Text style={styles.textName}>{this.props.name}</Text>
        </View>

        {/*Divider between Top Image and Sidebar Option*/}
        <View style={styles.container} />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={styles.mapView}>
          {this.items.map((item, key) => (
            <View
              style={[
                styles.itemView,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                },
              ]}
              key={key}>
              <TouchableHighlight
                underlayColor={null}
                style={styles.button}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                <>
                  <View style={styles.viewNavThump}>
                    <Icon
                      name={item.navOptionThumb}
                      size={25}
                      color={this.changeColor(key)}
                    />
                  </View>
                  <Text
                    style={[
                      styles.textButton,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        color:
                          global.currentScreenIndex === key
                            ? '#1f33c9'
                            : 'black',
                      },
                    ]}>
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
    borderRadius: 150,
  },
  viewName: {
    paddingTop: 10,
  },
  textName: {
    color: '#1f33c9',
    fontSize: 17,
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
  mapView: {
    width: '100%',
  },
  itemView: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewNavThump: {
    marginRight: 10,
    marginLeft: 20,
  },
  textButton: {
    fontSize: 15,
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    name: state.home.name,
    profileUrlImage: state.home.profileUrlImage,
  };
};

const CustomSidebarMenuConnect = connect(
  mapStateToProps,
  {
    getUserData,
    getPrestadores,
  },
)(CustomSidebarMenu);

export default CustomSidebarMenuConnect;
