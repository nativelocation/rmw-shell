var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AltIconAvatar from '../../components/AltIconAvatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Switch from '@material-ui/core/Switch';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

var UsersToggle = function (_Component) {
  _inherits(UsersToggle, _Component);

  function UsersToggle() {
    var _temp, _this, _ret;

    _classCallCheck(this, UsersToggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.renderGrantItem = function (list, i) {
      var _this$props = _this.props,
          getValue = _this$props.getValue,
          _onChange = _this$props.onChange,
          onClick = _this$props.onClick;


      var userUid = list[i].key;
      var user = list[i].val;
      var checked = getValue(userUid);

      return React.createElement(
        'div',
        { key: i },
        React.createElement(
          ListItem,
          { key: userUid, id: userUid, onClick: onClick ? function () {
              return onClick(userUid, user);
            } : undefined },
          React.createElement(AltIconAvatar, { alt: 'person', src: user.photoURL, icon: React.createElement(Person, null) }),
          React.createElement(ListItemText, {
            primary: React.createElement(
              'div',
              { style: { fontFamily: 'Roboto' } },
              user.displayName
            ),
            secondaryText: React.createElement(
              'div',
              { style: { fontFamily: 'Roboto' } },
              user.email
            )
          }),
          React.createElement(
            ListItemSecondaryAction,
            null,
            React.createElement(Switch, { checked: checked === true, onChange: function onChange(e, newVal) {
                return _onChange(userUid, newVal);
              } })
          )
        ),
        React.createElement(Divider, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UsersToggle.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        path = _props.path,
        setSearch = _props.setSearch;


    setSearch('users_toggle', '');
    watchList(path);
  };

  UsersToggle.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        intl = _props2.intl,
        list = _props2.list;


    var filterFields = [{
      name: 'displayName',
      label: intl.formatMessage({ id: 'name_label' })
    }, {
      name: 'value',
      label: intl.formatMessage({ id: 'value_label' })
    }];

    return React.createElement(
      'div',
      null,
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
      React.createElement(FilterDrawer, { name: 'users_toggle', fields: filterFields, formatMessage: intl.formatMessage })
    );
  };

  return UsersToggle;
}(Component);

UsersToggle.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      lists = state.lists,
      filters = state.filters;
  var getValue = ownProps.getValue,
      onChange = ownProps.onChange;


  var path = 'users';
  var list = filterSelectors.getFilteredList('users_toggle', filters, lists[path], function (fieldValue) {
    return fieldValue.val;
  });

  return {
    path: path,
    getValue: getValue ? getValue : function () {
      return false;
    },
    onChange: onChange ? onChange : function () {},
    list: list,
    filters: filters,
    auth: auth,
    intl: intl,
    user_grants: lists.user_grants
  };
};

export default connect(mapStateToProps, _extends({ setSimpleValue: setSimpleValue }, filterActions))(injectIntl(withRouter(withFirebase(withTheme(UsersToggle)))));