var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import AppBar from '@material-ui/core/AppBar';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import drawerActions from '../../store/drawer/actions';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

var drawerWidth = 240;

var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 12
    },
    toolbar: _extends({
      alignItems: 'center',
      justifyContent: 'flex-end'
    }, theme.mixins.toolbar),
    content: {
      flex: 1,
      backgroundColor: theme.palette.background.default
    },

    appBarShift: {
      //marginLeft: drawerWidth,
      width: 'calc(100% - ' + drawerWidth + 'px)',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    hide: {
      display: 'none'
    },
    grow: {
      flex: '1 1 auto'
    }
  };
};

var Activity = function Activity(_ref) {
  var width = _ref.width,
      classes = _ref.classes,
      theme = _ref.theme,
      children = _ref.children,
      intl = _ref.intl,
      title = _ref.title,
      pageTitle = _ref.pageTitle,
      appBarContent = _ref.appBarContent,
      isLoading = _ref.isLoading,
      onBackClick = _ref.onBackClick;

  var drawer = useSelector(function (state) {
    return state.drawer;
  }, shallowEqual);
  var isOffline = useSelector(function (_ref2) {
    var connection = _ref2.connection;
    return connection ? !connection.isConnected : false;
  }, shallowEqual);

  var _bindActionCreators = bindActionCreators(_extends({}, drawerActions), useDispatch()),
      setDrawerMobileOpen = _bindActionCreators.setDrawerMobileOpen,
      setDrawerOpen = _bindActionCreators.setDrawerOpen;

  var handleDrawerMenuClick = function handleDrawerMenuClick() {
    var smDown = isWidthDown('sm', width);

    if (!drawer.open) {
      setDrawerOpen(true);
      if (smDown) {
        setDrawerMobileOpen(!drawer.mobileOpen);
      }
    } else {
      setDrawerMobileOpen(!drawer.mobileOpen);
    }
  };

  var headerTitle = '';

  if (typeof title === 'string' || title instanceof String) {
    headerTitle = title;
  }

  if (pageTitle) {
    headerTitle = pageTitle;
  }

  //const smDown = width === 'sm' || width === 'xs'
  var smDown = isWidthDown('sm', width);

  return React.createElement(
    'div',
    { className: classes.root },
    React.createElement(
      Helmet,
      null,
      React.createElement('meta', { name: 'theme-color', content: theme.palette.primary.main }),
      React.createElement('meta', { name: 'apple-mobile-web-app-status-bar-style', content: theme.palette.primary.main }),
      React.createElement('meta', { name: 'msapplication-navbutton-color', content: theme.palette.primary.main }),
      React.createElement(
        'title',
        null,
        headerTitle
      )
    ),
    React.createElement(
      AppBar,
      {
        position: width !== 'sm' && width !== 'xs' ? 'absolute' : undefined,
        className: width !== 'sm' && width !== 'xs' ? classNames(classes.appBar, drawer.open && classes.appBarShift) : classes.appBar
      },
      React.createElement(
        Toolbar,
        { disableGutters: true },
        React.createElement(
          IconButton,
          {
            color: 'inherit',
            'aria-label': 'open drawer',
            onClick: handleDrawerMenuClick,
            className: classNames(!smDown && classes.menuButton, drawer.open && !smDown && classes.hide, onBackClick && classes.hide)
          },
          React.createElement(MenuIcon, null)
        ),
        React.createElement(
          IconButton,
          {
            color: 'inherit',
            'aria-label': 'open drawer',
            onClick: onBackClick,
            className: classNames(!smDown && classes.menuButton, !onBackClick && classes.hide)
          },
          React.createElement(ChevronLeft, null)
        ),
        !onBackClick && drawer.open && React.createElement('div', { style: { marginRight: 32 } }),
        React.createElement(
          Typography,
          { variant: 'h6', color: 'inherit', noWrap: true },
          headerTitle
        ),
        React.createElement('div', { className: classes.grow }),
        appBarContent
      )
    ),
    React.createElement('div', { className: classes.toolbar }),
    isLoading && React.createElement(LinearProgress, null),
    isOffline && React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: 15,
          backgroundColor: theme.palette.secondary.main
        }
      },
      React.createElement(
        Typography,
        { variant: 'caption', color: 'textSecondary', noWrap: true },
        intl.formatMessage({ id: 'offline' })
      )
    ),
    React.createElement(
      'main',
      { className: classes.content },
      children
    )
  );
};

export default compose(withWidth(), withStyles(styles, { withTheme: true }), injectIntl)(Activity);