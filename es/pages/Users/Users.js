var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import AltIconAvatar from '../../components/AltIconAvatar';
import Divider from '@material-ui/core/Divider';
import Email from '@material-ui/icons/Email';
import FilterList from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OfflinePin from '@material-ui/icons/OfflinePin';
import Phone from '@material-ui/icons/Phone';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';
import SearchField from '../../components/SearchField';
import Toolbar from '@material-ui/core/Toolbar';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons';
import { connect } from 'react-redux';
import { getList, isLoading } from 'firekit';
import { injectIntl } from 'react-intl';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';

var path = 'users';

export var Users = function (_Component) {
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
          return React.createElement(GoogleIcon, { color: color });
        case 'facebook.com':
          return React.createElement(FacebookIcon, { color: color });
        case 'twitter.com':
          return React.createElement(TwitterIcon, { color: color });
        case 'github.com':
          return React.createElement(GitHubIcon, { color: color });
        case 'phone':
          return React.createElement(Phone, { color: color });
        case 'password':
          return React.createElement(Email, { color: color });
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

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          {
            key: key,
            onClick: function onClick() {
              _this.handleRowClick(list[index]);
            },
            id: key
          },
          React.createElement(AltIconAvatar, { src: user.photoURL, icon: React.createElement(Person, null) }),
          React.createElement(ListItemText, {
            primary: user.displayName,
            secondary: !user.connections && !user.lastOnline ? intl.formatMessage({ id: 'offline' }) : intl.formatMessage({ id: 'online' })
          }),
          React.createElement(
            Toolbar,
            null,
            user.providerData && user.providerData.map(function (p, i) {
              return React.createElement(
                'div',
                { key: i },
                _this.getProviderIcon(p)
              );
            })
          ),
          React.createElement(OfflinePin, { color: user.connections ? 'primary' : 'disabled' })
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

    return React.createElement(
      Activity,
      {
        title: intl.formatMessage({ id: 'users' }),
        appBarContent: React.createElement(
          'div',
          { style: { display: 'flex' } },
          React.createElement(SearchField, { filterName: 'users' }),
          React.createElement(
            IconButton,
            {
              color: 'inherit',
              'aria-label': 'open drawer',
              onClick: function onClick() {
                setFilterIsOpen('users', true);
              }
            },
            React.createElement(FilterList, {
              className: 'material-icons',
              color: hasFilters ? theme.palette.accent1Color : theme.palette.canvasColor
            })
          )
        ),
        isLoading: isLoading
      },
      React.createElement(
        'div',
        { style: { height: '100%', overflow: 'none' } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            { id: 'test', component: 'div' },
            React.createElement(ReactList, { itemRenderer: this.renderItem, length: list ? list.length : 0, type: 'simple' })
          )
        )
      ),
      React.createElement(FilterDrawer, { name: 'users', fields: filterFields })
    );
  };

  return Users;
}(Component);

Users.propTypes = process.env.NODE_ENV !== "production" ? {
  users: PropTypes.array,

  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      filters = state.filters;
  var match = ownProps.match;


  var isSelecting = match.params.select ? match.params.select : false;

  var _filterSelectors$sele = filterSelectors.selectFilterProps('users', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var list = filterSelectors.getFilteredList('users', filters, getList(state, path), function (fieldValue) {
    return fieldValue.val;
  });

  return {
    isSelecting: isSelecting,
    hasFilters: hasFilters,
    isLoading: isLoading(state, path),
    list: list,
    auth: auth
  };
};

export default connect(mapStateToProps, _extends({}, filterActions))(injectIntl(withTheme(withFirebase(withRouter(Users)))));