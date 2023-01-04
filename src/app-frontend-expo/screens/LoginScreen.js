import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  return (
    <View>
      <Text>Log in to the app</Text>
      <Button title="login" onPress={signInWithGoogle} />
    </View>
  );
}
