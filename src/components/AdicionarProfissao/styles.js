import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderColor: '#8B6914',
    borderWidth: 1,
    color: '#1f33c9',
    backgroundColor: '#ff9e29',
    borderRadius: 20,
  },
  viewFecharModal: {
    alignItems: 'flex-end',
  },
  toFecharModal: {
    borderColor: '#f00',
    borderWidth: 3,
    margin: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fafafa',
  },
  textFecharModal: {
    color: '#f00',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'FiraCode-Bold',
    fontSize: 20,
  },
  viewGeralModal: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewGeralDentro: {
    //backgroundColor: 'rgba(255,255,255, 0.93)',
    backgroundColor: '#fff',
    //justifyContent: 'center',
    //alignItems: 'center',
    borderColor: 'rgba(255,000,000,0.9)',
    borderWidth: 4,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  viewDentroDoModal: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  viewBotaoAdicionar: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdicionar: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8B6919',
  },
  txtBtnAdicionar: {
    color: '#ff9e29',
    fontFamily: 'Fira Code',
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  intraOverlay: {
    borderColor: '#ff9e29',
    borderWidth: 6,
  },
});
