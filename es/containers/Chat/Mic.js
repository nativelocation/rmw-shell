function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import CircularProgress from '@material-ui/core/CircularProgress';
import Close from '@material-ui/icons/Close';
import Microfone from '@material-ui/icons/Mic';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Send from '@material-ui/icons/Send';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Fab } from '@material-ui/core';
import { ReactMic } from 'react-mic';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

export var Mic = function (_Component) {
  _inherits(Mic, _Component);

  function Mic(props) {
    _classCallCheck(this, Mic);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.startRecording = function () {
      _this.setState({
        record: true,
        visible: true
      });
    };

    _this.stopRecording = function () {
      _this.setState({
        send: true,
        record: false
      });
    };

    _this.cancelRecording = function () {
      _this.setState({
        record: false,
        visible: false
      });
    };

    _this.onStop = function (recordedBlob) {
      _this.setState({
        record: false,
        visible: false,
        uploadCompleted: 0
      });

      if (_this.state.send) {
        _this.uploadAudioFile(recordedBlob.blob);
      }
    };

    _this.uploadAudioFile = function (file) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          intl = _this$props.intl,
          handleAddMessage = _this$props.handleAddMessage,
          path = _this$props.path,
          receiverPath = _this$props.receiverPath;


      if (file === null) {
        return;
      }

      if ((file.size / 1024 / 1024).toFixed(4) > 20) {
        //file larger than 10mb
        alert(intl.formatMessage({ id: 'max_file_size' }));
        return;
      }

      var key = firebaseApp.database().ref('/user_chat_messages/').push().key;

      var metadata = {
        customMetadata: {
          path: path,
          receiverPath: receiverPath,
          key: key,
          languageCode: intl.formatMessage({ id: 'current_locale', defaultMessage: 'en-US' })
        }
      };

      var uploadTask = firebaseApp.storage().ref('/user_chats/' + key + '.opus').put(file, metadata);

      uploadTask.on('state_changed', function (snapshot) {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;

        _this.setState({
          sending: true,
          uploadCompleted: progress
        });
      }, function (error) {
        console.log(error);
      }, function () {
        _this.setState({
          sending: false,
          uploadCompleted: undefined
        });

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          handleAddMessage('audio', downloadURL, key);
        });
      });
    };

    _this.state = {
      record: false,
      visible: false,
      send: false
    };
    return _this;
  }

  Mic.prototype.render = function render() {
    var _props = this.props,
        theme = _props.theme,
        width = _props.width;


    return React.createElement(
      'div',
      null,
      this.state.sending && React.createElement(CircularProgress, {
        style: { position: 'absolute', right: 13, bottom: 5, zIndex: 90 },
        mode: 'determinate',
        value: this.state.uploadCompleted,
        size: 62,
        thickness: 4
      }),
      this.state.visible && React.createElement(
        'div',
        { style: { display: 'flex', width: '100%' } },
        React.createElement(
          Fab,
          {
            style: { marginRight: -25 },
            color: 'secondary',
            onClick: this.cancelRecording
          },
          React.createElement(Close, { className: 'material-icons' })
        ),
        React.createElement(ReactMic, {
          style: { marginTop: 25 },
          height: 30,
          width: isWidthUp('sm', width) ? 200 : 80,
          className: 'oscilloscope',
          visualSetting: 'sinewave',
          mimeType: 'audio/ogg; codecs=opus',
          record: this.state.record,
          onStop: this.onStop,
          strokeColor: theme.palette.secondary.main,
          backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]
        }),
        React.createElement(
          Fab,
          { style: { marginLeft: -25 }, color: 'secondary', onClick: this.stopRecording },
          React.createElement(Send, null)
        )
      ),
      !this.state.visible && React.createElement(
        Fab,
        {
          color: 'secondary',
          disabled: this.state.sending,
          onClick: this.state.record ? this.stopRecording : this.startRecording

        },
        this.state.record ? React.createElement(Send, null) : React.createElement(Microfone, null)
      )
    );
  };

  return Mic;
}(Component);

Mic.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: PropTypes.object.isRequired
} : {};

export default compose(connect(null, { setSimpleValue: setSimpleValue }), injectIntl, withTheme, withWidth(), withTheme, withRouter, withFirebase)(Mic);