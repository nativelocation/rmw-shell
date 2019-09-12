'use strict';

exports.__esModule = true;
exports.NotificationToast = undefined;

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Notifications = require('@material-ui/icons/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/styles');

var _styles2 = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationToast = exports.NotificationToast = function NotificationToast(props) {
  var notification = props.notification,
      closeToast = props.closeToast;


  var theme = (0, _styles.useTheme)();

  var type = theme.palette.type === 'light' ? 'dark' : 'light';

  var innerTheme = (0, _styles2.createMuiTheme)({
    palette: {
      type: type
    }
  });

  var icon = notification.icon,
      title = notification.title,
      body = notification.body,
      autoClose = notification.autoClose;


  return _react2.default.createElement(
    _styles.ThemeProvider,
    { theme: innerTheme },
    _react2.default.createElement(
      _Paper2.default,
      { style: { margin: -8, marginBottom: -8 } },
      _react2.default.createElement(
        _List2.default,
        { component: 'div' },
        _react2.default.createElement(
          _ListItem2.default,
          {

            onClick: function onClick() {
              notification.onClick();
            }
          },
          _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            _react2.default.createElement(_AltIconAvatar2.default, { src: icon, icon: _react2.default.createElement(_Notifications2.default, { fontSize: 'large' }) })
          ),
          _react2.default.createElement(_ListItemText2.default, { primary: title, secondary: body }),
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            { onClick: closeToast },
            _react2.default.createElement(
              _IconButton2.default,
              { edge: 'end', 'aria-label': 'close' },
              _react2.default.createElement(_Close2.default, null)
            )
          )
        )
      ),
      autoClose && _react2.default.createElement(_LinearProgress2.default, { color: 'secondary', variant: 'determinate', value: 0 })
    )
  );
};

exports.default = NotificationToast;