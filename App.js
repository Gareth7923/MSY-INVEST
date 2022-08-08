import React from "react";
//import { LogBox } from "react-native"; LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NativeBaseProvider>
          <StackNavigator />
        </NativeBaseProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
