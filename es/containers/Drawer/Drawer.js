import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import React, { Component } from 'react';
import ResponsiveDrawer from '../../containers/ResponsiveDrawer';
import Scrollbar from '../../components/Scrollbar';
import { injectIntl } from 'react-intl';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withRouter } from 'react-router-dom';

var Drawer = function Drawer(_ref) {
  var history = _ref.history,
      appConfig = _ref.appConfig;

  var path = history.location.pathname;
  var Header = appConfig.drawerHeader ? appConfig.drawerHeader : DrawerHeader;

  return React.createElement(
    ResponsiveDrawer,
    null,
    React.createElement(Header, null),
    React.createElement(DrawerContent, { path: path, history: history })
  );
};

export default withRouter(withAppConfigs(Drawer));