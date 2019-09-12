var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AccountBox from '@material-ui/icons/AccountBox';
import Activity from '../../containers/Activity';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterList from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Lock from '@material-ui/icons/Lock';
import React, { Component } from 'react';
import RoleGrants from '../../containers/Roles/RoleGrants';
import Save from '@material-ui/icons/Save';
import Scrollbar from '../../components/Scrollbar/Scrollbar';
import SearchField from '../../components/SearchField';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import classNames from 'classnames';
import { change, submit } from 'redux-form';
import { connect } from 'react-redux';
import { filterSelectors, filterActions } from 'material-ui-filter';
import { injectIntl } from 'react-intl';
import { isLoading } from 'firekit';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core/styles';

var path = '/roles';

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

export var Role = function (_Component) {
  _inherits(Role, _Component);

  function Role() {
    var _temp, _this, _ret;

    _classCallCheck(this, Role);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      values: {
        name: '',
        description: ''
      },
      errors: {}
    }, _this.validate = function (values) {
      var intl = _this.props.intl;

      var errors = {};

      errors.name = !values.name ? intl.formatMessage({ id: 'error_required_field' }) : '';

      return errors;
    }, _this.clean = function (obj) {
      Object.keys(obj).forEach(function (key) {
        return obj[key] === undefined && delete obj[key];
      });
      return obj;
    }, _this.submit = function () {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          uid = _this$props.uid,
          history = _this$props.history;


      var values = _this.state.values;

      firebaseApp.database().ref('roles/' + uid).update(_this.clean(values)).then(function () {
        history.push('/roles');
      });
    }, _this.handleTabActive = function (e, value) {
      var _this$props2 = _this.props,
          history = _this$props2.history,
          uid = _this$props2.uid;


      history.push(path + '/edit/' + uid + '/' + value);
    }, _this.handleValueChange = function (name, value) {
      var _extends2;

      return _this.setState({ values: _extends({}, _this.state.values, (_extends2 = {}, _extends2[name] = value, _extends2)) }, function () {
        _this.validate();
      });
    }, _this.handleClose = function () {
      var setDialogIsOpen = _this.props.setDialogIsOpen;


      setDialogIsOpen('delete_role', false);
    }, _this.validate = function () {
      var errors = {};
      var values = _this.state.values;

      if (!values.name) {
        errors.displayName = 'Required';
      }

      _this.setState({ errors: errors });
    }, _this.handleDelete = function () {
      var _this$props3 = _this.props,
          history = _this$props3.history,
          match = _this$props3.match,
          firebaseApp = _this$props3.firebaseApp;

      var uid = match.params.uid;

      if (uid) {
        firebaseApp.database().ref().child(path + '/' + uid).remove().then(function () {
          _this.handleClose();
          history.goBack();
        });
      }
    }, _this.canSave = function () {
      if (Object.keys(_this.state.errors).length) {
        return false;
      }

      return true;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Role.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        watchList = _props.watchList,
        firebaseApp = _props.firebaseApp,
        uid = _props.uid;

    watchList('grants');
    watchList('role_grants');

    firebaseApp.database().ref('roles/' + uid).on('value', function (snap) {
      _this2.setState({ values: snap.val() ? snap.val() : {} });
    });

    //watchPath(`roles/${uid}`)
    //setSearch('role_grants', '')
  };

  Role.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        history = _props2.history,
        intl = _props2.intl,
        dialogs = _props2.dialogs,
        setDialogIsOpen = _props2.setDialogIsOpen,
        theme = _props2.theme,
        editType = _props2.editType,
        hasFilters = _props2.hasFilters,
        setFilterIsOpen = _props2.setFilterIsOpen,
        isLoading = _props2.isLoading,
        classes = _props2.classes;


    return React.createElement(
      Activity,
      {
        isLoading: isLoading,
        appBarContent: React.createElement(
          'div',
          null,
          editType === 'main' && React.createElement(
            IconButton,
            {
              color: 'inherit',
              disabled: !this.canSave(),
              'aria-label': 'open drawer',
              onClick: function onClick() {
                _this3.submit();
              }
            },
            React.createElement(Save, { className: 'material-icons' })
          ),
          editType === 'main' && React.createElement(
            IconButton,
            { color: 'inherit', 'aria-label': 'open drawer', onClick: function onClick() {
                return setDialogIsOpen('delete_role', true);
              } },
            React.createElement(Delete, { className: 'material-icons' })
          ),
          editType === 'grants' && React.createElement(
            'div',
            { style: { display: 'flex' } },
            React.createElement(SearchField, { filterName: 'role_grants' }),
            React.createElement(
              IconButton,
              {
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: function onClick() {
                  return setFilterIsOpen('role_grants', true);
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
          return history.push('/roles');
        },
        title: intl.formatMessage({ id: 'edit_role' })
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
              React.createElement(Tab, { value: 'main', icon: React.createElement(AccountBox, { className: 'material-icons' }) }),
              React.createElement(Tab, { value: 'grants', icon: React.createElement(Lock, { className: 'material-icons' }) })
            )
          ),
          editType === 'main' && React.createElement(
            'div',
            { className: classes.form },
            React.createElement(
              'div',
              { style: { margin: 15, display: 'flex', flexDirection: 'column' } },
              React.createElement(
                FormControl,
                {
                  className: classNames(classes.margin, classes.textField),
                  error: !!this.state.errors.name
                },
                React.createElement(
                  InputLabel,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'name_label' })
                ),
                React.createElement(Input, {
                  id: 'name',
                  fullWidth: true,
                  value: this.state.values.name,
                  placeholder: intl.formatMessage({ id: 'name_hint' }),
                  onChange: function onChange(e) {
                    _this3.handleValueChange('name', e.target.value);
                  }
                }),
                this.state.errors.displayName && React.createElement(
                  FormHelperText,
                  { id: 'name-helper-text' },
                  this.state.errors.displayName
                )
              ),
              React.createElement('br', null),
              React.createElement(
                FormControl,
                { className: classNames(classes.margin, classes.textField) },
                React.createElement(
                  InputLabel,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'description_label' })
                ),
                React.createElement(Input, {
                  id: 'description',
                  fullWidth: true,
                  multiline: true,
                  value: this.state.values.description,
                  placeholder: intl.formatMessage({ id: 'description_hint' }),
                  onChange: function onChange(e) {
                    _this3.handleValueChange('description', e.target.value);
                  }
                })
              )
            )
          ),
          editType === 'grants' && React.createElement(RoleGrants, this.props)
        )
      ),
      React.createElement(
        Dialog,
        {
          open: dialogs.delete_role === true,
          onClose: this.handleClose,
          'aria-labelledby': 'alert-dialog-title',
          'aria-describedby': 'alert-dialog-description'
        },
        React.createElement(
          DialogTitle,
          { id: 'alert-dialog-title' },
          intl.formatMessage({ id: 'delete_role_dialog_title' })
        ),
        React.createElement(
          DialogContent,
          null,
          React.createElement(
            DialogContentText,
            { id: 'alert-dialog-description' },
            intl.formatMessage({ id: 'delete_role_dialog_message' })
          )
        ),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            { onClick: this.handleClose, color: 'primary' },
            intl.formatMessage({ id: 'cancel' })
          ),
          React.createElement(
            Button,
            { onClick: this.handleDelete, color: 'secondary' },
            intl.formatMessage({ id: 'delete' })
          )
        )
      )
    );
  };

  return Role;
}(Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      dialogs = state.dialogs,
      lists = state.lists,
      filters = state.filters;
  var match = ownProps.match;

  var editType = match.params.editType ? match.params.editType : 'data';
  var uid = match.params.uid ? match.params.uid : '';

  var _filterSelectors$sele = filterSelectors.selectFilterProps('role_grants', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  return {
    auth: auth,
    intl: intl,
    uid: uid,
    dialogs: dialogs,
    hasFilters: hasFilters,
    editType: editType,
    role_grants: lists.role_grants,
    isLoading: isLoading(state, 'role_grants')
  };
};

export default connect(mapStateToProps, _extends({ setDialogIsOpen: setDialogIsOpen, change: change, submit: submit }, filterActions))(injectIntl(withRouter(withFirebase(withAppConfigs(withStyles(styles, { withTheme: true })(withTheme(Role)))))));