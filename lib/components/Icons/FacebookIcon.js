'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('@material-ui/core/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookIcon = function FacebookIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    _extends({ width: 22, height: 22, viewBox: '0 0 266.893 266.895', enableBackground: 'new 0 0 266.893 266.895' }, props),
    _react2.default.createElement('path', {
      id: 'Blue_1_',
      d: 'M248.082,262.307c7.854,0,14.223-6.369,14.223-14.225V18.812 c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857,0-14.224,6.367-14.224,14.224v229.27c0,7.855,6.366,14.225,14.224,14.225 H248.082z'
    }),
    _react2.default.createElement('path', {
      id: 'f',
      fill: '#FFFFFF',
      d: 'M182.409,262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261,3.127-18.935,19.275-18.935 l20.596-0.009V45.045c-3.562-0.474-15.788-1.533-30.012-1.533c-29.695,0-50.025,18.126-50.025,51.413v28.684h-33.585v38.895h33.585 v99.803H182.409z'
    })
  );
};

exports.default = FacebookIcon;
module.exports = exports['default'];