'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clean = function clean(o) {
  Object.keys(o).forEach(function (key) {
    return o[key] === undefined && delete o[key];
  });
  return o;
};

var getCreateValues = function getCreateValues(values, props) {
  var handleCreateValues = props.handleCreateValues;


  if (handleCreateValues !== undefined && handleCreateValues instanceof Function) {
    return handleCreateValues(values);
  }

  return values;
};

var getUpdateValues = function getUpdateValues(values, props) {
  var handleUpdateValues = props.handleUpdateValues;


  if (handleUpdateValues !== undefined && handleUpdateValues instanceof Function) {
    return handleUpdateValues(values);
  }

  return values;
};

var FireForm = function (_Component) {
  _inherits(FireForm, _Component);

  function FireForm() {
    var _temp, _this, _ret;

    _classCallCheck(this, FireForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { initialized: false }, _this.handleSubmit = function (values) {
      var _this$props = _this.props,
          path = _this$props.path,
          uid = _this$props.uid,
          firebaseApp = _this$props.firebaseApp,
          useFirestore = _this$props.useFirestore;


      if (uid) {
        var updateValues = getUpdateValues(clean(values), _this.props);
        if (updateValues) {
          if (useFirestore) {
            firebaseApp.firestore().collection(path).doc(uid).update(updateValues);
          } else {
            firebaseApp.database().ref().child('' + path + uid).update(updateValues);
          }
        }
      } else {
        var createValues = getCreateValues(clean(values), _this.props);

        if (createValues) {
          if (useFirestore) {
            firebaseApp.firestore().collection(path).doc().set(createValues);
          } else {
            firebaseApp.database().ref().child('' + path).push(createValues);
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FireForm.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        path = _props.path,
        uid = _props.uid,
        name = _props.name,
        firebaseApp = _props.firebaseApp,
        initialize = _props.initialize,
        useFirestore = _props.useFirestore;


    if (uid) {
      if (useFirestore) {
        this.unsub = firebaseApp.firestore().collection(path).doc(uid).onSnapshot(function (doc) {
          if (doc.exists) {
            _this2.setState({ initialized: true }, function () {
              initialize(name, doc.data(), true);
            });
          }
        }, function (err) {
          console.log('Encountered error: ' + err);
        });
      } else {
        firebaseApp.database().ref('' + path + uid).on('value', function (snapshot) {
          _this2.setState({ initialized: true }, function () {
            initialize(name, snapshot.val(), true);
          });
        });
      }
    } else {
      this.setState({ initialValues: {}, initialized: true });
    }
  };

  FireForm.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props2 = this.props,
        path = _props2.path,
        uid = _props2.uid,
        firebaseApp = _props2.firebaseApp;

    firebaseApp.database().ref('' + path + uid).off();

    if (this.unsub) {
      this.unsub();
    }
  };

  FireForm.prototype.render = function render() {
    return _react2.default.Children.only(_react2.default.cloneElement(this.props.children, _extends({
      onSubmit: this.handleSubmit
    }, this.state, this.props)));
  };

  return FireForm;
}(_react.Component);

FireForm.propTypes = process.env.NODE_ENV !== "production" ? {
  path: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  useFirestore: _propTypes2.default.any,
  firebaseApp: _propTypes2.default.any.isRequired,
  uid: _propTypes2.default.string,
  onDelete: _propTypes2.default.func,
  handleCreateValues: _propTypes2.default.func,
  handleUpdateValues: _propTypes2.default.func
} : {};

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { initialize: _reduxForm.initialize })(FireForm);
module.exports = exports['default'];