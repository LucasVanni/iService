import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableHighlight,
} from 'react-native';

import {connect} from 'react-redux';

import {Avatar} from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

import AdicionarProfissao from '../AdicionarProfissao';

import {
  setErrorGeral,
  setUriAvatar,
  setErrorAvatar,
  setCorErrorAvatar,
  setNameField,
  setErrorName,
  setNameBorderColor,
  setEmailField,
  setErrorEmail,
  setEmailBorderColor,
  setPasswordField,
  setErrorPass,
  setPassBorderColor,
  setPasswordConfirmField,
  setErrorPassConfirm,
  setPassConfirmBorderColor,
  getListaProfissoes,
  setPickerBorderColor,
  setErrorPicker,
  editProfessionChoose,
  providerSignUp,
} from '../../actions/AuthActions';

import CamposCadastro from '../CamposCadastro/';

export class ProviderSignUp extends Component {
  constructor(props) {
    super(props);

    this.addImg = this.addImg.bind(this);
    this.props.getListaProfissoes();
  }

  addImg() {
    const options = {
      title: 'Selecionar foto de perfil',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar uma foto...',
      chooseFromLibraryButtonTitle: 'Escolher uma foto de sua biblioteca...',
    };
    ImagePicker.showImagePicker(options, r => {
      if (r.uri) {
        this.props.setUriAvatar({uri: r.uri});
        this.props.erroAvatar = '#fff';
        this.props.messageAvatarError = null;
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewPersonalInfo}>
          <Text style={styles.txtPersonalInfo}>Informações Pessoais</Text>
        </View>
        <View style={styles.viewSignUp}>
          <View style={styles.viewAvatar}>
            <Avatar
              rounded
              size="xlarge"
              icon={{name: 'user', type: 'font-awesome', color: '#1f33c9'}}
              source={this.props.avatar}
              activeOpacity={0.7}
              containerStyle={[
                styles.avatar,
                {
                  borderWidth: 4,
                  borderColor: this.props.avatarBorderColor,
                },
              ]}
              showEditButton
              editButton={{
                name: 'mode-edit',
                type: 'material',
                color: '#1f33c9',
                style: {
                  borderRadius: 40,
                  borderWidth: 4,
                  borderColor: this.props.avatarBorderColor,
                },
                containerStyle: {
                  flex: 1,
                  borderRadius: 40,
                },
                underlayColor: '#fff',
              }}
              onEditPress={this.addImg}
            />
            {this.props.messageAvatarError != null && (
              <View style={styles.viewErroAvatar}>
                {/* Somente no momento de enviar que o erro aparecerá */}
                <Text style={styles.erroAvatar}>
                  {this.props.messageAvatarError}
                </Text>
              </View>
            )}
          </View>
          {/* Cadastro em sí */}
          <View style={styles.viewCamposCadastro}>
            <CamposCadastro
              nomeCampo="NOME"
              color={'#fff'}
              borderBottomColor={this.props.nameBorderColor}
              secureTextEntry={null}
              placeholder="Digite seu nome completo"
              placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
              value={this.props.name}
              actions={this.props.setNameField}
            />
            {this.props.errorName == null ? null : (
              <View style={styles.viewError}>
                <Text style={styles.error}>{this.props.errorName}</Text>
              </View>
            )}
            <CamposCadastro
              nomeCampo={'E-MAIL'}
              borderBottomColor={this.props.emailBorderColor}
              color={'#fff'}
              secureTextEntry={false}
              value={this.props.email}
              validState={this.props.emailValid}
              actions={this.props.setEmailField}
              placeholder="Digite um e-mail"
              placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
            />
            {this.props.errorEmail == null ? null : (
              <View style={styles.viewError}>
                <Text style={styles.error}>{this.props.errorEmail}</Text>
              </View>
            )}
            <CamposCadastro
              nomeCampo="SENHA"
              color={'#fff'}
              borderBottomColor={this.props.passBorderColor}
              secureTextEntry={true}
              placeholder="Digite uma senha"
              placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
              value={this.props.pass}
              validState={this.props.passValid}
              actions={this.props.setPasswordField}
            />
            {this.props.errorPass == null ? null : (
              <View style={styles.viewError}>
                <Text style={styles.error}>{this.props.errorPass}</Text>
              </View>
            )}
            <CamposCadastro
              nomeCampo="CONFIRMAR SENHA"
              color={'#fff'}
              borderBottomColor={this.props.passConfirmBorderColor}
              secureTextEntry={true}
              placeholder="Digite sua senha novamente"
              placeholderTextColor={'rgba(255,255,255, 0.6)'}
              value={this.props.passConfirm}
              validState={this.props.passConfirmValid}
              actions={this.props.setPasswordConfirmField}
            />
            {this.props.errorPassConfirm == null ? null : (
              <View style={styles.viewError}>
                <Text style={styles.error}>{this.props.errorPassConfirm}</Text>
              </View>
            )}

            <View style={styles.viewComponenteListaProfissoes}>
              <View
                style={[
                  styles.viewPickerListaProfissoes,
                  {
                    borderColor: this.props.pickerBorderColor,
                  },
                ]}>
                <Picker
                  style={styles.pickerListaProfissoes}
                  onValueChange={listaProfissoes =>
                    validateOnSelected(listaProfissoes, this)
                  }
                  itemStyle={styles.itemPickerListaProfissoes}
                  selectedValue={this.props.professionChoose}>
                  {this.props.listaProfissoes.map(inserirProfissoes)}
                </Picker>
              </View>
              <AdicionarProfissao />
              {this.props.errorPicker == null ? null : (
                <View style={styles.viewError}>
                  <Text style={styles.error}>{this.props.errorPicker}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {this.props.errorGeral == null ? null : (
          <View style={styles.viewError}>
            <Text style={styles.error}>{this.props.errorGeral}</Text>
          </View>
        )}

        <View style={styles.viewBotaoCadastrar}>
          <TouchableHighlight
            style={styles.estiloBotaoCadastrar}
            underlayColor={'#1f33c9'}
            onPress={() => {
              this.setState({loading: true});
              this.props.providerSignUp(this, () =>
                this.setState({loading: false}),
              );
            }}>
            <Text style={styles.txtBtnCadastrar}>Cadastrar</Text>
          </TouchableHighlight>
          {/* <LoadingItem visible={this.state.loading} /> */}
        </View>
      </ScrollView>
    );
  }
}

const validateOnSelected = (listaProfissoes, objeto) => {
  if (listaProfissoes.key == '0' || listaProfissoes.key == undefined) {
    objeto.props.setPickerBorderColor('#f00');
    objeto.props.setErrorPicker('Selecione uma profissão');
  } else {
    objeto.props.setPickerBorderColor('#fff');
    objeto.props.setErrorPicker(null);
  }

  objeto.props.editProfessionChoose(listaProfissoes);
};

const inserirProfissoes = (value, index) => {
  return <Picker.Item key={index} value={value} label={value.nomeProfissao} />;
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  viewPersonalInfo: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPersonalInfo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewSignUp: {
    flex: 1,
    flexDirection: 'column',
  },
  viewAvatar: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    flex: 3,
  },
  viewErroAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 0,
  },
  erroAvatar: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
  },
  avatar: {
    flex: 2,
  },
  viewCamposCadastro: {
    padding: 20,
    flex: 1,
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
  viewError: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewComponenteListaProfissoes: {
    flex: 1,
  },
  viewPickerListaProfissoes: {
    justifyContent: 'center',
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  pickerListaProfissoes: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemPickerListaProfissoes: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewBotaoCadastrar: {
    flex: 2,
    justifyContent: 'center',
  },
  estiloBotaoCadastrar: {
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: null,
  },
  txtBtnCadastrar: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});

const mapStatetoProps = state => {
  return {
    errorGeral: state.auth.errorGeral,

    avatar: state.auth.avatar,
    avatarBorderColor: state.auth.avatarBorderColor,
    messageAvatarError: state.auth.messageAvatarError,

    name: state.auth.name,
    nameBorderColor: state.auth.nameBorderColor,
    errorName: state.auth.errorName,

    email: state.auth.email,
    emailBorderColor: state.auth.emailBorderColor,
    emailValid: state.auth.emailValid,
    errorEmail: state.auth.errorEmail,

    pass: state.auth.pass,
    passBorderColor: state.auth.passBorderColor,
    passValid: state.auth.passValid,
    errorPass: state.auth.errorPass,

    passConfirm: state.auth.passConfirm,
    passConfirmBorderColor: state.auth.passConfirmBorderColor,
    passConfirmValid: state.auth.passConfirmValid,
    errorPassConfirm: state.auth.errorPassConfirm,

    professionChoose: state.auth.professionChoose,
    listaProfissoes: state.auth.listaProfissoes,
    pickerBorderColor: state.auth.pickerBorderColor,
    errorPicker: state.auth.errorPicker,
  };
};

const ProviderSignUpConnect = connect(
  mapStatetoProps,
  {
    setErrorGeral,

    setUriAvatar,
    setErrorAvatar,
    setCorErrorAvatar,
    setNameField,
    setNameBorderColor,
    setErrorName,
    setPasswordField,
    setErrorPass,
    setPassBorderColor,
    setPasswordConfirmField,
    setErrorPassConfirm,
    setPassConfirmBorderColor,
    setEmailField,
    setErrorEmail,
    setEmailBorderColor,
    getListaProfissoes,
    setPickerBorderColor,
    setErrorPicker,
    editProfessionChoose,
    providerSignUp,
  },
)(ProviderSignUp);

export default ProviderSignUpConnect;
