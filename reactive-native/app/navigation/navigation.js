import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home"
import LoginScreen from "../screens/login"
import CadastroScreen from "../screens/cadastro"
import GamesList from "../screens/gamesList"
import GamesRegistration from "../screens/gamesReg"

const Stack = createNativeStackNavigator();

export function logInScreen() {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Entrar" }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: "Fazer Cadastro" }} />
    </Stack.Navigator>
  );
};

export function appsScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Tela Inicial" }} />
        <Stack.Screen name="List" component={GamesList} options={{ title: "Lista de Jogos" }} />
        <Stack.Screen name="Registration" component={GamesRegistration} options={{ title: "Cadastro de Jogos" }} />
    </Stack.Navigator>
  );
};
