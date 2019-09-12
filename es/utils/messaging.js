var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import UpdateIcon from '@material-ui/icons/Update';
import moment from 'moment';
import { toast } from 'react-toastify';

import PermissionRequestToast from '../components/Notifications/PermissionRequestToast';
import NotificationToast from '../components/Notifications/NotificationToast';
import UpdateToast from '../components/Notifications/UpdateToast';

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
  var requestNotificationPermission = notificationPermissionRequested ? moment().diff(notificationPermissionRequested, 'hours') > reengagingHours : true;

  if ('Notification' in window && window.Notification.permission !== 'granted' && auth.uid && requestNotificationPermission && !simpleValues['notificationPermissionShown']) {
    setSimpleValue('notificationPermissionShown', true);
    toast.info(function (_ref) {
      var closeToast = _ref.closeToast;
      return React.createElement(PermissionRequestToast, _extends({}, props, { closeToast: closeToast, initializeMessaging: initializeMessaging }));
    }, {
      position: toast.POSITION.TOP_CENTER,
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
    toast.info(function (_ref2) {
      var closeToast = _ref2.closeToast;
      return getNotification(notificationData, closeToast);
    }, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: notificationData.autoClose ? notificationData.autoClose : false,
      closeButton: false
    });
  } else {
    toast.info(function (_ref3) {
      var closeToast = _ref3.closeToast;
      return getNotification(notification, closeToast);
    }, {
      position: toast.POSITION.BOTTOM_RIGHT,
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

  return React.createElement(NotificationToast, { notification: notification, closeToast: closeToast });
};

var checkForUpdate = function checkForUpdate() {

  if (window.updateAvailable && !updateMessageShown) {
    updateMessageShown = true;
    toast.info(function (_ref4) {
      var closeToast = _ref4.closeToast;
      return React.createElement(UpdateToast, { handleUpdate: handleUpdate, closeToast: closeToast });
    }, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: false,
      closeButton: false
    });
  }
};

export function handleUpdate() {
  window.updateAvailable = false;
  // eslint-disable-next-line no-self-assign
  window.location.href = window.location.href;
}

export { initializeMessaging, handleMessageReceived, handleTokenChange, getNotification, checkForUpdate };
export default requestNotificationPermission;