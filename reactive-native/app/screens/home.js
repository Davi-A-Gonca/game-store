import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../contexts/useAuth';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  const handleLogOut = async () => {
    try{
      await signOut();
    } catch {
      Alert.alert("Falha no login", "Use as credenciais padrão do ReqRes.");
    };
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Loja de Jogos!</Text>
      <Button title="Listar Jogos" onPress={() => navigation.navigate("List")}/>
      <Button title="Cadastrar Novo Jogo" onPress={() => navigation.navigate("Registration")}/>
      <View style={{ height: 16 }} />
      <Button title="Sair" color="red" onPress={handleLogOut}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 12,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 26,
  }
});
