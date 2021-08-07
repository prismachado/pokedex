import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";

import { PokemonsActions } from "./src/redux/reducers/reducer.pokemon";
import store from "./src/redux/store";

import Home from "./src/screens/home";
import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";

if (__DEV__) {
  import("./ReactoTron").then(() => console.log("Reactotron Configurado"));
}

export default function App() {
  /*const dispatch = useDispatch();

  dispatch(PokemonsActions.pokedexRequestPokemons());*/

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Welcome" }}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
