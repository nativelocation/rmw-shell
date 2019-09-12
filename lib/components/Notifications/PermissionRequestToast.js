'use strict';

exports.__esModule = true;
exports.PermissionRequestToast = undefined;

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Notifications = require('@material-ui/icons/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _styles = require('@material-ui/styles');

var _styles2 = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermissionRequestToast = exports.PermissionRequestToast = function PermissionRequestToast(props) {
  var auth = props.auth,
      notificationPermissionRequested = props.notificationPermissionRequested,
      setPersistentValue = props.setPersistentValue,
      simpleValues = props.simpleValues,
      setSimpleValue = props.setSimpleValue,
      messaging = props.messaging,
      intl = props.intl,
      appConfig = props.appConfig,
      closeToast = props.closeToast,
      initializeMessaging = props.initializeMessaging;


  var theme = (0, _styles.useTheme)();

  var type = theme.palette.type === 'light' ? 'dark' : 'light';

  var innerTheme = (0, _styles2.createMuiTheme)({
    palette: {
      type: type
    }
  });

  return _react2.default.createElement(
    _styles.ThemeProvider,
    { theme: innerTheme },
    _react2.default.createElement(
      _Paper2.default,
      { style: { margin: -8 } },
      _react2.default.createElement(
        _Typography2.default,
        null,
        _react2.default.createElement(
          _ListItem2.default,
          null,
          _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            _react2.default.createElement(_Notifications2.default, { color: 'secondary', fontSize: 'large' })
          ),
          _react2.default.createElement(_ListItemText2.default, { primary: intl.formatMessage({ id: 'enable_notifications_message' }) })
        ),
        _react2.default.createElement(
          _DialogActions2.default,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: function onClick() {
                setPersistentValue('notificationPermissionRequested', (0, _moment2.default)());
                initializeMessaging(props);
                closeToast();
              }
            },
            intl.formatMessage({ id: 'enable' })
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              color: 'secondary',
              onClick: function onClick() {
                setPersistentValue('notificationPermissionRequested', (0, _moment2.default)());
                closeToast();
              }
            },
            intl.formatMessage({ id: 'no_thanks' })
          )
        )
      )
    )
  );
};

exports.default = PermissionRequestToast;