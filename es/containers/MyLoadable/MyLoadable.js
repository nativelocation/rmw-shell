import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import FirebaseProvider from 'firekit-provider';
import { ReactReduxContext } from 'react-redux';

export default function makeLoadable(opts, preloadComponents) {
  return Loadable.Map({
    loader: {
      Component: opts.loader,
      firebase: opts.firebase
    },
    loading: LoadingComponent,
    render: function render(loaded, props) {
      if (preloadComponents !== undefined && preloadComponents instanceof Array) {
        preloadComponents.map(function (component) {
          return component.preload();
        });
      }

      var Component = loaded.Component.default;
      var firebaseApp = loaded.firebase.firebaseApp;

      return React.createElement(
        FirebaseProvider,
        { firebaseApp: firebaseApp, context: ReactReduxContext },
        React.createElement(
          'div',
          null,
          React.createElement(Component, props)
        )
      );
    }
  });
}