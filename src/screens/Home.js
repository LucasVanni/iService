import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Platform,
  Permission,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';

import CalloutModal from '../components/CalloutModal/';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faCrosshairs} from '@fortawesome/free-solid-svg-icons';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

import MapViewDirections from 'react-native-maps-directions';

import {getUid} from '../actions/HomeAction';

import {
  getPosition,
  saveCurrentLocation,
  setUpdateLocation,
} from '../APIS/iServiceAPI';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Localização do usuário atual
      currentLocation: null,

      //Localização do prestador
      providerLocation: [],

      // Espera o render da imagem
      initialRender: true,

      // Localização da origem
      originLocation: {
        latitude: 0,
        longitude: 0,
      },

      //Localização de destino
      destLocation: {
        latitude: 0,
        longitude: 0,
      },

      // Warning
      isLoading: false,
      loadingMsg: '',
      warnHeight: new Animated.Value(0),

      // Callout Visible Prop
      modalVisible: false,
    };

    this.setWarning = this.setWarning.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.requestLocationPermission = this.requestLocationPermission.bind(this);

    this.contratarPrestador = this.contratarPrestador.bind(this);

    this.realignMap = this.realignMap.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.getUid();
  }

  getCurrentLocation = async () => {
    this.setWarning(true, 'Procurando sua localização...');

    await getPosition().then(resolveProps => {
      resolveProps.currentLocation.map(infos => {
        this.setState({
          currentLocation: {
            latitude: infos.latitude,
            latitudeDelta: infos.latitudeDelta,
            longitude: infos.longitude,
            longitudeDelta: infos.longitudeDelta,
          },
        });
      });
    });
    if (await this.requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          this.setWarning(false, '');

          let circumference = (40075 / 360) * 1000;

          let oneDegreeOfLongitudeInMeters = 111.32 * 1000;

          let ltCircum = Math.cos(position.coords.latitude) * circumference;

          let divLtCircum = 1 / ltCircum;

          let latitudeDelta = position.coords.accuracy * divLtCircum;

          let longitudeDelta =
            position.coords.accuracy / oneDegreeOfLongitudeInMeters;

          saveCurrentLocation(latitudeDelta, longitudeDelta, position).then(
            () => {
              this.setState({
                currentLocation: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: Math.max(0, latitudeDelta),
                  longitudeDelta: Math.max(0, longitudeDelta),
                },
              });

              this.realignMap();
            },
          );
        },
        error => {
          this.setWarning(false, '');
          alert(`Erro na Loc: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          interval: 2000,
          maximumAge: 10000,
        },
      );
    } else {
      this.setWarning(false, '');
    }
  };

  requestLocationPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const g = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Pegar localização',
            message: 'Este aplicativo precisa acessar sua localização',
          },
        );

        if (g == PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return true;
    }
  };

  setWarning(status, msg) {
    if (status === true && msg != '') {
      this.setState({
        isLoading: status,
        loadingMsg: msg,
      });

      Animated.timing(this.state.warnHeight, {
        toValue: 50,
        duration: 400,
      }).start();
    } else if (status === false) {
      this.setState({
        isLoading: status,
        loadingMsg: '',
      });

      Animated.timing(this.state.warnHeight, {
        toValue: 0,
        duration: 400,
      }).start();
    }
  }

  contratarPrestador(item) {
    this.setState({modalVisible: false});

    let latitude = item.latitude.toString();

    let longitude = item.longitude.toString();

    setTimeout(() => {
      this.realignMap();
    }, 2000);

    this.realignMap();

    this.setState({
      originLocation: {
        latitude: this.state.currentLocation.latitude,
        longiude: this.state.currentLocation.longitude,
      },
      destLocation: {
        latitude,
        longitude,
      },
    });
  }

  realignMap() {
    this.map.fitToSuppliedMarkers(['OriginMarker'], {
      edgePadding: {
        left: 100,
        top: 200,
        right: 100,
        bottom: 100,
      },
      animated: true,
    });
  }

  render() {
    return (
      <View style={styles.view}>
        <MapView
          ref={obj => (this.map = obj)}
          style={styles.mapView}
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={this.state.currentLocation}
          onMapReady={() => this.getCurrentLocation()}
          followsUserLocation
          onUserLocationChange={position => {
            setUpdateLocation(
              this,
              position.nativeEvent.coordinate.accuracy,
              position.nativeEvent.coordinate.longitude,
              position.nativeEvent.coordinate.latitude,
            ).then(() => {
              getPosition().then(resolveProps => {
                this.setState({
                  providerLocation: resolveProps.providerLocation,
                });

                resolveProps.currentLocation.map(infos => {
                  this.setState({
                    currentLocation: {
                      latitude: infos.latitude,
                      latitudeDelta: infos.latitudeDelta,
                      longitude: infos.longitude,
                      longitudeDelta: infos.longitudeDelta,
                    },
                  });
                });
              });
            });
          }}>
          {this.state.providerLocation != [] &&
            this.state.providerLocation.map(infos => {
              if (this.props.userUid != infos.id) {
                return (
                  <Marker
                    identifier={'DestinationMarker'}
                    anchor={{x: 0.5, y: 0.4}}
                    coordinate={{
                      latitude: infos.latitude,
                      longitude: infos.longitude,
                    }}>
                    <View style={styles.markerView}>
                      <Text style={styles.nomeMarker}>{infos.nome}</Text>
                      <Image
                        onLayout={() => this.setState({initialRender: false})}
                        source={{
                          uri: infos.profileImage,
                        }}
                        style={styles.imgMarker}
                      />
                      <Text style={styles.nomeProfissao}>
                        {infos.nomeProfissao}
                      </Text>
                    </View>

                    <Callout
                      onPress={() => this.setState({modalVisible: true})}>
                      <Text>
                        Clique aqui para saber maiores informações de
                        contratação ou caso queira conversar com o prestador
                      </Text>
                      <CalloutModal
                        infos={infos}
                        contratarPrestador={this.contratarPrestador}
                        objeto={this}
                        uid={this.props.userUid}
                        uidProvider={infos.id}
                      />
                    </Callout>
                  </Marker>
                );
              }
            })}

          {/* Para implementação futura das rotas entre usuários e prestador

            Não o implementei para o TCC pois está gerando um aviso de que o JSON
            passado para a função que está errado,
            preciso investigar melhor com mais tempo

            {this.state.destLocation.latitude != 0 && (
            <MapViewDirections
              apikey={'AIzaSyB6aXSct_CrkhPBGrry-v_BWjtqvk3Bjas'}
              origin={this.state.currentLocation}
              destination={this.state.destLocation}
            />
          )}

          */}

          {this.state.currentLocation != null && (
            <Marker
              pinColor="blue"
              identifier={'OriginMarker'}
              coordinate={{
                latitude: this.state.currentLocation.latitude,
                longitude: this.state.currentLocation.longitude,
              }}
            />
          )}
        </MapView>

        <TouchableHighlight style={styles.recenterMap}>
          <FontAwesomeIcon
            size={40}
            color="#fff"
            style={{
              backgroundColor: '#1f33c9',
              borderColor: '#15bddb',
              borderWidth: 4,
              borderRadius: 20,
            }}
            icon={faCrosshairs}
            onPress={() => this.realignMap()}
          />
        </TouchableHighlight>

        <Animated.View
          style={[styles.viewAviso, {height: this.state.warnHeight}]}>
          <Text style={styles.textoAviso}>{this.state.loadingMsg}</Text>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userUid: state.home.userUid,
});

const HomeConnection = connect(
  mapStateToProps,
  {getUid},
)(Home);

export default HomeConnection;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mapView: {
    flex: 1,
    zIndex: 1,
  },
  viewAviso: {
    position: 'absolute',
    zIndex: 2,
    left: '12.5%',
    top: 0,
    width: '75%',
    backgroundColor: '#ff9e29',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  textoAviso: {
    fontSize: 20,
    color: '#fff',
  },

  markerView: {
    margin: 5,
    alignItems: 'center',
  },

  nomeMarker: {
    color: '#ff9e29',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#1f33c9',
    borderRadius: 10,
    textAlign: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    padding: 5,
    margin: 3,
  },

  nomeProfissao: {
    color: '#ff9e29',
    fontSize: 15,
    backgroundColor: '#1f33c9',
    borderColor: '#fff',
    borderWidth: 2,
    fontWeight: 'bold',
    borderRadius: 10,
    textAlign: 'center',
    padding: 5,
    maxWidth: 200,
  },

  recenterMap: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  imgMarker: {
    borderRadius: 35,
    width: 70,
    height: 70,
    marginTop: 5,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: '#ff9e29',
    margin: 10,
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#0d2aba',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#00011a',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e63e9',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6a999a',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a0896a',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c77b00',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffa024',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ff7e14',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#577bff',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#000',
      },
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#5ac3dd',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#fff',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];
