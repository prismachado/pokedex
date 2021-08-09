import Pokemon, { Types } from "../../services/api/types";
import { PokedexReducers, PokedexAppState } from "../models/types.redux";

export const getPokemonList = (state: any): Pokemon[] => {
  return state?.Pokemons.pokemons;
};

export const getTypesPokemon = (state: any): Types[] => {
  return state?.Pokemons.types;
};

export const getMetaDataPokemonList = (
  state: any
): { loading: boolean; error: string | null } => {
  return {
    loading: state?.Pokemons.loading,
    error: state?.Pokemons.error,
  };
};
