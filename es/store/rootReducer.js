var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

import * as authTypes from './auth/types';

var rootReducer = function rootReducer(appReducer, initState, state, action) {
  if (action.type === authTypes.USER_LOGOUT) {
    // eslint-disable-next-line no-empty-pattern
    var _state = state;

    _objectDestructuringEmpty(_state);

    state = _extends({}, initState);
  }

  return appReducer(state, action);
};

export default rootReducer;