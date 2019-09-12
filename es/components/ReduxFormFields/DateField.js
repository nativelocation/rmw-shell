var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';

var DateField = function DateField(props) {
  var input = props.input,
      dateFormat = props.dateFormat,
      inputFormat = props.inputFormat,
      yearPuffer = props.yearPuffer,
      rest = _objectWithoutProperties(props, ['input', 'dateFormat', 'inputFormat', 'yearPuffer']);

  var onChange = input.onChange,
      value = input.value;


  var handleChange = function handleChange(value) {
    onChange(moment(value).format());
  };

  var handleBlur = function handleBlur(e) {
    var value = e.target.value;
    if (inputFormat && value != null && value.length > 1) {
      var rawMoment = moment(e.target.value, inputFormat);

      if (rawMoment.month() + yearPuffer < moment().month()) {
        onChange(moment(e.target.value, inputFormat).add(1, 'year').format());
      } else {
        onChange(moment(e.target.value, inputFormat).format());
      }
    }
  };

  return React.createElement(DatePicker, _extends({
    value: value ? value : null,
    onChange: handleChange,
    onBlur: handleBlur,
    format: dateFormat
  }, rest));
};

DateField.defaultProps = {
  keyboard: true,
  autoOk: true,
  disableOpenOnEnter: true,
  dateFormat: 'DD.MM.YYYY',
  inputFormat: 'DD-MM',
  yearPuffer: 3
};

export default DateField;