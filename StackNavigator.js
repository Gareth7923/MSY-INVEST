import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsOrdersScreen from "./screens/DetailsOrdersScreen";
import CameraScreen from "./screens/CameraScreen";
import SliderScreen from "./screens/SliderScreen";
import useAuth from "./hooks/useAuth";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: "Détail de commande :",
              headerStyle: {
                backgroundColor: "white",
              },
              headerTitleStyle: {
                color: "#3f3f46",
                fontSize: 18,
                fontWeight: "200",
              },
              headerTitleAlign: "center",
              headerTintColor: "#b91c1c",
              headerShadowVisible: false,
              headerBackTitleVisible: false,
            }}
            name="DetailsOrdersScreen"
            component={DetailsOrdersScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CameraScreen"
            component={CameraScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
