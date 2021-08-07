import Immutable from "seamless-immutable";
import { createActions, createReducer } from "reduxsauce";

import {
  ActionsState,
  PokedexAppActionTypes,
  CreatorTypes,
  ReducerTypes,
} from "../types/types.actions";
import { PokedexReducers } from "../models/types.redux";

const { Types, Creators } = createActions<PokedexAppActionTypes, CreatorTypes>(
  {
    pokedexRequestDestroySession: null,
    pokedexSuccessDestroySession: null,
  },
  {
    prefix: `${PokedexReducers.root}/${PokedexReducers.actionsState}/`,
  }
);

const INITIAL_STATE: ActionsState = Immutable({
  clearstate: "",
});

export const reducer = createReducer<ActionsState, ReducerTypes>(
  INITIAL_STATE,
  {
    [Types.POKEDEX_REQUEST_DESTROY_SESSION]: (state) => state,
    [Types.POKEDEX_SUCCESS_DESTROY_SESSION]: (state) => state,
  }
);

export const ClearStateActions = Creators;
export const ClearStateTypes = Types;
