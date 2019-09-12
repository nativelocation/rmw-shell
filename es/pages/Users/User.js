var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AccountBox from '@material-ui/icons/AccountBox';
import Activity from '../../containers/Activity';
import AppBar from '@material-ui/core/AppBar';
import FilterList from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Lock from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Scrollbar from '../../components/Scrollbar';
import SearchField from '../../components/SearchField';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import UserForm from '../../components/Forms/UserForm';
import UserGrants from '../../containers/Users/UserGrants';
import UserRoles from '../../containers/Users/UserRoles';
import { change, submit } from 'redux-form';
import { connect } from 'react-redux';
import { filterSelectors, filterActions } from 'material-ui-filter';
import { formValueSelector } from 'redux-form';
import { getList, isLoading, getPath } from 'firekit';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core/styles';

var path = '/users';

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    tabs: {
      flex: 1,
      width: '100%'
    },
    form: {
      backgroundColor: theme.palette.background.default,
      margin: 15,
      display: 'flex',
      justifyContent: 'center'
    }
  };
};

export var User = function (_Component) {
  _inherits(User, _Component);

  function User() {
    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      values: {}
    }, _this.handleTabActive = function (e, value) {
      var _this$props = _this.props,
          history = _this$props.history,
          uid = _this$props.uid,
          rootPath = _this$props.rootPath,
          rootUid = _this$props.rootUid;


      if (rootPath) {
        history.push(path + '/edit/' + uid + '/' + value + '/' + rootPath + '/' + rootUid);
      } else {
        history.push(path + '/edit/' + uid + '/' + value);
      }
    }, _this.handleAdminChange = function (e, isInputChecked) {
      var _this$props2 = _this.props,
          firebaseApp = _this$props2.firebaseApp,
          match = _this$props2.match;

      var uid = match.params.uid;

      if (isInputChecked) {
        firebaseApp.database().ref('/admins/' + uid).set(true);
      } else {
        firebaseApp.database().ref('/admins/' + uid).remove();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  User.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        watchList = _props.watchList,
        uid = _props.uid,
        firebaseApp = _props.firebaseApp;

    watchList('admins');
    watchList('user_grants');

    firebaseApp.database().ref('users/' + uid).on('value', function (snap) {
      _this2.setState({ values: snap.val() });
    });
  };

  User.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props2 = this.props,
        firebaseApp = _props2.firebaseApp,
        uid = _props2.uid;


    firebaseApp.database().ref('users/' + uid).off();
  };

  User.prototype.render = function render() {
    var _props3 = this.props,
        history = _props3.history,
        intl = _props3.intl,
        theme = _props3.theme,
        match = _props3.match,
        admins = _props3.admins,
        editType = _props3.editType,
        setFilterIsOpen = _props3.setFilterIsOpen,
        hasFilters = _props3.hasFilters,
        isLoading = _props3.isLoading,
        classes = _props3.classes;


    var uid = match.params.uid;
    var isAdmin = false;

    if (admins !== undefined) {
      for (var _iterator = admins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var admin = _ref;

        if (admin.key === uid) {
          isAdmin = true;
          break;
        }
      }
    }

    return React.createElement(
      Activity,
      {
        isLoading: isLoading,
        appBarContent: React.createElement(
          'div',
          null,
          editType === 'grants' && React.createElement(
            'div',
            { style: { display: 'flex' } },
            React.createElement(SearchField, { filterName: 'user_grants' }),
            React.createElement(
              IconButton,
              {
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: function onClick() {
                  return setFilterIsOpen('user_grants', true);
                }
              },
              React.createElement(FilterList, {
                className: 'material-icons',
                color: hasFilters ? theme.palette.accent1Color : theme.palette.canvasColor
              })
            )
          )
        ),
        onBackClick: function onBackClick() {
          return history.push('/users');
        },
        title: intl.formatMessage({ id: 'edit_user' })
      },
      React.createElement(
        Scrollbar,
        { style: { height: '100%' } },
        React.createElement(
          'div',
          { className: classes.root },
          React.createElement(
            AppBar,
            { position: 'static' },
            React.createElement(
              Tabs,
              { value: editType, onChange: this.handleTabActive, fullWidth: true, centered: true },
              React.createElement(Tab, { value: 'profile', icon: React.createElement(Person, { className: 'material-icons' }) }),
              React.createElement(Tab, { value: 'roles', icon: React.createElement(AccountBox, { className: 'material-icons' }) }),
              React.createElement(Tab, { value: 'grants', icon: React.createElement(Lock, { className: 'material-icons' }) })
            )
          ),
          editType === 'profile' && React.createElement(
            'div',
            { className: classes.form },
            React.createElement(UserForm, _extends({
              handleAdminChange: this.handleAdminChange,
              isAdmin: isAdmin,
              values: this.state.values ? this.state.values : {}
            }, this.props))
          ),
          editType === 'roles' && React.createElement(UserRoles, this.props),
          editType === 'grants' && React.createElement(UserGrants, this.props)
        )
      )
    );
  };

  return User;
}(Component);

User.propTypes = process.env.NODE_ENV !== "production" ? {
  history: PropTypes.object,

  //submit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  admins: PropTypes.array.isRequired
} : {};

var selector = formValueSelector('user');

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      filters = state.filters;
  var match = ownProps.match;


  var uid = match.params.uid;
  var editType = match.params.editType ? match.params.editType : 'data';

  var _filterSelectors$sele = filterSelectors.selectFilterProps('user_grants', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var isLoadingRoles = isLoading(state, 'user_roles');
  var isLoadingGrants = isLoading(state, 'user_grants');
  var rootPath = match.params.rootPath;
  var rootUid = match.params.rootUid;

  var photoURL = '';
  var displayName = '';

  if (selector) {
    photoURL = selector(state, 'photoURL');
    displayName = selector(state, 'displayName');
  }

  return {
    rootPath: rootPath,
    rootUid: rootUid,
    hasFilters: hasFilters,
    auth: auth,
    uid: uid,
    editType: editType,
    intl: intl,
    photoURL: photoURL,
    displayName: displayName,
    admins: getList(state, 'admins'),
    user: getPath(state, 'users/' + uid),
    isLoading: isLoadingRoles || isLoadingGrants
  };
};

export default connect(mapStateToProps, _extends({ setSimpleValue: setSimpleValue, change: change, submit: submit }, filterActions))(injectIntl(withRouter(withFirebase(withStyles(styles, { withTheme: true })(withTheme(User))))));