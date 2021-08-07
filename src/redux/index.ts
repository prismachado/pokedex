import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { reducer as reducerPokemons } from "./reducers/reducer.pokemon";
import { reducer as reducerActions } from "./reducers/reducer.actions";

import sagasPokemons from "./sagas/saga.pokemon";
import sagasActions from "./sagas/sagas.actions";

import { PokedexReducers } from "./models/types.redux";

const pokedexReducers = combineReducers({
  [PokedexReducers.pokemons]: reducerPokemons,
  [PokedexReducers.actionsState]: reducerActions,
});

const pokedexRootSagas = function* rootSagas() {
  return yield all([sagasPokemons(), sagasActions()]);
};

const redux = {
  saga: pokedexRootSagas,
  reducer: pokedexReducers,
};

export default redux;
