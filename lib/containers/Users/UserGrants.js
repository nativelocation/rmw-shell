'use strict';

exports.__esModule = true;
exports.UserGrants = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Check = require('@material-ui/icons/Check');

var _Check2 = _interopRequireDefault(_Check);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _materialUiFilter = require('material-ui-filter');

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserGrants = exports.UserGrants = function (_Component) {
  _inherits(UserGrants, _Component);

  function UserGrants() {
    var _temp, _this, _ret;

    _classCallCheck(this, UserGrants);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleGrantToggleChange = function (e, isInputChecked, key) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          userGrantsPath = _this$props.userGrantsPath;

      var ref = firebaseApp.database().ref(userGrantsPath + '/' + key);

      if (isInputChecked) {
        ref.set(true);
      } else {
        ref.remove();
      }
    }, _this.renderGrantItem = function (list, i) {
      var _this$props2 = _this.props,
          user_grants = _this$props2.user_grants,
          intl = _this$props2.intl,
          appConfig = _this$props2.appConfig;


      var key = list[i].val ? list[i].val.value : '';
      var val = appConfig.grants[list[i].key];
      var userGrants = [];

      if (user_grants !== undefined) {
        user_grants.map(function (role) {
          if (role.key === key) {
            if (role.val !== undefined) {
              userGrants[role.key] = role.val;
            }
          }
          return role;
        });
      }

      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          _ListItem2.default,
          { key: i, id: i },
          _react2.default.createElement(_AltIconAvatar2.default, { icon: _react2.default.createElement(_Check2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, { primary: intl.formatMessage({ id: 'grant_' + val }), secondary: val }),
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            null,
            _react2.default.createElement(_Switch2.default, {
              checked: userGrants[key] === true,
              onChange: function onChange(e, isInputChecked) {
                _this.handleGrantToggleChange(e, isInputChecked, key);
              }
            })
          )
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UserGrants.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        userGrantsPath = _props.userGrantsPath;


    watchList(userGrantsPath);
  };

  UserGrants.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        intl = _props2.intl,
        filters = _props2.filters,
        appConfig = _props2.appConfig;


    var grantList = appConfig.grants.map(function (grant, index) {
      return { key: index, val: { name: intl.formatMessage({ id: 'grant_' + grant }), value: grant } };
    });

    var list = _materialUiFilter.filterSelectors.getFilteredList('user_grants', filters, grantList, function (fieldValue) {
      return fieldValue.val;
    });

    var filterFields = [{
      name: 'name',
      label: intl.formatMessage({ id: 'name_label' })
    }, {
      name: 'value',
      label: intl.formatMessage({ id: 'value_label' })
    }];

    return _react2.default.createElement(
      'div',
      { style: { height: '100%' } },
      _react2.default.createElement(
        _List2.default,
        {
          style: { height: '100%' },
          ref: function ref(field) {
            _this2.list = field;
          }
        },
        _react2.default.createElement(_reactList2.default, {
          itemRenderer: function itemRenderer(i, k) {
            return _this2.renderGrantItem(list, i, k);
          },
          length: list ? list.length : 0,
          type: 'simple'
        })
      ),
      _react2.default.createElement(_materialUiFilter.FilterDrawer, { name: 'user_grants', fields: filterFields })
    );
  };

  return UserGrants;
}(_react.Component);

UserGrants.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: _propTypes2.default.object.isRequired,
  match: _propTypes2.default.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      filters = state.filters;
  var match = ownProps.match;


  var uid = match.params.uid;
  var rootPath = match.params.rootPath;
  var rootUid = match.params.rootUid;
  var userGrantsPath = rootPath ? '/' + rootPath + '_user_grants/' + uid + '/' + rootUid : '/user_grants/' + uid;

  return {
    filters: filters,
    auth: auth,
    uid: uid,
    intl: intl,
    userGrantsPath: userGrantsPath,
    user_grants: (0, _firekit.getList)(state, userGrantsPath)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, _extends({ setSimpleValue: _actions.setSimpleValue }, _materialUiFilter.filterActions))((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _firekitProvider.withFirebase)((0, _AppConfigProvider.withAppConfigs)((0, _styles.withTheme)(UserGrants))))));