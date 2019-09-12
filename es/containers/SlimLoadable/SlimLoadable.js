import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

export default function makeSlimLoadable(opts) {
  return Loadable.Map({
    loader: {
      Component: opts.loader
    },
    loading: LoadingComponent,
    render: function render(loaded, props) {
      var Component = loaded.Component.default;
      return React.createElement(Component, props);
    }
  });
}