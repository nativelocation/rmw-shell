'use strict';

exports.__esModule = true;
exports.ChatsList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AltIconAvatar = require('rmw-shell/lib/components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Chat = require('@material-ui/icons/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Done = require('@material-ui/icons/Done');

var _Done2 = _interopRequireDefault(_Done);

var _DoneAll = require('@material-ui/icons/DoneAll');

var _DoneAll2 = _interopRequireDefault(_DoneAll);

var _History = require('@material-ui/icons/History');

var _History2 = _interopRequireDefault(_History);

var _IconMenu = require('../../containers/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _MoreHoriz = require('@material-ui/icons/MoreHoriz');

var _MoreHoriz2 = _interopRequireDefault(_MoreHoriz);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Scrollbar = require('../../components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _core = require('@material-ui/core');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _materialUiFilter = require('material-ui-filter');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _actions = require('../../store/persistentValues/actions');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatsList = exports.ChatsList = function (_Component) {
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


      return _react2.default.createElement(
        'div',
        null,
        val.isSend && auth.uid === val.authorUid && val.isReceived && _react2.default.createElement(_DoneAll2.default, {
          className: 'material-icons',
          style: {
            fontSize: 14,
            padding: 0,
            paddingRight: 2,
            bottom: -1,
            color: val.isRead ? theme.palette.accent1Color : theme.palette.secondary1Color
          }
        }),
        val.isSend && auth.uid === val.authorUid && !val.isReceived && _react2.default.createElement(_Done2.default, {
          className: 'material-icons',
          style: {
            fontSize: 14,
            padding: 0,
            paddingRight: 2,
            bottom: -1,
            color: val.isRead ? theme.palette.accent1Color : theme.palette.secondary1Color
          }
        }),
        val.unread > 0 && _react2.default.createElement(
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
        icon: _react2.default.createElement(_Delete2.default, null)
      }, {
        text: intl.formatMessage({ id: 'mark_chat_as_unread' }),
        onClick: function onClick() {
          _this.handleMarkAsUnread(key, val);
        },
        icon: _react2.default.createElement(_History2.default, null)
      }];

      return _react2.default.createElement(
        'div',
        { key: i, style: { cursor: 'pointer' } },
        _react2.default.createElement(
          _ListItem2.default,
          {
            selected: uid === key,
            key: i,
            onClick: function onClick() {
              _this.handleItemClick(val, key);
            },
            id: i
          },
          _react2.default.createElement(_AltIconAvatar2.default, { src: val.photoURL, icon: _react2.default.createElement(_Person2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, {
            primaryTypographyProps: {
              color: val.unread ? 'secondary' : undefined
            },
            primary: val.unread > 0 ? _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'b',
                null,
                val.displayName
              )
            ) : val.displayName,
            secondary: _this.renderIcons(val)
          }),
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            { style: { paddingTop: 24 } },
            _react2.default.createElement(
              _Typography2.default,
              { component: 'div', variant: 'caption', style: { paddingRight: 12 } },
              val.lastCreated ? intl.formatTime(new Date(val.lastCreated), 'hh:mm') : undefined
            )
          ),
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            { style: { paddingBottom: 24 } },
            _react2.default.createElement(
              _Typography2.default,
              { component: 'div' },
              _react2.default.createElement(_IconMenu2.default, { options: options, icon: _react2.default.createElement(_MoreHoriz2.default, null) })
            )
          )
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
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
      return _react2.default.createElement(
        'h1',
        null,
        'Something went wrong.'
      );
    }
    var usePreview = (0, _withWidth.isWidthUp)('sm', width);

    return _react2.default.createElement(
      'div',
      { style: { width: '100%', maxWidth: usePreview ? 300 : undefined, height: '100%' } },
      _react2.default.createElement(
        _Scrollbar2.default,
        null,
        _react2.default.createElement(
          _List2.default,
          {
            component: 'div',
            style: { padding: 0, height: '100%', width: '100%', maxWidth: usePreview ? 300 : undefined }
          },
          _react2.default.createElement(_reactList2.default, {
            style: { maxWidth: 300 },
            itemRenderer: this.renderItem,
            length: list ? list.length : 0,
            type: 'simple'
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { style: { position: 'absolute', width: usePreview ? 300 : '100%', bottom: 5 } },
        _react2.default.createElement(
          _core.Fab,
          _extends({
            color: 'secondary',
            onClick: function onClick() {
              history.push('/chats/create');
            },
            style: { position: 'absolute', right: 20, bottom: 10, zIndex: 99 }
          }, fabProps),
          _react2.default.createElement(_Chat2.default, { className: 'material-icons' })
        )
      )
    );
  };

  return ChatsList;
}(_react.Component);

ChatsList.propTypes = process.env.NODE_ENV !== "production" ? {
  list: _propTypes2.default.array.isRequired,
  history: _propTypes2.default.object
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var auth = state.auth,
      persistentValues = state.persistentValues;
  var match = ownPops.match;

  var uid = match.params.uid;

  var path = 'user_chats/' + auth.uid;
  var list = (0, _firekit.getList)(state, path).sort(_materialUiFilter.filterSelectors.dynamicSort('lastCreated', false, function (fieldValue) {
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

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, { setPersistentValue: _actions.setPersistentValue }), _reactIntl.injectIntl, _firekitProvider.withFirebase, _AppConfigProvider.withAppConfigs, _reactRouterDom.withRouter, (0, _withWidth2.default)(), _styles.withTheme)(ChatsList);