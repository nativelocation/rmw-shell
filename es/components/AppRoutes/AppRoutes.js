var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable react/jsx-key */
import React from 'react';
import RestrictedRoute from '../../containers/RestrictedRoute';
import makeLoadable from '../../containers/MyLoadable';
import { Route } from 'react-router-dom';

var getAppRoutes = function getAppRoutes(firebaseLoader) {
  var MyLoadable = function MyLoadable(opts, preloadComponents) {
    return makeLoadable(_extends({}, opts, { firebase: firebaseLoader }), preloadComponents);
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

  return [React.createElement(RestrictedRoute, { type: 'public', path: '/signin', component: AsyncSignIn }), React.createElement(RestrictedRoute, { type: 'private', path: '/users', exact: true, component: AsyncUsers }), React.createElement(RestrictedRoute, { type: 'private', path: '/users/:select', exact: true, component: AsyncUsers }), React.createElement(RestrictedRoute, { type: 'private', path: '/users/edit/:uid/:editType', exact: true, component: AsyncUser }), React.createElement(RestrictedRoute, { type: 'private', path: '/users/edit/:uid/:editType/:rootPath/:rootUid', exact: true, component: AsyncUser }), React.createElement(RestrictedRoute, { type: 'private', path: '/my_account', exact: true, component: AsyncMyAccount }), React.createElement(RestrictedRoute, { type: 'private', path: '/roles', exact: true, component: AsyncRoles }), React.createElement(RestrictedRoute, { type: 'private', path: '/roles/edit/:uid/:editType', exact: true, component: AsyncRole }), React.createElement(RestrictedRoute, { type: 'private', path: '/public_chats', exact: true, component: AsyncPublicChats }), React.createElement(RestrictedRoute, { type: 'private', path: '/chats', exact: true, component: AsyncChats }), React.createElement(RestrictedRoute, { type: 'private', path: '/chats/create', exact: true, component: AsyncCreateChat }), React.createElement(RestrictedRoute, { type: 'private', path: '/chats/edit/:uid', exact: true, component: AsyncChatsEdit }), React.createElement(Route, { component: AsyncPageNotFound })];
};

export default getAppRoutes;