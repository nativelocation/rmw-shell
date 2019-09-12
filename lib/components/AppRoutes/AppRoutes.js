'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable react/jsx-key */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RestrictedRoute = require('../../containers/RestrictedRoute');

var _RestrictedRoute2 = _interopRequireDefault(_RestrictedRoute);

var _MyLoadable = require('../../containers/MyLoadable');

var _MyLoadable2 = _interopRequireDefault(_MyLoadable);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAppRoutes = function getAppRoutes(firebaseLoader) {
  var MyLoadable = function MyLoadable(opts, preloadComponents) {
    return (0, _MyLoadable2.default)(_extends({}, opts, { firebase: firebaseLoader }), preloadComponents);
  };

  var AsyncSignIn = MyLoadable({ loader: function loader() {
      return import('../../pages/SignIn');
    } });
  var AsyncUser = MyLoadable({ loader: function loader() {
      return import('../../pages/Users/User');
    } });
  var AsyncUsers = MyLoadable({ loader: function loader() {
      return import('../../pages/Users/Users');
    } }, [AsyncUser]);
  var AsyncMyAccount = MyLoadable({ loader: function loader() {
      return import('../../pages/MyAccount');
    } });
  var AsyncRole = MyLoadable({ loader: function loader() {
      return import('../../pages/Roles/Role');
    } });
  var AsyncRoles = MyLoadable({ loader: function loader() {
      return import('../../pages/Roles/Roles');
    } }, [AsyncRole]);

  var AsyncCreateChat = MyLoadable({ loader: function loader() {
      return import('../../pages/Chats/CreateChat');
    } });
  var AsyncChats = MyLoadable({ loader: function loader() {
      return import('../../pages/Chats/Chats');
    } });
  var AsyncChatsEdit = MyLoadable({ loader: function loader() {
      return import('../../pages/Chats/ChatsEdit');
    } });
  var AsyncPublicChats = MyLoadable({ loader: function loader() {
      return import('../../pages/Chats/PublicChats');
    } });
  var AsyncPageNotFound = MyLoadable({ loader: function loader() {
      return import('../../pages/PageNotFound');
    } });

  return [_react2.default.createElement(_RestrictedRoute2.default, { type: 'public', path: '/signin', component: AsyncSignIn }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/users', exact: true, component: AsyncUsers }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/users/:select', exact: true, component: AsyncUsers }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/users/edit/:uid/:editType', exact: true, component: AsyncUser }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/users/edit/:uid/:editType/:rootPath/:rootUid', exact: true, component: AsyncUser }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/my_account', exact: true, component: AsyncMyAccount }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/roles', exact: true, component: AsyncRoles }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/roles/edit/:uid/:editType', exact: true, component: AsyncRole }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/public_chats', exact: true, component: AsyncPublicChats }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/chats', exact: true, component: AsyncChats }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/chats/create', exact: true, component: AsyncCreateChat }), _react2.default.createElement(_RestrictedRoute2.default, { type: 'private', path: '/chats/edit/:uid', exact: true, component: AsyncChatsEdit }), _react2.default.createElement(_reactRouterDom.Route, { component: AsyncPageNotFound })];
};

exports.default = getAppRoutes;
module.exports = exports['default'];