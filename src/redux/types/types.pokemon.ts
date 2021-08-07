import { Action } from "redux";
import { ImmutableObject } from "seamless-immutable";
import Pokemon from "../../services/api/types";

export interface State {
  pokemons: [];
  loading: boolean;
  error: string | null;
}
export type PokemonsState = ImmutableObject<State>;

export interface PokedexActionTypes {
  POKEDEX_REQUEST_POKEMONS: string;
  POKEDEX_SUCCESS_POKEMONS: string;
  POKEDEX_FAILURE_POKEMONS: string;

  RESET: string;
}

//export type PokedexRequestPokemons = Action<PokedexActionTypes>;
export interface RequestPokemonParams {
  offset: number;
}
export interface PokedexRequestPokemons extends Action<PokedexActionTypes> {
  data: RequestPokemonParams;
}
export interface PokedexSuccessPokemons extends Action<PokedexActionTypes> {
  data: Pokemon[];
}

export interface PokedexFailurePokemons extends Action<PokedexActionTypes> {
  error: {
    message: string;
  };
}

export interface CreatorTypes {
  pokedexRequestPokemons(data: RequestPokemonParams): PokedexRequestPokemons;
  pokedexSuccessPokemons(data: Pokemon[]): PokedexSuccessPokemons;
  pokedexFailurePokemons(error: string): PokedexFailurePokemons;

  reset(): Action<PokedexActionTypes>;
}

export type ReducerTypes = PokedexRequestPokemons &
  PokedexSuccessPokemons &
  PokedexFailurePokemons;
