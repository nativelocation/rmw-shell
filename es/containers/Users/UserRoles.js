function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AccountBox from '@material-ui/icons/AccountBox';
import AltIconAvatar from '../../components/AltIconAvatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { getList } from 'firekit';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

export var UserRoles = function (_Component) {
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

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          { key: i, id: i },
          React.createElement(AltIconAvatar, { icon: React.createElement(AccountBox, null) }),
          React.createElement(ListItemText, { primary: val.name, secondary: val.description }),
          React.createElement(
            ListItemSecondaryAction,
            null,
            React.createElement(Switch, {
              checked: userRoles[key] === true,
              onChange: function onChange(e, isInputChecked) {
                _this.handleRoleToggleChange(e, isInputChecked, key);
              }
            })
          )
        ),
        React.createElement(Divider, { variant: 'inset' })
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


    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        List,
        { style: { height: '100%' } },
        React.createElement(ReactList, {
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
}(Component);

UserRoles.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
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
    user_roles: getList(state, userRolesPath),
    roles: getList(state, 'roles')
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue })(injectIntl(withRouter(withFirebase(withTheme(UserRoles)))));