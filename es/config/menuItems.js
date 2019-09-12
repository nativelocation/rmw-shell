import AccountBox from '@material-ui/icons/AccountBox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Brightness2 from '@material-ui/icons/Brightness2';
import Brightness7 from '@material-ui/icons/Brightness7';
import Business from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import DaschboardIcon from '@material-ui/icons/Dashboard';
import FlashOn from '@material-ui/icons/FlashOn';
import GroupIcon from '@material-ui/icons/Group';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import ListIcon from '@material-ui/icons/List';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Security from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import StyleIcon from '@material-ui/icons/Style';
import TextsmsRounded from '@material-ui/icons/TextsmsRounded';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import allLocales from './locales';
import allThemes from './themes';

var getMenuItems = function getMenuItems(props) {
  var locale = props.locale,
      updateTheme = props.updateTheme,
      switchNightMode = props.switchNightMode,
      updateLocale = props.updateLocale,
      intl = props.intl,
      themeSource = props.themeSource,
      auth = props.auth,
      isGranted = props.isGranted,
      deferredPrompt = props.deferredPrompt,
      isAppInstallable = props.isAppInstallable,
      isAppInstalled = props.isAppInstalled,
      isAuthMenu = props.isAuthMenu,
      handleSignOut = props.handleSignOut;


  var isAuthorised = auth.isAuthorised;

  var themeItems = allThemes.map(function (t) {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: function onClick() {
        updateTheme(t.id);
      },
      leftIcon: React.createElement(StyleIcon, { style: { color: t.color } })
    };
  });

  var localeItems = allLocales.map(function (l) {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: function onClick() {
        updateLocale(l.locale);
      },
      leftIcon: React.createElement(LanguageIcon, null)
    };
  });

  if (isAuthMenu) {
    return [{
      value: '/my_account',
      primaryText: intl.formatMessage({ id: 'my_account' }),
      leftIcon: React.createElement(AccountBoxIcon, null)
    }, {
      value: '/signin',
      onClick: handleSignOut,
      primaryText: intl.formatMessage({ id: 'sign_out' }),
      leftIcon: React.createElement(LockIcon, null)
    }];
  }

  return [{
    value: '/dashboard',
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'dashboard' }),
    leftIcon: React.createElement(DaschboardIcon, null)
  }, {
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'chats' }),
    primaryTogglesNestedList: true,
    leftIcon: React.createElement(ChatIcon, null),
    nestedItems: [{
      value: '/chats',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'private' }),
      leftIcon: React.createElement(PersonIcon, null)
    }, {
      value: '/public_chats',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'public' }),
      leftIcon: React.createElement(GroupIcon, null)
    }]
  }, {
    value: '/companies',
    visible: isGranted('read_companies'),
    primaryText: intl.formatMessage({ id: 'companies' }),
    leftIcon: React.createElement(Business, null)
  }, {
    value: '/tasks',
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'tasks' }),
    leftIcon: React.createElement(ListIcon, null)
  }, {
    value: '/about',
    visible: isAuthorised,
    primaryText: intl.formatMessage({ id: 'about' }),
    leftIcon: React.createElement(InfoOutlined, null)
  }, {
    visible: isAuthorised, // In prod: isGranted('administration'),
    primaryTogglesNestedList: true,
    primaryText: intl.formatMessage({ id: 'administration' }),
    leftIcon: React.createElement(Security, null),
    nestedItems: [{
      value: '/users',
      visible: isAuthorised, // In prod: isGranted('read_users'),
      primaryText: intl.formatMessage({ id: 'users' }),
      leftIcon: React.createElement(GroupIcon, null)
    }, {
      value: '/roles',
      visible: isGranted('read_roles'),
      primaryText: intl.formatMessage({ id: 'roles' }),
      leftIcon: React.createElement(AccountBoxIcon, null)
    }]
  }, {
    divider: true,
    visible: isAuthorised
  }, {
    primaryText: intl.formatMessage({ id: 'settings' }),
    primaryTogglesNestedList: true,
    leftIcon: React.createElement(SettingsIcon, null),
    nestedItems: [{
      primaryText: intl.formatMessage({ id: 'theme' }),
      secondaryText: intl.formatMessage({ id: themeSource.source }),
      primaryTogglesNestedList: true,
      leftIcon: React.createElement(StyleIcon, null),
      nestedItems: themeItems
    }, {
      primaryText: intl.formatMessage({ id: 'language' }),
      secondaryText: intl.formatMessage({ id: locale }),
      primaryTogglesNestedList: true,
      leftIcon: React.createElement(LanguageIcon, null),
      nestedItems: localeItems
    }]
  }, {
    onClick: function onClick() {
      switchNightMode(!themeSource.isNightModeOn);
    },
    primaryText: intl.formatMessage({ id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode' }),
    leftIcon: themeSource.isNightModeOn ? React.createElement(Brightness7, null) : React.createElement(Brightness2, null)
  }, {
    visible: isAppInstallable && !isAppInstalled,
    onClick: function onClick() {
      deferredPrompt.prompt();
    },
    primaryText: intl.formatMessage({ id: 'install' }),
    leftIcon: React.createElement(VerticalAlignBottomIcon, null)
  }];
};

export default getMenuItems;