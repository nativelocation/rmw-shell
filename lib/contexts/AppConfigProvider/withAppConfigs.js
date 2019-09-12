'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withAppConfigs = function withAppConfigs(Component) {
  var ChildComponent = function ChildComponent(props) {
    return _react2.default.createElement(
      _Context2.default.Consumer,
      null,
      function (value) {
        var _ref = value || {},
            appConfig = _ref.appConfig;

        return _react2.default.createElement(Component, _extends({ appConfig: _extends({}, _config2.default, appConfig) }, props));
      }
    );
  };

  return ChildComponent;
};

exports.default = withAppConfigs;
module.exports = exports['default'];