import Pokemon from "../../services/api/types";
import { PokedexReducers, PokedexAppState } from "../models/types.redux";

export const getPokemonList = (state: any): Pokemon[] => {
  console.tron.log("selector", state);
  return state?.Pokemons.pokemons;
};

export const getMetaDataPokemonList = (
  state: any
): { loading: boolean; error: string | null } => {
  return {
    loading: state?.Pokemons.loading,
    error: state?.Pokemons.error,
  };
};
