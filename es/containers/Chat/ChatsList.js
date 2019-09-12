var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AltIconAvatar from 'rmw-shell/lib/components/AltIconAvatar';
import Chat from '@material-ui/icons/Chat';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Done from '@material-ui/icons/Done';
import DoneAll from '@material-ui/icons/DoneAll';
import History from '@material-ui/icons/History';
import IconMenu from '../../containers/IconMenu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Person from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Fab } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { filterSelectors } from 'material-ui-filter';
import { getList } from 'firekit';
import { injectIntl } from 'react-intl';
import { setPersistentValue } from '../../store/persistentValues/actions';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

export var ChatsList = function (_Component) {
  _inherits(ChatsList, _Component);

  function ChatsList() {
    var _temp, _this, _ret;

    _classCallCheck(this, ChatsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      anchorEl: null,
      hasError: false
    }, _this.handleClick = function (event) {
      _this.setState({ anchorEl: event.currentTarget });
    }, _this.handleClose = function () {
      _this.setState({ anchorEl: null });
    }, _this.handleDeleteChat = function (key) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          auth = _this$props.auth;


      firebaseApp.database().ref('user_chats/' + auth.uid + '/' + key).remove();
    }, _this.handleMarkAsUnread = function (key) {
      var _this$props2 = _this.props,
          firebaseApp = _this$props2.firebaseApp,
          auth = _this$props2.auth;


      firebaseApp.database().ref('user_chats/' + auth.uid + '/' + key + '/unread').set(1);
    }, _this.handleItemClick = function (val, key) {
      var _this$props3 = _this.props,
          history = _this$props3.history,
          setPersistentValue = _this$props3.setPersistentValue;


      setPersistentValue('current_chat_name', val.displayName);
      history.push('/chats/edit/' + key);
    }, _this.renderIcons = function (val) {
      var _this$props4 = _this.props,
          theme = _this$props4.theme,
          auth = _this$props4.auth;


      return React.createElement(
        'div',
        null,
        val.isSend && auth.uid === val.authorUid && val.isReceived && React.createElement(DoneAll, {
          className: 'material-icons',
          style: {
            fontSize: 14,
            padding: 0,
            paddingRight: 2,
            bottom: -1,
            color: val.isRead ? theme.palette.accent1Color : theme.palette.secondary1Color
          }
        }),
        val.isSend && auth.uid === val.authorUid && !val.isReceived && React.createElement(Done, {
          className: 'material-icons',
          style: {
            fontSize: 14,
            padding: 0,
            paddingRight: 2,
            bottom: -1,
            color: val.isRead ? theme.palette.accent1Color : theme.palette.secondary1Color
          }
        }),
        val.unread > 0 && React.createElement(
          'b',
          null,
          val.lastMessage
        ),
        !val.unread && val.lastMessage
      );
    }, _this.renderItem = function (i) {
      var _this$props5 = _this.props,
          list = _this$props5.list,
          intl = _this$props5.intl,
          uid = _this$props5.uid;


      var key = list[i].key;
      var val = list[i].val;

      var options = [{
        text: intl.formatMessage({ id: 'delete_chat' }),
        onClick: function onClick() {
          _this.handleDeleteChat(key, val);
        },
        icon: React.createElement(Delete, null)
      }, {
        text: intl.formatMessage({ id: 'mark_chat_as_unread' }),
        onClick: function onClick() {
          _this.handleMarkAsUnread(key, val);
        },
        icon: React.createElement(History, null)
      }];

      return React.createElement(
        'div',
        { key: i, style: { cursor: 'pointer' } },
        React.createElement(
          ListItem,
          {
            selected: uid === key,
            key: i,
            onClick: function onClick() {
              _this.handleItemClick(val, key);
            },
            id: i
          },
          React.createElement(AltIconAvatar, { src: val.photoURL, icon: React.createElement(Person, null) }),
          React.createElement(ListItemText, {
            primaryTypographyProps: {
              color: val.unread ? 'secondary' : undefined
            },
            primary: val.unread > 0 ? React.createElement(
              'div',
              null,
              React.createElement(
                'b',
                null,
                val.displayName
              )
            ) : val.displayName,
            secondary: _this.renderIcons(val)
          }),
          React.createElement(
            ListItemSecondaryAction,
            { style: { paddingTop: 24 } },
            React.createElement(
              Typography,
              { component: 'div', variant: 'caption', style: { paddingRight: 12 } },
              val.lastCreated ? intl.formatTime(new Date(val.lastCreated), 'hh:mm') : undefined
            )
          ),
          React.createElement(
            ListItemSecondaryAction,
            { style: { paddingBottom: 24 } },
            React.createElement(
              Typography,
              { component: 'div' },
              React.createElement(IconMenu, { options: options, icon: React.createElement(MoreHoriz, null) })
            )
          )
        ),
        React.createElement(Divider, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ChatsList.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        path = _props.path;

    watchList(path);

    //requestNotificationPermission(this.props)
  };

  ChatsList.prototype.componentDidCatch = function componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  };

  ChatsList.prototype.render = function render() {
    var _props2 = this.props,
        list = _props2.list,
        history = _props2.history,
        width = _props2.width,
        fabProps = _props2.fabProps;


    if (this.state.hasError) {
      // You can render any custom fallback UI
      return React.createElement(
        'h1',
        null,
        'Something went wrong.'
      );
    }
    var usePreview = isWidthUp('sm', width);

    return React.createElement(
      'div',
      { style: { width: '100%', maxWidth: usePreview ? 300 : undefined, height: '100%' } },
      React.createElement(
        Scrollbar,
        null,
        React.createElement(
          List,
          {
            component: 'div',
            style: { padding: 0, height: '100%', width: '100%', maxWidth: usePreview ? 300 : undefined }
          },
          React.createElement(ReactList, {
            style: { maxWidth: 300 },
            itemRenderer: this.renderItem,
            length: list ? list.length : 0,
            type: 'simple'
          })
        )
      ),
      React.createElement(
        'div',
        { style: { position: 'absolute', width: usePreview ? 300 : '100%', bottom: 5 } },
        React.createElement(
          Fab,
          _extends({
            color: 'secondary',
            onClick: function onClick() {
              history.push('/chats/create');
            },
            style: { position: 'absolute', right: 20, bottom: 10, zIndex: 99 }
          }, fabProps),
          React.createElement(Chat, { className: 'material-icons' })
        )
      )
    );
  };

  return ChatsList;
}(Component);

ChatsList.propTypes = process.env.NODE_ENV !== "production" ? {
  list: PropTypes.array.isRequired,
  history: PropTypes.object
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var auth = state.auth,
      persistentValues = state.persistentValues;
  var match = ownPops.match;

  var uid = match.params.uid;

  var path = 'user_chats/' + auth.uid;
  var list = getList(state, path).sort(filterSelectors.dynamicSort('lastCreated', false, function (fieldValue) {
    return fieldValue.val;
  }));

  return {
    uid: uid,
    auth: auth,
    path: path,
    persistentValues: persistentValues,
    list: list
  };
};

export default compose(connect(mapStateToProps, { setPersistentValue: setPersistentValue }), injectIntl, withFirebase, withAppConfigs, withRouter, withWidth(), withTheme)(ChatsList);