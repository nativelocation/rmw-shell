'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _TextField = require('../../components/ReduxFormFields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoleForm = function RoleForm(_ref) {
  var handleSubmit = _ref.handleSubmit,
      intl = _ref.intl,
      initialized = _ref.initialized;

  return _react2.default.createElement(
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
    _react2.default.createElement('button', { type: 'submit', style: { display: 'none' } }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reduxForm.Field, {
          name: 'name',
          disabled: !initialized,
          component: _TextField2.default,
          hintText: intl.formatMessage({ id: 'name_hint' }),
          floatingLabelText: intl.formatMessage({ id: 'name_label' })
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reduxForm.Field, {
          name: 'description',
          component: _TextField2.default,
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
  handleSubmit: _propTypes2.default.func.isRequired,
  renderGrantItem: _propTypes2.default.func.isRequired,

  initialized: _propTypes2.default.bool.isRequired,
  uid: _propTypes2.default.string
} : {};

exports.default = (0, _reduxForm.reduxForm)({ form: 'role' })(RoleForm);
module.exports = exports['default'];