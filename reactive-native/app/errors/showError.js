import Toast from 'react-native-toast-message';

export const exibirMensagem = (message, name, type = 'error') => {
  Toast.show({
    type: type,
    text1: name,
    text2: message,
    position: 'top',
    visibilityTime: 4000
  })
}
