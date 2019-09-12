'use strict';

exports.__esModule = true;

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _ChatsList = require('../../containers/Chat/ChatsList');

var _ChatsList2 = _interopRequireDefault(_ChatsList);

var _Message = require('@material-ui/icons/Message');

var _Message2 = _interopRequireDefault(_Message);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chats = function Chats(props) {
  var intl = props.intl;


  return _react2.default.createElement(
    _Activity2.default,
    { title: intl.formatMessage({ id: 'chats' }) },
    _react2.default.createElement(
      'div',
      {
        style: {
          height: '100%',
          width: '100%',
          alignItems: 'strech',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          flexDirection: 'row'
        }
      },
      _react2.default.createElement(_ChatsList2.default, props),
      _react2.default.createElement(
        'div',
        { style: { width: '100%', height: '100%' } },
        _react2.default.createElement(_Message2.default, { color: 'disabled', style: { width: 192, height: 192, fontSize: 150 } })
      )
    )
  );
};

exports.default = (0, _reactIntl.injectIntl)(Chats);
module.exports = exports['default'];