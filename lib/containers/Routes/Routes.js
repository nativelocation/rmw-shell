'use strict';

exports.__esModule = true;
exports.Routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppRoutes = require('../../components/AppRoutes');

var _AppRoutes2 = _interopRequireDefault(_AppRoutes);

var _reactIntl = require('react-intl');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = exports.Routes = function Routes(_ref) {
  var appConfig = _ref.appConfig;

  var customRoutes = appConfig.routes ? appConfig.routes : [];
  var appRoutes = (0, _AppRoutes2.default)(appConfig.firebaseLoad);

  return _react2.default.createElement(
    'div',
    { style: { width: '100%', height: '100%' } },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      customRoutes.map(function (Route, i) {
        return _react2.default.cloneElement(Route, { key: '@customRoutes/' + i });
      }),
      appRoutes.map(function (Route, i) {
        return _react2.default.cloneElement(Route, { key: '@appRoutes/' + i });
      })
    )
  );
};

exports.default = (0, _reactRouterDom.withRouter)((0, _AppConfigProvider.withAppConfigs)(Routes));