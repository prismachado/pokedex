import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  PokemonsList,
  Search,
  SearchButtonContainer,
  SearchButton,
} from "./styles";
import Header from "../../components/Header";
import Text from "../../components/Text";
import Loading from "../../components/Loading";
import { API_OFFSET } from "../../constants";

import Pokemon from "../../services/api/types";
import PokemonCard from "../PokemonCard";
import { PokemonsActions } from "../../redux/reducers/reducer.pokemon";
import {
  getMetaDataPokemonList,
  getPokemonList,
} from "../../redux/selectors/selector.pokemon";
import Input from "../../components/Input";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useTheme } from "styled-components";

const Home = () => {
  //const { isSearching } = useSearch();

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector(getPokemonList);
  const { loading: loadingRequest, error } = useSelector(
    getMetaDataPokemonList
  );
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(1);
  const [loadingInitalData, setLoadingInitialData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);
  const { colors } = useTheme();
  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(50), []);

  const width = useMemo(() => new Animated.Value(0), []);

  const widthStyle = width.interpolate({
    inputRange: [0, 48],
    outputRange: [0, 48],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(width, {
      toValue: isFocussed ? 48 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocussed, width]);

  useEffect(() => {
    if (pokemonList.length === 0 && searchValue === "") {
      dispatch(
        PokemonsActions.pokedexRequestPokemons({
          offset,
        })
      );
    } else {
      setPokemons(refreshing ? pokemonList : [...pokemons, ...pokemonList]);
      setOffset(refreshing ? API_OFFSET : API_OFFSET * counter);
      setCounter(refreshing ? 2 : counter + 1);
      setRefreshing(false);
      show();
    }
  }, [pokemonList]);

  const show = () => {
    if (loadingInitalData) {
      setLoadingInitialData(false);
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadPokemons = useCallback(
    async (offsetValue = offset) => {
      if (searchValue === "") {
        setLoading(true);
        dispatch(
          PokemonsActions.pokedexRequestPokemons({
            offset: offsetValue,
          })
        );
        setLoading(false);
      }
    },
    [pokemons, offset]
  );

  const ListFooterComponent = useMemo(
    () =>
      loading || loadingRequest ? (
        <Loading style={{ marginVertical: 8 }} />
      ) : (
        <></>
      ),
    [loading, loadingRequest]
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);
    await loadPokemons(0);
  }, [loadPokemons]);

  if (loadingInitalData) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loading />
      </View>
    );
  }

  const searchPokemon = () => {
    console.tron.log("name poke", searchValue);
    setRefreshing(true);
    dispatch(
      PokemonsActions.pokedexRequestPokemons({
        offset: 0,
        search: searchValue.toLowerCase(),
      })
    );
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <Container>
      <Header>
        <Text variant="title">Pokedex</Text>
      </Header>
      <Search>
        <Input
          icon="search"
          placeholder="Search for a Pokémon name..."
          value={searchValue}
          setValue={setSearchValue}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
          reset={clearSearch}
          autoCorrect={false}
        />

        <SearchButton onPress={searchPokemon}>
          {loading ? (
            <Loading color="white" />
          ) : (
            <Icon name="send" size={20} color={colors.white} />
          )}
        </SearchButton>
      </Search>
      {error ? (
        <Container>
          <Header>
            <Text>deu ruim</Text>
          </Header>
        </Container>
      ) : (
        <PokemonsList
          data={pokemons}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
          onEndReached={() => loadPokemons()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={ListFooterComponent}
          keyExtractor={(pokemon) => String(pokemon.id)}
          numColumns={2}
          renderItem={({ item: pokemon, index }) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                afterThirdCard={!!(index + 2)}
                rightCard={!!(index % 2)}
                opacity={opacity}
              />
            );
          }}
        />
      )}
    </Container>
  );
};

export default Home;
