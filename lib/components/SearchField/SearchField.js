'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('@material-ui/icons/Search');

var _Search2 = _interopRequireDefault(_Search);

var _reactIntl = require('react-intl');

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var _styles = require('@material-ui/core/styles');

var _withWidth = require('@material-ui/core/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _reactRedux = require('react-redux');

var _materialUiFilter = require('material-ui-filter');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      flex: 1,
      borderRadius: 4,
      minHeight: 48,
      display: 'block',
      '&:hover': {
        background: (0, _colorManipulator.fade)(theme.palette.common.white, 0.25)
      },
      '& $input': {
        transition: theme.transitions.create('width'),
        width: 0,
        '&:focus': {
          width: 200
        }
      }
    },
    rootOpen: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      minHeight: 48,
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      flex: 1,
      borderRadius: 4,
      display: 'block',
      background: (0, _colorManipulator.fade)(theme.palette.common.white, 0.25),
      width: 240
    },
    search: {
      width: theme.spacing(1) * 5,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      font: 'inherit',
      padding: theme.spacing(1) * 2 + 'px 0px 0px ' + theme.spacing(1) * 5 + 'px',
      border: 0,
      display: 'block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      background: 'none',
      margin: 0, // Reset for Safari
      color: 'inherit',
      width: '100%',
      '&:focus': {
        outline: 0
      }
    },
    inputOpen: {
      font: 'inherit',
      padding: theme.spacing(1) * 2 + 'px 0px 0px ' + theme.spacing(1) * 5 + 'px',
      border: 0,
      display: 'block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      background: 'none',
      margin: 0, // Reset for Safari
      color: 'inherit',
      width: '100%',
      outline: 0
    }
  };
};

var timeout = null;

var SearchField = function SearchField(_ref) {
  var classes = _ref.classes,
      filterName = _ref.filterName,
      setSearch = _ref.setSearch,
      searchValue = _ref.searchValue,
      alwaysOpen = _ref.alwaysOpen,
      _ref$deferTime = _ref.deferTime,
      deferTime = _ref$deferTime === undefined ? 1000 : _ref$deferTime;

  var _useState = (0, _react.useState)(searchValue),
      value = _useState[0],
      setValue = _useState[1];

  var hasInput = searchValue && searchValue !== '';
  var rootClass = classes.root;
  var inputClass = classes.input;

  var _onChange = function _onChange(v) {
    if (timeout) {
      clearTimeout(timeout);
    }

    setValue(v);

    timeout = setTimeout(function () {
      setSearch(filterName, v);
    }, deferTime);
  };

  if (hasInput || alwaysOpen) {
    rootClass = classes.rootOpen;
    inputClass = classes.inputOpen;
  }

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(rootClass) },
    _react2.default.createElement(
      'div',
      { className: classes.search },
      _react2.default.createElement(_Search2.default, null)
    ),
    _react2.default.createElement('input', {
      autoComplete: 'off',
      id: 'docsearch-input',
      value: value,
      ref: function ref(node) {
        if (node && searchValue && searchValue !== '') {
          node.focus();
        }
      },
      className: (0, _classnames2.default)(inputClass),
      onChange: function onChange(e) {
        return _onChange(e.target.value);
      }
    })
  );
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var filters = state.filters;
  var filterName = ownProps.filterName;


  var searchValue = filters[filterName] ? filters[filterName].search ? filters[filterName].search.value : '' : '';

  return {
    searchValue: searchValue
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, _extends({}, _materialUiFilter.filterActions))((0, _reactIntl.injectIntl)((0, _styles.withTheme)((0, _styles.withStyles)(styles, { withTheme: true }, (0, _withWidth2.default)())(SearchField))));
module.exports = exports['default'];