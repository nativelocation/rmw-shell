var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import React from 'react';

var AltIconAvatar = function AltIconAvatar(props) {
  var src = props.src,
      iconName = props.iconName,
      icon = props.icon,
      rest = _objectWithoutProperties(props, ['src', 'iconName', 'icon']);

  if (src) {
    return React.createElement(
      ListItemAvatar,
      null,
      React.createElement(Avatar, _extends({ src: src }, rest))
    );
  } else {
    return React.createElement(
      ListItemAvatar,
      null,
      React.createElement(
        Avatar,
        rest,
        icon
      )
    );
  }
};

export default AltIconAvatar;