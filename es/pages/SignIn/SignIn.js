function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as firebaseui from 'firebaseui';
import Activity from '../../containers/Activity';
import AuthUI from '../../containers/AuthUI/AuthUI';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withFirebase } from 'firekit-provider';

export var SignIn = function (_Component) {
  _inherits(SignIn, _Component);

  function SignIn() {
    _classCallCheck(this, SignIn);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SignIn.prototype.render = function render() {
    var _props = this.props,
        intl = _props.intl,
        firebaseApp = _props.firebaseApp,
        appConfig = _props.appConfig;


    var uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: function signInSuccessWithAuthResult() {
          // initMessaging()

          // To avoid page reload on single page applications
          return false;
        }
      },
      signInOptions: appConfig.firebase_providers,
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };

    return React.createElement(
      Activity,
      { title: intl.formatMessage({ id: 'sign_in' }) },
      React.createElement(AuthUI, { firebaseApp: firebaseApp, uiConfig: uiConfig })
    );
  };

  return SignIn;
}(Component);

SignIn.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: PropTypes.object.isRequired
} : {};

export default injectIntl(withFirebase(withAppConfigs(SignIn)));