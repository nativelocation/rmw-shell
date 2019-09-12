'use strict';

exports.__esModule = true;
exports.DrawerHeader = undefined;

var _ArrowDropDown = require('@material-ui/icons/ArrowDropDown');

var _ArrowDropDown2 = _interopRequireDefault(_ArrowDropDown);

var _ArrowDropUp = require('@material-ui/icons/ArrowDropUp');

var _ArrowDropUp2 = _interopRequireDefault(_ArrowDropUp);

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _ChevronLeft = require('@material-ui/icons/ChevronLeft');

var _ChevronLeft2 = _interopRequireDefault(_ChevronLeft);

var _ChevronRight = require('@material-ui/icons/ChevronRight');

var _ChevronRight2 = _interopRequireDefault(_ChevronRight);

var _ChromeReaderMode = require('@material-ui/icons/ChromeReaderMode');

var _ChromeReaderMode2 = _interopRequireDefault(_ChromeReaderMode);

var _Hidden = require('@material-ui/core/Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemAvatar = require('@material-ui/core/ListItemAvatar');

var _ListItemAvatar2 = _interopRequireDefault(_ListItemAvatar);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _redux = require('redux');

var _reactIntl = require('react-intl');

var _AppConfigProvider = require('../../contexts/AppConfigProvider');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    paper: {
      backgroundColor: theme.palette.primary.dark,
      margin: 0,
      padding: 0
    },
    listItem: {
      color: theme.palette.primary.contrastText
    },
    icon: {
      color: theme.palette.primary.contrastText
    },
    button: {
      // width: 15
    }
  };
};

var DrawerHeader = exports.DrawerHeader = function DrawerHeader(props) {
  var theme = props.theme,
      intl = props.intl,
      auth = props.auth,
      dialogs = props.dialogs,
      setDialogIsOpen = props.setDialogIsOpen,
      classes = props.classes,
      drawer = props.drawer,
      setDrawerOpen = props.setDrawerOpen,
      setDrawerUseMinified = props.setDrawerUseMinified,
      width = props.width;


  return _react2.default.createElement(
    _Paper2.default,
    { className: classes.paper },
    auth.isAuthorised && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _List2.default,
        null,
        _react2.default.createElement(
          _ListItem2.default,
          null,
          auth.photoURL && _react2.default.createElement(
            _ListItemAvatar2.default,
            null,
            _react2.default.createElement(_Avatar2.default, { src: auth.photoURL, alt: 'user' })
          ),
          !auth.photoURL && _react2.default.createElement(
            _ListItemAvatar2.default,
            null,
            _react2.default.createElement(
              _Avatar2.default,
              null,
              ' ',
              _react2.default.createElement(_Person2.default, null),
              ' '
            )
          ),
          _react2.default.createElement(
            _Hidden2.default,
            { smDown: true, implementation: 'css' },
            _react2.default.createElement(
              _ListItemSecondaryAction2.default,
              null,
              _react2.default.createElement(
                _IconButton2.default,
                {
                  onClick: function onClick() {
                    setDrawerOpen(false);
                  }
                },
                _react2.default.createElement(_ChromeReaderMode2.default, { classes: { root: classes.icon } })
              ),
              _react2.default.createElement(
                _IconButton2.default,
                {
                  className: classes.button,
                  onClick: function onClick() {
                    setDrawerUseMinified(false);
                  }
                },
                theme.direction === 'rtl' && _react2.default.createElement(_ChevronRight2.default, { classes: { root: classes.icon } }),
                theme.direction !== 'rtl' && _react2.default.createElement(_ChevronLeft2.default, { classes: { root: classes.icon } })
              )
            )
          )
        ),
        _react2.default.createElement(
          _ListItem2.default,
          {
            onClick: function onClick() {
              setDialogIsOpen('auth_menu', !dialogs.auth_menu);
            }
          },
          !drawer.open && width !== 'sm' && width !== 'xs' && auth.photoURL && _react2.default.createElement(
            _ListItemAvatar2.default,
            null,
            _react2.default.createElement(_Avatar2.default, { src: auth.photoURL, alt: 'person', style: { marginLeft: -7, marginTop: 3 } })
          ),
          !drawer.open && width !== 'sm' && width !== 'xs' && !auth.photoURL && _react2.default.createElement(
            _ListItemAvatar2.default,
            null,
            _react2.default.createElement(
              _Avatar2.default,
              { style: { marginLeft: -7, marginTop: 3 } },
              ' ',
              _react2.default.createElement(_Person2.default, null),
              ' '
            )
          ),
          _react2.default.createElement(_ListItemText2.default, {
            classes: { primary: classes.listItem, secondary: classes.listItem },
            style: {
              marginLeft: !drawer.open && width !== 'sm' && width !== 'xs' && auth.photoURL ? 7 : undefined
            },
            primary: auth.displayName,
            secondary: auth.email
          }),
          drawer.open && _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            {
              onClick: function onClick() {
                setDialogIsOpen('auth_menu', !dialogs.auth_menu);
              }
            },
            _react2.default.createElement(
              _IconButton2.default,
              null,
              dialogs.auth_menu && _react2.default.createElement(_ArrowDropUp2.default, { classes: { root: classes.icon } }),
              !dialogs.auth_menu && _react2.default.createElement(_ArrowDropDown2.default, { classes: { root: classes.icon } })
            )
          )
        )
      )
    ),
    !auth.isAuthorised && _react2.default.createElement(
      _List2.default,
      null,
      _react2.default.createElement(
        _ListItem2.default,
        null,
        _react2.default.createElement(_ListItemText2.default, { classes: { primary: classes.listItem }, primary: intl.formatMessage({ id: 'app_name' }) }),
        _react2.default.createElement(
          _Hidden2.default,
          { smDown: true, implementation: 'css' },
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            null,
            _react2.default.createElement(
              _IconButton2.default,
              {
                className: classes.button,
                onClick: function onClick() {
                  setDrawerUseMinified(false);
                }
              },
              theme.direction === 'rtl' && _react2.default.createElement(_ChevronRight2.default, { classes: { root: classes.icon } }),
              theme.direction !== 'rtl' && _react2.default.createElement(_ChevronLeft2.default, { classes: { root: classes.icon } })
            )
          )
        )
      )
    )
  );
};

exports.default = (0, _redux.compose)(_reactIntl.injectIntl, _AppConfigProvider.withAppConfigs, (0, _withWidth2.default)(), (0, _styles.withStyles)(styles, { withTheme: true }))(DrawerHeader);