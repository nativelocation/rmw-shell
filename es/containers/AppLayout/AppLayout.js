import 'react-toastify/dist/ReactToastify.css';
import Drawer from '../../containers/Drawer';
import React, { useEffect } from 'react';
import Routes from '../../containers/Routes';
import { ToastContainer } from 'react-toastify';
import { checkForUpdate } from '../../utils/messaging';
import { makeStyles } from '@material-ui/styles';

var useStyles = makeStyles({
  body: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  }
});

export var AppLayout = function AppLayout() {
  useEffect(function () {
    checkForUpdate();
  });

  var classes = useStyles();

  return React.createElement(
    'div',
    { className: classes.body },
    React.createElement(
      'div',
      { className: classes.root },
      React.createElement(Drawer, null),
      React.createElement(Routes, null),
      React.createElement(ToastContainer, null)
    )
  );
};

export default AppLayout;