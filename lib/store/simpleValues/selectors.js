"use strict";

exports.__esModule = true;
var getSimpleValue = function getSimpleValue(state, name, defValue) {
  var _ref = state.simpleValues ? state.simpleValues : {},
      _ref$name = _ref[name],
      simpleValue = _ref$name === undefined ? defValue : _ref$name;

  return simpleValue;
};

exports.default = getSimpleValue;
module.exports = exports["default"];