'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Activity = require('../../containers/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _DeleteDialog = require('../../containers/DeleteDialog');

var _DeleteDialog2 = _interopRequireDefault(_DeleteDialog);

var _FireForm = require('../../containers/FireForm/FireForm');

var _FireForm2 = _interopRequireDefault(_FireForm);

var _Save = require('@material-ui/icons/Save');

var _Save2 = _interopRequireDefault(_Save);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scrollbar = require('../../components/Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _auth = require('../../utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _reduxForm = require('redux-form');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

var _firekitProvider = require('firekit-provider');

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditDocumentActivity = function (_Component) {
  _inherits(EditDocumentActivity, _Component);

  function EditDocumentActivity() {
    var _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, EditDocumentActivity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._handleDelete = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(handleClose) {
        var _this$props, history, match, firebaseApp, path, uid;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, history = _this$props.history, match = _this$props.match, firebaseApp = _this$props.firebaseApp, path = _this$props.path;
                uid = match.params.uid;

                if (!uid) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return firebaseApp.firestore().doc('/' + path + '/' + uid).delete();

              case 5:
                handleClose();
                history.goBack();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), _this.hanldeSubmitSuccess = function () {
      var _this$props2 = _this.props,
          history = _this$props2.history,
          path = _this$props2.path;

      history.push('/' + path);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  EditDocumentActivity.prototype.render = function render() {
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
      {
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
      },
      _react2.default.createElement(
        _Scrollbar2.default,
        { style: { height: 'calc(100vh - 112px)' } },
        _react2.default.createElement(
          'div',
          { style: { margin: 15, display: 'flex' } },
          _react2.default.createElement(
            _FireForm2.default,
            _extends({
              useFirestore: true,
              firebaseApp: firebaseApp,
              name: name,
              path: path,
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

  return EditDocumentActivity;
}(_react.Component);

EditDocumentActivity.propTypes = process.env.NODE_ENV !== "production" ? {
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

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions.setSimpleValue, change: _reduxForm.change, submit: _reduxForm.submit }), _reactIntl.injectIntl, _reactRouterDom.withRouter, _firekitProvider.withFirebase, _styles.withTheme)(EditDocumentActivity);
module.exports = exports['default'];