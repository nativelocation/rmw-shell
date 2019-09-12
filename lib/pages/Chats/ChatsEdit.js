'use strict';

exports.__esModule = true;
exports.Chats = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _ChatsList = require('../../containers/Chat/ChatsList');

var _ChatsList2 = _interopRequireDefault(_ChatsList);

var _Input = require('../../containers/Chat/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Messages = require('../../containers/Chat/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _reactIntl = require('react-intl');

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chats = exports.Chats = function (_Component) {
  _inherits(Chats, _Component);

  function Chats() {
    _classCallCheck(this, Chats);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Chats.prototype.render = function render() {
    var _props = this.props,
        intl = _props.intl,
        match = _props.match,
        auth = _props.auth,
        width = _props.width,
        title = _props.title,
        history = _props.history;


    var uid = match.params.uid;

    return _react2.default.createElement(
      _Activity2.default,
      {
        onBackClick: (0, _withWidth.isWidthUp)('sm', width) ? undefined : function () {
          history.push('/chats');
        },
        title: title || intl.formatMessage({ id: 'chats' })
      },
      _react2.default.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%',
            alignItems: 'strech',
            display: 'flex',
            // flexWrap: 'wrap',
            justifyContent: 'flex-start',
            flexDirection: 'row'
          }
        },
        (0, _withWidth.isWidthUp)('sm', width) && _react2.default.createElement(_ChatsList2.default, this.props),
        _react2.default.createElement(
          'div',
          { style: { width: '100%', display: 'flex', flexDirection: 'column', marginLeft: 0, flexGrow: 1 } },
          _react2.default.createElement(_Messages2.default, _extends({
            uid: uid,
            path: 'user_chat_messages/' + auth.uid + '/' + uid,
            receiverPath: 'user_chat_messages/' + uid + '/' + auth.uid
          }, this.props)),
          _react2.default.createElement(_Input2.default, _extends({
            path: 'user_chat_messages/' + auth.uid + '/' + uid,
            receiverPath: 'user_chat_messages/' + uid + '/' + auth.uid
          }, this.props))
        )
      )
    );
  };

  return Chats;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth,
      persistentValues = state.persistentValues;


  return {
    auth: auth,
    title: persistentValues['current_chat_name']
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _withWidth2.default)()(Chats))));