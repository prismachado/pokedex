import { Action } from "redux";
import { ImmutableObject } from "seamless-immutable";

export interface State {
  clearstate: any;
}

export type ActionsState = ImmutableObject<State>;

export interface PokedexAppActionTypes {
  POKEDEX_REQUEST_DESTROY_SESSION: string;
  POKEDEX_SUCCESS_DESTROY_SESSION: string;
}

export type PokedexRequestDestroySession = Action<PokedexAppActionTypes>;

export type PokedexSuccessDestroySession = Action<PokedexAppActionTypes>;

export interface CreatorTypes {
  pokedexRequestDestroySession(): PokedexRequestDestroySession;
  pokedexSuccessDestroySession(): PokedexSuccessDestroySession;
}

export type ReducerTypes = PokedexRequestDestroySession &
  PokedexSuccessDestroySession;
