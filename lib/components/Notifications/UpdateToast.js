'use strict';

exports.__esModule = true;
exports.UpdateToast = undefined;

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

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

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Update = require('@material-ui/icons/Update');

var _Update2 = _interopRequireDefault(_Update);

var _styles = require('@material-ui/styles');

var _styles2 = require('@material-ui/core/styles');

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateToast = exports.UpdateToast = function UpdateToast(props) {
  var handleUpdate = props.handleUpdate,
      closeToast = props.closeToast,
      intl = props.intl;


  var theme = (0, _styles.useTheme)();

  var type = theme.palette.type === 'light' ? 'dark' : 'light';

  var innerTheme = (0, _styles2.createMuiTheme)({
    palette: {
      type: type
    }
  });

  var title = intl ? intl.formatMessage({ id: 'update_title' }) : 'Update available!';
  var message = intl ? intl.formatMessage({ id: 'update_message' }) : 'Click here to get the new version.';

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
            onClick: handleUpdate
          },
          _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            _react2.default.createElement(_AltIconAvatar2.default, { icon: _react2.default.createElement(_Update2.default, { fontSize: 'large' }) })
          ),
          _react2.default.createElement(_ListItemText2.default, { primary: title, secondary: message }),
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
      )
    )
  );
};

exports.default = (0, _reactIntl.injectIntl)(UpdateToast);