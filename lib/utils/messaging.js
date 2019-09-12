'use strict';

exports.__esModule = true;
exports.checkForUpdate = exports.getNotification = exports.handleTokenChange = exports.handleMessageReceived = exports.initializeMessaging = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.handleUpdate = handleUpdate;

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Update = require('@material-ui/icons/Update');

var _Update2 = _interopRequireDefault(_Update);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactToastify = require('react-toastify');

var _PermissionRequestToast = require('../components/Notifications/PermissionRequestToast');

var _PermissionRequestToast2 = _interopRequireDefault(_PermissionRequestToast);

var _NotificationToast = require('../components/Notifications/NotificationToast');

var _NotificationToast2 = _interopRequireDefault(_NotificationToast);

var _UpdateToast = require('../components/Notifications/UpdateToast');

var _UpdateToast2 = _interopRequireDefault(_UpdateToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateMessageShown = false;

var initializeMessaging = function initializeMessaging(props) {
  var skipIfNoPermission = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var initMessaging = props.initMessaging,
      firebaseApp = props.firebaseApp,
      auth = props.auth;


  firebaseApp.database().ref('disable_notifications/' + auth.uid).once('value', function (snap) {
    if (snap.val()) {
      console.log('Notifications disabled by user');
    } else if (skipIfNoPermission && 'Notification' in window && Notification.permission !== 'granted') {
      console.log('No permissions for Notifications');
    } else {
      console.log('Notifications initialized');
      initMessaging(firebaseApp, function (token) {
        handleTokenChange(props, token);
      }, function (payload) {
        handleMessageReceived(props, payload);
      });
    }
  });
};

var requestNotificationPermission = function requestNotificationPermission(props) {
  var auth = props.auth,
      notificationPermissionRequested = props.notificationPermissionRequested,
      simpleValues = props.simpleValues,
      setSimpleValue = props.setSimpleValue,
      messaging = props.messaging,
      appConfig = props.appConfig;


  var reengagingHours = appConfig.notificationsReengagingHours ? appConfig.notificationsReengagingHours : 48;
  var requestNotificationPermission = notificationPermissionRequested ? (0, _moment2.default)().diff(notificationPermissionRequested, 'hours') > reengagingHours : true;

  if ('Notification' in window && window.Notification.permission !== 'granted' && auth.uid && requestNotificationPermission && !simpleValues['notificationPermissionShown']) {
    setSimpleValue('notificationPermissionShown', true);
    _reactToastify.toast.info(function (_ref) {
      var closeToast = _ref.closeToast;
      return _react2.default.createElement(_PermissionRequestToast2.default, _extends({}, props, { closeToast: closeToast, initializeMessaging: initializeMessaging }));
    }, {
      position: _reactToastify.toast.POSITION.TOP_CENTER,
      autoClose: false,
      closeButton: false,
      closeOnClick: false
    });
  }
};

var handleMessageReceived = function handleMessageReceived(props, payload) {
  var location = props.location,
      appConfig = props.appConfig;

  var notification = payload.notification;
  var pathname = location ? location.pathname : '';
  var tag = payload.notification ? payload.notification.tag : '';
  var notifications = appConfig.getNotifications(notification, props);
  var notificationData = notifications[tag] ? notifications[tag] : false;

  if (notificationData && pathname.indexOf(notificationData.path) === -1) {
    _reactToastify.toast.info(function (_ref2) {
      var closeToast = _ref2.closeToast;
      return getNotification(notificationData, closeToast);
    }, {
      position: _reactToastify.toast.POSITION.BOTTOM_RIGHT,
      autoClose: notificationData.autoClose ? notificationData.autoClose : false,
      closeButton: false
    });
  } else {
    _reactToastify.toast.info(function (_ref3) {
      var closeToast = _ref3.closeToast;
      return getNotification(notification, closeToast);
    }, {
      position: _reactToastify.toast.POSITION.BOTTOM_RIGHT,
      closeButton: false
    });
  }
};

var handleTokenChange = function handleTokenChange(props, token) {
  var firebaseApp = props.firebaseApp,
      auth = props.auth;


  firebaseApp.database().ref('notification_tokens/' + auth.uid + '/' + token).set(true);
};

var getNotification = function getNotification(notification, closeToast) {
  if (notification.getNotification) {
    return notification.getNotification(notification, closeToast);
  }

  return _react2.default.createElement(_NotificationToast2.default, { notification: notification, closeToast: closeToast });
};

var checkForUpdate = function checkForUpdate() {

  if (window.updateAvailable && !updateMessageShown) {
    updateMessageShown = true;
    _reactToastify.toast.info(function (_ref4) {
      var closeToast = _ref4.closeToast;
      return _react2.default.createElement(_UpdateToast2.default, { handleUpdate: handleUpdate, closeToast: closeToast });
    }, {
      position: _reactToastify.toast.POSITION.BOTTOM_CENTER,
      autoClose: false,
      closeButton: false
    });
  }
};

function handleUpdate() {
  window.updateAvailable = false;
  // eslint-disable-next-line no-self-assign
  window.location.href = window.location.href;
}

exports.initializeMessaging = initializeMessaging;
exports.handleMessageReceived = handleMessageReceived;
exports.handleTokenChange = handleTokenChange;
exports.getNotification = getNotification;
exports.checkForUpdate = checkForUpdate;
exports.default = requestNotificationPermission;