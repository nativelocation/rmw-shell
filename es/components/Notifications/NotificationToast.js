import AltIconAvatar from '../../components/AltIconAvatar';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Notifications from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export var NotificationToast = function NotificationToast(props) {
  var notification = props.notification,
      closeToast = props.closeToast;


  var theme = useTheme();

  var type = theme.palette.type === 'light' ? 'dark' : 'light';

  var innerTheme = createMuiTheme({
    palette: {
      type: type
    }
  });

  var icon = notification.icon,
      title = notification.title,
      body = notification.body,
      autoClose = notification.autoClose;


  return React.createElement(
    ThemeProvider,
    { theme: innerTheme },
    React.createElement(
      Paper,
      { style: { margin: -8, marginBottom: -8 } },
      React.createElement(
        List,
        { component: 'div' },
        React.createElement(
          ListItem,
          {

            onClick: function onClick() {
              notification.onClick();
            }
          },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(AltIconAvatar, { src: icon, icon: React.createElement(Notifications, { fontSize: 'large' }) })
          ),
          React.createElement(ListItemText, { primary: title, secondary: body }),
          React.createElement(
            ListItemSecondaryAction,
            { onClick: closeToast },
            React.createElement(
              IconButton,
              { edge: 'end', 'aria-label': 'close' },
              React.createElement(Close, null)
            )
          )
        )
      ),
      autoClose && React.createElement(LinearProgress, { color: 'secondary', variant: 'determinate', value: 0 })
    )
  );
};

export default NotificationToast;