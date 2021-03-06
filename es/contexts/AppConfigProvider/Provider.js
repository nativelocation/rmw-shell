function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Context from './Context';

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  function Provider() {
    _classCallCheck(this, Provider);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Provider.prototype.render = function render() {
    var _props = this.props,
        appConfig = _props.appConfig,
        children = _props.children;


    return React.createElement(
      Context.Provider,
      { value: { appConfig: appConfig } },
      children
    );
  };

  return Provider;
}(Component);

Provider.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.any,
  appConfig: PropTypes.object.isRequired
} : {};

export default Provider;