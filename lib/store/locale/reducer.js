'use strict';

exports.__esModule = true;

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var locale = function locale() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_LOCALE:
      return action.locale;

    default:
      return state;
  }
};

exports.default = locale;
module.exports = exports['default'];