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

var _Email = require('@material-ui/icons/Email');

var _Email2 = _interopRequireDefault(_Email);

var _FilterList = require('@material-ui/icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _OfflinePin = require('@material-ui/icons/OfflinePin');

var _OfflinePin2 = _interopRequireDefault(_OfflinePin);

var _Phone = require('@material-ui/icons/Phone');

var _Phone2 = _interopRequireDefault(_Phone);

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

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _materialUiFilter = require('material-ui-filter');

var _Icons = require('../../components/Icons');

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getProviderIcon = function (provider) {
      var color = 'primary';

      switch (provider.providerId) {
        case 'google.com':
          return _react2.default.createElement(_Icons.GoogleIcon, { color: color });
        case 'facebook.com':
          return _react2.default.createElement(_Icons.FacebookIcon, { color: color });
        case 'twitter.com':
          return _react2.default.createElement(_Icons.TwitterIcon, { color: color });
        case 'github.com':
          return _react2.default.createElement(_Icons.GitHubIcon, { color: color });
        case 'phone':
          return _react2.default.createElement(_Phone2.default, { color: color });
        case 'password':
          return _react2.default.createElement(_Email2.default, { color: color });
        default:
          return undefined;
      }
    }, _this.handleRowClick = function (user) {
      var _this$props = _this.props,
          history = _this$props.history,
          isSelecting = _this$props.isSelecting;

      history.push(isSelecting ? '/' + isSelecting + '/' + user.key : '/' + path + '/edit/' + user.key + '/profile');
    }, _this.renderItem = function (index, key) {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          intl = _this$props2.intl;

      var user = list[index].val;

      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          _ListItem2.default,
          {
            key: key,
            onClick: function onClick() {
              _this.handleRowClick(list[index]);
            },
            id: key
          },
          _react2.default.createElement(_AltIconAvatar2.default, { src: user.photoURL, icon: _react2.default.createElement(_Person2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, {
            primary: user.displayName,
            secondary: !user.connections && !user.lastOnline ? intl.formatMessage({ id: 'offline' }) : intl.formatMessage({ id: 'online' })
          }),
          _react2.default.createElement(
            _Toolbar2.default,
            null,
            user.providerData && user.providerData.map(function (p, i) {
              return _react2.default.createElement(
                'div',
                { key: i },
                _this.getProviderIcon(p)
              );
            })
          ),
          _react2.default.createElement(_OfflinePin2.default, { color: user.connections ? 'primary' : 'disabled' })
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
    var _props = this.props,
        list = _props.list,
        theme = _props.theme,
        intl = _props.intl,
        setFilterIsOpen = _props.setFilterIsOpen,
        hasFilters = _props.hasFilters,
        isLoading = _props.isLoading;


    var filterFields = [{
      name: 'displayName',
      label: intl.formatMessage({ id: 'name' })
    }, {
      name: 'creationTime',
      type: 'date',
      label: intl.formatMessage({ id: 'creation_time' })
    }];

    return _react2.default.createElement(
      _Activity2.default,
      {
        title: intl.formatMessage({ id: 'users' }),
        appBarContent: _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          _react2.default.createElement(_SearchField2.default, { filterName: 'users' }),
          _react2.default.createElement(
            _IconButton2.default,
            {
              color: 'inherit',
              'aria-label': 'open drawer',
              onClick: function onClick() {
                setFilterIsOpen('users', true);
              }
            },
            _react2.default.createElement(_FilterList2.default, {
              className: 'material-icons',
              color: hasFilters ? theme.palette.accent1Color : theme.palette.canvasColor
            })
          )
        ),
        isLoading: isLoading
      },
      _react2.default.createElement(
        'div',
        { style: { height: '100%', overflow: 'none' } },
        _react2.default.createElement(
          _Scrollbar2.default,
          null,
          _react2.default.createElement(
            _List2.default,
            { id: 'test', component: 'div' },
            _react2.default.createElement(_reactList2.default, { itemRenderer: this.renderItem, length: list ? list.length : 0, type: 'simple' })
          )
        )
      ),
      _react2.default.createElement(_materialUiFilter.FilterDrawer, { name: 'users', fields: filterFields })
    );
  };

  return Users;
}(_react.Component);

Users.propTypes = process.env.NODE_ENV !== "production" ? {
  users: _propTypes2.default.array,

  theme: _propTypes2.default.object.isRequired,
  auth: _propTypes2.default.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      filters = state.filters;
  var match = ownProps.match;


  var isSelecting = match.params.select ? match.params.select : false;

  var _filterSelectors$sele = _materialUiFilter.filterSelectors.selectFilterProps('users', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var list = _materialUiFilter.filterSelectors.getFilteredList('users', filters, (0, _firekit.getList)(state, path), function (fieldValue) {
    return fieldValue.val;
  });

  return {
    isSelecting: isSelecting,
    hasFilters: hasFilters,
    isLoading: (0, _firekit.isLoading)(state, path),
    list: list,
    auth: auth
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, _extends({}, _materialUiFilter.filterActions))((0, _reactIntl.injectIntl)((0, _styles.withTheme)((0, _firekitProvider.withFirebase)((0, _reactRouterDom.withRouter)(Users)))));