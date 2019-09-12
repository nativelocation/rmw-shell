'use strict';

exports.__esModule = true;
exports.default = IconMenu;

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Menu = require('@material-ui/core/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MoreVert = require('@material-ui/icons/MoreVert');

var _MoreVert2 = _interopRequireDefault(_MoreVert);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IconMenu(_ref) {
  var icon = _ref.icon,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      buttonStyle = _ref.buttonStyle;

  var _React$useState = _react2.default.useState(null),
      anchorEl = _React$useState[0],
      setAnchorEl = _React$useState[1];

  var open = Boolean(anchorEl);

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var handleOptionClick = function handleOptionClick(option) {
    var onClick = option.onClick;


    if (onClick) {
      onClick();
    }

    handleClose();
  };

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _IconButton2.default,
      {
        'aria-label': 'more',
        'aria-controls': 'long-menu',
        'aria-haspopup': 'true',
        onClick: handleClick,
        style: buttonStyle
      },
      icon ? icon : _react2.default.createElement(_MoreVert2.default, null)
    ),
    open && _react2.default.createElement(
      _Menu2.default,
      { id: 'icon-menu', anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose },
      options.filter(function (o) {
        return !o.hidden;
      }).map(function (option, i) {
        return _react2.default.createElement(
          _MenuItem2.default,
          { key: 'option_' + i, onClick: function onClick() {
              return handleOptionClick(option);
            } },
          option.icon && _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            option.icon
          ),
          option.icon && _react2.default.createElement(_ListItemText2.default, { primary: option.text })
        );
      })
    )
  );
}
module.exports = exports['default'];