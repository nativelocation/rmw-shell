'use strict';

exports.__esModule = true;
exports.default = makeSlimLoadable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _LoadingComponent = require('../../components/LoadingComponent/LoadingComponent');

var _LoadingComponent2 = _interopRequireDefault(_LoadingComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSlimLoadable(opts) {
  return _reactLoadable2.default.Map({
    loader: {
      Component: opts.loader
    },
    loading: _LoadingComponent2.default,
    render: function render(loaded, props) {
      var Component = loaded.Component.default;
      return _react2.default.createElement(Component, props);
    }
  });
}
module.exports = exports['default'];