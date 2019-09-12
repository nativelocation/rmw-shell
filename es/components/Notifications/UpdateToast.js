import AltIconAvatar from '../../components/AltIconAvatar';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import UpdateIcon from '@material-ui/icons/Update';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';

export var UpdateToast = function UpdateToast(props) {
  var handleUpdate = props.handleUpdate,
      closeToast = props.closeToast,
      intl = props.intl;


  var theme = useTheme();

  var type = theme.palette.type === 'light' ? 'dark' : 'light';

  var innerTheme = createMuiTheme({
    palette: {
      type: type
    }
  });

  var title = intl ? intl.formatMessage({ id: 'update_title' }) : 'Update available!';
  var message = intl ? intl.formatMessage({ id: 'update_message' }) : 'Click here to get the new version.';

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
            onClick: handleUpdate
          },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(AltIconAvatar, { icon: React.createElement(UpdateIcon, { fontSize: 'large' }) })
          ),
          React.createElement(ListItemText, { primary: title, secondary: message }),
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
      )
    )
  );
};

export default injectIntl(UpdateToast);