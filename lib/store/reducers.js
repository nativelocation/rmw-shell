'use strict';

exports.__esModule = true;
exports.appReducers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reducer = require('./dialogs/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('material-ui-filter/lib/store/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

var _firekit = require('firekit');

var _firekit2 = _interopRequireDefault(_firekit);

var _reduxForm = require('redux-form');

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _reducer5 = require('./locale/reducer');

var _reducer6 = _interopRequireDefault(_reducer5);

var _reducer7 = require('./persistentValues/reducer');

var _reducer8 = _interopRequireDefault(_reducer7);

var _rootReducer = require('./rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _reducer9 = require('./simpleValues/reducer');

var _reducer10 = _interopRequireDefault(_reducer9);

var _reducer11 = require('./themeSource/reducer');

var _reducer12 = _interopRequireDefault(_reducer11);

var _reducer13 = require('./drawer/reducer');

var _reducer14 = _interopRequireDefault(_reducer13);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appReducers = exports.appReducers = _extends({}, _firekit2.default, {
  dialogs: _reducer2.default,
  filters: _reducer4.default,
  form: _reduxForm.reducer,
  locale: _reducer6.default,
  persistentValues: _reducer8.default,
  simpleValues: _reducer10.default,
  drawer: _reducer14.default,
  themeSource: _reducer12.default
});

var appReducer = (0, _redux.combineReducers)(appReducers);

exports.default = function (state, action) {
  return (0, _rootReducer2.default)(appReducer, _init2.default, state, action);
};