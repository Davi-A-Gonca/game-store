import React, { useEffect, useState, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../services/apiLogin";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@token");
      if (saved) setToken(saved);
    })();
  }, []);

  const signIn = async (email, password) => {
    const tk = await getToken({ email, password });
    setToken(tk);
    await AsyncStorage.setItem("@token", tk);
  };

  const signOut = async () => {
    setToken(null);
    await AsyncStorage.removeItem("@token");
  };

  const value = {token, signIn, signOut};

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}

