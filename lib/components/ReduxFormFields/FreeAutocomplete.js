'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _muishift = require('muishift');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormFreeAutocomplete = function FormFreeAutocomplete(props) {
  var label = props.label,
      input = props.input,
      _props$meta = props.meta,
      touched = _props$meta.touched,
      invalid = _props$meta.invalid,
      error = _props$meta.error,
      custom = _objectWithoutProperties(props, ['label', 'input', 'meta']);

  return _react2.default.createElement(_muishift.FreeAutocomplete, _extends({
    label: label,
    placeholder: label,
    error: touched && invalid,
    helperText: touched && error,
    selectedItem: input.value
  }, custom, input));
};

exports.default = FormFreeAutocomplete;
module.exports = exports['default'];