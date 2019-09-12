var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import dialogs from './dialogs/reducer';
import filterReducer from 'material-ui-filter/lib/store/reducer';
import firekitReducers from 'firekit';
import { reducer as formReducer } from 'redux-form';
import initState from './init';
import locale from './locale/reducer';
import persistentValues from './persistentValues/reducer';
import rootReducer from './rootReducer';
import simpleValues from './simpleValues/reducer';
import themeSource from './themeSource/reducer';
import drawer from './drawer/reducer';
import { combineReducers } from 'redux';

export var appReducers = _extends({}, firekitReducers, {
  dialogs: dialogs,
  filters: filterReducer,
  form: formReducer,
  locale: locale,
  persistentValues: persistentValues,
  simpleValues: simpleValues,
  drawer: drawer,
  themeSource: themeSource
});

var appReducer = combineReducers(appReducers);

export default (function (state, action) {
  return rootReducer(appReducer, initState, state, action);
});