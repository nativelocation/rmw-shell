'use strict';

exports.__esModule = true;

var _Activity = require('rmw-shell/lib/containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _InputBase = require('@material-ui/core/InputBase');

var _InputBase2 = _interopRequireDefault(_InputBase);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scrollbar = require('rmw-shell/lib/components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _Search = require('@material-ui/icons/Search');

var _Search2 = _interopRequireDefault(_Search);

var _lite = require('algoliasearch/lite');

var _lite2 = _interopRequireDefault(_lite);

var _reactInstantsearchDom = require('react-instantsearch-dom');

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var _reactIntl = require('react-intl');

var _styles = require('@material-ui/core/styles');

var _actions = require('rmw-shell/lib/store/simpleValues/actions');

var _reactRedux = require('react-redux');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getActions = function getActions(dispatch) {
  return (0, _redux.bindActionCreators)({ setSimpleValue: _actions.setSimpleValue }, dispatch);
};
var PERSISTENT_SEARCH_VALUE_KEY = 'search_activity_value';

var styles = function styles(theme) {
  var _search, _inputInput;

  return {
    search: (_search = {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%'
    }, _search[theme.breakpoints.up('sm')] = {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }, _search),
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: (_inputInput = {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%'
    }, _inputInput[theme.breakpoints.up('md')] = {
      width: 200
    }, _inputInput)
  };
};

var timerId = null;
var MaterialUiSearchBox = function MaterialUiSearchBox(_ref) {
  var refine = _ref.refine,
      delay = _ref.delay,
      classes = _ref.classes,
      intl = _ref.intl,
      currentRefinement = _ref.currentRefinement;

  var _useState = (0, _react.useState)({
    value: currentRefinement
  }),
      state = _useState[0],
      setState = _useState[1];

  var initialValue = (0, _reactRedux.useSelector)(function (state) {
    return state.simpleValues[PERSISTENT_SEARCH_VALUE_KEY];
  });

  (0, _react.useEffect)(function () {
    if (initialValue) {
      setState({ value: initialValue });
      onChangeDebounced(initialValue);
    }
  }, []);

  var _getActions = getActions((0, _reactRedux.useDispatch)()),
      setSimpleValue = _getActions.setSimpleValue;

  var onChangeDebounced = function onChangeDebounced(value) {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      return refine(value);
    }, delay);

    setSimpleValue(PERSISTENT_SEARCH_VALUE_KEY, value);

    setState(function () {
      return {
        value: value
      };
    });
  };

  var value = state.value;


  return _react2.default.createElement(
    'div',
    { className: classes.search },
    _react2.default.createElement(
      'div',
      { className: classes.searchIcon },
      _react2.default.createElement(_Search2.default, null)
    ),
    _react2.default.createElement(_InputBase2.default, {
      value: value,
      onChange: function onChange(e) {
        return onChangeDebounced(e.currentTarget.value);
      },
      placeholder: intl.formatMessage({ id: 'search' }),
      id: 'SearchBox',
      classes: {
        root: classes.inputRoot,
        input: classes.inputInput
      }
    })
  );
};

var ConnectedSearchBox = (0, _reactInstantsearchDom.connectSearchBox)((0, _styles.withStyles)(styles)((0, _reactIntl.injectIntl)(MaterialUiSearchBox)));

var interval = null;

var Search = function Search(_ref2) {
  var hitComponent = _ref2.hitComponent,
      indexName = _ref2.indexName,
      appID = _ref2.appID,
      apiKey = _ref2.apiKey;

  var _useState2 = (0, _react.useState)({}),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _react.useEffect)(function () {
    interval = setInterval(function () {
      return setState({ refresh: true }, function () {
        setState({ refresh: false });
      });
    }, 5000);

    return clearInterval(interval);
  }, []);

  var Hits = function Hits(_ref3) {
    var hits = _ref3.hits;
    return _react2.default.createElement(
      _List2.default,
      null,
      hits.map(function (hit) {
        return hitComponent({ hit: hit });
      })
    );
  };
  var CustomHits = (0, _reactInstantsearchDom.connectHits)(Hits);

  var algoliaClient = (0, _lite2.default)(appID, apiKey);
  var searchClient = {
    search: function search(requests) {
      if (requests.every(function (_ref4) {
        var params = _ref4.params;
        return !params.query;
      })) {
        return Promise.resolve({
          results: requests.map(function () {
            return {
              hits: [],
              nbHits: 0,
              nbPages: 0,
              processingTimeMS: 0
            };
          })
        });
      }

      return algoliaClient.search(requests);
    }
  };

  return _react2.default.createElement(
    _reactInstantsearchDom.InstantSearch,
    { indexName: indexName, searchClient: searchClient },
    _react2.default.createElement(
      _Activity2.default,
      { appBarContent: _react2.default.createElement(ConnectedSearchBox, { delay: 500, refresh: state.refresh }) },
      _react2.default.createElement(
        'div',
        { style: { height: '100%' } },
        _react2.default.createElement(
          _Scrollbar2.default,
          null,
          _react2.default.createElement(CustomHits, null)
        )
      )
    )
  );
};

exports.default = Search;
module.exports = exports['default'];