import ArroWDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArroWDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Avatar from '@material-ui/core/Avatar';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
  return {
    paper: {
      backgroundColor: theme.palette.primary.dark,
      margin: 0,
      padding: 0
    },
    listItem: {
      color: theme.palette.primary.contrastText
    },
    icon: {
      color: theme.palette.primary.contrastText
    },
    button: {
      // width: 15
    }
  };
};

export var DrawerHeader = function DrawerHeader(props) {
  var theme = props.theme,
      intl = props.intl,
      auth = props.auth,
      dialogs = props.dialogs,
      setDialogIsOpen = props.setDialogIsOpen,
      classes = props.classes,
      drawer = props.drawer,
      setDrawerOpen = props.setDrawerOpen,
      setDrawerUseMinified = props.setDrawerUseMinified,
      width = props.width;


  return React.createElement(
    Paper,
    { className: classes.paper },
    auth.isAuthorised && React.createElement(
      'div',
      null,
      React.createElement(
        List,
        null,
        React.createElement(
          ListItem,
          null,
          auth.photoURL && React.createElement(
            ListItemAvatar,
            null,
            React.createElement(Avatar, { src: auth.photoURL, alt: 'user' })
          ),
          !auth.photoURL && React.createElement(
            ListItemAvatar,
            null,
            React.createElement(
              Avatar,
              null,
              ' ',
              React.createElement(PersonIcon, null),
              ' '
            )
          ),
          React.createElement(
            Hidden,
            { smDown: true, implementation: 'css' },
            React.createElement(
              ListItemSecondaryAction,
              null,
              React.createElement(
                IconButton,
                {
                  onClick: function onClick() {
                    setDrawerOpen(false);
                  }
                },
                React.createElement(ChromeReaderMode, { classes: { root: classes.icon } })
              ),
              React.createElement(
                IconButton,
                {
                  className: classes.button,
                  onClick: function onClick() {
                    setDrawerUseMinified(false);
                  }
                },
                theme.direction === 'rtl' && React.createElement(ChevronRight, { classes: { root: classes.icon } }),
                theme.direction !== 'rtl' && React.createElement(ChevronLeft, { classes: { root: classes.icon } })
              )
            )
          )
        ),
        React.createElement(
          ListItem,
          {
            onClick: function onClick() {
              setDialogIsOpen('auth_menu', !dialogs.auth_menu);
            }
          },
          !drawer.open && width !== 'sm' && width !== 'xs' && auth.photoURL && React.createElement(
            ListItemAvatar,
            null,
            React.createElement(Avatar, { src: auth.photoURL, alt: 'person', style: { marginLeft: -7, marginTop: 3 } })
          ),
          !drawer.open && width !== 'sm' && width !== 'xs' && !auth.photoURL && React.createElement(
            ListItemAvatar,
            null,
            React.createElement(
              Avatar,
              { style: { marginLeft: -7, marginTop: 3 } },
              ' ',
              React.createElement(PersonIcon, null),
              ' '
            )
          ),
          React.createElement(ListItemText, {
            classes: { primary: classes.listItem, secondary: classes.listItem },
            style: {
              marginLeft: !drawer.open && width !== 'sm' && width !== 'xs' && auth.photoURL ? 7 : undefined
            },
            primary: auth.displayName,
            secondary: auth.email
          }),
          drawer.open && React.createElement(
            ListItemSecondaryAction,
            {
              onClick: function onClick() {
                setDialogIsOpen('auth_menu', !dialogs.auth_menu);
              }
            },
            React.createElement(
              IconButton,
              null,
              dialogs.auth_menu && React.createElement(ArroWDropUpIcon, { classes: { root: classes.icon } }),
              !dialogs.auth_menu && React.createElement(ArroWDropDownIcon, { classes: { root: classes.icon } })
            )
          )
        )
      )
    ),
    !auth.isAuthorised && React.createElement(
      List,
      null,
      React.createElement(
        ListItem,
        null,
        React.createElement(ListItemText, { classes: { primary: classes.listItem }, primary: intl.formatMessage({ id: 'app_name' }) }),
        React.createElement(
          Hidden,
          { smDown: true, implementation: 'css' },
          React.createElement(
            ListItemSecondaryAction,
            null,
            React.createElement(
              IconButton,
              {
                className: classes.button,
                onClick: function onClick() {
                  setDrawerUseMinified(false);
                }
              },
              theme.direction === 'rtl' && React.createElement(ChevronRight, { classes: { root: classes.icon } }),
              theme.direction !== 'rtl' && React.createElement(ChevronLeft, { classes: { root: classes.icon } })
            )
          )
        )
      )
    )
  );
};

export default compose(injectIntl, withAppConfigs, withWidth(), withStyles(styles, { withTheme: true }))(DrawerHeader);