var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from 'rmw-shell/lib/containers/Activity';
import Add from '@material-ui/icons/Add';
import FilterList from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactList from 'react-list';
import Scrollbar from 'rmw-shell/lib/components/Scrollbar';
import SearchField from 'rmw-shell/lib/components/SearchField';
import Tooltip from '@material-ui/core/Tooltip';
import _isGranted from 'rmw-shell/lib/utils/auth';
import { Fab } from '@material-ui/core';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getList } from 'firekit';
import { getLocation } from 'firekit/lib/store/lists/actions';
import { injectIntl } from 'react-intl';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';

var ListActivity = function (_Component) {
  _inherits(ListActivity, _Component);

  function ListActivity() {
    _classCallCheck(this, ListActivity);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ListActivity.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        path = _props.path,
        name = _props.name;

    watchList(path || name);
  };

  ListActivity.prototype.render = function render() {
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
        title = _props2.title,
        _props2$activityProps = _props2.activityProps,
        activityProps = _props2$activityProps === undefined ? {} : _props2$activityProps;


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
      _extends({
        title: title || intl.formatMessage({ id: name }),
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
      }, activityProps),
      React.createElement(
        'div',
        { style: { height: '100%' } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            null,
            React.createElement(ReactList, {
              itemRenderer: function itemRenderer(i) {
                return renderItem(list[i].key, list[i].val);
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
            onClick: handleCreateClick != null ? handleCreateClick : function () {
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

  return ListActivity;
}(Component);

ListActivity.propTypes = process.env.NODE_ENV !== "production" ? {
  isGranted: PropTypes.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var firebaseApp = ownProps.firebaseApp;
  var filters = state.filters;
  var name = ownProps.name,
      path = ownProps.path,
      customIsGranted = ownProps.isGranted;


  var location = firebaseApp ? getLocation(firebaseApp, path) : path;
  var ref = location || name;

  var _filterSelectors$sele = filterSelectors.selectFilterProps(name, filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var list = filterSelectors.getFilteredList(ref, filters, getList(state, ref), function (fieldValue) {
    return fieldValue.val;
  });

  return {
    ref: ref,
    name: name,
    hasFilters: hasFilters,
    list: list,
    isGranted: function isGranted(grant) {
      return customIsGranted ? customIsGranted(state, grant) : _isGranted(state, grant);
    }
  };
};

export default compose(connect(mapStateToProps, _extends({}, filterActions)), injectIntl, withFirebase, withRouter)(ListActivity);