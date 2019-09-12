'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Person = require('@material-ui/icons/Person');

var _Person2 = _interopRequireDefault(_Person);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Switch = require('@material-ui/core/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _materialUiFilter = require('material-ui-filter');

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersToggle = function (_Component) {
  _inherits(UsersToggle, _Component);

  function UsersToggle() {
    var _temp, _this, _ret;

    _classCallCheck(this, UsersToggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.renderGrantItem = function (list, i) {
      var _this$props = _this.props,
          getValue = _this$props.getValue,
          _onChange = _this$props.onChange,
          onClick = _this$props.onClick;


      var userUid = list[i].key;
      var user = list[i].val;
      var checked = getValue(userUid);

      return _react2.default.createElement(
        'div',
        { key: i },
        _react2.default.createElement(
          _ListItem2.default,
          { key: userUid, id: userUid, onClick: onClick ? function () {
              return onClick(userUid, user);
            } : undefined },
          _react2.default.createElement(_AltIconAvatar2.default, { alt: 'person', src: user.photoURL, icon: _react2.default.createElement(_Person2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, {
            primary: _react2.default.createElement(
              'div',
              { style: { fontFamily: 'Roboto' } },
              user.displayName
            ),
            secondaryText: _react2.default.createElement(
              'div',
              { style: { fontFamily: 'Roboto' } },
              user.email
            )
          }),
          _react2.default.createElement(
            _ListItemSecondaryAction2.default,
            null,
            _react2.default.createElement(_Switch2.default, { checked: checked === true, onChange: function onChange(e, newVal) {
                return _onChange(userUid, newVal);
              } })
          )
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UsersToggle.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        path = _props.path,
        setSearch = _props.setSearch;


    setSearch('users_toggle', '');
    watchList(path);
  };

  UsersToggle.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        intl = _props2.intl,
        list = _props2.list;


    var filterFields = [{
      name: 'displayName',
      label: intl.formatMessage({ id: 'name_label' })
    }, {
      name: 'value',
      label: intl.formatMessage({ id: 'value_label' })
    }];

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _List2.default,
        {
          style: { height: '100%' },
          ref: function ref(field) {
            _this2.list = field;
          }
        },
        _react2.default.createElement(_reactList2.default, {
          itemRenderer: function itemRenderer(i, k) {
            return _this2.renderGrantItem(list, i, k);
          },
          length: list ? list.length : 0,
          type: 'simple'
        })
      ),
      _react2.default.createElement(_materialUiFilter.FilterDrawer, { name: 'users_toggle', fields: filterFields, formatMessage: intl.formatMessage })
    );
  };

  return UsersToggle;
}(_react.Component);

UsersToggle.propTypes = process.env.NODE_ENV !== "production" ? {

  theme: _propTypes2.default.object.isRequired,
  match: _propTypes2.default.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      lists = state.lists,
      filters = state.filters;
  var getValue = ownProps.getValue,
      onChange = ownProps.onChange;


  var path = 'users';
  var list = _materialUiFilter.filterSelectors.getFilteredList('users_toggle', filters, lists[path], function (fieldValue) {
    return fieldValue.val;
  });

  return {
    path: path,
    getValue: getValue ? getValue : function () {
      return false;
    },
    onChange: onChange ? onChange : function () {},
    list: list,
    filters: filters,
    auth: auth,
    intl: intl,
    user_grants: lists.user_grants
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, _extends({ setSimpleValue: _actions.setSimpleValue }, _materialUiFilter.filterActions))((0, _reactIntl.injectIntl)((0, _reactRouterDom.withRouter)((0, _firekitProvider.withFirebase)((0, _styles.withTheme)(UsersToggle)))));
module.exports = exports['default'];