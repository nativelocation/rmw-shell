var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import AltIconAvatar from '../../components/AltIconAvatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';
import SearchField from '../../components/SearchField';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { filterSelectors, filterActions } from 'material-ui-filter';
import { getList, isLoading } from 'firekit';
import { injectIntl } from 'react-intl';
import { setPersistentValue } from '../../store/persistentValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

var path = 'users';

export var Users = function (_Component) {
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
        return React.createElement('div', { key: key });
      }

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          {
            key: key,
            onClick: function onClick() {
              _this.handleRowClick(users[index]);
            },
            id: key
          },
          React.createElement(AltIconAvatar, { src: user.photoURL, icon: React.createElement(Person, null) }),
          React.createElement(ListItemText, {
            primary: user.displayName,
            secondary: !user.connections && !user.lastOnline ? intl.formatMessage({ id: 'offline' }) : intl.formatMessage({ id: 'online' })
          })
        ),
        React.createElement(Divider, { variant: 'inset' })
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


    return React.createElement(
      Activity,
      {
        title: intl.formatMessage({ id: 'users' }),
        onBackClick: function onBackClick() {
          return history.back();
        },
        appBarContent: React.createElement(
          'div',
          { style: { display: 'flex' } },
          React.createElement(SearchField, { filterName: 'select_user' })
        ),
        isLoading: isLoading
      },
      React.createElement(
        'div',
        { style: { height: '100%', overflow: 'none', backgroundColor: theme.palette.convasColor } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            {
              id: 'test',
              ref: function ref(field) {
                _this2.users = field;
              }
            },
            React.createElement(ReactList, { itemRenderer: this.renderItem, length: users ? users.length : 0, type: 'simple' })
          )
        )
      )
    );
  };

  return Users;
}(Component);

Users.propTypes = process.env.NODE_ENV !== "production" ? {
  users: PropTypes.array.isRequired,

  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      filters = state.filters;
  var width = ownProps.width;

  var _filterSelectors$sele = filterSelectors.selectFilterProps('select_user', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var users = filterSelectors.getFilteredList('select_user', filters, getList(state, 'users'), function (fieldValue) {
    return fieldValue.val;
  });
  var usePreview = isWidthUp('sm', width);

  return {
    usePreview: usePreview,
    hasFilters: hasFilters,
    isLoading: isLoading(state, 'users'),
    users: users,
    auth: auth
  };
};

export default compose(connect(mapStateToProps, _extends({}, filterActions, { setPersistentValue: setPersistentValue })), injectIntl, withFirebase, withRouter, withWidth(), withTheme)(Users);