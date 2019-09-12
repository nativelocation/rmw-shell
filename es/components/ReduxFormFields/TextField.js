var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import MUITextField from '@material-ui/core/TextField';

var TextField = function TextField(_ref) {
  var label = _ref.label,
      input = _ref.input,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      invalid = _ref$meta.invalid,
      error = _ref$meta.error,
      custom = _objectWithoutProperties(_ref, ['label', 'input', 'meta']);

  return React.createElement(MUITextField, _extends({
    label: label,
    placeholder: label,
    error: touched && invalid,
    helperText: touched && error
  }, input, custom));
};

export default TextField;