'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Activity = require('rmw-shell/lib/containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Add = require('@material-ui/icons/Add');

var _Add2 = _interopRequireDefault(_Add);

var _FilterList = require('@material-ui/icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Scrollbar = require('rmw-shell/lib/components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _SearchField = require('rmw-shell/lib/components/SearchField');

var _SearchField2 = _interopRequireDefault(_SearchField);

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _auth = require('rmw-shell/lib/utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _core = require('@material-ui/core');

var _materialUiFilter = require('material-ui-filter');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _actions = require('firekit/lib/store/lists/actions');

var _reactIntl = require('react-intl');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    return _react2.default.createElement(
      _Activity2.default,
      _extends({
        title: title || intl.formatMessage({ id: name }),
        appBarContent: _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          _react2.default.createElement(_SearchField2.default, { filterName: name }),
          _react2.default.createElement(
            _Tooltip2.default,
            { title: intl.formatMessage({ id: 'open_filter' }) },
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'inherit',
                'aria-label': 'open drawer',
                onClick: function onClick() {
                  setFilterIsOpen(name, true);
                }
              },
              _react2.default.createElement(_FilterList2.default, { color: hasFilters ? 'secondary' : 'inherit' })
            )
          )
        )
      }, activityProps),
      _react2.default.createElement(
        'div',
        { style: { height: '100%' } },
        _react2.default.createElement(
          _Scrollbar2.default,
          null,
          _react2.default.createElement(
            _List2.default,
            null,
            _react2.default.createElement(_reactList2.default, {
              itemRenderer: function itemRenderer(i) {
                return renderItem(list[i].key, list[i].val);
              },
              length: list ? list.length : 0,
              type: 'simple'
            })
          )
        ),
        _react2.default.createElement('div', { style: { float: 'left', clear: 'both' } }),
        disableCreate !== true && isGranted(createGrant) && _react2.default.createElement(
          _core.Fab,
          {
            onClick: handleCreateClick != null ? handleCreateClick : function () {
              history.push('/' + name + '/create');
            },
            style: { position: 'fixed', bottom: 15, right: 20, zIndex: 99 },
            color: 'secondary'
          },
          _react2.default.createElement(_Add2.default, null)
        )
      ),
      _react2.default.createElement(_materialUiFilter.FilterDrawer, { name: name, fields: fields, formatMessage: intl.formatMessage })
    );
  };

  return ListActivity;
}(_react.Component);

ListActivity.propTypes = process.env.NODE_ENV !== "production" ? {
  isGranted: _propTypes2.default.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var firebaseApp = ownProps.firebaseApp;
  var filters = state.filters;
  var name = ownProps.name,
      path = ownProps.path,
      customIsGranted = ownProps.isGranted;


  var location = firebaseApp ? (0, _actions.getLocation)(firebaseApp, path) : path;
  var ref = location || name;

  var _filterSelectors$sele = _materialUiFilter.filterSelectors.selectFilterProps(name, filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var list = _materialUiFilter.filterSelectors.getFilteredList(ref, filters, (0, _firekit.getList)(state, ref), function (fieldValue) {
    return fieldValue.val;
  });

  return {
    ref: ref,
    name: name,
    hasFilters: hasFilters,
    list: list,
    isGranted: function isGranted(grant) {
      return customIsGranted ? customIsGranted(state, grant) : (0, _auth2.default)(state, grant);
    }
  };
};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, _extends({}, _materialUiFilter.filterActions)), _reactIntl.injectIntl, _firekitProvider.withFirebase, _reactRouterDom.withRouter)(ListActivity);
module.exports = exports['default'];