import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";

import epics from "redux/epics";
import reducer from "redux/reducers";

const composeFn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  process.env.NODE_ENV === `development` && createLogger(),
  createEpicMiddleware(epics)
];
const store = createStore(reducer, composeFn(applyMiddleware(...middleware), autoRehydrate()));
persistStore(store);

export default store;
