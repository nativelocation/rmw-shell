var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Error from '@material-ui/icons/Error';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Person from '@material-ui/icons/Person';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Save from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import requestNotificationPermission from '../../utils/messaging';
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { change, submit, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { getList } from 'firekit';
import { injectIntl } from 'react-intl';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { setPersistentValue } from '../../store/persistentValues/actions';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withAppConfigs } from '../../contexts/AppConfigProvider';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme, withStyles } from '@material-ui/core/styles';

var form_name = 'my_account';

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
    textField: {
      //flexBasis: 200,
    }
  };
};

export var MyAccount = function (_Component) {
  _inherits(MyAccount, _Component);

  function MyAccount() {
    var _temp, _this, _ret;

    _classCallCheck(this, MyAccount);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      values: {
        displayName: '',
        email: '',
        photoURL: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      errors: {},
      isPhotoDialogOpen: false
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
    }, _this.handleEmailVerificationsSend = function () {
      var firebaseApp = _this.props.firebaseApp;

      firebaseApp.auth().currentUser.sendEmailVerification().then(function () {
        alert('Verification E-Mail send');
      });
    }, _this.handlePhotoUploadSuccess = function (snapshot) {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        _this.setState({ values: _extends({}, _this.state.values, { photoURL: downloadURL }) }, function () {
          _this.setState({ isPhotoDialogOpen: false });
        });
      });
    }, _this.handleValueChange = function (name, value) {
      var _extends2;

      return _this.setState({ values: _extends({}, _this.state.values, (_extends2 = {}, _extends2[name] = value, _extends2)) }, function () {
        _this.validate();
      });
    }, _this.getProvider = function (firebase, provider) {
      if (provider.indexOf('facebook') > -1) {
        return new firebase.auth.FacebookAuthProvider();
      }
      if (provider.indexOf('github') > -1) {
        return new firebase.auth.GithubAuthProvider();
      }
      if (provider.indexOf('google') > -1) {
        return new firebase.auth.GoogleAuthProvider();
      }
      if (provider.indexOf('twitter') > -1) {
        return new firebase.auth.TwitterAuthProvider();
      }
      if (provider.indexOf('phone') > -1) {
        return new firebase.auth.PhoneAuthProvider();
      }

      throw new Error('Provider is not supported!');
    }, _this.reauthenticateUser = function (values, onSuccess) {
      var _this$props = _this.props,
          auth = _this$props.auth,
          firebaseApp = _this$props.firebaseApp,
          authError = _this$props.authError;


      import('firebase').then(function (firebase) {
        if (_this.isLinkedWithProvider('password') && !values) {
          if (onSuccess && onSuccess instanceof Function) {
            onSuccess();
          }
        } else if (_this.isLinkedWithProvider('password') && values) {
          var credential = firebase.auth.EmailAuthProvider.credential(auth.email, values.password);
          firebaseApp.auth().currentUser.reauthenticateWithCredential(credential).then(function () {
            if (onSuccess && onSuccess instanceof Function) {
              onSuccess();
            }
          }, function (e) {
            authError(e);
          });
        } else {
          firebaseApp.auth().currentUser.reauthenticateWithPopup(_this.getProvider(firebase, auth.providerData[0].providerId)).then(function () {
            if (onSuccess && onSuccess instanceof Function) {
              onSuccess();
            }
          }, function (e) {
            authError(e);
          });
        }
      });
    }, _this.isLinkedWithProvider = function (provider) {
      var auth = _this.props.auth;


      try {
        return auth && auth.providerData && auth.providerData.find(function (p) {
          return p.providerId === provider;
        }) !== undefined;
      } catch (e) {
        return false;
      }
    }, _this.linkUserWithPopup = function (p) {
      var _this$props2 = _this.props,
          firebaseApp = _this$props2.firebaseApp,
          authError = _this$props2.authError,
          authStateChanged = _this$props2.authStateChanged;


      import('firebase').then(function (firebase) {
        var provider = _this.getProvider(firebase, p);

        firebaseApp.auth().currentUser.linkWithPopup(provider).then(function () {
          authStateChanged(firebaseApp.auth().currentUser);
        }, function (e) {
          authError(e);
        });
      });
    }, _this.handleCreateValues = function () {
      return false;
    }, _this.clean = function (obj) {
      Object.keys(obj).forEach(function (key) {
        return obj[key] === undefined && delete obj[key];
      });
      return obj;
    }, _this.submit = function () {
      var _this$props3 = _this.props,
          auth = _this$props3.auth,
          firebaseApp = _this$props3.firebaseApp,
          authStateChanged = _this$props3.authStateChanged,
          authError = _this$props3.authError;


      var values = _this.state.values;

      var simpleChange = values.displayName && values.displayName.localeCompare(auth.displayName) || values.photoURL && values.photoURL.localeCompare(auth.photoURL);

      var simpleValues = {
        displayName: values.displayName,
        photoURL: values.photoURL

        //Change simple data
      };if (simpleChange) {
        firebaseApp.auth().currentUser.updateProfile(simpleValues).then(function () {
          firebaseApp.database().ref('users/' + auth.uid).update(_this.clean(simpleValues)).then(function () {
            authStateChanged(values);
          }, function (e) {
            authError(e);
          });
        }, function (e) {
          authError(e);
        });
      }

      //Change email
      if (values.email && values.email.localeCompare(auth.email)) {
        _this.reauthenticateUser(values, function () {
          firebaseApp.auth().currentUser.updateEmail(values.email).then(function () {
            firebaseApp.database().ref('users/' + auth.uid).update({ email: values.email }).then(function () {
              authStateChanged({ email: values.email });
            }, function (e) {
              authError(e);
            });
          }, function (e) {
            authError(e);

            if (e.code === 'auth/requires-recent-login') {
              firebaseApp.auth().signOut().then(function () {
                setTimeout(function () {
                  alert('Please sign in again to change your email.');
                }, 1);
              });
            }
          });
        });
      }

      //Change password
      if (values.newPassword) {
        _this.reauthenticateUser(values, function () {
          firebaseApp.auth().currentUser.updatePassword(values.newPassword).then(function () {
            firebaseApp.auth().signOut();
          }, function (e) {
            authError(e);

            if (e.code === 'auth/requires-recent-login') {
              firebaseApp.auth().signOut().then(function () {
                setTimeout(function () {
                  alert('Please sign in again to change your password.');
                }, 1);
              });
            }
          });
        });
      }

      //setSimpleValue('new_user_photo', undefined);

      // We manage the data saving above
      return false;
    }, _this.handleClose = function () {
      var _this$props4 = _this.props,
          setSimpleValue = _this$props4.setSimpleValue,
          setDialogIsOpen = _this$props4.setDialogIsOpen;

      setSimpleValue('delete_user', false);
      setDialogIsOpen('auth_menu', false);
    }, _this.handleNotificationsClose = function () {
      var setSimpleValue = _this.props.setSimpleValue;

      setSimpleValue('disable_notifications', false);
    }, _this.handleDelete = function () {
      var _this$props5 = _this.props,
          firebaseApp = _this$props5.firebaseApp,
          authError = _this$props5.authError;


      _this.reauthenticateUser(false, function () {
        firebaseApp.auth().currentUser.delete().then(function () {
          _this.handleClose();
        }, function (e) {
          authError(e);

          if (e.code === 'auth/requires-recent-login') {
            firebaseApp.auth().signOut().then(function () {
              setTimeout(function () {
                alert('Please sign in again to delete your account.');
              }, 1);
            });
          }
        });
      });
    }, _this.validate = function () {
      var auth = _this.props.auth;

      var providerId = auth.providerData[0].providerId;
      var errors = {};
      var values = _this.state.values;

      if (!values.displayName) {
        errors.displayName = 'Required';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.password && providerId === 'password' && auth.email.localeCompare(values.email)) {
        errors.password = 'For email change enter your password';
      }

      if (values.newPassword) {
        if (values.newPassword.length < 6) {
          errors.newPassword = 'Password should be at least 6 characters';
        } else if (values.newPassword.localeCompare(values.confirmPassword)) {
          errors.newPassword = 'Must be equal';
          errors.confirmPassword = 'Must be equal';
        }

        if (!values.password) {
          errors.password = 'Required';
        }
      }

      _this.setState({ errors: errors });
    }, _this.canSave = function () {
      var auth = _this.props.auth;

      var values = _this.state.values;

      if (Object.keys(_this.state.errors).length) {
        return false;
      }

      if (values.displayName !== auth.displayName || values.email !== auth.email || values.photoURL !== auth.photoURL) {
        return true;
      }

      if (values.newPassword) {
        return true;
      }

      return false;
    }, _this.handleDisableNotifications = function () {
      var _this$props6 = _this.props,
          firebaseApp = _this$props6.firebaseApp,
          auth = _this$props6.auth,
          setSimpleValue = _this$props6.setSimpleValue;


      firebaseApp.database().ref('disable_notifications/' + auth.uid).set(true).then(function () {
        firebaseApp.database().ref('notification_tokens/' + auth.uid).remove().then(function () {
          setSimpleValue('disable_notifications', false);
        });
      });
    }, _this.handleEnableNotificationsChange = function (e) {
      var _this$props7 = _this.props,
          firebaseApp = _this$props7.firebaseApp,
          auth = _this$props7.auth,
          setSimpleValue = _this$props7.setSimpleValue;


      if (!e.target.checked) {
        setSimpleValue('disable_notifications', true);
      } else {
        firebaseApp.database().ref('disable_notifications/' + auth.uid).remove(function () {
          requestNotificationPermission(_this.props);
          // eslint-disable-next-line no-self-assign
          window.location.href = window.location.href;
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MyAccount.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        auth = _props.auth,
        watchList = _props.watchList;
    var displayName = auth.displayName,
        email = auth.email,
        photoURL = auth.photoURL;


    watchList('notification_tokens/' + auth.uid);
    this.setState({ values: _extends({}, this.state.values, { displayName: displayName, email: email, photoURL: photoURL }) });
  };

  MyAccount.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        intl = _props2.intl,
        setSimpleValue = _props2.setSimpleValue,
        delete_user = _props2.delete_user,
        disable_notifications = _props2.disable_notifications,
        auth = _props2.auth,
        appConfig = _props2.appConfig,
        classes = _props2.classes,
        new_user_photo = _props2.new_user_photo,
        notificationTokens = _props2.notificationTokens;


    var showPasswords = this.isLinkedWithProvider('password');

    return React.createElement(
      Activity,
      {
        iconStyleRight: { width: '50%' },
        appBarContent: React.createElement(
          'div',
          { style: { display: 'flex' } },
          auth.uid && React.createElement(
            IconButton,
            {
              color: 'inherit',
              disabled: !this.canSave(),
              'aria-label': 'open drawer',
              onClick: function onClick() {
                _this2.submit();
              }
            },
            React.createElement(Save, { className: 'material-icons' })
          ),
          auth.uid && React.createElement(
            IconButton,
            { color: 'inherit', 'aria-label': 'open drawer', onClick: function onClick() {
                return setSimpleValue('delete_user', true);
              } },
            React.createElement(Delete, { className: 'material-icons' })
          )
        ),
        title: intl.formatMessage({ id: 'my_account' })
      },
      React.createElement(
        'div',
        null,
        auth.uid && React.createElement(
          'div',
          { style: { margin: 15, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } },
          React.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            this.state.values.photoURL && React.createElement(Avatar, {
              alt: auth.displayName,
              src: this.state.values.photoURL,
              className: classNames(classes.avatar, classes.bigAvatar)
            }),
            !this.state.values.photoURL && React.createElement(
              Avatar,
              { className: classNames(classes.avatar, classes.bigAvatar) },
              ' ',
              React.createElement(Person, { style: { fontSize: 60 } }),
              ' '
            ),
            React.createElement(
              IconButton,
              {
                color: 'primary',
                onClick: function onClick() {
                  _this2.setState({ isPhotoDialogOpen: true });
                }
              },
              React.createElement(PhotoCamera, null)
            ),
            React.createElement(
              'div',
              null,
              appConfig.firebase_providers.map(function (p, i) {
                if (p !== 'email' && p !== 'password' && p !== 'phone') {
                  return React.createElement(
                    IconButton,
                    {
                      key: i,
                      disabled: _this2.isLinkedWithProvider(p),
                      color: 'primary',
                      onClick: function onClick() {
                        _this2.linkUserWithPopup(p);
                      }
                    },
                    _this2.getProviderIcon(p)
                  );
                } else {
                  return React.createElement('div', { key: i });
                }
              })
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                FormGroup,
                { row: true },
                React.createElement(FormControlLabel, {
                  control: React.createElement(Switch, {
                    checked: notificationTokens.length > 0,
                    onChange: this.handleEnableNotificationsChange,
                    value: 'checkedA'
                  }),
                  label: intl.formatMessage({ id: 'notifications' })
                })
              )
            )
          ),
          React.createElement(
            'div',
            { style: { margin: 15, display: 'flex', flexDirection: 'column' } },
            React.createElement(
              FormControl,
              {
                className: classNames(classes.margin, classes.textField),
                error: !!this.state.errors.displayName
              },
              React.createElement(
                InputLabel,
                { htmlFor: 'adornment-password' },
                intl.formatMessage({ id: 'name_label' })
              ),
              React.createElement(Input, {
                id: 'displayName',
                fullWidth: true,
                value: this.state.values.displayName,
                placeholder: intl.formatMessage({ id: 'name_hint' }),
                onChange: function onChange(e) {
                  _this2.handleValueChange('displayName', e.target.value);
                }
              }),
              this.state.errors.displayName && React.createElement(
                FormHelperText,
                { id: 'name-helper-text' },
                this.state.errors.displayName
              )
            ),
            React.createElement(
              FormControl,
              { className: classNames(classes.margin, classes.textField), error: !!this.state.errors.email },
              React.createElement(
                InputLabel,
                { htmlFor: 'adornment-password' },
                intl.formatMessage({ id: 'email' })
              ),
              React.createElement(Input
              //id="email"
              , { label: 'Email',
                autoComplete: 'off',
                placeholder: intl.formatMessage({ id: 'email' }),
                fullWidth: true,
                onChange: function onChange(e) {
                  _this2.handleValueChange('email', e.target.value);
                },
                value: this.state.values.email,
                endAdornment: React.createElement(
                  InputAdornment,
                  { position: 'end' },
                  React.createElement(
                    IconButton,
                    {
                      'aria-label': 'Toggle password visibility',
                      onClick: auth.emailVerified === true ? undefined : this.handleEmailVerificationsSend
                      //onMouseDown={this.handleMouseDownPassword}
                    },
                    auth.emailVerified && React.createElement(VerifiedUser, { color: 'primary' }),
                    !auth.emailVerified && React.createElement(Error, { color: 'secondary' })
                  )
                )
              }),
              this.state.errors.email && React.createElement(
                FormHelperText,
                { id: 'name-helper-text' },
                this.state.errors.email
              )
            ),
            showPasswords && React.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'column' } },
              React.createElement(
                FormControl,
                {
                  className: classNames(classes.margin, classes.textField),
                  error: !!this.state.errors.password
                },
                React.createElement(
                  InputLabel,
                  { htmlFor: 'adornment-password' },
                  'Password'
                ),
                React.createElement(Input, {
                  autoComplete: 'off',
                  type: this.state.showPassword ? 'text' : 'password',
                  value: this.state.values.password,
                  onChange: function onChange(e) {
                    _this2.handleValueChange('password', e.target.value);
                  },
                  endAdornment: React.createElement(
                    InputAdornment,
                    { position: 'end' },
                    React.createElement(
                      IconButton,
                      {
                        color: 'primary',
                        'aria-label': 'Toggle password visibility',
                        onClick: function onClick() {
                          return _this2.setState({ showPassword: !_this2.state.showPassword });
                        }
                      },
                      this.state.showPassword ? React.createElement(VisibilityOff, null) : React.createElement(Visibility, null)
                    )
                  )
                }),
                this.state.errors.password && React.createElement(
                  FormHelperText,
                  { id: 'name-helper-text' },
                  this.state.errors.password
                )
              ),
              React.createElement(
                FormControl,
                {
                  className: classNames(classes.margin, classes.textField),
                  error: !!this.state.errors.newPassword
                },
                React.createElement(
                  InputLabel,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'new_password' })
                ),
                React.createElement(Input, {
                  autoComplete: 'off',
                  type: this.state.showNewPassword ? 'text' : 'password',
                  value: this.state.values.newPassword,
                  onChange: function onChange(e) {
                    _this2.handleValueChange('newPassword', e.target.value);
                  },
                  endAdornment: React.createElement(
                    InputAdornment,
                    { position: 'end' },
                    React.createElement(
                      IconButton,
                      {
                        color: 'primary',
                        'aria-label': 'Toggle password visibility',
                        onClick: function onClick() {
                          return _this2.setState({ showNewPassword: !_this2.state.showNewPassword });
                        }
                      },
                      this.state.showNewPassword ? React.createElement(VisibilityOff, null) : React.createElement(Visibility, null)
                    )
                  )
                }),
                this.state.errors.newPassword && React.createElement(
                  FormHelperText,
                  { id: 'name-helper-text' },
                  this.state.errors.newPassword
                )
              ),
              React.createElement(
                FormControl,
                {
                  className: classNames(classes.margin, classes.textField),
                  error: !!this.state.errors.confirmPassword
                },
                React.createElement(
                  InputLabel,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'confirm_password' })
                ),
                React.createElement(Input, {
                  autoComplete: 'off',
                  type: this.state.showConfirmPassword ? 'text' : 'password',
                  value: this.state.values.confirmPassword,
                  onChange: function onChange(e) {
                    _this2.handleValueChange('confirmPassword', e.target.value);
                  },
                  endAdornment: React.createElement(
                    InputAdornment,
                    { position: 'end' },
                    React.createElement(
                      IconButton,
                      {
                        color: 'primary',
                        'aria-label': 'Toggle password visibility',
                        onClick: function onClick() {
                          return _this2.setState({ showConfirmPassword: !_this2.state.showConfirmPassword });
                        }
                      },
                      this.state.showConfirmPassword ? React.createElement(VisibilityOff, null) : React.createElement(Visibility, null)
                    )
                  )
                }),
                this.state.errors.confirmPassword && React.createElement(
                  FormHelperText,
                  { id: 'name-helper-text' },
                  this.state.errors.confirmPassword
                )
              )
            )
          )
        ),
        React.createElement(
          Dialog,
          {
            open: delete_user === true,
            onClose: this.handleClose,
            'aria-labelledby': 'alert-dialog-title',
            'aria-describedby': 'alert-dialog-description'
          },
          React.createElement(
            DialogTitle,
            { id: 'alert-dialog-title' },
            intl.formatMessage({ id: 'delete_account_dialog_title' })
          ),
          React.createElement(
            DialogContent,
            null,
            React.createElement(
              DialogContentText,
              { id: 'alert-dialog-description' },
              intl.formatMessage({ id: 'delete_account_dialog_message' })
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
        ),
        React.createElement(
          Dialog,
          {
            open: disable_notifications === true,
            onClose: this.handleNotificationsClose,
            'aria-labelledby': 'alert-dialog-title',
            'aria-describedby': 'alert-dialog-description'
          },
          React.createElement(
            DialogTitle,
            { id: 'alert-dialog-title' },
            intl.formatMessage({ id: 'disable_notifications_dialog_title' })
          ),
          React.createElement(
            DialogContent,
            null,
            React.createElement(
              DialogContentText,
              { id: 'alert-dialog-description' },
              intl.formatMessage({ id: 'disable_notifications_dialog_message' })
            )
          ),
          React.createElement(
            DialogActions,
            null,
            React.createElement(
              Button,
              { onClick: this.handleNotificationsClose, color: 'primary' },
              intl.formatMessage({ id: 'cancel' })
            ),
            React.createElement(
              Button,
              { onClick: this.handleDisableNotifications, color: 'secondary' },
              intl.formatMessage({ id: 'delete' })
            )
          )
        ),
        React.createElement(ImageCropDialog, {
          path: 'users/' + auth.uid,
          fileName: 'photoURL',
          onUploadSuccess: function onUploadSuccess(s) {
            _this2.handlePhotoUploadSuccess(s);
          },
          open: this.state.isPhotoDialogOpen,
          src: new_user_photo,
          handleClose: function handleClose() {
            _this2.setState({ isPhotoDialogOpen: false });
          },
          title: intl.formatMessage({ id: 'change_photo' })
        })
      )
    );
  };

  return MyAccount;
}(Component);

MyAccount.propTypes = process.env.NODE_ENV !== "production" ? {
  history: PropTypes.object,
  setSimpleValue: PropTypes.func.isRequired,

  isGranted: PropTypes.func,
  auth: PropTypes.object.isRequired,
  vehicle_types: PropTypes.array
} : {};

var selector = formValueSelector(form_name);

var mapStateToProps = function mapStateToProps(state) {
  var intl = state.intl,
      simpleValues = state.simpleValues,
      auth = state.auth,
      messaging = state.messaging;


  var delete_user = simpleValues.delete_user;
  var disable_notifications = simpleValues.disable_notifications;
  var new_user_photo = simpleValues.new_user_photo;

  return {
    new_user_photo: new_user_photo,
    intl: intl,
    delete_user: delete_user,
    disable_notifications: disable_notifications,
    auth: auth,
    messaging: messaging,
    photoURL: selector(state, 'photoURL'),
    old_password: selector(state, 'old_password'),
    notificationTokens: getList(state, 'notification_tokens/' + auth.uid),
    simpleValues: simpleValues
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue, change: change, submit: submit, setDialogIsOpen: setDialogIsOpen, setPersistentValue: setPersistentValue })(injectIntl(withRouter(withTheme(withFirebase(withAppConfigs(withStyles(styles, { withTheme: true })(MyAccount)))))));