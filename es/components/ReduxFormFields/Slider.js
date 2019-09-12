var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import MUISlider from '@material-ui/core/Slider';

var Slider = function Slider(_ref) {
  var _ref$input = _ref.input,
      _onChange = _ref$input.onChange,
      value = _ref$input.value,
      onChangeFromField = _ref.onChange,
      custom = _objectWithoutProperties(_ref, ['input', 'onChange']);

  return React.createElement(MUISlider, _extends({
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

export default Slider;