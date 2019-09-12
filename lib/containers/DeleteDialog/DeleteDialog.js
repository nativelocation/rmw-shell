'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slide = require('@material-ui/core/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _withMobileDialog = require('@material-ui/core/withMobileDialog');

var _withMobileDialog2 = _interopRequireDefault(_withMobileDialog);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _actions = require('../../store/simpleValues/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Transition(props) {
  return _react2.default.createElement(_Slide2.default, _extends({ direction: 'up' }, props));
}

var DeleteDialog = function (_Component) {
  _inherits(DeleteDialog, _Component);

  function DeleteDialog() {
    var _temp, _this, _ret;

    _classCallCheck(this, DeleteDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClose = function () {
      var _this$props = _this.props,
          deleteKey = _this$props.deleteKey,
          setSimpleValue = _this$props.setSimpleValue;

      setSimpleValue(deleteKey, undefined);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DeleteDialog.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        isDialogOpen = _props.isDialogOpen,
        handleDelete = _props.handleDelete,
        name = _props.name,
        fullScreen = _props.fullScreen,
        deleteUid = _props.deleteUid;


    if (!isDialogOpen) {
      return null;
    }

    return _react2.default.createElement(
      _Dialog2.default,
      {
        fullScreen: fullScreen,
        open: isDialogOpen,
        onClose: this.handleClose,
        TransitionComponent: Transition,
        'aria-labelledby': 'alert-dialog-title',
        'aria-describedby': 'alert-dialog-description'
      },
      _react2.default.createElement(
        _DialogTitle2.default,
        { id: 'alert-dialog-title' },
        intl.formatMessage({ id: 'delete_' + name + '_title' })
      ),
      _react2.default.createElement(
        _DialogContent2.default,
        null,
        _react2.default.createElement(
          _DialogContentText2.default,
          { id: 'alert-dialog-description' },
          intl.formatMessage({ id: 'delete_' + name + '_message' })
        )
      ),
      _react2.default.createElement(
        _DialogActions2.default,
        null,
        _react2.default.createElement(
          _Button2.default,
          { onClick: this.handleClose, color: 'primary' },
          intl.formatMessage({ id: 'cancel' })
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            onClick: function onClick() {
              handleDelete(_this2.handleClose, deleteUid);
            },
            color: 'secondary'
          },
          intl.formatMessage({ id: 'delete' })
        )
      )
    );
  };

  return DeleteDialog;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var simpleValues = state.simpleValues;
  var name = ownProps.name;


  var deleteKey = 'delete_' + name;
  var isDialogOpen = simpleValues && simpleValues[deleteKey] ? true : false;
  var deleteUid = simpleValues ? simpleValues[deleteKey] : false;

  return {
    deleteUid: deleteUid,
    deleteKey: deleteKey,
    isDialogOpen: isDialogOpen
  };
};

DeleteDialog.propTypes = process.env.NODE_ENV !== "production" ? {
  name: _propTypes2.default.string.isRequired,
  handleDelete: _propTypes2.default.func.isRequired

} : {};

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, { setSimpleValue: _actions.setSimpleValue }), (0, _withMobileDialog2.default)(), _reactIntl.injectIntl)(DeleteDialog);
module.exports = exports['default'];