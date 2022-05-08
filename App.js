import React from "react";
//import { LogBox } from "react-native"; LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
};