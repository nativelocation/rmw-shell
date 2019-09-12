import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Activity from '../../containers/Activity';
import DeleteDialog from '../../containers/DeleteDialog';
import FireForm from '../../containers/FireForm/FireForm';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Scrollbar from '../../components/Scrollbar';
import Tooltip from '@material-ui/core/Tooltip';
import _isGranted from '../../utils/auth';
import { change, submit } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

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
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(handleClose) {
        var _this$props, history, match, firebaseApp, path, uid;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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

    return React.createElement(
      Activity,
      {
        title: intl.formatMessage({
          id: this.props.match.params.uid ? 'edit_' + name : 'create_' + name
        }),
        appBarContent: React.createElement(
          'div',
          { style: { display: 'flex' } },
          (uid !== undefined && isGranted('edit_' + name) || uid === undefined && isGranted('create_' + name)) && React.createElement(
            Tooltip,
            { title: intl.formatMessage({ id: 'save' }) },
            React.createElement(
              IconButton,
              {
                color: 'inherit',
                'aria-label': 'save',
                onClick: function onClick() {
                  submit(name);
                }
              },
              React.createElement(Save, null)
            )
          ),
          uid && isGranted('delete_' + name) && React.createElement(
            Tooltip,
            { title: intl.formatMessage({ id: 'delete' }) },
            React.createElement(
              IconButton,
              {
                color: 'inherit',
                'aria-label': 'delete',
                onClick: function onClick() {
                  setSimpleValue('delete_' + name, true);
                }
              },
              React.createElement(Delete, null)
            )
          )
        ),
        onBackClick: function onBackClick() {
          history.goBack();
        }
      },
      React.createElement(
        Scrollbar,
        { style: { height: 'calc(100vh - 112px)' } },
        React.createElement(
          'div',
          { style: { margin: 15, display: 'flex' } },
          React.createElement(
            FireForm,
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
      React.createElement(DeleteDialog, { name: name, handleDelete: handleDelete ? handleDelete : this._handleDelete })
    );
  };

  return EditDocumentActivity;
}(Component);

EditDocumentActivity.propTypes = process.env.NODE_ENV !== "production" ? {
  history: PropTypes.object,
  setSimpleValue: PropTypes.func.isRequired,

  submit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl;
  var customIsGranted = ownProps.isGranted;


  return {
    auth: auth,
    intl: intl,
    isGranted: function isGranted(grant) {
      return customIsGranted ? customIsGranted(state, grant) : _isGranted(state, grant);
    }
  };
};

export default compose(connect(mapStateToProps, { setSimpleValue: setSimpleValue, change: change, submit: submit }), injectIntl, withRouter, withFirebase, withTheme)(EditDocumentActivity);