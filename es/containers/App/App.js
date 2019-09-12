var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import A2HSProvider from 'a2hs';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent';
import React from 'react';
import config from '../../config';
import configureStore from '../../store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
//import RootAsync from 'rmw-shell/lib/containers/Root'

var Loading = function Loading() {
  return React.createElement(LoadingComponent, null);
};

export var RootAsync = Loadable({
  loader: function loader() {
    return import('rmw-shell/lib/containers/Root');
  },
  loading: Loading
});

var App = function App(_ref) {
  var appConfig = _ref.appConfig;

  var store = appConfig && appConfig.configureStore ? appConfig.configureStore() : configureStore();
  var configs = _extends({}, config, appConfig);
  var _configs$landingPage = configs.landingPage,
      LandingPage = _configs$landingPage === undefined ? false : _configs$landingPage;


  return React.createElement(
    A2HSProvider,
    null,
    React.createElement(
      Provider,
      { store: store },
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          Switch,
          null,
          LandingPage && React.createElement(Route, { path: '/', exact: true, component: LandingPage }),
          React.createElement(
            Switch,
            null,
            React.createElement(
              Route,
              null,
              React.createElement(RootAsync, { appConfig: configs })
            )
          )
        )
      )
    )
  );
};

export default App;