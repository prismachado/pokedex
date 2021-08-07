import { ImmutableObject } from "seamless-immutable";
import { PokemonsState } from "../types/types.pokemon";
import { ActionsState } from "../types/types.actions";

export enum PokedexReducers {
  root = "pokedex_app",
  pokemons = "Pokemons",
  actionsState = "ActionsState",
}

export interface PokedexState {
  [PokedexReducers.pokemons]: PokemonsState;
  [PokedexReducers.actionsState]: ActionsState;
}

export interface PokedexAppState {
  [PokedexReducers.root]: ImmutableObject<PokedexState>;
}
