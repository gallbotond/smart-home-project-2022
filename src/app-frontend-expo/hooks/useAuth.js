import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";

const config = {
  androidClientId: ANDROID_CLIENT_ID,
  expoClientId: EXPO_CLIENT_ID,
};

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  async function signInWithGoogle() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      console.log("auth", response.authentication);
    }
  }, [response]);

  if (userInfo) {
    console.log(userInfo, config, response);
  }

  return (
    <AuthContext.Provider value={{ user: userInfo, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
