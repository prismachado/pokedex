import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Animated, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { API_OFFSET } from "../../constants";
import { PokemonsActions } from "../../redux/reducers/reducer.pokemon";
import PokedexService, { api } from "../../services/api";
import { Container, PokemonsList } from "./styles";
import Pokemon from "../../services/api/types";
import Header from "../../components/Header";
import PokemonCard from "../PokemonCard";
import {
  getMetaDataPokemonList,
  getPokemonList,
} from "../../redux/selectors/selector.pokemon";
import Text from "../../components/Text";

/*const Home: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(PokemonsActions.pokedexRequestPokemons());

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
};

export default Home;*/

const Home = () => {
  //const { isSearching } = useSearch();

  const dispatch = useDispatch();
  const pokemonList = useSelector(getPokemonList);
  const { loading: loadingRequest } = useSelector(getMetaDataPokemonList);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(1);
  const [loadingInitalData, setLoadingInitialData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(50), []);

  const loadPokemons = useCallback(
    async (offsetValue = offset, shouldRefresh = false) => {
      try {
        setLoading(true);

        console.tron.log("VAI FAZER");
        dispatch(
          PokemonsActions.pokedexRequestPokemons({
            offset: offsetValue,
          })
        );

        /*const response = await api.get<Pokemon[]>("pokemon", {
          params: {
            offset: offsetValue,
          },
        });*/

        /*console.tron.log("response da screen", response);

        const { data } = response;*/

        if (loadingInitalData) {
          setLoadingInitialData(false);
        }

        setOffset(shouldRefresh ? API_OFFSET : API_OFFSET * counter);
        setCounter(shouldRefresh ? 2 : counter + 1);
        setLoading(false);

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
      } catch (err) {
        console.tron.log("ERROR aqui", err);
        Alert.alert(
          "Fail to get Pokémons",
          "An error has ocurred when try to load the Pokémons, please try again."
        );
      }
    },
    [pokemons, loadingInitalData, offset, counter, opacity, translateY]
  );

  const listPokemons = () => {
    setLoading(true);

    if (loadingInitalData) {
      setLoadingInitialData(false);
    }

    setLoading(false);

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

  useEffect(() => {
    if (pokemonList.length === 0) {
      console.tron.log("pokemon 77lt", pokemonList);
      dispatch(
        PokemonsActions.pokedexRequestPokemons({
          offset: 0,
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      setPokemons(pokemonList);
      listPokemons();
    }
  }, [pokemonList]);

  const ListFooterComponent = useMemo(
    () =>
      loading || loadingRequest ? (
        <Loading style={{ marginVertical: 8 }} />
      ) : (
        <></>
      ),
    [loading]
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPokemons(0, true);

    setRefreshing(false);
  }, [loadPokemons]);

  if (loadingInitalData) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loading />
      </View>
    );
  }

  return (
    <Container>
      <Header>
        <Text variant="title">Pokedex</Text>
      </Header>

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
    </Container>
  );
};

export default Home;
