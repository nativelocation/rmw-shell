'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slider = require('@material-ui/core/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Slider = function Slider(_ref) {
  var _ref$input = _ref.input,
      _onChange = _ref$input.onChange,
      value = _ref$input.value,
      onChangeFromField = _ref.onChange,
      custom = _objectWithoutProperties(_ref, ['input', 'onChange']);

  return _react2.default.createElement(_Slider2.default, _extends({
    value: value
  }, custom, {
    onChange: function onChange(event, value) {
      _onChange(value);
      if (onChangeFromField) {
        onChangeFromField(value);
      }
    }
  }));
};

exports.default = Slider;
module.exports = exports['default'];