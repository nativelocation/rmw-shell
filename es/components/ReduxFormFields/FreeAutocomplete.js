var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { FreeAutocomplete } from 'muishift';

var FormFreeAutocomplete = function FormFreeAutocomplete(props) {
  var label = props.label,
      input = props.input,
      _props$meta = props.meta,
      touched = _props$meta.touched,
      invalid = _props$meta.invalid,
      error = _props$meta.error,
      custom = _objectWithoutProperties(props, ['label', 'input', 'meta']);

  return React.createElement(FreeAutocomplete, _extends({
    label: label,
    placeholder: label,
    error: touched && invalid,
    helperText: touched && error,
    selectedItem: input.value
  }, custom, input));
};

export default FormFreeAutocomplete;