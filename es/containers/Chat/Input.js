function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Mic from './Mic';
import MyLocation from '@material-ui/icons/MyLocation';
import Photo from '@material-ui/icons/Photo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';
import Send from '@material-ui/icons/Send';
import firebase from 'firebase';
import { Fab } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getGeolocation } from '../../utils/googleMaps';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

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
        created: firebase.database.ServerValue.TIMESTAMP,
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

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          {
            key: key,
            onClick: function onClick() {
              setSimpleValue('chatMessageMenuOpen', false);
              _this.setState({ value: message });
            },
            id: key
          },
          React.createElement(ListItemText, { primary: message }),
          React.createElement(
            IconButton,
            {
              color: 'primary',
              onClick: function onClick() {
                setSimpleValue('chatMessageMenuOpen', false);
                _this.handleAddMessage('text', message);
              }
            },
            React.createElement(Send, null)
          )
        ),
        React.createElement(Divider, { variant: 'inset' })
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


    return React.createElement(
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
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(
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
          React.createElement(
            'div',
            { style: { position: 'relative', display: 'inline-block', width: '100%' } },
            React.createElement(Input, {
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
            React.createElement(
              'div',
              { style: { position: 'absolute', right: 25, top: -10, width: 20, height: 0 } },
              React.createElement(
                IconButton,
                {
                  color: 'primary',
                  onClick: function onClick() {
                    return getGeolocation(function (pos) {
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
                React.createElement(MyLocation, null)
              )
            ),
            React.createElement('input', {
              style: { display: 'none' },
              type: 'file',
              onChange: function onChange(e) {
                _this2.uploadSelectedFile(e.target.files[0]);
              },
              ref: function ref(input) {
                _this2.fileInput = input;
              }
            }),
            React.createElement(
              'div',
              { style: { position: 'absolute', right: 55, top: -10, width: 20, height: 0 } },
              React.createElement(
                IconButton,
                { color: 'primary', onClick: function onClick() {
                    return _this2.fileInput.click();
                  } },
                React.createElement(Photo, null)
              )
            )
          )
        ),
        this.state.value !== '' && React.createElement(
          Fab,
          {
            color: 'primary',
            disabled: this.state.value === undefined || this.state.value === '',
            onClick: function onClick() {
              return _this2.handleAddMessage('text', _this2.state.value);
            },
            'aria-label': 'send'
          },
          React.createElement(Send, null)
        ),
        this.state.value === '' && React.createElement(Mic, { receiverPath: receiverPath, handleAddMessage: this.handleAddMessage, path: path })
      ),
      chatMessageMenuOpen && React.createElement(
        Scrollbar,
        { style: { height: 200, backgroundColor: undefined } },
        React.createElement(
          'div',
          { style: { padding: 10, paddingRight: 0 } },
          React.createElement(ReactList, {
            itemRenderer: this.renderItem,
            length: predefinedMessages ? predefinedMessages.length : 0,
            type: 'simple'
          })
        )
      )
    );
  };

  return ChatMessages;
}(Component);

ChatMessages.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
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

export default compose(connect(mapStateToProps, { setSimpleValue: setSimpleValue }), injectIntl, withRouter, withFirebase, withTheme)(ChatMessages);