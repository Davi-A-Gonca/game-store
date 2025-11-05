import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { exibirMensagem } from '../errors/showError';
import { useAuth } from '../contexts/useAuth';
import { AppError } from '../errors/baseError';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPas] = useState("");
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try{
      if(email == "" || password == ""){
        throw new AppError('Está faltando campos excenciais para o Login', 400, 'Campos Faltantes');
      }else{
        await signIn(email.trim(), password);
      }
    } catch (error){
      exibirMensagem(error.message);
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>LOGIN</Text>
      <TextInput placeholder='email' value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address" style={styles.input}/>
      <TextInput placeholder="senha" value={password} onChangeText={setPas}
      secureTextEntry style={styles.input} />
      <Button title="Entrar" onPress={handleSignIn}/>
      <Button title="Fazer Cadastro" onPress={() => navigation.navigate("Cadastro")}/>
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
