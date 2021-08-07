import Immutable from "seamless-immutable";
import { createActions, createReducer } from "reduxsauce";

import {
  PokedexActionTypes,
  CreatorTypes,
  PokemonsState,
  ReducerTypes,
} from "../types/types.pokemon";
import { PokedexReducers } from "../models/types.redux";
import Pokemon from "../../services/api/types";

const { Types, Creators } = createActions<PokedexActionTypes, CreatorTypes>(
  {
    pokedexRequestPokemons: ["data"],
    pokedexSuccessPokemons: ["data"],
    pokedexFailurePokemons: ["error"],

    reset: null,
  },
  {
    prefix: `${PokedexReducers.root}/${PokedexReducers.pokemons}/`,
  }
);

const INITIAL_STATE = Immutable({
  pokemons: [],
  loading: false,
  error: null,
});

export const reducer = createReducer<PokemonsState, ReducerTypes>(
  INITIAL_STATE,
  {
    [Types.POKEDEX_REQUEST_POKEMONS]: (state) => {
      return state.merge({
        loading: true,
      });
    },
    [Types.POKEDEX_SUCCESS_POKEMONS]: (state, action) => {
      return state.merge({
        pokemons: action.data,
        loading: false,
      });
    },
    [Types.POKEDEX_FAILURE_POKEMONS]: (state, action) => {
      return state.merge({
        error: action.error.message,
        loading: false,
      });
    },

    [Types.RESET]: () => INITIAL_STATE,
  }
);

export const PokemonsActions = Creators;
export const PokemonsTypes = Types;
