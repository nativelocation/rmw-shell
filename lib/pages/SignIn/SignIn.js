'use strict';

exports.__esModule = true;
exports.SignIn = undefined;

var _firebaseui = require('firebaseui');

var firebaseui = _interopRequireWildcard(_firebaseui);

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _AuthUI = require('../../containers/AuthUI/AuthUI');

var _AuthUI2 = _interopRequireDefault(_AuthUI);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _firekitProvider = require('firekit-provider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = exports.SignIn = function (_Component) {
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

    return _react2.default.createElement(
      _Activity2.default,
      { title: intl.formatMessage({ id: 'sign_in' }) },
      _react2.default.createElement(_AuthUI2.default, { firebaseApp: firebaseApp, uiConfig: uiConfig })
    );
  };

  return SignIn;
}(_react.Component);

SignIn.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: _propTypes2.default.object.isRequired
} : {};

exports.default = (0, _reactIntl.injectIntl)((0, _firekitProvider.withFirebase)((0, _AppConfigProvider.withAppConfigs)(SignIn)));