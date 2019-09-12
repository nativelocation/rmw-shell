var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import configureStore from '../store';
import getMenuItems from './menuItems';
import grants from './grants';
import locales from './locales';
import { RMWIcon } from '../components/Icons';
import { themes } from './themes';

var config = {
  firebase_config: {
    apiKey: 'AIzaSyBQAmNJ2DbRyw8PqdmNWlePYtMP0hUcjpY',
    authDomain: 'react-most-wanted-3b1b2.firebaseapp.com',
    databaseURL: 'https://react-most-wanted-3b1b2.firebaseio.com',
    projectId: 'react-most-wanted-3b1b2',
    storageBucket: 'react-most-wanted-3b1b2.appspot.com',
    messagingSenderId: '258373383650'
  },
  firebase_config_dev: {
    apiKey: 'AIzaSyB31cMH9nJnERC1WCWA7lQHnY08voLs-Z0',
    authDomain: 'react-most-wanted-dev.firebaseapp.com',
    databaseURL: 'https://react-most-wanted-dev.firebaseio.com',
    projectId: 'react-most-wanted-dev',
    storageBucket: 'react-most-wanted-dev.appspot.com',
    messagingSenderId: '70650394824'
  },
  firebase_providers: ['google.com', 'facebook.com', 'twitter.com', 'github.com', 'password', 'phone'],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 240,
  appIcon: RMWIcon,
  configureStore: configureStore,
  getMenuItems: getMenuItems,
  locales: locales,
  themes: themes,
  grants: grants,
  routes: [],
  onAuthStateChanged: undefined,
  notificationsReengagingHours: 48,
  firebaseLoad: function firebaseLoad() {
    return import('./firebase');
  },
  getNotifications: function getNotifications(notification, props) {
    var history = props.history;

    return {
      chat: _extends({
        path: 'chats',
        autoClose: 5000,
        //getNotification: () => <div>YOUR CUSTOM NOTIFICATION COMPONENT</div>,
        onClick: function onClick() {
          history.push('/chats');
        }
      }, notification)
    };
  }
};

export default config;