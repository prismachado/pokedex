import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import Home from "./src/screens/home";
import Pokemon from "./src/screens/Pokemon";
import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";

if (__DEV__) {
  import("./ReactoTron").then(() => console.log("Reactotron Configurado"));
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#FFF" translucent />
        <ThemeProvider theme={theme}>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: false,
              headerShown: false,
              cardStyle: {
                backgroundColor: "#fff",
              },
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Pokemon"
              component={Pokemon}
              options={{
                cardStyleInterpolator: ({ current }) => ({
                  cardStyle: {
                    opacity: current.progress,
                  },
                }),
              }}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
