import { Action } from "redux";
import { ImmutableObject } from "seamless-immutable";
import Pokemon, { Types } from "../../services/api/types";

export interface State {
  pokemons: [];
  types: [];
  loading: boolean;
  error: string | null;
}
export type PokemonsState = ImmutableObject<State>;

export interface PokedexActionTypes {
  POKEDEX_REQUEST_POKEMONS: string;
  POKEDEX_SUCCESS_POKEMONS: string;
  POKEDEX_FAILURE_POKEMONS: string;

  POKEDEX_REQUEST_TYPES: string;
  POKEDEX_SUCCESS_TYPES: string;
  POKEDEX_FAILURE_TYPES: string;

  RESET: string;
}

/*POKEMON LIST*/
export interface RequestPokemonParams {
  offset: number;
  search?: string;
}
export interface PokedexRequestPokemons extends Action<PokedexActionTypes> {
  data: RequestPokemonParams;
}
export interface PokedexSuccessPokemons extends Action<PokedexActionTypes> {
  data: Pokemon[];
}

export interface PokedexFailurePokemons extends Action<PokedexActionTypes> {
  error: string;
}

/*TYPES*/
export interface RequestTypesParams {
  type: string;
}
export interface PokedexRequestTypes extends Action<PokedexActionTypes> {
  data: RequestTypesParams;
}
export interface PokedexSuccessTypes extends Action<PokedexActionTypes> {
  data: Types[];
}

export interface PokedexFailureTypes extends Action<PokedexActionTypes> {
  error: {
    message: string;
  };
}

export interface CreatorTypes {
  pokedexRequestPokemons(data: RequestPokemonParams): PokedexRequestPokemons;
  pokedexSuccessPokemons(data: Pokemon[]): PokedexSuccessPokemons;
  pokedexFailurePokemons(error: string): PokedexFailurePokemons;

  pokedexRequestTypes(data: RequestTypesParams): PokedexRequestTypes;
  pokedexSuccessTypes(data: Types[]): PokedexSuccessTypes;
  pokedexFailureTypes(error: string): PokedexFailureTypes;

  reset(): Action<PokedexActionTypes>;
}

export type ReducerTypes = PokedexRequestPokemons &
  PokedexSuccessPokemons &
  PokedexFailurePokemons &
  PokedexRequestTypes &
  PokedexSuccessTypes &
  PokedexFailureTypes;
