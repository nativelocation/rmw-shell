'use strict';

exports.__esModule = true;
exports.Mic = undefined;

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Mic = require('@material-ui/icons/Mic');

var _Mic2 = _interopRequireDefault(_Mic);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Send = require('@material-ui/icons/Send');

var _Send2 = _interopRequireDefault(_Send);

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _core = require('@material-ui/core');

var _reactMic = require('react-mic');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mic = exports.Mic = function (_Component) {
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


    return _react2.default.createElement(
      'div',
      null,
      this.state.sending && _react2.default.createElement(_CircularProgress2.default, {
        style: { position: 'absolute', right: 13, bottom: 5, zIndex: 90 },
        mode: 'determinate',
        value: this.state.uploadCompleted,
        size: 62,
        thickness: 4
      }),
      this.state.visible && _react2.default.createElement(
        'div',
        { style: { display: 'flex', width: '100%' } },
        _react2.default.createElement(
          _core.Fab,
          {
            style: { marginRight: -25 },
            color: 'secondary',
            onClick: this.cancelRecording
          },
          _react2.default.createElement(_Close2.default, { className: 'material-icons' })
        ),
        _react2.default.createElement(_reactMic.ReactMic, {
          style: { marginTop: 25 },
          height: 30,
          width: (0, _withWidth.isWidthUp)('sm', width) ? 200 : 80,
          className: 'oscilloscope',
          visualSetting: 'sinewave',
          mimeType: 'audio/ogg; codecs=opus',
          record: this.state.record,
          onStop: this.onStop,
          strokeColor: theme.palette.secondary.main,
          backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]
        }),
        _react2.default.createElement(
          _core.Fab,
          { style: { marginLeft: -25 }, color: 'secondary', onClick: this.stopRecording },
          _react2.default.createElement(_Send2.default, null)
        )
      ),
      !this.state.visible && _react2.default.createElement(
        _core.Fab,
        {
          color: 'secondary',
          disabled: this.state.sending,
          onClick: this.state.record ? this.stopRecording : this.startRecording

        },
        this.state.record ? _react2.default.createElement(_Send2.default, null) : _react2.default.createElement(_Mic2.default, null)
      )
    );
  };

  return Mic;
}(_react.Component);

Mic.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: _propTypes2.default.object.isRequired
} : {};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(null, { setSimpleValue: _actions.setSimpleValue }), _reactIntl.injectIntl, _styles.withTheme, (0, _withWidth2.default)(), _styles.withTheme, _reactRouterDom.withRouter, _firekitProvider.withFirebase)(Mic);