'use strict';

exports.__esModule = true;
exports.User = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AccountBox = require('@material-ui/icons/AccountBox');

var _AccountBox2 = _interopRequireDefault(_AccountBox);

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _FilterList = require('@material-ui/icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Lock = require('@material-ui/icons/Lock');

var _Lock2 = _interopRequireDefault(_Lock);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scrollbar = require('../../components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _SearchField = require('../../components/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _Tab = require('@material-ui/core/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Tabs = require('@material-ui/core/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _UserForm = require('../../components/Forms/UserForm');

var _UserForm2 = _interopRequireDefault(_UserForm);

var _UserGrants = require('../../containers/Users/UserGrants');

var _UserGrants2 = _interopRequireDefault(_UserGrants);

var _UserRoles = require('../../containers/Users/UserRoles');

var _UserRoles2 = _interopRequireDefault(_UserRoles);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _materialUiFilter = require('material-ui-filter');

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

var User = exports.User = function (_Component) {
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

    return _react2.default.createElement(
      _Activity2.default,
      {
        isLoading: isLoading,
        appBarContent: _react2.default.createElement(
          'div',
          null,
          editType === 'grants' && _react2.default.createElement(
            'div',
            { style: { display: 'flex' } },
            _react2.default.createElement(_SearchField2.default, { filterName: 'user_grants' }),
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: function onClick() {
                  return setFilterIsOpen('user_grants', true);
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
          return history.push('/users');
        },
        title: intl.formatMessage({ id: 'edit_user' })
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
              _react2.default.createElement(_Tab2.default, { value: 'profile', icon: _react2.default.createElement(_Person2.default, { className: 'material-icons' }) }),
              _react2.default.createElement(_Tab2.default, { value: 'roles', icon: _react2.default.createElement(_AccountBox2.default, { className: 'material-icons' }) }),
              _react2.default.createElement(_Tab2.default, { value: 'grants', icon: _react2.default.createElement(_Lock2.default, { className: 'material-icons' }) })
            )
          ),
          editType === 'profile' && _react2.default.createElement(
            'div',
            { className: classes.form },
            _react2.default.createElement(_UserForm2.default, _extends({
              handleAdminChange: this.handleAdminChange,
              isAdmin: isAdmin,
              values: this.state.values ? this.state.values : {}
            }, this.props))
          ),
          editType === 'roles' && _react2.default.createElement(_UserRoles2.default, this.props),
          editType === 'grants' && _react2.default.createElement(_UserGrants2.default, this.props)
        )
      )
    );
  };

  return User;
}(_react.Component);

User.propTypes = process.env.NODE_ENV !== "production" ? {
  history: _propTypes2.default.object,

  //submit: PropTypes.func.isRequired,
  theme: _propTypes2.default.object.isRequired,
  match: _propTypes2.default.object.isRequired,
  admins: _propTypes2.default.array.isRequired
} : {};

var selector = (0, _reduxForm.formValueSelector)('user');

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      filters = state.filters;
  var match = ownProps.match;


  var uid = match.params.uid;
  var editType = match.params.editType ? match.params.editType : 'data';

  var _filterSelectors$sele = _materialUiFilter.filterSelectors.selectFilterProps('user_grants', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var isLoadingRoles = (0, _firekit.isLoading)(state, 'user_roles');
  var isLoadingGrants = (0, _firekit.isLoading)(state, 'user_grants');
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
    admins: (0, _firekit.getList)(state, 'admins'),
    user: (0, _firekit.getPath)(state, 'users/' + uid),
    isLoading: isLoadingRoles || isLoadingGrants
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, _extends({ setSimpleValue: _actions.setSimpleValue, change: _reduxForm.change, submit: _reduxForm.submit }, _materialUiFilter.filterActions))((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _firekitProvider.withFirebase)((0, _styles.withStyles)(styles, { withTheme: true })((0, _styles.withTheme)(User))))));