import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "../StackNavigator";
import AuthProvider from "../../hooks/useAuth";

export default function DatingApp() {
  const user = true;

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
