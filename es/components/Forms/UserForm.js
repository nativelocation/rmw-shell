function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withStyles } from '@material-ui/core/styles';

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
          return React.createElement(GoogleIcon, null);

        case 'facebook.com':
          return React.createElement(FacebookIcon, null);

        case 'twitter.com':
          return React.createElement(TwitterIcon, null);

        case 'github.com':
          return React.createElement(GitHubIcon, null);

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


    return React.createElement(
      'div',
      { className: classes.root },
      values.photoURL && React.createElement(Avatar, { alt: '', src: values.photoURL, className: classNames(classes.avatar, classes.bigAvatar) }),
      !values.photoURL && React.createElement(
        Avatar,
        { className: classNames(classes.avatar, classes.bigAvatar) },
        ' ',
        React.createElement(Person, { style: { fontSize: 60 } }),
        ' '
      ),
      React.createElement(
        'div',
        null,
        appConfig.firebase_providers.map(function (p, i) {
          if (p !== 'email' && p !== 'password' && p !== 'phone') {
            return React.createElement(
              IconButton,
              { key: i, disabled: !_this2.isLinkedWithProvider(p), color: 'primary' },
              _this2.getProviderIcon(p)
            );
          } else {
            return React.createElement('div', { key: i });
          }
        })
      ),
      React.createElement('br', null),
      React.createElement(
        Typography,
        { variant: 'h4', gutterBottom: true },
        values.displayName
      ),
      React.createElement(
        'div',
        null,
        React.createElement(FormControlLabel, {
          control: React.createElement(Switch, { checked: isAdmin, onChange: handleAdminChange }),
          label: intl.formatMessage({ id: 'is_admin_label' })
        })
      )
    );
  };

  return UserForm;
}(Component);

UserForm.propTypes = process.env.NODE_ENV !== "production" ? {
  handleSubmit: PropTypes.func.isRequired,
  handleAdminChange: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,

  initialized: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired
} : {};

export default withAppConfigs(withStyles(styles, { withTheme: true })(UserForm));