import {
  PokedexRequestPokemons,
  PokedexRequestTypes,
} from "./../types/types.pokemon";
import { put, call, takeLatest } from "redux-saga/effects";
import PokedexService from "../../services/api";
import Pokemon, { TypeApiResult, Types } from "../../services/api/types";
import { PokemonsActions, PokemonsTypes } from "../reducers/reducer.pokemon";

function* getPokemons({ data }: PokedexRequestPokemons) {
  try {
    const { offset, search } = data;

    if (search) {
      let searchPokemon: Pokemon[] = [];
      const getPokemonData: Pokemon[] = yield call(
        PokedexService.getPokemonDataSearch,
        {
          name: search,
        }
      );

      searchPokemon.push(getPokemonData);

      console.tron.log("RESULT", searchPokemon);

      yield put(PokemonsActions.pokedexSuccessPokemons(searchPokemon));
    } else {
      const getPokemons: Pokemon[] = yield call(PokedexService.getPokemons, {
        offset,
      });

      const getPokemonData: Pokemon[] = yield call(
        PokedexService.getPokemonData,
        {
          data: getPokemons,
          search,
        }
      );
      yield put(PokemonsActions.pokedexSuccessPokemons(getPokemonData));
    }
  } catch (error) {
    console.tron.log("error no failure", error.message);
    yield put(PokemonsActions.pokedexFailurePokemons(error.message));
  }
}

function* getTypes({ data }: PokedexRequestTypes) {
  try {
    const { type } = data;
    const getTypes: TypeApiResult[] = yield call(PokedexService.getExistsTypes);

    const params = {
      types: getTypes,
      type,
    };

    const getTypePokemon: Types[] = yield call(PokedexService.getTypePokemon, {
      data: params,
    });

    console.tron.log("DAMAGE!!!!", getTypePokemon);

    yield put(PokemonsActions.pokedexSuccessTypes(getTypePokemon));
  } catch (error) {
    yield put(PokemonsActions.pokedexFailureTypes(error.message));
  }
}

export default function* root() {
  yield takeLatest(PokemonsTypes.POKEDEX_REQUEST_POKEMONS, getPokemons);
  yield takeLatest(PokemonsTypes.POKEDEX_REQUEST_TYPES, getTypes);
}
