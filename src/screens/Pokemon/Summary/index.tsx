import React, { useEffect, useMemo } from "react";
import { Animated, Easing } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import Pokeball from "../../../components/Pokeball";
import PokemonTypes from "../../../components/PokemonTypes";
import Text from "../../../components/Text";
import { POKEMON_SUMMARY_HEIGHT } from "../../../constants";
import { Pokemon } from "../../../services/api/types";
import { AntDesign as Icon } from "@expo/vector-icons";
import { Alert } from "react-native";

import {
  Container,
  Header,
  Row,
  PokemonImageContainer,
  PokemonImage,
} from "./styles";
import { useTheme } from "styled-components";
import firebase from "../../../config/firebaseConnection";
import { useState } from "react";
import {
  addFavorite,
  listFavorites,
  removeFavorite,
} from "../../../services/firebase";

type SummaryProps = {
  translateY: Animated.Value;
  pokemon: Pokemon;
};

const Summary = ({ pokemon, translateY }: SummaryProps) => {
  const translateXNumber = useMemo(() => new Animated.Value(100), []);
  const translateXGenera = useMemo(() => new Animated.Value(200), []);

  const { colors } = useTheme();
  const [favoritePokemons, setFavoritePokemons] = useState([] as any);

  const getFavorites = async () => {
    const favorites = await listFavorites();
    setFavoritePokemons(favorites);
  };
  useEffect(() => {
    getFavorites();
  }, []);

  const add = async (id: any, name: any) => {
    await addFavorite(id, name);
    setFavoritePokemons([]);
    getFavorites();
  };

  const remove = async (id: number) => {
    const result = favoritePokemons.find((favorite: any) => favorite.id === id);
    await removeFavorite(result.key);
    setFavoritePokemons([]);
    getFavorites();
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateXNumber, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(translateXGenera, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  }, [translateXNumber, translateXGenera]);

  const pokedexNumberStyle = {
    transform: [
      {
        translateX: translateXNumber.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const generaStyle = {
    transform: [
      {
        translateX: translateXGenera.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 200],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const summaryStyle = {
    zIndex: translateY.interpolate({
      inputRange: [-POKEMON_SUMMARY_HEIGHT, 0],
      outputRange: [-1, 2],
      extrapolate: "clamp",
    }),
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const pokemonImageContainerStyle = {
    opacity: translateY.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [-20, 0, 25],
          extrapolate: "clamp",
        }),
      },
      {
        scale: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [0.9, 1, 1.1],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <>
      <Pokeball
        width={250}
        height={250}
        withRotate
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }}
      />

      <Container style={summaryStyle}>
        <Header>
          <Row>
            <SharedElement
              id={`pokemon.${pokemon.id}.name`}
              style={{ alignItems: "flex-start" }}
            >
              <Text variant="title" color="white">
                {pokemon.name}
              </Text>
            </SharedElement>

            <Animated.View style={pokedexNumberStyle}>
              <Text variant="body2" color="white" bold>
                #{pokemon.pokedex_number}
              </Text>
            </Animated.View>

            <Animated.View style={pokedexNumberStyle}>
              {favoritePokemons.some((e: any) => e.id === pokemon.id) ? (
                <Icon
                  name="heart"
                  size={30}
                  color={colors.white}
                  onPress={() => remove(pokemon.id)}
                />
              ) : (
                <Icon
                  name="hearto"
                  size={30}
                  color={colors.white}
                  onPress={() => add(pokemon.id, pokemon.name)}
                />
              )}
            </Animated.View>
          </Row>

          <Row style={{ marginTop: 16 }}>
            <PokemonTypes pokemon={pokemon} size="regular" />

            <Animated.View style={generaStyle}>
              <Text color="white">{pokemon.genera}</Text>
            </Animated.View>
          </Row>
        </Header>

        <PokemonImageContainer style={pokemonImageContainerStyle}>
          <SharedElement id={`pokemon.${pokemon.id}.image`}>
            <PokemonImage uri={pokemon.image} />
          </SharedElement>
        </PokemonImageContainer>
      </Container>
    </>
  );
};

export default Summary;
