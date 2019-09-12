'use strict';

exports.__esModule = true;
exports.UserRoles = undefined;

var _AccountBox = require('@material-ui/icons/AccountBox');

var _AccountBox2 = _interopRequireDefault(_AccountBox);

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

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

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserRoles = exports.UserRoles = function (_Component) {
  _inherits(UserRoles, _Component);

  function UserRoles() {
    var _temp, _this, _ret;

    _classCallCheck(this, UserRoles);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoleToggleChange = function (e, isInputChecked, key) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          userRolesPath = _this$props.userRolesPath;

      var ref = firebaseApp.database().ref(userRolesPath + '/' + key);

      if (isInputChecked) {
        ref.set(true);
      } else {
        ref.remove();
      }
    }, _this.renderRoleItem = function (i) {
      var _this$props2 = _this.props,
          roles = _this$props2.roles,
          user_roles = _this$props2.user_roles;


      var key = roles[i].key;
      var val = roles[i].val;
      var userRoles = [];

      if (user_roles !== undefined) {
        user_roles.map(function (role) {
          if (role.key === key) {
            if (role.val !== undefined) {
              userRoles[role.key] = role.val;
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
          _react2.default.createElement(_AltIconAvatar2.default, { icon: _react2.default.createElement(_AccountBox2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, { primary: val.name, secondary: val.description }),
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            null,
            _react2.default.createElement(_Switch2.default, {
              checked: userRoles[key] === true,
              onChange: function onChange(e, isInputChecked) {
                _this.handleRoleToggleChange(e, isInputChecked, key);
              }
            })
          )
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UserRoles.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        userRolesPath = _props.userRolesPath;


    watchList(userRolesPath);
    watchList('roles');
  };

  UserRoles.prototype.render = function render() {
    var _this2 = this;

    var roles = this.props.roles;


    return _react2.default.createElement(
      'div',
      { style: { height: '100%' } },
      _react2.default.createElement(
        _List2.default,
        { style: { height: '100%' } },
        _react2.default.createElement(_reactList2.default, {
          itemRenderer: function itemRenderer(i, k) {
            return _this2.renderRoleItem(i, k);
          },
          length: roles ? roles.length : 0,
          type: 'simple'
        })
      )
    );
  };

  return UserRoles;
}(_react.Component);

UserRoles.propTypes = process.env.NODE_ENV !== "production" ? {

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
  var userRolesPath = rootPath ? '/' + rootPath + '_user_roles/' + uid + '/' + rootUid : '/user_roles/' + uid;

  return {
    filters: filters,
    auth: auth,
    uid: uid,
    intl: intl,
    userRolesPath: userRolesPath,
    user_roles: (0, _firekit.getList)(state, userRolesPath),
    roles: (0, _firekit.getList)(state, 'roles')
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions.setSimpleValue })((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _firekitProvider.withFirebase)((0, _styles.withTheme)(UserRoles)))));