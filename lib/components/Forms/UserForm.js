'use strict';

exports.__esModule = true;

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icons = require('../../components/Icons');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    avatar: {
      margin: 10
    },
    bigAvatar: {
      width: 120,
      height: 120
    },
    margin: {
      margin: theme.spacing(1)
    },
    withoutLabel: {
      marginTop: theme.spacing(1) * 3
    },
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  };
};

var UserForm = function (_Component) {
  _inherits(UserForm, _Component);

  function UserForm() {
    var _temp, _this, _ret;

    _classCallCheck(this, UserForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.isLinkedWithProvider = function (provider) {
      var auth = _this.props.auth;


      try {
        return auth && auth.providerData && auth.providerData.find(function (p) {
          return p.providerId === provider;
        }) !== undefined;
      } catch (e) {
        return false;
      }
    }, _this.getProviderIcon = function (p) {
      switch (p) {
        case 'google.com':
          return _react2.default.createElement(_Icons.GoogleIcon, null);

        case 'facebook.com':
          return _react2.default.createElement(_Icons.FacebookIcon, null);

        case 'twitter.com':
          return _react2.default.createElement(_Icons.TwitterIcon, null);

        case 'github.com':
          return _react2.default.createElement(_Icons.GitHubIcon, null);

        default:
          return undefined;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UserForm.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        handleAdminChange = _props.handleAdminChange,
        isAdmin = _props.isAdmin,
        classes = _props.classes,
        appConfig = _props.appConfig,
        values = _props.values;


    return _react2.default.createElement(
      'div',
      { className: classes.root },
      values.photoURL && _react2.default.createElement(_Avatar2.default, { alt: '', src: values.photoURL, className: (0, _classnames2.default)(classes.avatar, classes.bigAvatar) }),
      !values.photoURL && _react2.default.createElement(
        _Avatar2.default,
        { className: (0, _classnames2.default)(classes.avatar, classes.bigAvatar) },
        ' ',
        _react2.default.createElement(_Person2.default, { style: { fontSize: 60 } }),
        ' '
      ),
      _react2.default.createElement(
        'div',
        null,
        appConfig.firebase_providers.map(function (p, i) {
          if (p !== 'email' && p !== 'password' && p !== 'phone') {
            return _react2.default.createElement(
              _IconButton2.default,
              { key: i, disabled: !_this2.isLinkedWithProvider(p), color: 'primary' },
              _this2.getProviderIcon(p)
            );
          } else {
            return _react2.default.createElement('div', { key: i });
          }
        })
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        _Typography2.default,
        { variant: 'h4', gutterBottom: true },
        values.displayName
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FormControlLabel2.default, {
          control: _react2.default.createElement(_Switch2.default, { checked: isAdmin, onChange: handleAdminChange }),
          label: intl.formatMessage({ id: 'is_admin_label' })
        })
      )
    );
  };

  return UserForm;
}(_react.Component);

UserForm.propTypes = process.env.NODE_ENV !== "production" ? {
  handleSubmit: _propTypes2.default.func.isRequired,
  handleAdminChange: _propTypes2.default.func.isRequired,
  isAdmin: _propTypes2.default.bool.isRequired,

  initialized: _propTypes2.default.bool.isRequired,
  uid: _propTypes2.default.string.isRequired
} : {};

exports.default = (0, _AppConfigProvider.withAppConfigs)((0, _styles.withStyles)(styles, { withTheme: true })(UserForm));
module.exports = exports['default'];