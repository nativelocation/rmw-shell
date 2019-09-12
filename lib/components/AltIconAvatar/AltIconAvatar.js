'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _ListItemAvatar = require('@material-ui/core/ListItemAvatar');

var _ListItemAvatar2 = _interopRequireDefault(_ListItemAvatar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AltIconAvatar = function AltIconAvatar(props) {
  var src = props.src,
      iconName = props.iconName,
      icon = props.icon,
      rest = _objectWithoutProperties(props, ['src', 'iconName', 'icon']);

  if (src) {
    return _react2.default.createElement(
      _ListItemAvatar2.default,
      null,
      _react2.default.createElement(_Avatar2.default, _extends({ src: src }, rest))
    );
  } else {
    return _react2.default.createElement(
      _ListItemAvatar2.default,
      null,
      _react2.default.createElement(
        _Avatar2.default,
        rest,
        icon
      )
    );
  }
};

exports.default = AltIconAvatar;
module.exports = exports['default'];