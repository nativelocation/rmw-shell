var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import Context from './Context';
import React from 'react';
import config from '../../config';

var withAppConfigs = function withAppConfigs(Component) {
  var ChildComponent = function ChildComponent(props) {
    return React.createElement(
      Context.Consumer,
      null,
      function (value) {
        var _ref = value || {},
            appConfig = _ref.appConfig;

        return React.createElement(Component, _extends({ appConfig: _extends({}, config, appConfig) }, props));
      }
    );
  };

  return ChildComponent;
};

export default withAppConfigs;