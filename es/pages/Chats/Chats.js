import Activity from '../../containers/Activity';
import ChatsList from '../../containers/Chat/ChatsList';
import Message from '@material-ui/icons/Message';
import React from 'react';
import { injectIntl } from 'react-intl';

var Chats = function Chats(props) {
  var intl = props.intl;


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
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          flexDirection: 'row'
        }
      },
      React.createElement(ChatsList, props),
      React.createElement(
        'div',
        { style: { width: '100%', height: '100%' } },
        React.createElement(Message, { color: 'disabled', style: { width: 192, height: 192, fontSize: 150 } })
      )
    )
  );
};

export default injectIntl(Chats);