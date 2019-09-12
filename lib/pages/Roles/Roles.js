'use strict';

exports.__esModule = true;
exports.Roles = undefined;

var _AccountBox = require('@material-ui/icons/AccountBox');

var _AccountBox2 = _interopRequireDefault(_AccountBox);

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Add = require('@material-ui/icons/Add');

var _Add2 = _interopRequireDefault(_Add);

var _AltIconAvatar = require('../../components/AltIconAvatar');

var _AltIconAvatar2 = _interopRequireDefault(_AltIconAvatar);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Scrollbar = require('../../components/Scrollbar/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _core = require('@material-ui/core');

var _reactRedux = require('react-redux');

var _firekit = require('firekit');

var _reactIntl = require('react-intl');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = 'roles';

var Roles = exports.Roles = function (_Component) {
  _inherits(Roles, _Component);

  function Roles() {
    var _temp, _this, _ret;

    _classCallCheck(this, Roles);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleCreateClick = function () {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          history = _this$props.history;


      var newRole = firebaseApp.database().ref('/' + path).push();

      newRole.update({ name: 'New Role' }).then(function () {
        history.push('/' + path + '/edit/' + newRole.key + '/main');
      });
    }, _this.renderItem = function (i) {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          history = _this$props2.history;


      var key = list[i].key;
      var val = list[i].val;

      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          _ListItem2.default,
          {
            key: i,
            onClick: function onClick() {
              history.push('/' + path + '/edit/' + key + '/main');
            },
            id: i
          },
          _react2.default.createElement(_AltIconAvatar2.default, { icon: _react2.default.createElement(_AccountBox2.default, null) }),
          _react2.default.createElement(_ListItemText2.default, { primary: val.name, secondary: val.description })
        ),
        _react2.default.createElement(_Divider2.default, { variant: 'inset' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Roles.prototype.componentDidMount = function componentDidMount() {
    var watchList = this.props.watchList;


    watchList(path);
  };

  Roles.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        list = _props.list,
        isLoading = _props.isLoading;


    return _react2.default.createElement(
      _Activity2.default,
      { isLoading: isLoading, title: intl.formatMessage({ id: 'roles' }) },
      _react2.default.createElement(
        'div',
        { style: { height: '100%' } },
        _react2.default.createElement(
          _Scrollbar2.default,
          null,
          _react2.default.createElement(
            _List2.default,
            {
              ref: function ref(field) {
                _this2.list = field;
              }
            },
            _react2.default.createElement(_reactList2.default, { itemRenderer: this.renderItem, length: list.length, type: 'simple' })
          )
        ),
        _react2.default.createElement('div', { style: { float: 'left', clear: 'both' } }),
        _react2.default.createElement(
          'div',
          { style: { position: 'fixed', right: 18, zIndex: 3, bottom: 18 } },
          _react2.default.createElement(
            _core.Fab,
            { color: 'secondary', onClick: this.handleCreateClick },
            _react2.default.createElement(_Add2.default, { className: 'material-icons' })
          )
        )
      )
    );
  };

  return Roles;
}(_react.Component);

Roles.propTypes = process.env.NODE_ENV !== "production" ? {} : {};

var mapStateToProps = function mapStateToProps(state) {
  return {
    list: (0, _firekit.getList)(state, path),
    isLoading: (0, _firekit.isLoading)(state, path)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)((0, _firekitProvider.withFirebase)((0, _reactRouterDom.withRouter)(Roles))));