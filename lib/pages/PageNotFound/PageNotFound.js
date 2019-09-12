'use strict';

exports.__esModule = true;

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Home = require('@material-ui/icons/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _reactIntl = require('react-intl');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    icon: {
      width: 192,
      height: 192,
      color: theme.palette.secondary.main
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    paper: {
      backgroundColor: theme.palette.background.default,
      height: '100vh',
      margin: 0
    },
    button: {
      marginTop: 20
    }
  };
};

var PageNotFound = function PageNotFound(_ref) {
  var intl = _ref.intl,
      appConfig = _ref.appConfig,
      classes = _ref.classes;

  var AppIcon = appConfig.appIcon;

  return _react2.default.createElement(
    _Activity2.default,
    null,
    _react2.default.createElement(
      _Paper2.default,
      { className: classes.paper },
      _react2.default.createElement(
        'div',
        { className: classes.container },
        _react2.default.createElement(AppIcon, { className: classes.icon }),
        _react2.default.createElement(
          _Typography2.default,
          { variant: 'h4' },
          intl.formatMessage({ id: 'warning_404_message' })
        ),
        _react2.default.createElement(
          _Typography2.default,
          { variant: 'subtitle1' },
          intl.formatMessage({ id: 'warning_404_description' })
        ),
        _react2.default.createElement(
          _Button2.default,
          { variant: 'fab', color: 'secondary', 'aria-label': 'home', href: '/', className: classes.button },
          _react2.default.createElement(_Home2.default, null)
        )
      )
    )
  );
};

exports.default = (0, _reactIntl.injectIntl)((0, _styles.withStyles)(styles, { withTheme: true })((0, _AppConfigProvider.withAppConfigs)(PageNotFound)));
module.exports = exports['default'];