'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _types = require('./auth/types');

var authTypes = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var rootReducer = function rootReducer(appReducer, initState, state, action) {
  if (action.type === authTypes.USER_LOGOUT) {
    // eslint-disable-next-line no-empty-pattern
    var _state = state;

    _objectDestructuringEmpty(_state);

    state = _extends({}, initState);
  }

  return appReducer(state, action);
};

exports.default = rootReducer;
module.exports = exports['default'];