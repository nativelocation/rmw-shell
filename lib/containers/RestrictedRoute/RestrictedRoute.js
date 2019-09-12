'use strict';

exports.__esModule = true;
exports.RestrictedRoute = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RestrictedRoute = function RestrictedRoute(_ref) {
  var type = _ref.type,
      isAuthorised = _ref.isAuthorised,
      Component = _ref.component,
      _ref$fallbackComponen = _ref.fallbackComponent,
      FallbackComponent = _ref$fallbackComponen === undefined ? false : _ref$fallbackComponen,
      rest = _objectWithoutProperties(_ref, ['type', 'isAuthorised', 'component', 'fallbackComponent']);

  return _react2.default.createElement(_reactRouter.Route, _extends({}, rest, {
    render: function render(props) {
      if (isAuthorised && type === 'private' || !isAuthorised && type === 'public') {
        return _react2.default.createElement(Component, props);
      } else if (FallbackComponent) {
        return _react2.default.createElement(FallbackComponent, props);
      } else {
        return _react2.default.createElement(_reactRouter.Redirect, {
          to: {
            pathname: type === 'private' ? '/signin' : props.location.state ? props.location.state.from.pathname : '/',
            search: 'from=' + props.location.pathname,
            state: { from: props.location }
          }
        });
      }
    }
  }));
};

exports.RestrictedRoute = RestrictedRoute;
RestrictedRoute.propTypes = process.env.NODE_ENV !== "production" ? {
  isAuthorised: _propTypes2.default.bool.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth;


  return {
    isAuthorised: auth.isAuthorised
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(RestrictedRoute);