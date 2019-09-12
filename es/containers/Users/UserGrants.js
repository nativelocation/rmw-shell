var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AltIconAvatar from '../../components/AltIconAvatar';
import Check from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Switch from '@material-ui/core/Switch';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import { connect } from 'react-redux';
import { getList } from 'firekit';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

export var UserGrants = function (_Component) {
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

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          { key: i, id: i },
          React.createElement(AltIconAvatar, { icon: React.createElement(Check, null) }),
          React.createElement(ListItemText, { primary: intl.formatMessage({ id: 'grant_' + val }), secondary: val }),
          React.createElement(
            ListItemSecondaryAction,
            null,
            React.createElement(Switch, {
              checked: userGrants[key] === true,
              onChange: function onChange(e, isInputChecked) {
                _this.handleGrantToggleChange(e, isInputChecked, key);
              }
            })
          )
        ),
        React.createElement(Divider, { variant: 'inset' })
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

    var list = filterSelectors.getFilteredList('user_grants', filters, grantList, function (fieldValue) {
      return fieldValue.val;
    });

    var filterFields = [{
      name: 'name',
      label: intl.formatMessage({ id: 'name_label' })
    }, {
      name: 'value',
      label: intl.formatMessage({ id: 'value_label' })
    }];

    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        List,
        {
          style: { height: '100%' },
          ref: function ref(field) {
            _this2.list = field;
          }
        },
        React.createElement(ReactList, {
          itemRenderer: function itemRenderer(i, k) {
            return _this2.renderGrantItem(list, i, k);
          },
          length: list ? list.length : 0,
          type: 'simple'
        })
      ),
      React.createElement(FilterDrawer, { name: 'user_grants', fields: filterFields })
    );
  };

  return UserGrants;
}(Component);

UserGrants.propTypes = process.env.NODE_ENV !== "production" ? {

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
  var userGrantsPath = rootPath ? '/' + rootPath + '_user_grants/' + uid + '/' + rootUid : '/user_grants/' + uid;

  return {
    filters: filters,
    auth: auth,
    uid: uid,
    intl: intl,
    userGrantsPath: userGrantsPath,
    user_grants: getList(state, userGrantsPath)
  };
};

export default connect(mapStateToProps, _extends({ setSimpleValue: setSimpleValue }, filterActions))(injectIntl(withRouter(withFirebase(withAppConfigs(withTheme(UserGrants))))));