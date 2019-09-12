var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import ChatsList from '../../containers/Chat/ChatsList';
import Input from '../../containers/Chat/Input';
import Messages from '../../containers/Chat/Messages';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

export var Chats = function (_Component) {
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

    return React.createElement(
      Activity,
      {
        onBackClick: isWidthUp('sm', width) ? undefined : function () {
          history.push('/chats');
        },
        title: title || intl.formatMessage({ id: 'chats' })
      },
      React.createElement(
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
        isWidthUp('sm', width) && React.createElement(ChatsList, this.props),
        React.createElement(
          'div',
          { style: { width: '100%', display: 'flex', flexDirection: 'column', marginLeft: 0, flexGrow: 1 } },
          React.createElement(Messages, _extends({
            uid: uid,
            path: 'user_chat_messages/' + auth.uid + '/' + uid,
            receiverPath: 'user_chat_messages/' + uid + '/' + auth.uid
          }, this.props)),
          React.createElement(Input, _extends({
            path: 'user_chat_messages/' + auth.uid + '/' + uid,
            receiverPath: 'user_chat_messages/' + uid + '/' + auth.uid
          }, this.props))
        )
      )
    );
  };

  return Chats;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth,
      persistentValues = state.persistentValues;


  return {
    auth: auth,
    title: persistentValues['current_chat_name']
  };
};

export default connect(mapStateToProps)(injectIntl(withRouter(withWidth()(Chats))));