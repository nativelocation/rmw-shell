import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Notifications from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';

export var PermissionRequestToast = function PermissionRequestToast(props) {
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


  var theme = useTheme();

  var type = theme.palette.type === 'light' ? 'dark' : 'light';

  var innerTheme = createMuiTheme({
    palette: {
      type: type
    }
  });

  return React.createElement(
    ThemeProvider,
    { theme: innerTheme },
    React.createElement(
      Paper,
      { style: { margin: -8 } },
      React.createElement(
        Typography,
        null,
        React.createElement(
          ListItem,
          null,
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(Notifications, { color: 'secondary', fontSize: 'large' })
          ),
          React.createElement(ListItemText, { primary: intl.formatMessage({ id: 'enable_notifications_message' }) })
        ),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            {
              onClick: function onClick() {
                setPersistentValue('notificationPermissionRequested', moment());
                initializeMessaging(props);
                closeToast();
              }
            },
            intl.formatMessage({ id: 'enable' })
          ),
          React.createElement(
            Button,
            {
              color: 'secondary',
              onClick: function onClick() {
                setPersistentValue('notificationPermissionRequested', moment());
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

export default PermissionRequestToast;