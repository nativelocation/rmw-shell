'use strict';

exports.__esModule = true;

var _AccountBox = require('@material-ui/icons/AccountBox');

var _AccountBox2 = _interopRequireDefault(_AccountBox);

var _Brightness = require('@material-ui/icons/Brightness2');

var _Brightness2 = _interopRequireDefault(_Brightness);

var _Brightness3 = require('@material-ui/icons/Brightness7');

var _Brightness4 = _interopRequireDefault(_Brightness3);

var _Business = require('@material-ui/icons/Business');

var _Business2 = _interopRequireDefault(_Business);

var _Chat = require('@material-ui/icons/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _Dashboard = require('@material-ui/icons/Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _FlashOn = require('@material-ui/icons/FlashOn');

var _FlashOn2 = _interopRequireDefault(_FlashOn);

var _Group = require('@material-ui/icons/Group');

var _Group2 = _interopRequireDefault(_Group);

var _InfoOutlined = require('@material-ui/icons/InfoOutlined');

var _InfoOutlined2 = _interopRequireDefault(_InfoOutlined);

var _Language = require('@material-ui/icons/Language');

var _Language2 = _interopRequireDefault(_Language);

var _List = require('@material-ui/icons/List');

var _List2 = _interopRequireDefault(_List);

var _Lock = require('@material-ui/icons/Lock');

var _Lock2 = _interopRequireDefault(_Lock);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Security = require('@material-ui/icons/Security');

var _Security2 = _interopRequireDefault(_Security);

var _SettingsApplications = require('@material-ui/icons/SettingsApplications');

var _SettingsApplications2 = _interopRequireDefault(_SettingsApplications);

var _Style = require('@material-ui/icons/Style');

var _Style2 = _interopRequireDefault(_Style);

var _TextsmsRounded = require('@material-ui/icons/TextsmsRounded');

var _TextsmsRounded2 = _interopRequireDefault(_TextsmsRounded);

var _VerticalAlignBottom = require('@material-ui/icons/VerticalAlignBottom');

var _VerticalAlignBottom2 = _interopRequireDefault(_VerticalAlignBottom);

var _locales = require('./locales');

var _locales2 = _interopRequireDefault(_locales);

var _themes = require('./themes');

var _themes2 = _interopRequireDefault(_themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMenuItems = function getMenuItems(props) {
  var locale = props.locale,
      updateTheme = props.updateTheme,
      switchNightMode = props.switchNightMode,
      updateLocale = props.updateLocale,
      intl = props.intl,
      themeSource = props.themeSource,
      auth = props.auth,
      isGranted = props.isGranted,
      deferredPrompt = props.deferredPrompt,
      isAppInstallable = props.isAppInstallable,
      isAppInstalled = props.isAppInstalled,
      isAuthMenu = props.isAuthMenu,
      handleSignOut = props.handleSignOut;


  var isAuthorised = auth.isAuthorised;

  var themeItems = _themes2.default.map(function (t) {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: function onClick() {
        updateTheme(t.id);
      },
      leftIcon: _react2.default.createElement(_Style2.default, { style: { color: t.color } })
    };
  });

  var localeItems = _locales2.default.map(function (l) {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: function onClick() {
        updateLocale(l.locale);
      },
      leftIcon: _react2.default.createElement(_Language2.default, null)
    };
  });

  if (isAuthMenu) {
    return [{
      value: '/my_account',
      primaryText: intl.formatMessage({ id: 'my_account' }),
      leftIcon: _react2.default.createElement(_AccountBox2.default, null)
    }, {
      value: '/signin',
      onClick: handleSignOut,
      primaryText: intl.formatMessage({ id: 'sign_out' }),
      leftIcon: _react2.default.createElement(_Lock2.default, null)
    }];
  }

  return [{
    value: '/dashboard',
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'dashboard' }),
    leftIcon: _react2.default.createElement(_Dashboard2.default, null)
  }, {
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'chats' }),
    primaryTogglesNestedList: true,
    leftIcon: _react2.default.createElement(_Chat2.default, null),
    nestedItems: [{
      value: '/chats',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'private' }),
      leftIcon: _react2.default.createElement(_Person2.default, null)
    }, {
      value: '/public_chats',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'public' }),
      leftIcon: _react2.default.createElement(_Group2.default, null)
    }]
  }, {
    value: '/companies',
    visible: isGranted('read_companies'),
    primaryText: intl.formatMessage({ id: 'companies' }),
    leftIcon: _react2.default.createElement(_Business2.default, null)
  }, {
    value: '/tasks',
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'tasks' }),
    leftIcon: _react2.default.createElement(_List2.default, null)
  }, {
    value: '/about',
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'about' }),
    leftIcon: _react2.default.createElement(_InfoOutlined2.default, null)
  }, {
    visible: isAuthorised, // In prod: isGranted('administration'),
    primaryTogglesNestedList: true,
    primaryText: intl.formatMessage({ id: 'administration' }),
    leftIcon: _react2.default.createElement(_Security2.default, null),
    nestedItems: [{
      value: '/users',
      visible: isAuthorised, // In prod: isGranted('read_users'),
      primaryText: intl.formatMessage({ id: 'users' }),
      leftIcon: _react2.default.createElement(_Group2.default, null)
    }, {
      value: '/roles',
      visible: isGranted('read_roles'),
      primaryText: intl.formatMessage({ id: 'roles' }),
      leftIcon: _react2.default.createElement(_AccountBox2.default, null)
    }]
  }, {
    divider: true,
    visible: isAuthorised
  }, {
    primaryText: intl.formatMessage({ id: 'settings' }),
    primaryTogglesNestedList: true,
    leftIcon: _react2.default.createElement(_SettingsApplications2.default, null),
    nestedItems: [{
      primaryText: intl.formatMessage({ id: 'theme' }),
      secondaryText: intl.formatMessage({ id: themeSource.source }),
      primaryTogglesNestedList: true,
      leftIcon: _react2.default.createElement(_Style2.default, null),
      nestedItems: themeItems
    }, {
      primaryText: intl.formatMessage({ id: 'language' }),
      secondaryText: intl.formatMessage({ id: locale }),
      primaryTogglesNestedList: true,
      leftIcon: _react2.default.createElement(_Language2.default, null),
      nestedItems: localeItems
    }]
  }, {
    onClick: function onClick() {
      switchNightMode(!themeSource.isNightModeOn);
    },
    primaryText: intl.formatMessage({ id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode' }),
    leftIcon: themeSource.isNightModeOn ? _react2.default.createElement(_Brightness4.default, null) : _react2.default.createElement(_Brightness2.default, null)
  }, {
    visible: isAppInstallable && !isAppInstalled,
    onClick: function onClick() {
      deferredPrompt.prompt();
    },
    primaryText: intl.formatMessage({ id: 'install' }),
    leftIcon: _react2.default.createElement(_VerticalAlignBottom2.default, null)
  }];
};

exports.default = getMenuItems;
module.exports = exports['default'];