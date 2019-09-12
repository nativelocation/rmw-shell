var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as types from './types';

var initialState = {
  source: 'light',
  isNightModeOn: false
};

var themeSource = function themeSource() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_THEME:
      return _extends({}, state, { source: action.theme });
    case types.SWITCH_NIGHT_MODE:
      return _extends({}, state, { isNightModeOn: action.isNightModeOn });
    default:
      return state;
  }
};

export default themeSource;