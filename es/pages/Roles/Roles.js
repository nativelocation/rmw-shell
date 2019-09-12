function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AccountBox from '@material-ui/icons/AccountBox';
import Activity from '../../containers/Activity';
import Add from '@material-ui/icons/Add';
import AltIconAvatar from '../../components/AltIconAvatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar/Scrollbar';
import { Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import { getList, isLoading } from 'firekit';
import { injectIntl } from 'react-intl';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';

var path = 'roles';

export var Roles = function (_Component) {
  _inherits(Roles, _Component);

  function Roles() {
    var _temp, _this, _ret;

    _classCallCheck(this, Roles);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleCreateClick = function () {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          history = _this$props.history;


      var newRole = firebaseApp.database().ref('/' + path).push();

      newRole.update({ name: 'New Role' }).then(function () {
        history.push('/' + path + '/edit/' + newRole.key + '/main');
      });
    }, _this.renderItem = function (i) {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          history = _this$props2.history;


      var key = list[i].key;
      var val = list[i].val;

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          {
            key: i,
            onClick: function onClick() {
              history.push('/' + path + '/edit/' + key + '/main');
            },
            id: i
          },
          React.createElement(AltIconAvatar, { icon: React.createElement(AccountBox, null) }),
          React.createElement(ListItemText, { primary: val.name, secondary: val.description })
        ),
        React.createElement(Divider, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Roles.prototype.componentDidMount = function componentDidMount() {
    var watchList = this.props.watchList;


    watchList(path);
  };

  Roles.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        list = _props.list,
        isLoading = _props.isLoading;


    return React.createElement(
      Activity,
      { isLoading: isLoading, title: intl.formatMessage({ id: 'roles' }) },
      React.createElement(
        'div',
        { style: { height: '100%' } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            {
              ref: function ref(field) {
                _this2.list = field;
              }
            },
            React.createElement(ReactList, { itemRenderer: this.renderItem, length: list.length, type: 'simple' })
          )
        ),
        React.createElement('div', { style: { float: 'left', clear: 'both' } }),
        React.createElement(
          'div',
          { style: { position: 'fixed', right: 18, zIndex: 3, bottom: 18 } },
          React.createElement(
            Fab,
            { color: 'secondary', onClick: this.handleCreateClick },
            React.createElement(Add, { className: 'material-icons' })
          )
        )
      )
    );
  };

  return Roles;
}(Component);

Roles.propTypes = process.env.NODE_ENV !== "production" ? {} : {};

var mapStateToProps = function mapStateToProps(state) {
  return {
    list: getList(state, path),
    isLoading: isLoading(state, path)
  };
};

export default connect(mapStateToProps)(injectIntl(withFirebase(withRouter(Roles))));