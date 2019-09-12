var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import drawerActions from '../../store/drawer/actions';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';

var drawerWidth = 240;

var iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

var styles = function styles(theme) {
  var _drawerPaper, _drawerPaperClose;

  return {
    toolbar: _extends({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px'
    }, theme.mixins.toolbar),
    drawerPaper: (_drawerPaper = {
      height: '100vh',
      width: drawerWidth
    }, _drawerPaper[theme.breakpoints.up('md')] = {
      position: 'relative'
    }, _drawerPaper.transition = theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }), _drawerPaper),
    drawerPaperOpen: {
      height: '100vh',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: (_drawerPaperClose = {
      height: '100vh',
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(1) * 7
    }, _drawerPaperClose[theme.breakpoints.up('sm')] = {
      width: theme.spacing(1) * 9
    }, _drawerPaperClose),

    hide: {
      display: 'none'
    }
  };
};

var ResponsiveDrawer = function (_React$Component) {
  _inherits(ResponsiveDrawer, _React$Component);

  function ResponsiveDrawer() {
    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveDrawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      mobileOpen: false,
      open: false
    }, _this.handleDrawerToggle = function () {
      var _this$props = _this.props,
          setDrawerMobileOpen = _this$props.setDrawerMobileOpen,
          drawer = _this$props.drawer;

      setDrawerMobileOpen(!drawer.mobileOpen);
    }, _this.handleDrawerOpen = function () {
      var setDrawerOpen = _this.props.setDrawerOpen;

      setDrawerOpen(true);
    }, _this.handleDrawerClose = function () {
      var setDrawerOpen = _this.props.setDrawerOpen;

      setDrawerOpen(false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ResponsiveDrawer.prototype.render = function render() {
    var _props = this.props,
        classes = _props.classes,
        theme = _props.theme,
        children = _props.children,
        drawer = _props.drawer,
        width = _props.width;


    var smDown = isWidthDown('sm', width);

    return React.createElement(
      'div',
      null,
      React.createElement(
        SwipeableDrawer,
        {
          disableBackdropTransition: !iOS,
          disableDiscovery: iOS,
          variant: smDown ? 'temporary' : 'permanent',
          onClose: this.handleDrawerToggle,
          anchor: smDown ? undefined : theme.direction === 'rtl' ? 'right' : 'left',
          classes: {
            paper: smDown ? classes.drawerPaper : classNames(classes.drawerPaperOpen, !drawer.open && classes.drawerPaperClose, !drawer.useMinified && classes.hide)
          },
          open: smDown ? drawer.mobileOpen : drawer.open,
          onOpen: this.handleDrawerToggle,
          ModalProps: {
            keepMounted: true // Better open performance on mobile.
          }
        },
        children
      )
    );
  };

  return ResponsiveDrawer;
}(React.Component);

ResponsiveDrawer.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var drawer = state.drawer;


  return {
    drawer: drawer
  };
};

export default compose(connect(mapStateToProps, _extends({}, drawerActions)), withWidth(), withStyles(styles, { withTheme: true }))(ResponsiveDrawer);