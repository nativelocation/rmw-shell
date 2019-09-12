var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import AudioPlayer from '../../containers/AudioPlayer';
import Chip from '@material-ui/core/Chip';
import Done from '@material-ui/icons/Done';
import DoneAll from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
import Image from 'material-ui-image';
import Place from '@material-ui/icons/Place';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';
import moment from 'moment';

var getActions = function getActions(dispatch) {
  return bindActionCreators({ setSimpleValue: setSimpleValue }, dispatch);
};

var Message = function Message(props) {
  var auth = useSelector(function (state) {
    return state.auth;
  });

  var _getActions = getActions(useDispatch()),
      setSimpleValue = _getActions.setSimpleValue;

  useEffect(function () {
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


  var days = moment(values.created).diff(moment(), 'days');

  return React.createElement(
    'div',
    { style: { width: '100%' } },
    React.createElement(
      'div',
      null,
      dataChanged && React.createElement(
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
        React.createElement(
          'div',
          null,
          React.createElement(Chip, {
            label: '' + (values.created ? intl.formatRelativeTime(days, 'day', { numeric: 'auto' }) : undefined)
          })
        )
      ),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            width: '100%',
            justifyContent: values.authorUid === auth.uid ? 'flex-end' : 'flex-start'
          }
        },
        React.createElement(
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
          React.createElement(
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
            React.createElement(
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
              values.authorUid !== auth.uid && React.createElement(
                'div',
                {
                  onClick: function onClick() {
                    history.push('/chats/edit/' + values.authorUid);
                  },
                  style: { color: theme.palette.secondary.main, fontSize: 12, marginLeft: 0, cursor: 'pointer' }
                },
                values.authorName
              ),
              type === 'location' && React.createElement(
                'div',
                { style: { padding: 7 } },
                React.createElement(
                  'div',
                  { style: { textAlign: 'center', width: '100%', height: '100%' } },
                  React.createElement(
                    IconButton,
                    { target: '_blank', href: values.location },
                    React.createElement(Place, { color: 'secondary' })
                  ),
                  intl.formatMessage({ id: 'my_location' })
                )
              ),
              type === 'audio' && React.createElement(
                'div',
                { style: { padding: 7 } },
                React.createElement(AudioPlayer, { src: values.audio, authorPhotoUrl: values.authorPhotoUrl }),
                values.message
              ),
              type === 'link' && React.createElement(
                'a',
                { target: '_blank', rel: 'noopener noreferrer', href: values.link },
                values.link
              ),
              type === 'image' && values.image !== null && React.createElement(Image, {
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
            React.createElement(
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
              values.isSend && values.isReceived && React.createElement(DoneAll, {
                style: {
                  fontSize: 11,
                  padding: 0,
                  paddingLeft: 2,
                  bottom: -2,
                  color: values.isRead ? theme.palette.secondary.main : theme.palette.text.primary
                }
              }),
              values.isSend && !values.isReceived && React.createElement(Done, {
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
  theme: PropTypes.object.isRequired
} : {};

export default compose(injectIntl, withTheme, withRouter, withFirebase)(Message);