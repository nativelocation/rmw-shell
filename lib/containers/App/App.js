'use strict';

exports.__esModule = true;
exports.RootAsync = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _a2hs = require('a2hs');

var _a2hs2 = _interopRequireDefault(_a2hs);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LoadingComponent = require('../../components/LoadingComponent');

var _LoadingComponent2 = _interopRequireDefault(_LoadingComponent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _store = require('../../store');

var _store2 = _interopRequireDefault(_store);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import RootAsync from 'rmw-shell/lib/containers/Root'

var Loading = function Loading() {
  return _react2.default.createElement(_LoadingComponent2.default, null);
};

var RootAsync = exports.RootAsync = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import('rmw-shell/lib/containers/Root');
  },
  loading: Loading
});

var App = function App(_ref) {
  var appConfig = _ref.appConfig;

  var store = appConfig && appConfig.configureStore ? appConfig.configureStore() : (0, _store2.default)();
  var configs = _extends({}, _config2.default, appConfig);
  var _configs$landingPage = configs.landingPage,
      LandingPage = _configs$landingPage === undefined ? false : _configs$landingPage;


  return _react2.default.createElement(
    _a2hs2.default,
    null,
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          LandingPage && _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: LandingPage }),
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(
              _reactRouterDom.Route,
              null,
              _react2.default.createElement(RootAsync, { appConfig: configs })
            )
          )
        )
      )
    )
  );
};

exports.default = App;