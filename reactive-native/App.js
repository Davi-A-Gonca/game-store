import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { logInScreen as LogInScreen, appsScreen as AppsScreen } from "./app/navigation/navigation";
import { AuthProvider, useAuth } from "./app/contexts/useAuth";

function MainNavigator() {
  const { token } = useAuth();
  return token ? <AppsScreen />: <LogInScreen />
}

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
};
