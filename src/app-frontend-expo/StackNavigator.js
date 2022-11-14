import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DatingHomeScreen from "./screens/DatingHomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const user = true;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={DatingHomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
