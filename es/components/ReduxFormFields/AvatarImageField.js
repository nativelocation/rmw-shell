import Avatar from '../../components/ReduxFormFields/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Field } from 'redux-form';
import { ImageCropDialog } from '../../containers/ImageCropDialog';

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

  var _useState = useState(undefined),
      selectedImage = _useState[0],
      setImage = _useState[1];

  var handlePhotoUploadSuccess = function handlePhotoUploadSuccess(snapshot) {
    snapshot.ref.getDownloadURL().then(function (downloadURL) {
      change(name, downloadURL);
      setImage(undefined);
    });
  };

  return React.createElement(
    'div',
    { style: { margin: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' } },
    React.createElement(
      'div',
      null,
      React.createElement(Field, {
        name: name,
        style: { width: 120, height: 120, fontSize: 60 },
        component: Avatar,
        icon: icon ? icon : React.createElement(PhotoCamera, { fontSize: 'large' })
      })
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        IconButton,
        {
          style: { width: '100%' },
          onClick: function onClick() {
            setImage('true');
          },
          disabled: disabled === true ? true : uid === undefined || !initialized,
          color: 'primary'
        },
        React.createElement(PhotoCamera, null)
      )
    ),
    React.createElement(ImageCropDialog, {
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
  uid: PropTypes.string.isRequired,
  altIconName: PropTypes.string,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
} : {};

export default AvatarImageField;