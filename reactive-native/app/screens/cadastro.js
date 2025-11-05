import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import { AppError } from '../errors/baseError';
import { postLogin, getLogin } from "../services/apiLogin";
import { exibirMensagem } from '../errors/showError';

export default function CadastroScreen() {
  const [email, setEmail] = useState("");
  const [senha, setPas] = useState("");
  const [passwordTwo, setPasTwo] = useState("");

  const handleCadastro = async () => {
    try{
      if((senha == passwordTwo) && senha != "" && email != ""){
        await postLogin({email, senha});
        setEmail("");
        setPas("");
        setPasTwo("");
      }else if(senha == "" || email == ""){
        throw new AppError('Está faltando campos excenciais para a criação de cadastro', 400, 'Campos Faltantes');
      } else if(senha != passwordTwo){
        throw new AppError('Senhas não batem, tente de novo', 400, 'Senhas faltantes');
      }
    }catch(error){
      exibirMensagem(error.message, error.name);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>Cadastro</Text>
      <TextInput placeholder='email' value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address" style={styles.input}/>
      <TextInput placeholder="senha" value={senha} onChangeText={setPas}
      secureTextEntry style={styles.input} />
      <TextInput placeholder="repita a senha" value={passwordTwo} onChangeText={setPasTwo}
      secureTextEntry style={styles.input} />
      <Button title="Cadastrar" onPress={handleCadastro}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 13,
  },
  textLogin:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  }
});
