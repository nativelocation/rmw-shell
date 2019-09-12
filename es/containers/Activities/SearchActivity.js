import Activity from 'rmw-shell/lib/containers/Activity';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import React, { useState, useEffect } from 'react';
import Scrollbar from 'rmw-shell/lib/components/Scrollbar';
import SearchIcon from '@material-ui/icons/Search';
import algoliasearch from 'algoliasearch/lite';
import { connectHits, connectSearchBox, InstantSearch } from 'react-instantsearch-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { setSimpleValue } from 'rmw-shell/lib/store/simpleValues/actions';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

var getActions = function getActions(dispatch) {
  return bindActionCreators({ setSimpleValue: setSimpleValue }, dispatch);
};
var PERSISTENT_SEARCH_VALUE_KEY = 'search_activity_value';

var styles = function styles(theme) {
  var _search, _inputInput;

  return {
    search: (_search = {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
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

  var _useState = useState({
    value: currentRefinement
  }),
      state = _useState[0],
      setState = _useState[1];

  var initialValue = useSelector(function (state) {
    return state.simpleValues[PERSISTENT_SEARCH_VALUE_KEY];
  });

  useEffect(function () {
    if (initialValue) {
      setState({ value: initialValue });
      onChangeDebounced(initialValue);
    }
  }, []);

  var _getActions = getActions(useDispatch()),
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


  return React.createElement(
    'div',
    { className: classes.search },
    React.createElement(
      'div',
      { className: classes.searchIcon },
      React.createElement(SearchIcon, null)
    ),
    React.createElement(InputBase, {
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

var ConnectedSearchBox = connectSearchBox(withStyles(styles)(injectIntl(MaterialUiSearchBox)));

var interval = null;

var Search = function Search(_ref2) {
  var hitComponent = _ref2.hitComponent,
      indexName = _ref2.indexName,
      appID = _ref2.appID,
      apiKey = _ref2.apiKey;

  var _useState2 = useState({}),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    interval = setInterval(function () {
      return setState({ refresh: true }, function () {
        setState({ refresh: false });
      });
    }, 5000);

    return clearInterval(interval);
  }, []);

  var Hits = function Hits(_ref3) {
    var hits = _ref3.hits;
    return React.createElement(
      List,
      null,
      hits.map(function (hit) {
        return hitComponent({ hit: hit });
      })
    );
  };
  var CustomHits = connectHits(Hits);

  var algoliaClient = algoliasearch(appID, apiKey);
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

  return React.createElement(
    InstantSearch,
    { indexName: indexName, searchClient: searchClient },
    React.createElement(
      Activity,
      { appBarContent: React.createElement(ConnectedSearchBox, { delay: 500, refresh: state.refresh }) },
      React.createElement(
        'div',
        { style: { height: '100%' } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(CustomHits, null)
        )
      )
    )
  );
};

export default Search;