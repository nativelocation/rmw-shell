import Activity from '../../containers/Activity';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { injectIntl } from 'react-intl';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withStyles } from '@material-ui/core/styles';

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

  return React.createElement(
    Activity,
    null,
    React.createElement(
      Paper,
      { className: classes.paper },
      React.createElement(
        'div',
        { className: classes.container },
        React.createElement(AppIcon, { className: classes.icon }),
        React.createElement(
          Typography,
          { variant: 'h4' },
          intl.formatMessage({ id: 'warning_404_message' })
        ),
        React.createElement(
          Typography,
          { variant: 'subtitle1' },
          intl.formatMessage({ id: 'warning_404_description' })
        ),
        React.createElement(
          Button,
          { variant: 'fab', color: 'secondary', 'aria-label': 'home', href: '/', className: classes.button },
          React.createElement(Home, null)
        )
      )
    )
  );
};

export default injectIntl(withStyles(styles, { withTheme: true })(withAppConfigs(PageNotFound)));