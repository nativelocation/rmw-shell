var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import 'firebase/storage';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Dropzone from 'react-dropzone';
import IconButton from '@material-ui/core/IconButton';
import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import { Cropper } from 'react-image-cropper';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { withFirebase } from 'firekit-provider';
import { withTheme } from '@material-ui/core/styles';

var Transition = function Transition(props) {
  return React.createElement(Slide, _extends({ direction: 'up' }, props));
};

export var ImageCropDialog = function (_Component) {
  _inherits(ImageCropDialog, _Component);

  function ImageCropDialog(props) {
    _classCallCheck(this, ImageCropDialog);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handlePhotoURLUpload = function (photo_url) {
      var _this$props = _this.props,
          path = _this$props.path,
          fileName = _this$props.fileName,
          onUploadSuccess = _this$props.onUploadSuccess,
          firebaseApp = _this$props.firebaseApp;


      _this.setState({ isUploading: true, uploadProgress: 0 });

      var uploadTask = firebaseApp.storage().ref(path + '/' + fileName).putString(photo_url, 'data_url');

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        _this.setState({ isUploading: true, uploadProgress: progress });
      }, function (error) {
        console.log(error);
      }, function () {
        _this.setState({ isUploading: false, uploadProgress: 100, src: undefined }, function () {
          onUploadSuccess(uploadTask.snapshot);
        });
      });
    };

    _this.handlePhotoULRChange = function (files) {
      var reader = new FileReader();
      reader.onload = function () {
        _this.setState({ src: reader.result, file: files[0] });
      };
      reader.readAsDataURL(files[0]);
    };

    _this.handleClose = function () {
      var handleClose = _this.props.handleClose;

      _this.setState({ src: undefined });
      handleClose();
    };

    _this.cropper = null;
    _this.state = {
      src: undefined,
      isUploading: false,
      uploadProgress: 0
    };
    return _this;
  }

  ImageCropDialog.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        open = _props.open,
        title = _props.title,
        theme = _props.theme,
        cropperProps = _props.cropperProps;
    var _state = this.state,
        src = _state.src,
        uploadProgress = _state.uploadProgress,
        isUploading = _state.isUploading;


    return React.createElement(
      Dialog,
      {
        fullScreen: true,
        TransitionComponent: Transition,
        open: open,
        onClose: this.handleClose,
        'aria-labelledby': 'responsive-dialog-title'
      },
      React.createElement(
        AppBar,
        { style: { position: 'relative' } },
        React.createElement(
          Toolbar,
          null,
          React.createElement(
            IconButton,
            { edge: 'start', color: 'inherit', onClick: this.handleClose, 'aria-label': 'close' },
            React.createElement(CloseIcon, null)
          ),
          React.createElement(
            Typography,
            { style: { marginLeft: theme.spacing(2), flex: 1 }, variant: 'h6' },
            title
          ),
          React.createElement(
            Button,
            {
              color: 'inherit',
              disabled: !src || isUploading,
              onClick: function onClick() {
                _this2.handlePhotoURLUpload(_this2.cropper.crop());
              }
            },
            intl.formatMessage({ id: 'save' })
          )
        )
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } },
        !src && !isUploading && React.createElement(
          Dropzone,
          { onDrop: this.handlePhotoULRChange },
          function (_ref) {
            var getRootProps = _ref.getRootProps,
                getInputProps = _ref.getInputProps;

            return React.createElement(
              'div',
              _extends({}, getRootProps(), {
                style: src ? undefined : {
                  height: '50vh',
                  width: '50vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderStyle: 'dashed',
                  borderColor: theme.palette.secondary.main
                }
              }),
              React.createElement('input', getInputProps()),
              React.createElement(
                Typography,
                null,
                src ? file.name : intl.formatMessage({ id: 'drop_or_select_file_label' })
              )
            );
          }
        ),
        isUploading && React.createElement(
          'div',
          null,
          React.createElement(CircularProgress, {
            variant: 'static',
            value: uploadProgress,
            style: { width: 200, height: 200 },
            size: 50,
            thickness: 20
          })
        ),
        src && !isUploading && React.createElement(
          'div',
          { style: { maxWidth: '80vw', maxHeight: '80vh' } },
          React.createElement(Cropper, _extends({
            ref: function ref(field) {
              _this2.cropper = field;
            },
            src: this.state ? src : undefined,
            aspectRatio: 9 / 9
          }, cropperProps))
        )
      )
    );
  };

  return ImageCropDialog;
}(Component);

export default compose(withFirebase, withTheme, injectIntl)(ImageCropDialog);