var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import Input from '../../containers/Chat/Input';
import Messages from '../../containers/Chat/Messages';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

export var Chats = function (_Component) {
  _inherits(Chats, _Component);

  function Chats() {
    _classCallCheck(this, Chats);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Chats.prototype.render = function render() {
    var intl = this.props.intl;


    return React.createElement(
      Activity,
      { title: intl.formatMessage({ id: 'chats' }) },
      React.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%',
            alignItems: 'strech',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row'
          }
        },
        React.createElement(
          'div',
          { style: { width: '100%', display: 'flex', flexDirection: 'column', marginLeft: 0, flexGrow: 1 } },
          React.createElement(Messages, _extends({ path: 'public_chats', receiverPath: 'public_chats' }, this.props)),
          React.createElement(Input, _extends({ path: 'public_chats', receiverPath: 'public_chats' }, this.props))
        )
      )
    );
  };

  return Chats;
}(Component);

export default connect()(injectIntl(withRouter(Chats)));