'use strict';

exports.__esModule = true;
exports.Users = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

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

var _SearchField = require('../../components/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _materialUiFilter = require('material-ui-filter');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _actions = require('../../store/persistentValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = 'users';

var Users = exports.Users = function (_Component) {
  _inherits(Users, _Component);

  function Users() {
    var _temp, _this, _ret;

    _classCallCheck(this, Users);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRowClick = function (user) {
      var _this$props = _this.props,
          auth = _this$props.auth,
          firebaseApp = _this$props.firebaseApp,
          history = _this$props.history,
          usePreview = _this$props.usePreview,
          setPersistentValue = _this$props.setPersistentValue;


      var key = user.key;
      var userValues = user.val;
      var userChatsRef = firebaseApp.database().ref('/user_chats/' + auth.uid + '/' + key);

      var chatData = {
        displayName: userValues.displayName,
        photoURL: userValues.photoURL ? userValues.photoURL : '',
        lastMessage: ''
      };

      userChatsRef.update(_extends({}, chatData));

      if (usePreview) {
        setPersistentValue('current_chat_uid', key);
        history.push('/chats');
      } else {
        history.push('/chats/edit/' + key);
      }
    }, _this.renderItem = function (index, key) {
      var _this$props2 = _this.props,
          users = _this$props2.users,
          intl = _this$props2.intl,
          auth = _this$props2.auth;


      var user = users[index].val;

      //We hide ourselfe to not create a chat with ourself
      if (user.uid === auth.uid) {
        return _react2.default.createElement('div', { key: key });
      }

      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          _ListItem2.default,
          {
            key: key,
            onClick: function onClick() {
              _this.handleRowClick(users[index]);
            },
            id: key
          },
          _react2.default.createElement(_AltIconAvatar2.default, { src: user.photoURL, icon: _react2.default.createElement(_Person2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, {
            primary: user.displayName,
            secondary: !user.connections && !user.lastOnline ? intl.formatMessage({ id: 'offline' }) : intl.formatMessage({ id: 'online' })
          })
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Users.prototype.componentDidMount = function componentDidMount() {
    var watchList = this.props.watchList;


    watchList(path);
  };

  Users.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        isLoading = _props.isLoading,
        theme = _props.theme,
        users = _props.users;


    return _react2.default.createElement(
      _Activity2.default,
      {
        title: intl.formatMessage({ id: 'users' }),
        onBackClick: function onBackClick() {
          return history.back();
        },
        appBarContent: _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          _react2.default.createElement(_SearchField2.default, { filterName: 'select_user' })
        ),
        isLoading: isLoading
      },
      _react2.default.createElement(
        'div',
        { style: { height: '100%', overflow: 'none', backgroundColor: theme.palette.convasColor } },
        _react2.default.createElement(
          _Scrollbar2.default,
          null,
          _react2.default.createElement(
            _List2.default,
            {
              id: 'test',
              ref: function ref(field) {
                _this2.users = field;
              }
            },
            _react2.default.createElement(_reactList2.default, { itemRenderer: this.renderItem, length: users ? users.length : 0, type: 'simple' })
          )
        )
      )
    );
  };

  return Users;
}(_react.Component);

Users.propTypes = process.env.NODE_ENV !== "production" ? {
  users: _propTypes2.default.array.isRequired,

  theme: _propTypes2.default.object.isRequired,
  auth: _propTypes2.default.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      filters = state.filters;
  var width = ownProps.width;

  var _filterSelectors$sele = _materialUiFilter.filterSelectors.selectFilterProps('select_user', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var users = _materialUiFilter.filterSelectors.getFilteredList('select_user', filters, (0, _firekit.getList)(state, 'users'), function (fieldValue) {
    return fieldValue.val;
  });
  var usePreview = (0, _withWidth.isWidthUp)('sm', width);

  return {
    usePreview: usePreview,
    hasFilters: hasFilters,
    isLoading: (0, _firekit.isLoading)(state, 'users'),
    users: users,
    auth: auth
  };
};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, _extends({}, _materialUiFilter.filterActions, { setPersistentValue: _actions.setPersistentValue })), _reactIntl.injectIntl, _firekitProvider.withFirebase, _reactRouterDom.withRouter, (0, _withWidth2.default)(), _styles.withTheme)(Users);