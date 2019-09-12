var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';

var Checkbox = function Checkbox(_ref) {
  var label = _ref.label,
      input = _ref.input,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      invalid = _ref$meta.invalid,
      error = _ref$meta.error,
      custom = _objectWithoutProperties(_ref, ['label', 'input', 'meta']);

  return React.createElement(MUICheckbox, _extends({ checked: !!input.value }, input, custom));
};

export default Checkbox;