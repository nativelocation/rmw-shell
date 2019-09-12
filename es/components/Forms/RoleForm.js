import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextField from '../../components/ReduxFormFields/TextField';

var RoleForm = function RoleForm(_ref) {
  var handleSubmit = _ref.handleSubmit,
      intl = _ref.intl,
      initialized = _ref.initialized;

  return React.createElement(
    'form',
    {
      onSubmit: handleSubmit,
      style: {
        height: '100%',
        alignItems: 'stretch',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    },
    React.createElement('button', { type: 'submit', style: { display: 'none' } }),
    React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        null,
        React.createElement(Field, {
          name: 'name',
          disabled: !initialized,
          component: TextField,
          hintText: intl.formatMessage({ id: 'name_hint' }),
          floatingLabelText: intl.formatMessage({ id: 'name_label' })
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(Field, {
          name: 'description',
          component: TextField,
          disabled: !initialized,
          hintText: intl.formatMessage({ id: 'description_hint' }),
          floatingLabelText: intl.formatMessage({ id: 'description_label' }),
          multiLine: true,
          rows: 2
        })
      )
    )
  );
};

RoleForm.propTypes = process.env.NODE_ENV !== "production" ? {
  handleSubmit: PropTypes.func.isRequired,
  renderGrantItem: PropTypes.func.isRequired,

  initialized: PropTypes.bool.isRequired,
  uid: PropTypes.string
} : {};

export default reduxForm({ form: 'role' })(RoleForm);