import { RequestPokemonParams } from "./../types/types.pokemon";
import { put, call, takeLatest } from "redux-saga/effects";
import PokedexService from "../../services/api";
import Pokemon from "../../services/api/types";
import { PokemonsActions, PokemonsTypes } from "../reducers/reducer.pokemon";

function* getPokemons({ data }: RequestPokemonParams) {
  try {
    const { offset } = data;
    console.tron.log("valor do off", offset);
    const getPokemons: Pokemon[] = yield call(PokedexService.getPokemons, {
      offset: offset || 0,
    });

    const getPokemonData: Pokemon[] = yield call(
      PokedexService.getPokemonData,
      {
        data: getPokemons,
      }
    );
    console.tron.log("DATA no SAGA", getPokemonData);

    yield put(PokemonsActions.pokedexSuccessPokemons(getPokemonData));
  } catch (error) {
    yield put(PokemonsActions.pokedexFailurePokemons(error.message));
  }
}

export default function* root() {
  yield takeLatest(PokemonsTypes.POKEDEX_REQUEST_POKEMONS, getPokemons);
}
