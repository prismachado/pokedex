import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import ReactotronConfig from "../../../ReactoTron";
import redux from "../index";
import applyAppStateListener from "redux-enhancer-react-native-appstate";

//const sagaMiddleware = createSagaMiddleware();

//const store = createStore(combineReducers({}), applyMiddleware(sagaMiddleware));

const middlewares = [];

const sagaMonitor = __DEV__
  ? ReactotronConfig.createSagaMonitor?.()
  : undefined;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
  onError: (error) => {
    const message = error.message || "saga-root-error";
  },
});

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyAppStateListener(),
      applyMiddleware(...middlewares),
      // @ts-ignore - this is only undefined if not in __DEV__
      ReactotronConfig.createEnhancer()
    )
  : compose(applyAppStateListener(), applyMiddleware(...middlewares));

//const persistedReducer = getPersistedReducer(rootReducers);

const store = createStore(redux.reducer, composer);
sagaMiddleware.run(redux.saga);

//export const persistor = getPersistor(store);

export default store;
