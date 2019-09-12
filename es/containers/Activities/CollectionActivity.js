var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import Button from '@material-ui/core/Button';
import FilterList from '@material-ui/icons/FilterList';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';
import SearchField from '../../components/SearchField';
import _isGranted from '../../utils/auth';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Tooltip from '@material-ui/core/Tooltip';
import { getCol } from 'firekit';
import { Fab } from '@material-ui/core';

var CollectionActivity = function (_Component) {
  _inherits(CollectionActivity, _Component);

  function CollectionActivity() {
    _classCallCheck(this, CollectionActivity);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CollectionActivity.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        path = _props.path,
        name = _props.name,
        watchCol = _props.watchCol;


    watchCol(path ? path : name);
  };

  CollectionActivity.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        createGrant = _props2.createGrant,
        filterFields = _props2.filterFields,
        hasFilters = _props2.hasFilters,
        history = _props2.history,
        intl = _props2.intl,
        isGranted = _props2.isGranted,
        list = _props2.list,
        name = _props2.name,
        setFilterIsOpen = _props2.setFilterIsOpen,
        renderItem = _props2.renderItem,
        handleCreateClick = _props2.handleCreateClick,
        disableCreate = _props2.disableCreate,
        title = _props2.title;


    var fields = filterFields.map(function (field) {
      if (!field.label) {
        return _extends({
          label: intl.formatMessage({ id: field.name + '_label' })
        }, field);
      }
      return field;
    });

    return React.createElement(
      Activity,
      {
        title: title ? title : intl.formatMessage({ id: name }),
        appBarContent: React.createElement(
          'div',
          { style: { display: 'flex' } },
          React.createElement(SearchField, { filterName: name }),
          React.createElement(
            Tooltip,
            { title: intl.formatMessage({ id: 'open_filter' }) },
            React.createElement(
              IconButton,
              {
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: function onClick() {
                  setFilterIsOpen(name, true);
                }
              },
              React.createElement(FilterList, { color: hasFilters ? 'secondary' : 'inherit' })
            )
          )
        )
      },
      React.createElement(
        'div',
        { style: { height: '100%' } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            { ref: function ref(field) {
                return _this2.list = field;
              } },
            React.createElement(ReactList, {
              itemRenderer: function itemRenderer(i) {
                return renderItem(list[i].id, list[i].data);
              },
              length: list ? list.length : 0,
              type: 'simple'
            })
          )
        ),
        React.createElement('div', { style: { float: 'left', clear: 'both' } }),
        disableCreate !== true && isGranted(createGrant) && React.createElement(
          Fab,
          {
            onClick: handleCreateClick ? handleCreateClick : function () {
              history.push('/' + name + '/create');
            },
            style: { position: 'fixed', bottom: 15, right: 20, zIndex: 99 },
            color: 'secondary'
          },
          React.createElement(Add, null)
        )
      ),
      React.createElement(FilterDrawer, { name: name, fields: fields, formatMessage: intl.formatMessage })
    );
  };

  return CollectionActivity;
}(Component);

CollectionActivity.propTypes = process.env.NODE_ENV !== "production" ? {

  isGranted: PropTypes.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var filters = state.filters;
  var name = ownProps.name,
      path = ownProps.path,
      customIsGranted = ownProps.isGranted;


  var key = path ? path : name;

  var _filterSelectors$sele = filterSelectors.selectFilterProps(name, filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var list = filterSelectors.getFilteredList(key, filters, getCol(state, key), function (fieldValue) {
    return fieldValue.data;
  });

  return {
    hasFilters: hasFilters,
    list: list,
    isGranted: function isGranted(grant) {
      return customIsGranted ? customIsGranted(state, grant) : _isGranted(state, grant);
    }
  };
};

export default compose(connect(mapStateToProps, _extends({}, filterActions)), injectIntl, withFirebase, withRouter)(CollectionActivity);