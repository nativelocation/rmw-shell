var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import initState from './init';

export default function configureStore() {
  var store = void 0;

  var logger = createLogger({});

  var middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); // DEV middlewares
  }

  var composeEnhancers = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

  var enhancer = composeEnhancers(applyMiddleware.apply(undefined, middlewares));

  var persistorConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth', 'form', 'connection', 'initialization', 'messaging', 'simpleValues']
  };

  var reducer = persistReducer(persistorConfig, reducers);

  store = createStore(reducer, initState, enhancer);

  try {
    persistStore(store);
  } catch (e) {
    console.log(e);
  }

  return store;
}