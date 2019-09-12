'use strict';

exports.__esModule = true;
exports.MyAccount = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

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

var _Error = require('@material-ui/icons/Error');

var _Error2 = _interopRequireDefault(_Error);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormGroup = require('@material-ui/core/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormHelperText = require('@material-ui/core/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Input = require('@material-ui/core/Input');

var _Input2 = _interopRequireDefault(_Input);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _PhotoCamera = require('@material-ui/icons/PhotoCamera');

var _PhotoCamera2 = _interopRequireDefault(_PhotoCamera);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Save = require('@material-ui/icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _VerifiedUser = require('@material-ui/icons/VerifiedUser');

var _VerifiedUser2 = _interopRequireDefault(_VerifiedUser);

var _Visibility = require('@material-ui/icons/Visibility');

var _Visibility2 = _interopRequireDefault(_Visibility);

var _VisibilityOff = require('@material-ui/icons/VisibilityOff');

var _VisibilityOff2 = _interopRequireDefault(_VisibilityOff);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messaging = require('../../utils/messaging');

var _messaging2 = _interopRequireDefault(_messaging);

var _Icons = require('../../components/Icons');

var _ImageCropDialog = require('../../containers/ImageCropDialog');

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _actions = require('../../store/dialogs/actions');

var _actions2 = require('../../store/persistentValues/actions');

var _actions3 = require('../../store/simpleValues/actions');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var MyAccount = exports.MyAccount = function (_Component) {
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

      throw new _Error2.default('Provider is not supported!');
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
          (0, _messaging2.default)(_this.props);
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

    return _react2.default.createElement(
      _Activity2.default,
      {
        iconStyleRight: { width: '50%' },
        appBarContent: _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          auth.uid && _react2.default.createElement(
            _IconButton2.default,
            {
              color: 'inherit',
              disabled: !this.canSave(),
              'aria-label': 'open drawer',
              onClick: function onClick() {
                _this2.submit();
              }
            },
            _react2.default.createElement(_Save2.default, { className: 'material-icons' })
          ),
          auth.uid && _react2.default.createElement(
            _IconButton2.default,
            { color: 'inherit', 'aria-label': 'open drawer', onClick: function onClick() {
                return setSimpleValue('delete_user', true);
              } },
            _react2.default.createElement(_Delete2.default, { className: 'material-icons' })
          )
        ),
        title: intl.formatMessage({ id: 'my_account' })
      },
      _react2.default.createElement(
        'div',
        null,
        auth.uid && _react2.default.createElement(
          'div',
          { style: { margin: 15, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } },
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            this.state.values.photoURL && _react2.default.createElement(_Avatar2.default, {
              alt: auth.displayName,
              src: this.state.values.photoURL,
              className: (0, _classnames2.default)(classes.avatar, classes.bigAvatar)
            }),
            !this.state.values.photoURL && _react2.default.createElement(
              _Avatar2.default,
              { className: (0, _classnames2.default)(classes.avatar, classes.bigAvatar) },
              ' ',
              _react2.default.createElement(_Person2.default, { style: { fontSize: 60 } }),
              ' '
            ),
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'primary',
                onClick: function onClick() {
                  _this2.setState({ isPhotoDialogOpen: true });
                }
              },
              _react2.default.createElement(_PhotoCamera2.default, null)
            ),
            _react2.default.createElement(
              'div',
              null,
              appConfig.firebase_providers.map(function (p, i) {
                if (p !== 'email' && p !== 'password' && p !== 'phone') {
                  return _react2.default.createElement(
                    _IconButton2.default,
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
                  return _react2.default.createElement('div', { key: i });
                }
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _FormGroup2.default,
                { row: true },
                _react2.default.createElement(_FormControlLabel2.default, {
                  control: _react2.default.createElement(_Switch2.default, {
                    checked: notificationTokens.length > 0,
                    onChange: this.handleEnableNotificationsChange,
                    value: 'checkedA'
                  }),
                  label: intl.formatMessage({ id: 'notifications' })
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { margin: 15, display: 'flex', flexDirection: 'column' } },
            _react2.default.createElement(
              _FormControl2.default,
              {
                className: (0, _classnames2.default)(classes.margin, classes.textField),
                error: !!this.state.errors.displayName
              },
              _react2.default.createElement(
                _InputLabel2.default,
                { htmlFor: 'adornment-password' },
                intl.formatMessage({ id: 'name_label' })
              ),
              _react2.default.createElement(_Input2.default, {
                id: 'displayName',
                fullWidth: true,
                value: this.state.values.displayName,
                placeholder: intl.formatMessage({ id: 'name_hint' }),
                onChange: function onChange(e) {
                  _this2.handleValueChange('displayName', e.target.value);
                }
              }),
              this.state.errors.displayName && _react2.default.createElement(
                _FormHelperText2.default,
                { id: 'name-helper-text' },
                this.state.errors.displayName
              )
            ),
            _react2.default.createElement(
              _FormControl2.default,
              { className: (0, _classnames2.default)(classes.margin, classes.textField), error: !!this.state.errors.email },
              _react2.default.createElement(
                _InputLabel2.default,
                { htmlFor: 'adornment-password' },
                intl.formatMessage({ id: 'email' })
              ),
              _react2.default.createElement(_Input2.default
              //id="email"
              , { label: 'Email',
                autoComplete: 'off',
                placeholder: intl.formatMessage({ id: 'email' }),
                fullWidth: true,
                onChange: function onChange(e) {
                  _this2.handleValueChange('email', e.target.value);
                },
                value: this.state.values.email,
                endAdornment: _react2.default.createElement(
                  _InputAdornment2.default,
                  { position: 'end' },
                  _react2.default.createElement(
                    _IconButton2.default,
                    {
                      'aria-label': 'Toggle password visibility',
                      onClick: auth.emailVerified === true ? undefined : this.handleEmailVerificationsSend
                      //onMouseDown={this.handleMouseDownPassword}
                    },
                    auth.emailVerified && _react2.default.createElement(_VerifiedUser2.default, { color: 'primary' }),
                    !auth.emailVerified && _react2.default.createElement(_Error2.default, { color: 'secondary' })
                  )
                )
              }),
              this.state.errors.email && _react2.default.createElement(
                _FormHelperText2.default,
                { id: 'name-helper-text' },
                this.state.errors.email
              )
            ),
            showPasswords && _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'column' } },
              _react2.default.createElement(
                _FormControl2.default,
                {
                  className: (0, _classnames2.default)(classes.margin, classes.textField),
                  error: !!this.state.errors.password
                },
                _react2.default.createElement(
                  _InputLabel2.default,
                  { htmlFor: 'adornment-password' },
                  'Password'
                ),
                _react2.default.createElement(_Input2.default, {
                  autoComplete: 'off',
                  type: this.state.showPassword ? 'text' : 'password',
                  value: this.state.values.password,
                  onChange: function onChange(e) {
                    _this2.handleValueChange('password', e.target.value);
                  },
                  endAdornment: _react2.default.createElement(
                    _InputAdornment2.default,
                    { position: 'end' },
                    _react2.default.createElement(
                      _IconButton2.default,
                      {
                        color: 'primary',
                        'aria-label': 'Toggle password visibility',
                        onClick: function onClick() {
                          return _this2.setState({ showPassword: !_this2.state.showPassword });
                        }
                      },
                      this.state.showPassword ? _react2.default.createElement(_VisibilityOff2.default, null) : _react2.default.createElement(_Visibility2.default, null)
                    )
                  )
                }),
                this.state.errors.password && _react2.default.createElement(
                  _FormHelperText2.default,
                  { id: 'name-helper-text' },
                  this.state.errors.password
                )
              ),
              _react2.default.createElement(
                _FormControl2.default,
                {
                  className: (0, _classnames2.default)(classes.margin, classes.textField),
                  error: !!this.state.errors.newPassword
                },
                _react2.default.createElement(
                  _InputLabel2.default,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'new_password' })
                ),
                _react2.default.createElement(_Input2.default, {
                  autoComplete: 'off',
                  type: this.state.showNewPassword ? 'text' : 'password',
                  value: this.state.values.newPassword,
                  onChange: function onChange(e) {
                    _this2.handleValueChange('newPassword', e.target.value);
                  },
                  endAdornment: _react2.default.createElement(
                    _InputAdornment2.default,
                    { position: 'end' },
                    _react2.default.createElement(
                      _IconButton2.default,
                      {
                        color: 'primary',
                        'aria-label': 'Toggle password visibility',
                        onClick: function onClick() {
                          return _this2.setState({ showNewPassword: !_this2.state.showNewPassword });
                        }
                      },
                      this.state.showNewPassword ? _react2.default.createElement(_VisibilityOff2.default, null) : _react2.default.createElement(_Visibility2.default, null)
                    )
                  )
                }),
                this.state.errors.newPassword && _react2.default.createElement(
                  _FormHelperText2.default,
                  { id: 'name-helper-text' },
                  this.state.errors.newPassword
                )
              ),
              _react2.default.createElement(
                _FormControl2.default,
                {
                  className: (0, _classnames2.default)(classes.margin, classes.textField),
                  error: !!this.state.errors.confirmPassword
                },
                _react2.default.createElement(
                  _InputLabel2.default,
                  { htmlFor: 'adornment-password' },
                  intl.formatMessage({ id: 'confirm_password' })
                ),
                _react2.default.createElement(_Input2.default, {
                  autoComplete: 'off',
                  type: this.state.showConfirmPassword ? 'text' : 'password',
                  value: this.state.values.confirmPassword,
                  onChange: function onChange(e) {
                    _this2.handleValueChange('confirmPassword', e.target.value);
                  },
                  endAdornment: _react2.default.createElement(
                    _InputAdornment2.default,
                    { position: 'end' },
                    _react2.default.createElement(
                      _IconButton2.default,
                      {
                        color: 'primary',
                        'aria-label': 'Toggle password visibility',
                        onClick: function onClick() {
                          return _this2.setState({ showConfirmPassword: !_this2.state.showConfirmPassword });
                        }
                      },
                      this.state.showConfirmPassword ? _react2.default.createElement(_VisibilityOff2.default, null) : _react2.default.createElement(_Visibility2.default, null)
                    )
                  )
                }),
                this.state.errors.confirmPassword && _react2.default.createElement(
                  _FormHelperText2.default,
                  { id: 'name-helper-text' },
                  this.state.errors.confirmPassword
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _Dialog2.default,
          {
            open: delete_user === true,
            onClose: this.handleClose,
            'aria-labelledby': 'alert-dialog-title',
            'aria-describedby': 'alert-dialog-description'
          },
          _react2.default.createElement(
            _DialogTitle2.default,
            { id: 'alert-dialog-title' },
            intl.formatMessage({ id: 'delete_account_dialog_title' })
          ),
          _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
              _DialogContentText2.default,
              { id: 'alert-dialog-description' },
              intl.formatMessage({ id: 'delete_account_dialog_message' })
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
        ),
        _react2.default.createElement(
          _Dialog2.default,
          {
            open: disable_notifications === true,
            onClose: this.handleNotificationsClose,
            'aria-labelledby': 'alert-dialog-title',
            'aria-describedby': 'alert-dialog-description'
          },
          _react2.default.createElement(
            _DialogTitle2.default,
            { id: 'alert-dialog-title' },
            intl.formatMessage({ id: 'disable_notifications_dialog_title' })
          ),
          _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
              _DialogContentText2.default,
              { id: 'alert-dialog-description' },
              intl.formatMessage({ id: 'disable_notifications_dialog_message' })
            )
          ),
          _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleNotificationsClose, color: 'primary' },
              intl.formatMessage({ id: 'cancel' })
            ),
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleDisableNotifications, color: 'secondary' },
              intl.formatMessage({ id: 'delete' })
            )
          )
        ),
        _react2.default.createElement(_ImageCropDialog.ImageCropDialog, {
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
}(_react.Component);

MyAccount.propTypes = process.env.NODE_ENV !== "production" ? {
  history: _propTypes2.default.object,
  setSimpleValue: _propTypes2.default.func.isRequired,

  isGranted: _propTypes2.default.func,
  auth: _propTypes2.default.object.isRequired,
  vehicle_types: _propTypes2.default.array
} : {};

var selector = (0, _reduxForm.formValueSelector)(form_name);

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
    notificationTokens: (0, _firekit.getList)(state, 'notification_tokens/' + auth.uid),
    simpleValues: simpleValues
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions3.setSimpleValue, change: _reduxForm.change, submit: _reduxForm.submit, setDialogIsOpen: _actions.setDialogIsOpen, setPersistentValue: _actions2.setPersistentValue })((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _styles.withTheme)((0, _firekitProvider.withFirebase)((0, _AppConfigProvider.withAppConfigs)((0, _styles.withStyles)(styles, { withTheme: true })(MyAccount)))))));