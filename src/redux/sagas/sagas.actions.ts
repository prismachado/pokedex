import { reducer } from "./../reducers/reducer.pokemon";
import { put, takeLatest } from "redux-saga/effects";
import { PokemonsActions } from "../reducers/reducer.pokemon";
import {
  ClearStateActions,
  ClearStateTypes,
} from "../reducers/reducer.actions";

function* clearState() {
  try {
    yield put(PokemonsActions.reset());
    yield put(ClearStateActions.pokedexSuccessDestroySession());
  } catch (err) {
    console.error("Erro na limpeza", err.message());
  }
}

export default function* root() {
  yield takeLatest(ClearStateTypes.POKEDEX_REQUEST_DESTROY_SESSION, clearState);
}
