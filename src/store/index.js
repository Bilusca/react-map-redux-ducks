import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import "../config/reactotron";
import reducers from "./ducks";
import rootSaga from "./sagas";

const middlewares = [];

const sagaMonitor =
  process.env.NODE_ENV === "development"
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// middlewares.push(console.tron.createEnhancer());

const reactoTronRedux =
  process.env.NODE_ENV === "development" ? console.tron.createEnhancer() : null;

// middlewares.push(reactoTronRedux);

middlewares.push(sagaMiddleware);

const store = createStore(reducers, compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

export default store;
