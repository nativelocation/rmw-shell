var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import AppConfigProvider from '../../contexts/AppConfigProvider/Provider';
import AppLayout from '../../containers/AppLayout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Helmet from 'react-helmet';
import React, { useEffect } from 'react';
import Utils from '@date-io/moment';
import getThemeSource from '../../config/themes';
import locales, { getLocaleMessages } from '../../config/locales';
import { IntlProvider } from 'react-intl';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createMuiTheme } from '@material-ui/core/styles';
import { initializeMessaging } from '../../utils/messaging';
import { saveAuthorisation } from '../../utils/auth';
import { setPersistentValue } from '../../store/persistentValues/actions';
import { watchAuth, clearInitialization, initConnection, watchList, initMessaging, watchPath } from 'firekit';

var history = createBrowserHistory();

var getActions = function getActions(dispatch) {
  return bindActionCreators({
    watchAuth: watchAuth,
    clearInitialization: clearInitialization,
    watchConnection: initConnection,
    watchList: watchList,
    watchPath: watchPath,
    initMessaging: initMessaging,
    setPersistentValue: setPersistentValue
  }, dispatch);
};

var Root = function Root(props) {
  var actions = getActions(useDispatch());
  var watchAuth = actions.watchAuth,
      clearInitialization = actions.clearInitialization,
      watchConnection = actions.watchConnection,
      watchList = actions.watchList,
      watchPath = actions.watchPath,
      initMessaging = actions.initMessaging;
  var appConfig = props.appConfig;

  var locale = useSelector(function (state) {
    return state.locale;
  }, shallowEqual);
  var themeSource = useSelector(function (state) {
    return state.themeSource;
  }, shallowEqual);
  var messages = _extends({}, getLocaleMessages(locale, locales), getLocaleMessages(locale, appConfig.locales));
  var source = getThemeSource(themeSource, appConfig.themes);
  var theme = createMuiTheme(source);

  var handlePresence = function handlePresence(user, firebaseApp) {
    var myConnectionsRef = firebaseApp.database().ref('users/' + user.uid + '/connections');

    var lastOnlineRef = firebaseApp.database().ref('users/' + user.uid + '/lastOnline');
    lastOnlineRef.onDisconnect().set(new Date());

    var con = myConnectionsRef.push(true);
    con.onDisconnect().remove();
  };

  var onAuthStateChanged = function onAuthStateChanged(user, firebaseApp) {
    saveAuthorisation(user);
    clearInitialization();

    if (user) {
      handlePresence(user, firebaseApp);
      setTimeout(function () {
        watchConnection(firebaseApp);
      }, 1000);

      var userData = {
        displayName: user.displayName ? user.displayName : 'UserName',
        email: user.email ? user.email : ' ',
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
        providerData: user.providerData
      };

      var publicProviderData = [];

      user.providerData.forEach(function (provider) {
        publicProviderData.push({
          providerId: provider.providerId,
          displayName: provider.displayName ? provider.displayName : null
        });
      });

      var publicUserData = {
        displayName: user.displayName ? user.displayName : 'UserName',
        photoURL: user.photoURL,
        uid: user.uid,
        providerData: publicProviderData
      };

      watchList(firebaseApp, 'user_grants/' + user.uid);
      watchPath(firebaseApp, 'admins/' + user.uid);
      watchPath(firebaseApp, 'users/' + user.uid);

      if (appConfig.onAuthStateChanged) {
        try {
          appConfig.onAuthStateChanged(user, _extends({}, props, actions), firebaseApp);
        } catch (err) {
          console.warn(err);
        }
      }

      firebaseApp.database().ref('users/' + user.uid).update(publicUserData);

      initializeMessaging(_extends({}, props, actions, { initMessaging: initMessaging, firebaseApp: firebaseApp, history: history, auth: userData }), true);

      return userData;
    } else {
      return null;
    }
  };

  useEffect(function () {
    appConfig.firebaseLoad().then(function (_ref) {
      var firebaseApp = _ref.firebaseApp;

      watchAuth(firebaseApp, function (user) {
        return onAuthStateChanged(user, firebaseApp);
      });
    });
  }, []);

  return React.createElement(
    'div',
    null,
    React.createElement(
      Helmet,
      null,
      React.createElement('link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.css' })
    ),
    React.createElement(
      AppConfigProvider,
      { appConfig: appConfig },
      React.createElement(
        MuiPickersUtilsProvider,
        { utils: Utils },
        React.createElement(
          ThemeProvider,
          { theme: theme },
          React.createElement(
            React.Fragment,
            null,
            React.createElement(CssBaseline, null),
            React.createElement(
              IntlProvider,
              { locale: locale, key: locale, messages: messages },
              React.createElement(
                Router,
                { history: history },
                React.createElement(
                  Switch,
                  null,
                  React.createElement(Route, { component: AppLayout })
                )
              )
            )
          )
        )
      )
    )
  );
};

export default Root;