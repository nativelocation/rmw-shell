var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';

function Transition(props) {
  return React.createElement(Slide, _extends({ direction: 'up' }, props));
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

    return React.createElement(
      Dialog,
      {
        fullScreen: fullScreen,
        open: isDialogOpen,
        onClose: this.handleClose,
        TransitionComponent: Transition,
        'aria-labelledby': 'alert-dialog-title',
        'aria-describedby': 'alert-dialog-description'
      },
      React.createElement(
        DialogTitle,
        { id: 'alert-dialog-title' },
        intl.formatMessage({ id: 'delete_' + name + '_title' })
      ),
      React.createElement(
        DialogContent,
        null,
        React.createElement(
          DialogContentText,
          { id: 'alert-dialog-description' },
          intl.formatMessage({ id: 'delete_' + name + '_message' })
        )
      ),
      React.createElement(
        DialogActions,
        null,
        React.createElement(
          Button,
          { onClick: this.handleClose, color: 'primary' },
          intl.formatMessage({ id: 'cancel' })
        ),
        React.createElement(
          Button,
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
}(Component);

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
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired

} : {};

export default compose(connect(mapStateToProps, { setSimpleValue: setSimpleValue }), withMobileDialog(), injectIntl)(DeleteDialog);