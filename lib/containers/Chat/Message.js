'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AudioPlayer = require('../../containers/AudioPlayer');

var _AudioPlayer2 = _interopRequireDefault(_AudioPlayer);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _Done = require('@material-ui/icons/Done');

var _Done2 = _interopRequireDefault(_Done);

var _DoneAll = require('@material-ui/icons/DoneAll');

var _DoneAll2 = _interopRequireDefault(_DoneAll);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _materialUiImage = require('material-ui-image');

var _materialUiImage2 = _interopRequireDefault(_materialUiImage);

var _Place = require('@material-ui/icons/Place');

var _Place2 = _interopRequireDefault(_Place);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getActions = function getActions(dispatch) {
  return (0, _redux.bindActionCreators)({ setSimpleValue: _actions.setSimpleValue }, dispatch);
};

var Message = function Message(props) {
  var auth = (0, _reactRedux.useSelector)(function (state) {
    return state.auth;
  });

  var _getActions = getActions((0, _reactRedux.useDispatch)()),
      setSimpleValue = _getActions.setSimpleValue;

  (0, _react.useEffect)(function () {
    var row = props.row,
        firebaseApp = props.firebaseApp,
        path = props.path;


    var values = row.val;

    if (auth.uid !== values.authorUid && !values.isRead) {
      firebaseApp.database().ref(path + '/' + row.key).update({
        isRead: true
      });
      firebaseApp.database().ref('user_chats/' + auth.uid + '/' + values.authorUid + '/unread').remove();
    }
  }, []);

  var dataChanged = props.dataChanged,
      authorChanged = props.authorChanged,
      theme = props.theme,
      values = props.values,
      uid = props.uid,
      backgroundColor = props.backgroundColor,
      color = props.color,
      intl = props.intl,
      history = props.history,
      type = props.type,
      isGranted = props.isGranted,
      scrollToBottom = props.scrollToBottom;


  var days = (0, _moment2.default)(values.created).diff((0, _moment2.default)(), 'days');

  return _react2.default.createElement(
    'div',
    { style: { width: '100%' } },
    _react2.default.createElement(
      'div',
      null,
      dataChanged && _react2.default.createElement(
        'div',
        {
          style: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10
          }
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Chip2.default, {
            label: '' + (values.created ? intl.formatRelativeTime(days, 'day', { numeric: 'auto' }) : undefined)
          })
        )
      ),
      _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            width: '100%',
            justifyContent: values.authorUid === auth.uid ? 'flex-end' : 'flex-start'
          }
        },
        _react2.default.createElement(
          'div',
          {
            onDoubleClick: function onDoubleClick() {
              if (isGranted('administrator')) {
                setSimpleValue('delete_message', uid);
              }
            },
            style: _extends({}, theme.chip, {
              margin: 1,
              marginTop: authorChanged === true ? 8 : 1,
              boxShadow: theme.shadows[3],
              borderRadius: authorChanged === true ? values.authorUid === auth.uid ? '8px 0 8px 8px' : '0 8px 8px 8px' : '8px 8px 8px 8px',
              backgroundColor: backgroundColor,
              color: color,
              fontFamily: theme.typography.fontFamily
            })
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                display: type === 'image' ? undefined : 'flex',
                margin: type === 'image' ? 0 : 5,
                padding: type === 'image' ? 5 : 0,
                flexOrientation: 'row',
                justifyContent: 'space-between',
                width: 'fit-content'
              }
            },
            _react2.default.createElement(
              'div',
              {
                style: {
                  maxWidth: 500,
                  width: 'fit-content',
                  fontSize: 16,
                  paddingLeft: 8,
                  margin: 'auto',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                  fontFamily: theme.typography.fontFamily
                }
              },
              values.authorUid !== auth.uid && _react2.default.createElement(
                'div',
                {
                  onClick: function onClick() {
                    history.push('/chats/edit/' + values.authorUid);
                  },
                  style: { color: theme.palette.secondary.main, fontSize: 12, marginLeft: 0, cursor: 'pointer' }
                },
                values.authorName
              ),
              type === 'location' && _react2.default.createElement(
                'div',
                { style: { padding: 7 } },
                _react2.default.createElement(
                  'div',
                  { style: { textAlign: 'center', width: '100%', height: '100%' } },
                  _react2.default.createElement(
                    _IconButton2.default,
                    { target: '_blank', href: values.location },
                    _react2.default.createElement(_Place2.default, { color: 'secondary' })
                  ),
                  intl.formatMessage({ id: 'my_location' })
                )
              ),
              type === 'audio' && _react2.default.createElement(
                'div',
                { style: { padding: 7 } },
                _react2.default.createElement(_AudioPlayer2.default, { src: values.audio, authorPhotoUrl: values.authorPhotoUrl }),
                values.message
              ),
              type === 'link' && _react2.default.createElement(
                'a',
                { target: '_blank', rel: 'noopener noreferrer', href: values.link },
                values.link
              ),
              type === 'image' && values.image !== null && _react2.default.createElement(_materialUiImage2.default, {
                style: { width: 'auto', height: 280, paddingTop: 0, cursor: 'pointer' },
                imageStyle: { maxWidth: '100%', padding: 0, position: 'relative', borderRadius: 5 },
                onLoad: scrollToBottom,
                onClick: function onClick() {
                  window.open(values.image, '_blank');
                },
                src: values.image,
                color: backgroundColor
              }),
              type === 'text' && values.message
            ),
            _react2.default.createElement(
              'div',
              {
                style: {
                  fontSize: 9,
                  color: values.authorUid !== auth.uid ? theme.palette.text.secondary : theme.palette.text.secondary,
                  marginLeft: 8,
                  alignSelf: 'flex-end'
                }
              },
              '' + (values.created ? intl.formatTime(new Date(values.created)) : undefined),
              values.isSend && values.isReceived && _react2.default.createElement(_DoneAll2.default, {
                style: {
                  fontSize: 11,
                  padding: 0,
                  paddingLeft: 2,
                  bottom: -2,
                  color: values.isRead ? theme.palette.secondary.main : theme.palette.text.primary
                }
              }),
              values.isSend && !values.isReceived && _react2.default.createElement(_Done2.default, {
                style: {
                  fontSize: 11,
                  padding: 0,
                  paddingLeft: 2,
                  bottom: -2,
                  color: values.isRead ? theme.palette.secondary.main : theme.palette.text.primary
                }
              })
            )
          )
        )
      )
    )
  );
};

Message.propTypes = process.env.NODE_ENV !== "production" ? {
  theme: _propTypes2.default.object.isRequired
} : {};

exports.default = (0, _redux.compose)(_reactIntl.injectIntl, _styles.withTheme, _reactRouterDom.withRouter, _firekitProvider.withFirebase)(Message);
module.exports = exports['default'];