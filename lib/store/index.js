'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // default: localStorage if web, AsyncStorage if react-native


exports.default = configureStore;

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxPersist = require('redux-persist');

var _storage = require('redux-persist/es/storage');

var _storage2 = _interopRequireDefault(_storage);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var store = void 0;

  var logger = (0, _reduxLogger.createLogger)({});

  var middlewares = [_reduxThunk2.default];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); // DEV middlewares
  }

  var composeEnhancers = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : _redux.compose;

  var enhancer = composeEnhancers(_redux.applyMiddleware.apply(undefined, middlewares));

  var persistorConfig = {
    key: 'root',
    storage: _storage2.default,
    blacklist: ['auth', 'form', 'connection', 'initialization', 'messaging', 'simpleValues']
  };

  var reducer = (0, _reduxPersist.persistReducer)(persistorConfig, _reducers2.default);

  store = (0, _redux.createStore)(reducer, _init2.default, enhancer);

  try {
    (0, _reduxPersist.persistStore)(store);
  } catch (e) {
    console.log(e);
  }

  return store;
}
module.exports = exports['default'];