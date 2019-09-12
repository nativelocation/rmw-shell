'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Activity = require('rmw-shell/lib/containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _DeleteDialog = require('rmw-shell/lib/containers/DeleteDialog');

var _DeleteDialog2 = _interopRequireDefault(_DeleteDialog);

var _FireForm = require('rmw-shell/lib/containers/FireForm/FireForm');

var _FireForm2 = _interopRequireDefault(_FireForm);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Save = require('@material-ui/icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _Scrollbar = require('rmw-shell/lib/components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _auth = require('rmw-shell/lib/utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _reduxForm = require('redux-form');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _actions = require('rmw-shell/lib/store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditActivity = function (_Component) {
  _inherits(EditActivity, _Component);

  function EditActivity() {
    var _temp, _this, _ret;

    _classCallCheck(this, EditActivity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._handleDelete = function (handleClose) {
      var _this$props = _this.props,
          history = _this$props.history,
          match = _this$props.match,
          firebaseApp = _this$props.firebaseApp,
          path = _this$props.path;

      var uid = match.params.uid;

      if (uid) {
        firebaseApp.database().ref().child('/' + path + '/' + uid).remove().then(function () {
          handleClose();
          history.goBack();
        });
      }
    }, _this.hanldeSubmitSuccess = function () {
      var _this$props2 = _this.props,
          history = _this$props2.history,
          path = _this$props2.path;

      history.push('/' + path);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  EditActivity.prototype.render = function render() {
    var _props = this.props,
        history = _props.history,
        setSimpleValue = _props.setSimpleValue,
        intl = _props.intl,
        submit = _props.submit,
        match = _props.match,
        isGranted = _props.isGranted,
        firebaseApp = _props.firebaseApp,
        children = _props.children,
        fireFormProps = _props.fireFormProps,
        handleDelete = _props.handleDelete,
        name = _props.name,
        path = _props.path;


    var uid = match.params.uid;

    return _react2.default.createElement(
      _Activity2.default,
      _extends({
        title: intl.formatMessage({
          id: this.props.match.params.uid ? 'edit_' + name : 'create_' + name
        }),
        appBarContent: _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          (uid !== undefined && isGranted('edit_' + name) || uid === undefined && isGranted('create_' + name)) && _react2.default.createElement(
            _Tooltip2.default,
            { title: intl.formatMessage({ id: 'save' }) },
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'inherit',
                'aria-label': 'save',
                onClick: function onClick() {
                  submit(name);
                }
              },
              _react2.default.createElement(_Save2.default, null)
            )
          ),
          uid && isGranted('delete_' + name) && _react2.default.createElement(
            _Tooltip2.default,
            { title: intl.formatMessage({ id: 'delete' }) },
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'inherit',
                'aria-label': 'delete',
                onClick: function onClick() {
                  setSimpleValue('delete_' + name, true);
                }
              },
              _react2.default.createElement(_Delete2.default, null)
            )
          )
        ),
        onBackClick: function onBackClick() {
          history.goBack();
        }
      }, this.props),
      _react2.default.createElement(
        _Scrollbar2.default,
        { style: { height: 'calc(100vh - 112px)' } },
        _react2.default.createElement(
          'div',
          { style: { margin: 15, display: 'flex' } },
          _react2.default.createElement(
            _FireForm2.default,
            _extends({
              firebaseApp: firebaseApp,
              name: name,
              path: '/' + path + '/',
              uid: match.params.uid,
              onSubmitSuccess: this.hanldeSubmitSuccess
            }, fireFormProps),
            children
          )
        )
      ),
      _react2.default.createElement(_DeleteDialog2.default, { name: name, handleDelete: handleDelete ? handleDelete : this._handleDelete })
    );
  };

  return EditActivity;
}(_react.Component);

EditActivity.propTypes = process.env.NODE_ENV !== "production" ? {
  history: _propTypes2.default.object,
  setSimpleValue: _propTypes2.default.func.isRequired,

  submit: _propTypes2.default.func.isRequired,
  theme: _propTypes2.default.object.isRequired,
  match: _propTypes2.default.object.isRequired,
  isGranted: _propTypes2.default.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl;
  var customIsGranted = ownProps.isGranted;


  return {
    auth: auth,
    intl: intl,
    isGranted: function isGranted(grant) {
      return customIsGranted ? customIsGranted(state, grant) : (0, _auth2.default)(state, grant);
    }
  };
};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions.setSimpleValue, change: _reduxForm.change, submit: _reduxForm.submit }), _reactIntl.injectIntl, _reactRouterDom.withRouter, _firekitProvider.withFirebase, _styles.withTheme)(EditActivity);
module.exports = exports['default'];