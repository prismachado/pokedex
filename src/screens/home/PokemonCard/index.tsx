import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

import { Pokemon } from "../../../services/api/types";

import Text from "../../../components/Text";
import PokemonTypes from "../../../components/PokemonTypes";
import Pokeball from "../../../components/Pokeball";

import { Container, Button, PokedexNumber, PokemonImage } from "./styles";
import getColorByPokemonType from "../../../utils/getColorByPokemonType";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import {
  addFavorite,
  listFavorites,
  removeFavorite,
} from "../../../services/firebase";

type PokemonCardProps = {
  pokemon: Pokemon;
  afterThirdCard: boolean;
  rightCard: boolean;
  opacity: Animated.Value;
};

const PokemonCard = ({
  pokemon,
  afterThirdCard,
  rightCard,
  opacity,
}: PokemonCardProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [favoritePokemons, setFavoritePokemons] = useState([] as any);

  const getFavorites = async () => {
    const favorites = await listFavorites();
    console.tron.log("favorites", favorites);
    setFavoritePokemons(favorites);
  };
  useEffect(() => {
    getFavorites();
  }, []);

  const add = async (id: any, name: any) => {
    console.tron.log("entrou aqui");
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

  const handleNavigateToPokemon = useCallback(() => {
    navigation.navigate("Pokemon", {
      pokemon,
      from: "card",
    });
  }, [navigation, pokemon]);

  const backgroundColor = useMemo(
    () => getColorByPokemonType(pokemon.types[0].name),
    [pokemon.types]
  );

  const containerStyle = {
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  return (
    <Container style={containerStyle}>
      <Button
        afterThirdCard={afterThirdCard}
        rightCard={rightCard}
        style={{
          backgroundColor,
        }}
        onPress={handleNavigateToPokemon}
      >
        <SharedElement
          id={`pokemon.${pokemon.id}.name`}
          style={{ alignItems: "flex-start" }}
        >
          <Text color="white" bold>
            {pokemon.name}
          </Text>
        </SharedElement>

        {favoritePokemons.some((e: any) => e.id === pokemon.id) ? (
          <TouchableOpacity onPress={() => remove(pokemon.id)}>
            <Icon name="heart" size={18} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={async () => add(pokemon.id, pokemon.name)}>
            <Icon name="hearto" size={18} color={colors.white} />
          </TouchableOpacity>
        )}

        <SharedElement
          id={`pokemon.${pokemon.id}.image`}
          style={{ position: "absolute", bottom: 4, right: 4 }}
        >
          <PokemonImage uri={pokemon.image} />
        </SharedElement>

        <Pokeball
          width={80}
          height={80}
          style={{
            position: "absolute",
            right: -8,
            bottom: -8,
          }}
        />

        <PokemonTypes pokemon={pokemon} size="small" style={{ marginTop: 8 }} />
      </Button>
    </Container>
  );
};

export default PokemonCard;
