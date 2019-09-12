'use strict';

exports.__esModule = true;

var _DrawerContent = require('./DrawerContent');

var _DrawerContent2 = _interopRequireDefault(_DrawerContent);

var _DrawerHeader = require('./DrawerHeader');

var _DrawerHeader2 = _interopRequireDefault(_DrawerHeader);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ResponsiveDrawer = require('../../containers/ResponsiveDrawer');

var _ResponsiveDrawer2 = _interopRequireDefault(_ResponsiveDrawer);

var _Scrollbar = require('../../components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _reactIntl = require('react-intl');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Drawer = function Drawer(_ref) {
  var history = _ref.history,
      appConfig = _ref.appConfig;

  var path = history.location.pathname;
  var Header = appConfig.drawerHeader ? appConfig.drawerHeader : _DrawerHeader2.default;

  return _react2.default.createElement(
    _ResponsiveDrawer2.default,
    null,
    _react2.default.createElement(Header, null),
    _react2.default.createElement(_DrawerContent2.default, { path: path, history: history })
  );
};

exports.default = (0, _reactRouterDom.withRouter)((0, _AppConfigProvider.withAppConfigs)(Drawer));
module.exports = exports['default'];