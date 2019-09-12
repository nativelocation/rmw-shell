'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Provider = require('../../contexts/AppConfigProvider/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _AppLayout = require('../../containers/AppLayout');

var _AppLayout2 = _interopRequireDefault(_AppLayout);

var _CssBaseline = require('@material-ui/core/CssBaseline');

var _CssBaseline2 = _interopRequireDefault(_CssBaseline);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('@date-io/moment');

var _moment2 = _interopRequireDefault(_moment);

var _themes = require('../../config/themes');

var _themes2 = _interopRequireDefault(_themes);

var _locales = require('../../config/locales');

var _locales2 = _interopRequireDefault(_locales);

var _reactIntl = require('react-intl');

var _materialUiPickers = require('material-ui-pickers');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/styles');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _history = require('history');

var _styles2 = require('@material-ui/core/styles');

var _messaging = require('../../utils/messaging');

var _auth = require('../../utils/auth');

var _actions = require('../../store/persistentValues/actions');

var _firekit = require('firekit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _history.createBrowserHistory)();

var getActions = function getActions(dispatch) {
  return (0, _redux.bindActionCreators)({
    watchAuth: _firekit.watchAuth,
    clearInitialization: _firekit.clearInitialization,
    watchConnection: _firekit.initConnection,
    watchList: _firekit.watchList,
    watchPath: _firekit.watchPath,
    initMessaging: _firekit.initMessaging,
    setPersistentValue: _actions.setPersistentValue
  }, dispatch);
};

var Root = function Root(props) {
  var actions = getActions((0, _reactRedux.useDispatch)());
  var watchAuth = actions.watchAuth,
      clearInitialization = actions.clearInitialization,
      watchConnection = actions.watchConnection,
      watchList = actions.watchList,
      watchPath = actions.watchPath,
      initMessaging = actions.initMessaging;
  var appConfig = props.appConfig;

  var locale = (0, _reactRedux.useSelector)(function (state) {
    return state.locale;
  }, _reactRedux.shallowEqual);
  var themeSource = (0, _reactRedux.useSelector)(function (state) {
    return state.themeSource;
  }, _reactRedux.shallowEqual);
  var messages = _extends({}, (0, _locales.getLocaleMessages)(locale, _locales2.default), (0, _locales.getLocaleMessages)(locale, appConfig.locales));
  var source = (0, _themes2.default)(themeSource, appConfig.themes);
  var theme = (0, _styles2.createMuiTheme)(source);

  var handlePresence = function handlePresence(user, firebaseApp) {
    var myConnectionsRef = firebaseApp.database().ref('users/' + user.uid + '/connections');

    var lastOnlineRef = firebaseApp.database().ref('users/' + user.uid + '/lastOnline');
    lastOnlineRef.onDisconnect().set(new Date());

    var con = myConnectionsRef.push(true);
    con.onDisconnect().remove();
  };

  var onAuthStateChanged = function onAuthStateChanged(user, firebaseApp) {
    (0, _auth.saveAuthorisation)(user);
    clearInitialization();

    if (user) {
      handlePresence(user, firebaseApp);
      setTimeout(function () {
        watchConnection(firebaseApp);
      }, 1000);

      var userData = {
        displayName: user.displayName ? user.displayName : 'UserName',
        email: user.email ? user.email : ' ',
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
        providerData: user.providerData
      };

      var publicProviderData = [];

      user.providerData.forEach(function (provider) {
        publicProviderData.push({
          providerId: provider.providerId,
          displayName: provider.displayName ? provider.displayName : null
        });
      });

      var publicUserData = {
        displayName: user.displayName ? user.displayName : 'UserName',
        photoURL: user.photoURL,
        uid: user.uid,
        providerData: publicProviderData
      };

      watchList(firebaseApp, 'user_grants/' + user.uid);
      watchPath(firebaseApp, 'admins/' + user.uid);
      watchPath(firebaseApp, 'users/' + user.uid);

      if (appConfig.onAuthStateChanged) {
        try {
          appConfig.onAuthStateChanged(user, _extends({}, props, actions), firebaseApp);
        } catch (err) {
          console.warn(err);
        }
      }

      firebaseApp.database().ref('users/' + user.uid).update(publicUserData);

      (0, _messaging.initializeMessaging)(_extends({}, props, actions, { initMessaging: initMessaging, firebaseApp: firebaseApp, history: history, auth: userData }), true);

      return userData;
    } else {
      return null;
    }
  };

  (0, _react.useEffect)(function () {
    appConfig.firebaseLoad().then(function (_ref) {
      var firebaseApp = _ref.firebaseApp;

      watchAuth(firebaseApp, function (user) {
        return onAuthStateChanged(user, firebaseApp);
      });
    });
  }, []);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactHelmet2.default,
      null,
      _react2.default.createElement('link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.css' })
    ),
    _react2.default.createElement(
      _Provider2.default,
      { appConfig: appConfig },
      _react2.default.createElement(
        _materialUiPickers.MuiPickersUtilsProvider,
        { utils: _moment2.default },
        _react2.default.createElement(
          _styles.ThemeProvider,
          { theme: theme },
          _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(_CssBaseline2.default, null),
            _react2.default.createElement(
              _reactIntl.IntlProvider,
              { locale: locale, key: locale, messages: messages },
              _react2.default.createElement(
                _reactRouterDom.Router,
                { history: history },
                _react2.default.createElement(
                  _reactRouterDom.Switch,
                  null,
                  _react2.default.createElement(_reactRouterDom.Route, { component: _AppLayout2.default })
                )
              )
            )
          )
        )
      )
    )
  );
};

exports.default = Root;
module.exports = exports['default'];