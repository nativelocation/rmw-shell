import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';

export default function IconMenu(_ref) {
  var icon = _ref.icon,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      buttonStyle = _ref.buttonStyle;

  var _React$useState = React.useState(null),
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

  return React.createElement(
    'div',
    null,
    React.createElement(
      IconButton,
      {
        'aria-label': 'more',
        'aria-controls': 'long-menu',
        'aria-haspopup': 'true',
        onClick: handleClick,
        style: buttonStyle
      },
      icon ? icon : React.createElement(MoreVertIcon, null)
    ),
    open && React.createElement(
      Menu,
      { id: 'icon-menu', anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose },
      options.filter(function (o) {
        return !o.hidden;
      }).map(function (option, i) {
        return React.createElement(
          MenuItem,
          { key: 'option_' + i, onClick: function onClick() {
              return handleOptionClick(option);
            } },
          option.icon && React.createElement(
            ListItemIcon,
            null,
            option.icon
          ),
          option.icon && React.createElement(ListItemText, { primary: option.text })
        );
      })
    )
  );
}