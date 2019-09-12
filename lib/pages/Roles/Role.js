'use strict';

exports.__esModule = true;
exports.Role = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AccountBox = require('@material-ui/icons/AccountBox');

var _AccountBox2 = _interopRequireDefault(_AccountBox);

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _FilterList = require('@material-ui/icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = require('@material-ui/core/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Input = require('@material-ui/core/Input');

var _Input2 = _interopRequireDefault(_Input);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _Lock = require('@material-ui/icons/Lock');

var _Lock2 = _interopRequireDefault(_Lock);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RoleGrants = require('../../containers/Roles/RoleGrants');

var _RoleGrants2 = _interopRequireDefault(_RoleGrants);

var _Save = require('@material-ui/icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _Scrollbar = require('../../components/Scrollbar/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _SearchField = require('../../components/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _Tab = require('@material-ui/core/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Tabs = require('@material-ui/core/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _materialUiFilter = require('material-ui-filter');

var _reactIntl = require('react-intl');

var _firekit = require('firekit');

var _actions = require('../../store/dialogs/actions');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Role = exports.Role = function (_Component) {
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


    return _react2.default.createElement(
      _Activity2.default,
      {
        isLoading: isLoading,
        appBarContent: _react2.default.createElement(
          'div',
          null,
          editType === 'main' && _react2.default.createElement(
            _IconButton2.default,
            {
              color: 'inherit',
              disabled: !this.canSave(),
              'aria-label': 'open drawer',
              onClick: function onClick() {
                _this3.submit();
              }
            },
            _react2.default.createElement(_Save2.default, { className: 'material-icons' })
          ),
          editType === 'main' && _react2.default.createElement(
            _IconButton2.default,
            { color: 'inherit', 'aria-label': 'open drawer', onClick: function onClick() {
                return setDialogIsOpen('delete_role', true);
              } },
            _react2.default.createElement(_Delete2.default, { className: 'material-icons' })
          ),
          editType === 'grants' && _react2.default.createElement(
            'div',
            { style: { display: 'flex' } },
            _react2.default.createElement(_SearchField2.default, { filterName: 'role_grants' }),
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: function onClick() {
                  return setFilterIsOpen('role_grants', true);
                }
              },
              _react2.default.createElement(_FilterList2.default, {
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
      _react2.default.createElement(
        _Scrollbar2.default,
        { style: { height: '100%' } },
        _react2.default.createElement(
          'div',
          { className: classes.root },
          _react2.default.createElement(
            _AppBar2.default,
            { position: 'static' },
            _react2.default.createElement(
              _Tabs2.default,
              { value: editType, onChange: this.handleTabActive, fullWidth: true, centered: true },
              _react2.default.createElement(_Tab2.default, { value: 'main', icon: _react2.default.createElement(_AccountBox2.default, { className: 'material-icons' }) }),
              _react2.default.createElement(_Tab2.default, { value: 'grants', icon: _react2.default.createElement(_Lock2.default, { className: 'material-icons' }) })
            )
          ),
          editType === 'main' && _react2.default.createElement(
            'div',
            { className: classes.form },
            _react2.default.createElement(
              'div',
              { style: { margin: 15, display: 'flex', flexDirection: 'column' } },
              _react2.default.createElement(
                _FormControl2.default,
                {
                  className: (0, _classnames2.default)(classes.margin, classes.textField),
                  error: !!this.state.errors.name
                },
                _react2.default.createElement(
                  _InputLabel2.default,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'name_label' })
                ),
                _react2.default.createElement(_Input2.default, {
                  id: 'name',
                  fullWidth: true,
                  value: this.state.values.name,
                  placeholder: intl.formatMessage({ id: 'name_hint' }),
                  onChange: function onChange(e) {
                    _this3.handleValueChange('name', e.target.value);
                  }
                }),
                this.state.errors.displayName && _react2.default.createElement(
                  _FormHelperText2.default,
                  { id: 'name-helper-text' },
                  this.state.errors.displayName
                )
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                _FormControl2.default,
                { className: (0, _classnames2.default)(classes.margin, classes.textField) },
                _react2.default.createElement(
                  _InputLabel2.default,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'description_label' })
                ),
                _react2.default.createElement(_Input2.default, {
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
          editType === 'grants' && _react2.default.createElement(_RoleGrants2.default, this.props)
        )
      ),
      _react2.default.createElement(
        _Dialog2.default,
        {
          open: dialogs.delete_role === true,
          onClose: this.handleClose,
          'aria-labelledby': 'alert-dialog-title',
          'aria-describedby': 'alert-dialog-description'
        },
        _react2.default.createElement(
          _DialogTitle2.default,
          { id: 'alert-dialog-title' },
          intl.formatMessage({ id: 'delete_role_dialog_title' })
        ),
        _react2.default.createElement(
          _DialogContent2.default,
          null,
          _react2.default.createElement(
            _DialogContentText2.default,
            { id: 'alert-dialog-description' },
            intl.formatMessage({ id: 'delete_role_dialog_message' })
          )
        ),
        _react2.default.createElement(
          _DialogActions2.default,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClose, color: 'primary' },
            intl.formatMessage({ id: 'cancel' })
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleDelete, color: 'secondary' },
            intl.formatMessage({ id: 'delete' })
          )
        )
      )
    );
  };

  return Role;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      dialogs = state.dialogs,
      lists = state.lists,
      filters = state.filters;
  var match = ownProps.match;

  var editType = match.params.editType ? match.params.editType : 'data';
  var uid = match.params.uid ? match.params.uid : '';

  var _filterSelectors$sele = _materialUiFilter.filterSelectors.selectFilterProps('role_grants', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  return {
    auth: auth,
    intl: intl,
    uid: uid,
    dialogs: dialogs,
    hasFilters: hasFilters,
    editType: editType,
    role_grants: lists.role_grants,
    isLoading: (0, _firekit.isLoading)(state, 'role_grants')
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, _extends({ setDialogIsOpen: _actions.setDialogIsOpen, change: _reduxForm.change, submit: _reduxForm.submit }, _materialUiFilter.filterActions))((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _firekitProvider.withFirebase)((0, _AppConfigProvider.withAppConfigs)((0, _styles.withStyles)(styles, { withTheme: true })((0, _styles.withTheme)(Role)))))));