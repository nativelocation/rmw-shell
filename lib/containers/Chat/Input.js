'use strict';

exports.__esModule = true;

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Input = require('@material-ui/core/Input');

var _Input2 = _interopRequireDefault(_Input);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Mic = require('./Mic');

var _Mic2 = _interopRequireDefault(_Mic);

var _MyLocation = require('@material-ui/icons/MyLocation');

var _MyLocation2 = _interopRequireDefault(_MyLocation);

var _Photo = require('@material-ui/icons/Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Scrollbar = require('../../components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _Send = require('@material-ui/icons/Send');

var _Send2 = _interopRequireDefault(_Send);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _core = require('@material-ui/core');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _googleMaps = require('../../utils/googleMaps');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatMessages = function (_Component) {
  _inherits(ChatMessages, _Component);

  function ChatMessages(props) {
    _classCallCheck(this, ChatMessages);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleKeyDown = function (e, onSucces) {
      if (e.keyCode === 13) {
        e.preventDefault();
        onSucces();
      }
    };

    _this.handleAddMessage = function (type, message, key) {
      var _this$props = _this.props,
          auth = _this$props.auth,
          firebaseApp = _this$props.firebaseApp,
          path = _this$props.path,
          intl = _this$props.intl;


      var newMessage = {
        created: _firebase2.default.database.ServerValue.TIMESTAMP,
        authorName: auth.displayName,
        authorUid: auth.uid,
        authorPhotoUrl: auth.photoURL,
        languageCode: intl.formatMessage({ id: 'current_locale', defaultMessage: 'en-US' }),
        type: type
      };

      if (type === 'image') {
        newMessage.image = message;
      } else if (type === 'location') {
        newMessage.location = message;
      } else if (type === 'audio') {
        newMessage.audio = message;
      } else {
        if (message.startsWith('http') || message.startsWith('https')) {
          newMessage.link = message;
          newMessage.type = 'link';
        } else {
          newMessage.message = message;
        }
      }

      _this.setState({ value: '' });

      if (_this.name.state) {
        _this.name.state.hasValue = false;
      }

      if (message && message.length > 0) {
        if (key) {
          firebaseApp.database().ref(path + '/' + key).update(newMessage);
        } else {
          firebaseApp.database().ref(path).push(newMessage);
        }
      }
    };

    _this.renderItem = function (i) {
      var _this$props2 = _this.props,
          predefinedMessages = _this$props2.predefinedMessages,
          setSimpleValue = _this$props2.setSimpleValue;


      var key = predefinedMessages[i].key;
      var message = predefinedMessages[i].val.message;

      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          _ListItem2.default,
          {
            key: key,
            onClick: function onClick() {
              setSimpleValue('chatMessageMenuOpen', false);
              _this.setState({ value: message });
            },
            id: key
          },
          _react2.default.createElement(_ListItemText2.default, { primary: message }),
          _react2.default.createElement(
            _IconButton2.default,
            {
              color: 'primary',
              onClick: function onClick() {
                setSimpleValue('chatMessageMenuOpen', false);
                _this.handleAddMessage('text', message);
              }
            },
            _react2.default.createElement(_Send2.default, null)
          )
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
      );
    };

    _this.uploadSelectedFile = function (file) {
      var _this$props3 = _this.props,
          firebaseApp = _this$props3.firebaseApp,
          intl = _this$props3.intl;


      if (file === null) {
        return;
      }

      if ((file.size / 1024 / 1024).toFixed(4) > 20) {
        //file larger than 10mb
        alert(intl.formatMessage({ id: 'max_file_size' }));
        return;
      }

      var reader = new FileReader();

      var key = firebaseApp.database().ref('/user_chat_messages/').push().key;

      reader.onload = function (fileData) {
        var uploadTask = firebaseApp.storage().ref('/user_chats/' + key + '.jpg').putString(fileData.target.result, 'data_url');

        uploadTask.on('state_changed', function () {}, function (error) {
          console.log(error);
        }, function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            _this.handleAddMessage('image', downloadURL, key);
          });
        });
      };

      reader.readAsDataURL(file);
    };

    _this.name = null;

    _this.state = {
      value: ''
    };
    return _this;
  }

  ChatMessages.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        theme = _props.theme,
        intl = _props.intl,
        chatMessageMenuOpen = _props.chatMessageMenuOpen,
        predefinedMessages = _props.predefinedMessages,
        path = _props.path,
        receiverPath = _props.receiverPath;


    return _react2.default.createElement(
      'div',
      {
        style: {
          display: 'block',
          alignItems: 'row',
          justifyContent: 'center',
          height: chatMessageMenuOpen ? 300 : 56,
          backgroundColor: theme.palette.background.main,
          margin: 5,
          marginBottom: 15,
          marginRight: 15,
          marginLeft: 15
        }
      },
      _react2.default.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        _react2.default.createElement(
          'div',
          {
            style: {
              backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
              flexGrow: 1,
              height: 56,
              borderRadius: 30,
              paddingLeft: 8,
              paddingRight: 8,
              margin: 5
            }
          },
          _react2.default.createElement(
            'div',
            { style: { position: 'relative', display: 'inline-block', width: '100%' } },
            _react2.default.createElement(_Input2.default, {
              id: 'message',
              style: {
                position: 'absolute',
                height: 42,
                width: 'calc(100% - 72px)',
                lineHeight: undefined,
                top: -6,
                left: 15,
                right: 50
              },
              multiline: true,
              rowsMax: '2',
              disableUnderline: true,
              onChange: function onChange(e) {
                _this2.setState({ value: e.target.value });
              },
              fullWidth: true,
              autoFocus: true,
              value: this.state.value,
              autoComplete: 'off',
              placeholder: intl.formatMessage({ id: 'write_message_hint' }),
              onKeyDown: function onKeyDown(e) {
                _this2.handleKeyDown(e, function () {
                  return _this2.handleAddMessage('text', _this2.state.value);
                });
              },
              ref: function ref(field) {
                _this2.name = field;
              },
              type: 'Text'
            }),
            _react2.default.createElement(
              'div',
              { style: { position: 'absolute', right: 25, top: -10, width: 20, height: 0 } },
              _react2.default.createElement(
                _IconButton2.default,
                {
                  color: 'primary',
                  onClick: function onClick() {
                    return (0, _googleMaps.getGeolocation)(function (pos) {
                      if (!pos) {
                        return;
                      } else if (!pos.coords) {
                        return;
                      }

                      var lat = pos.coords.latitude;
                      var long = pos.coords.longitude;
                      _this2.handleAddMessage('location', 'https://www.google.com/maps/place/' + lat + '+' + long + '/@' + lat + ',' + long);
                    }, function (error) {
                      return console.log(error);
                    });
                  }
                },
                _react2.default.createElement(_MyLocation2.default, null)
              )
            ),
            _react2.default.createElement('input', {
              style: { display: 'none' },
              type: 'file',
              onChange: function onChange(e) {
                _this2.uploadSelectedFile(e.target.files[0]);
              },
              ref: function ref(input) {
                _this2.fileInput = input;
              }
            }),
            _react2.default.createElement(
              'div',
              { style: { position: 'absolute', right: 55, top: -10, width: 20, height: 0 } },
              _react2.default.createElement(
                _IconButton2.default,
                { color: 'primary', onClick: function onClick() {
                    return _this2.fileInput.click();
                  } },
                _react2.default.createElement(_Photo2.default, null)
              )
            )
          )
        ),
        this.state.value !== '' && _react2.default.createElement(
          _core.Fab,
          {
            color: 'primary',
            disabled: this.state.value === undefined || this.state.value === '',
            onClick: function onClick() {
              return _this2.handleAddMessage('text', _this2.state.value);
            },
            'aria-label': 'send'
          },
          _react2.default.createElement(_Send2.default, null)
        ),
        this.state.value === '' && _react2.default.createElement(_Mic2.default, { receiverPath: receiverPath, handleAddMessage: this.handleAddMessage, path: path })
      ),
      chatMessageMenuOpen && _react2.default.createElement(
        _Scrollbar2.default,
        { style: { height: 200, backgroundColor: undefined } },
        _react2.default.createElement(
          'div',
          { style: { padding: 10, paddingRight: 0 } },
          _react2.default.createElement(_reactList2.default, {
            itemRenderer: this.renderItem,
            length: predefinedMessages ? predefinedMessages.length : 0,
            type: 'simple'
          })
        )
      )
    );
  };

  return ChatMessages;
}(_react.Component);

ChatMessages.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: _propTypes2.default.object.isRequired,
  auth: _propTypes2.default.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var auth = state.auth,
      simpleValues = state.simpleValues;
  var uid = ownPops.uid,
      path = ownPops.path;


  var chatMessageMenuOpen = simpleValues['chatMessageMenuOpen'] === true;
  var imageDialogOpen = simpleValues.chatOpenImageDialog;

  return {
    imageDialogOpen: imageDialogOpen,
    simpleValues: simpleValues ? simpleValues : [],
    path: path,
    uid: uid,
    chatMessageMenuOpen: chatMessageMenuOpen,
    auth: auth
  };
};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions.setSimpleValue }), _reactIntl.injectIntl, _reactRouterDom.withRouter, _firekitProvider.withFirebase, _styles.withTheme)(ChatMessages);
module.exports = exports['default'];