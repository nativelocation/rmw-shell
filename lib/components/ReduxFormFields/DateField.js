'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _materialUiPickers = require('material-ui-pickers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable react/prop-types */


var DateField = function DateField(props) {
  var input = props.input,
      dateFormat = props.dateFormat,
      inputFormat = props.inputFormat,
      yearPuffer = props.yearPuffer,
      rest = _objectWithoutProperties(props, ['input', 'dateFormat', 'inputFormat', 'yearPuffer']);

  var onChange = input.onChange,
      value = input.value;


  var handleChange = function handleChange(value) {
    onChange((0, _moment2.default)(value).format());
  };

  var handleBlur = function handleBlur(e) {
    var value = e.target.value;
    if (inputFormat && value != null && value.length > 1) {
      var rawMoment = (0, _moment2.default)(e.target.value, inputFormat);

      if (rawMoment.month() + yearPuffer < (0, _moment2.default)().month()) {
        onChange((0, _moment2.default)(e.target.value, inputFormat).add(1, 'year').format());
      } else {
        onChange((0, _moment2.default)(e.target.value, inputFormat).format());
      }
    }
  };

  return _react2.default.createElement(_materialUiPickers.DatePicker, _extends({
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

exports.default = DateField;
module.exports = exports['default'];