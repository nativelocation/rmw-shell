'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _DeleteDialog = require('../../containers/DeleteDialog');

var _DeleteDialog2 = _interopRequireDefault(_DeleteDialog);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scrollbar = require('../../components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _auth = require('../../utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _messaging = require('../../utils/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _actions = require('../../store/persistentValues/actions');

var _actions2 = require('../../store/simpleValues/actions');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageStep = 20;

var Messages = (_temp = _class = function (_Component) {
  _inherits(Messages, _Component);

  function Messages(props) {
    _classCallCheck(this, Messages);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.name = null;
    _this.listEnd = null;
    return _this;
  }

  Messages.prototype.componentDidUpdate = function componentDidUpdate() {
    this.scrollToBottom();
  };

  Messages.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        uid = _props.uid,
        userChats = _props.userChats,
        setPersistentValue = _props.setPersistentValue;


    this.initMessages(this.props);
    this.scrollToBottom();

    (0, _messaging2.default)(this.props);

    userChats.forEach(function (chat) {
      if (chat.key === uid) {
        setPersistentValue('current_chat_name', chat.val.displayName);
      }
    });
  };

  Messages.prototype.componentDidCatch = function componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  };

  Messages.prototype.renderList = function renderList(messages) {
    var _this2 = this;

    var _props2 = this.props,
        auth = _props2.auth,
        theme = _props2.theme,
        path = _props2.path,
        isGranted = _props2.isGranted;


    var currentDate = '';
    var currentAuthor = '';

    if (messages === undefined) {
      return _react2.default.createElement('div', null);
    }

    return messages.map(function (row, i) {
      var values = row.val;
      var key = row.key;

      if (values.created === null) {
        return undefined;
      }

      var myBColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];

      var stringDate = values.created ? new Date(values.created).toISOString().slice(0, 10) : '';
      var dataChanged = false;
      var authorChanged = false;
      var backgroundColor = values.authorUid === auth.uid ? theme.palette.primary.main : myBColor;
      var color = theme.palette.text.primary;
      var type = values.message ? 'text' : values.link ? 'link' : values.location ? 'location' : values.image ? 'image' : undefined;

      if (values.type) {
        type = values.type;
      }

      if (currentDate !== stringDate) {
        currentDate = stringDate;
        dataChanged = true;
      }

      if (currentAuthor !== values.authorUid) {
        currentAuthor = values.authorUid;
        authorChanged = true;
      }

      return _react2.default.createElement(_Message2.default, {
        key: key,
        uid: key,
        path: path,
        dataChanged: dataChanged,
        authorChanged: authorChanged,
        row: row,
        i: i,
        values: values,
        backgroundColor: backgroundColor,
        color: color,
        type: type,
        isGranted: isGranted,
        scrollToBottom: _this2.scrollToBottom
      });
    });
  };

  Messages.prototype.render = function render() {
    var _this3 = this;

    var _props3 = this.props,
        messages = _props3.messages,
        theme = _props3.theme,
        intl = _props3.intl,
        path = _props3.path;


    if (this.state.hasError) {
      // You can render any custom fallback UI
      return _react2.default.createElement(
        'h1',
        null,
        'Something went wrong.'
      );
    }

    return _react2.default.createElement(
      _Scrollbar2.default,
      {
        style: {
          backgroundColor: theme.palette.background.default,
          width: '100%'
        },
        renderView: function renderView(props) {
          return _react2.default.createElement('div', _extends({}, props, { style: _extends({}, props.style, { overflowX: 'hidden' }) }));
        }
      },
      _react2.default.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
        _react2.default.createElement(
          'div',
          { style: { maxWidth: 600, margin: 8, width: '100%' } },
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'center' } },
            _react2.default.createElement(_Chip2.default, {
              label: intl.formatMessage({ id: 'load_more_label' }),
              onClick: this.handleLoadMore
              //backgroundColor={theme.palette.primary.main}
            })
          ),
          this.renderList(messages)
        )
      ),
      _react2.default.createElement('div', {
        style: { float: 'left', clear: 'both' },
        ref: function ref(el) {
          _this3.listEnd = el;
        }
      }),
      _react2.default.createElement(_DeleteDialog2.default, { path: path, name: 'message', handleDelete: this.handleDelete })
    );
  };

  return Messages;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.state = {
    anchorEl: null,
    hasError: false
  };

  this.handleDelete = function (handleClose, deleteUid) {
    var _props4 = _this4.props,
        firebaseApp = _props4.firebaseApp,
        path = _props4.path;


    if (deleteUid) {
      firebaseApp.database().ref().child('/' + path + '/' + deleteUid).remove().then(function () {
        handleClose();
      });
    }
  };

  this.scrollToBottom = function () {
    var node = _this4.listEnd;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  };

  this.initMessages = function (props) {
    var watchList = props.watchList,
        firebaseApp = props.firebaseApp,
        path = props.path,
        auth = props.auth;


    try {
      var messagesRef = firebaseApp.database().ref(path).orderByKey().limitToLast(pageStep);
      watchList(messagesRef);
      watchList('user_chats/' + auth.uid);
    } catch (error) {
      console.log(error);
    }
  };

  this.handleLoadMore = function () {
    var _props5 = _this4.props,
        watchList = _props5.watchList,
        unwatchList = _props5.unwatchList,
        firebaseApp = _props5.firebaseApp,
        setSimpleValue = _props5.setSimpleValue,
        simpleValues = _props5.simpleValues,
        path = _props5.path;


    var currentAmount = simpleValues['chat_messages_limit'] ? simpleValues['chat_messages_limit'] : pageStep;
    var nextAmount = currentAmount + pageStep;

    unwatchList(path);
    setSimpleValue('chat_messages_limit', nextAmount);
    var messagesRef = firebaseApp.database().ref(path).orderByKey().limitToLast(nextAmount);
    watchList(messagesRef);
  };
}, _temp);


Messages.propTypes = process.env.NODE_ENV !== "production" ? {
  theme: _propTypes2.default.object.isRequired,
  auth: _propTypes2.default.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var auth = state.auth,
      simpleValues = state.simpleValues,
      messaging = state.messaging;
  var uid = ownPops.uid,
      path = ownPops.path;


  var chatMessageMenuOpen = simpleValues['chatMessageMenuOpen'] === true;
  var imageDialogOpen = simpleValues.chatOpenImageDialog;
  var chatsPath = 'user_chats/' + auth.uid;

  return {
    imageDialogOpen: imageDialogOpen,
    simpleValues: simpleValues,
    path: path,
    uid: uid,
    chatMessageMenuOpen: chatMessageMenuOpen,
    messaging: messaging,
    messages: (0, _firekit.getList)(state, path),
    userChats: (0, _firekit.getList)(state, chatsPath),
    predefinedMessages: (0, _firekit.getList)(state, 'predefined_chat_messages'),
    auth: auth,
    isGranted: function isGranted(grant) {
      return (0, _auth2.default)(state, grant);
    }
  };
};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions2.setSimpleValue, setPersistentValue: _actions.setPersistentValue }), _reactIntl.injectIntl, _styles.withTheme, _reactRouterDom.withRouter, _firekitProvider.withFirebase, _AppConfigProvider.withAppConfigs)(Messages);
module.exports = exports['default'];