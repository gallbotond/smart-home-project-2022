import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";

export default function AuthProvider({ children }) {
  const AuthContext = createContext({})
  return <AuthContext.Provider value={ 
    {user: 'Sonny'}}>{children}</AuthContext.Provider>;
}

export default function useAuth() {


  return useContext(AuthContext);
}
