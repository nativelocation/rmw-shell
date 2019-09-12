'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _ChevronLeft = require('@material-ui/icons/ChevronLeft');

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Menu = require('@material-ui/icons/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actions = require('../../store/drawer/actions');

var _actions2 = _interopRequireDefault(_actions);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _reactHelmet = require('react-helmet');

var _redux = require('redux');

var _reactIntl = require('react-intl');

var _reactRedux = require('react-redux');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var drawer = (0, _reactRedux.useSelector)(function (state) {
    return state.drawer;
  }, _reactRedux.shallowEqual);
  var isOffline = (0, _reactRedux.useSelector)(function (_ref2) {
    var connection = _ref2.connection;
    return connection ? !connection.isConnected : false;
  }, _reactRedux.shallowEqual);

  var _bindActionCreators = (0, _redux.bindActionCreators)(_extends({}, _actions2.default), (0, _reactRedux.useDispatch)()),
      setDrawerMobileOpen = _bindActionCreators.setDrawerMobileOpen,
      setDrawerOpen = _bindActionCreators.setDrawerOpen;

  var handleDrawerMenuClick = function handleDrawerMenuClick() {
    var smDown = (0, _withWidth.isWidthDown)('sm', width);

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
  var smDown = (0, _withWidth.isWidthDown)('sm', width);

  return _react2.default.createElement(
    'div',
    { className: classes.root },
    _react2.default.createElement(
      _reactHelmet.Helmet,
      null,
      _react2.default.createElement('meta', { name: 'theme-color', content: theme.palette.primary.main }),
      _react2.default.createElement('meta', { name: 'apple-mobile-web-app-status-bar-style', content: theme.palette.primary.main }),
      _react2.default.createElement('meta', { name: 'msapplication-navbutton-color', content: theme.palette.primary.main }),
      _react2.default.createElement(
        'title',
        null,
        headerTitle
      )
    ),
    _react2.default.createElement(
      _AppBar2.default,
      {
        position: width !== 'sm' && width !== 'xs' ? 'absolute' : undefined,
        className: width !== 'sm' && width !== 'xs' ? (0, _classnames2.default)(classes.appBar, drawer.open && classes.appBarShift) : classes.appBar
      },
      _react2.default.createElement(
        _Toolbar2.default,
        { disableGutters: true },
        _react2.default.createElement(
          _IconButton2.default,
          {
            color: 'inherit',
            'aria-label': 'open drawer',
            onClick: handleDrawerMenuClick,
            className: (0, _classnames2.default)(!smDown && classes.menuButton, drawer.open && !smDown && classes.hide, onBackClick && classes.hide)
          },
          _react2.default.createElement(_Menu2.default, null)
        ),
        _react2.default.createElement(
          _IconButton2.default,
          {
            color: 'inherit',
            'aria-label': 'open drawer',
            onClick: onBackClick,
            className: (0, _classnames2.default)(!smDown && classes.menuButton, !onBackClick && classes.hide)
          },
          _react2.default.createElement(_ChevronLeft2.default, null)
        ),
        !onBackClick && drawer.open && _react2.default.createElement('div', { style: { marginRight: 32 } }),
        _react2.default.createElement(
          _Typography2.default,
          { variant: 'h6', color: 'inherit', noWrap: true },
          headerTitle
        ),
        _react2.default.createElement('div', { className: classes.grow }),
        appBarContent
      )
    ),
    _react2.default.createElement('div', { className: classes.toolbar }),
    isLoading && _react2.default.createElement(_LinearProgress2.default, null),
    isOffline && _react2.default.createElement(
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
      _react2.default.createElement(
        _Typography2.default,
        { variant: 'caption', color: 'textSecondary', noWrap: true },
        intl.formatMessage({ id: 'offline' })
      )
    ),
    _react2.default.createElement(
      'main',
      { className: classes.content },
      children
    )
  );
};

exports.default = (0, _redux.compose)((0, _withWidth2.default)(), (0, _styles.withStyles)(styles, { withTheme: true }), _reactIntl.injectIntl)(Activity);
module.exports = exports['default'];