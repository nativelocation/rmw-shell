import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React from 'react';
import SelectableMenuList from '../../containers/SelectableMenuList';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { withA2HS } from 'a2hs';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';
import Scrollbar from '../../components/Scrollbar';

export var DrawerContent = function DrawerContent(props) {
  var appConfig = props.appConfig,
      dialogs = props.dialogs,
      match = props.match,
      messaging = props.messaging,
      drawer = props.drawer;


  var handleChange = function handleChange(event, index) {
    var history = props.history,
        setDrawerMobileOpen = props.setDrawerMobileOpen;


    if (index !== undefined) {
      setDrawerMobileOpen(false);
    }

    if (index !== undefined && index !== Object(index)) {
      history.push(index);
    }
  };

  var handleSignOut = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var userLogout, setDialogIsOpen, appConfig, setDrawerOpen;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userLogout = props.userLogout, setDialogIsOpen = props.setDialogIsOpen, appConfig = props.appConfig, setDrawerOpen = props.setDrawerOpen;
              _context2.next = 3;
              return appConfig.firebaseLoad().then(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref3) {
                  var firebaseApp = _ref3.firebaseApp;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/connections').remove();

                        case 2:
                          _context.next = 4;
                          return firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/notificationTokens/' + messaging.token).remove();

                        case 4:
                          _context.next = 6;
                          return firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/lastOnline').set(new Date());

                        case 6:
                          _context.next = 8;
                          return firebaseApp.auth().signOut().then(function () {
                            userLogout();
                            setDrawerOpen(false);
                            setDialogIsOpen('auth_menu', false);
                          });

                        case 8:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function handleSignOut() {
      return _ref.apply(this, arguments);
    };
  }();

  var isAuthMenu = !!dialogs.auth_menu;

  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    },
    React.createElement(
      Scrollbar,
      null,
      isAuthMenu && React.createElement(SelectableMenuList, {
        items: appConfig.getMenuItems(_extends({}, props, { isAuthMenu: isAuthMenu, handleSignOut: handleSignOut })),
        onIndexChange: handleChange,
        index: match ? match.path : '/',
        useMinified: drawer.useMinified && !drawer.open
      }),
      !isAuthMenu && React.createElement(SelectableMenuList, {
        items: appConfig.getMenuItems(_extends({}, props, { isAuthMenu: isAuthMenu, handleSignOut: handleSignOut })),
        onIndexChange: handleChange,
        index: match ? match.path : '/',
        useMinified: drawer.useMinified && !drawer.open
      })
    )
  );
};

export default compose(withA2HS, injectIntl, withRouter, withAppConfigs, withTheme)(DrawerContent);