'use strict';

exports.__esModule = true;
exports.default = makeLoadable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LoadingComponent = require('../../components/LoadingComponent/LoadingComponent');

var _LoadingComponent2 = _interopRequireDefault(_LoadingComponent);

var _firekitProvider = require('firekit-provider');

var _firekitProvider2 = _interopRequireDefault(_firekitProvider);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeLoadable(opts, preloadComponents) {
  return _reactLoadable2.default.Map({
    loader: {
      Component: opts.loader,
      firebase: opts.firebase
    },
    loading: _LoadingComponent2.default,
    render: function render(loaded, props) {
      if (preloadComponents !== undefined && preloadComponents instanceof Array) {
        preloadComponents.map(function (component) {
          return component.preload();
        });
      }

      var Component = loaded.Component.default;
      var firebaseApp = loaded.firebase.firebaseApp;

      return _react2.default.createElement(
        _firekitProvider2.default,
        { firebaseApp: firebaseApp, context: _reactRedux.ReactReduxContext },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Component, props)
        )
      );
    }
  });
}
module.exports = exports['default'];