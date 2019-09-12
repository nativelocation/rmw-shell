import React from 'react';
import getAppRoutes from '../../components/AppRoutes';
import { injectIntl } from 'react-intl';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { Switch, withRouter } from 'react-router-dom';

export var Routes = function Routes(_ref) {
  var appConfig = _ref.appConfig;

  var customRoutes = appConfig.routes ? appConfig.routes : [];
  var appRoutes = getAppRoutes(appConfig.firebaseLoad);

  return React.createElement(
    'div',
    { style: { width: '100%', height: '100%' } },
    React.createElement(
      Switch,
      null,
      customRoutes.map(function (Route, i) {
        return React.cloneElement(Route, { key: '@customRoutes/' + i });
      }),
      appRoutes.map(function (Route, i) {
        return React.cloneElement(Route, { key: '@appRoutes/' + i });
      })
    )
  );
};

export default withRouter(withAppConfigs(Routes));