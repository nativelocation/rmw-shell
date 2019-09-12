'use strict';

exports.__esModule = true;
exports.AudioPlayer = undefined;

var _Avatar = require('@material-ui/core/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _Pause = require('@material-ui/icons/Pause');

var _Pause2 = _interopRequireDefault(_Pause);

var _PlayArrow = require('@material-ui/icons/PlayArrow');

var _PlayArrow2 = _interopRequireDefault(_PlayArrow);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioPlayer = exports.AudioPlayer = function (_Component) {
  _inherits(AudioPlayer, _Component);

  function AudioPlayer(props) {
    _classCallCheck(this, AudioPlayer);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.playPause = function () {
      _this.setState({ playing: !_this.state.playing });
    };

    _this.stop = function () {
      _this.setState({ url: null, playing: false });
    };

    _this.toggleLoop = function () {
      _this.setState({ loop: !_this.state.loop });
    };

    _this.setVolume = function (e) {
      _this.setState({ volume: parseFloat(e.target.value) });
    };

    _this.toggleMuted = function () {
      _this.setState({ muted: !_this.state.muted });
    };

    _this.setPlaybackRate = function (e) {
      _this.setState({ playbackRate: parseFloat(e.target.value) });
    };

    _this.onPlay = function () {
      _this.setState({ playing: true });
    };

    _this.onPause = function () {
      _this.setState({ playing: false });
    };

    _this.onSeekMouseDown = function () {
      _this.setState({ seeking: true });
    };

    _this.onSeekChange = function (e) {
      _this.setState({ played: parseFloat(e.target.value) });
    };

    _this.onSeekMouseUp = function (e) {
      _this.setState({ seeking: false });
      _this.player.seekTo(parseFloat(e.target.value));
    };

    _this.onProgress = function (state) {
      if (!_this.state.seeking) {
        _this.setState(state);
      }
    };

    _this.onEnded = function () {
      _this.setState({ playing: _this.state.loop });
    };

    _this.onDuration = function (duration) {
      _this.setState({ duration: duration });
    };

    _this.ref = function (player) {
      _this.player = player;
    };

    _this.state = {
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      playedSeconds: 0
    };
    return _this;
  }

  AudioPlayer.prototype.render = function render() {
    var _props = this.props,
        src = _props.src,
        authorPhotoUrl = _props.authorPhotoUrl,
        theme = _props.theme;
    var _state = this.state,
        played = _state.played,
        playedSeconds = _state.playedSeconds;


    return _react2.default.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center' } },
      _react2.default.createElement(_Avatar2.default, { src: authorPhotoUrl, alt: 'person', icon: _react2.default.createElement(_Person2.default, null) }),
      _react2.default.createElement(
        _IconButton2.default,
        { onClick: this.state.playing ? this.onPause : this.onPlay },
        !this.state.playing && _react2.default.createElement(_PlayArrow2.default, { color: 'secondary' }),
        this.state.playing && _react2.default.createElement(_Pause2.default, { color: 'secondary' })
      ),
      _react2.default.createElement(
        'div',
        {
          style: {
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            width: 200
          }
        },
        _react2.default.createElement(_LinearProgress2.default, { variant: 'determinate', value: played * 100, color: 'secondary' }),
        _react2.default.createElement(
          'div',
          { style: { marginTop: 5, color: theme.palette.primary3Color } },
          (0, _moment2.default)().month(0).date(1).hours(0).minutes(0).seconds(playedSeconds).format('m:ss')
        )
      ),
      _react2.default.createElement(_reactPlayer2.default, {
        ref: this.ref,
        style: { display: 'none' },
        playing: this.state.playing,
        url: src
        //onReady={() => console.log('onReady')}
        //onStart={() => console.log('onStart')}
        , onPlay: this.onPlay,
        onPause: this.onPause
        //onBuffer={() => console.log('onBuffer')}
        //onSeek={e => console.log('onSeek', e)}
        , onEnded: this.onEnded
        //onError={e => console.log('onError', e)}
        , onProgress: this.onProgress,
        onDuration: this.onDuration
      })
    );
  };

  return AudioPlayer;
}(_react.Component);

exports.default = (0, _styles.withTheme)(AudioPlayer);