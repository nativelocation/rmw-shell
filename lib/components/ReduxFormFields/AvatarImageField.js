'use strict';

exports.__esModule = true;

var _Avatar = require('../../components/ReduxFormFields/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _PhotoCamera = require('@material-ui/icons/PhotoCamera');

var _PhotoCamera2 = _interopRequireDefault(_PhotoCamera);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _ImageCropDialog = require('../../containers/ImageCropDialog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AvatarImageField = function AvatarImageField(_ref) {
  var icon = _ref.icon,
      disabled = _ref.disabled,
      initialized = _ref.initialized,
      intl = _ref.intl,
      path = _ref.path,
      uid = _ref.uid,
      name = _ref.name,
      change = _ref.change,
      cropperProps = _ref.cropperProps;

  var _useState = (0, _react.useState)(undefined),
      selectedImage = _useState[0],
      setImage = _useState[1];

  var handlePhotoUploadSuccess = function handlePhotoUploadSuccess(snapshot) {
    snapshot.ref.getDownloadURL().then(function (downloadURL) {
      change(name, downloadURL);
      setImage(undefined);
    });
  };

  return _react2.default.createElement(
    'div',
    { style: { margin: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' } },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_reduxForm.Field, {
        name: name,
        style: { width: 120, height: 120, fontSize: 60 },
        component: _Avatar2.default,
        icon: icon ? icon : _react2.default.createElement(_PhotoCamera2.default, { fontSize: 'large' })
      })
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _IconButton2.default,
        {
          style: { width: '100%' },
          onClick: function onClick() {
            setImage('true');
          },
          disabled: disabled === true ? true : uid === undefined || !initialized,
          color: 'primary'
        },
        _react2.default.createElement(_PhotoCamera2.default, null)
      )
    ),
    _react2.default.createElement(_ImageCropDialog.ImageCropDialog, {
      path: path + '/' + uid,
      fileName: name,
      onUploadSuccess: function onUploadSuccess(s) {
        handlePhotoUploadSuccess(s);
      },
      open: selectedImage !== undefined,
      src: selectedImage,
      handleClose: function handleClose() {
        setImage(undefined);
      },
      title: intl.formatMessage({ id: 'change_photo' }),
      cropperProps: cropperProps
    })
  );
};

AvatarImageField.propTypes = process.env.NODE_ENV !== "production" ? {
  uid: _propTypes2.default.string.isRequired,
  altIconName: _propTypes2.default.string,
  path: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired
} : {};

exports.default = AvatarImageField;
module.exports = exports['default'];