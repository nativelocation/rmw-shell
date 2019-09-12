'use strict';

exports.__esModule = true;
exports.ImageCropDialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('firebase/storage');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slide = require('@material-ui/core/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _app = require('firebase/app');

var _app2 = _interopRequireDefault(_app);

var _reactImageCropper = require('react-image-cropper');

var _redux = require('redux');

var _reactIntl = require('react-intl');

var _firekitProvider = require('firekit-provider');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transition = function Transition(props) {
  return _react2.default.createElement(_Slide2.default, _extends({ direction: 'up' }, props));
};

var ImageCropDialog = exports.ImageCropDialog = function (_Component) {
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

      uploadTask.on(_app2.default.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
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


    return _react2.default.createElement(
      _Dialog2.default,
      {
        fullScreen: true,
        TransitionComponent: Transition,
        open: open,
        onClose: this.handleClose,
        'aria-labelledby': 'responsive-dialog-title'
      },
      _react2.default.createElement(
        _AppBar2.default,
        { style: { position: 'relative' } },
        _react2.default.createElement(
          _Toolbar2.default,
          null,
          _react2.default.createElement(
            _IconButton2.default,
            { edge: 'start', color: 'inherit', onClick: this.handleClose, 'aria-label': 'close' },
            _react2.default.createElement(_Close2.default, null)
          ),
          _react2.default.createElement(
            _Typography2.default,
            { style: { marginLeft: theme.spacing(2), flex: 1 }, variant: 'h6' },
            title
          ),
          _react2.default.createElement(
            _Button2.default,
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
      _react2.default.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } },
        !src && !isUploading && _react2.default.createElement(
          _reactDropzone2.default,
          { onDrop: this.handlePhotoULRChange },
          function (_ref) {
            var getRootProps = _ref.getRootProps,
                getInputProps = _ref.getInputProps;

            return _react2.default.createElement(
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
              _react2.default.createElement('input', getInputProps()),
              _react2.default.createElement(
                _Typography2.default,
                null,
                src ? file.name : intl.formatMessage({ id: 'drop_or_select_file_label' })
              )
            );
          }
        ),
        isUploading && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_CircularProgress2.default, {
            variant: 'static',
            value: uploadProgress,
            style: { width: 200, height: 200 },
            size: 50,
            thickness: 20
          })
        ),
        src && !isUploading && _react2.default.createElement(
          'div',
          { style: { maxWidth: '80vw', maxHeight: '80vh' } },
          _react2.default.createElement(_reactImageCropper.Cropper, _extends({
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
}(_react.Component);

exports.default = (0, _redux.compose)(_firekitProvider.withFirebase, _styles.withTheme, _reactIntl.injectIntl)(ImageCropDialog);