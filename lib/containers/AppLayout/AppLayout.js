'use strict';

exports.__esModule = true;
exports.AppLayout = undefined;

require('react-toastify/dist/ReactToastify.css');

var _Drawer = require('../../containers/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Routes = require('../../containers/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

var _reactToastify = require('react-toastify');

var _messaging = require('../../utils/messaging');

var _styles = require('@material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)({
  body: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  }
});

var AppLayout = exports.AppLayout = function AppLayout() {
  (0, _react.useEffect)(function () {
    (0, _messaging.checkForUpdate)();
  });

  var classes = useStyles();

  return _react2.default.createElement(
    'div',
    { className: classes.body },
    _react2.default.createElement(
      'div',
      { className: classes.root },
      _react2.default.createElement(_Drawer2.default, null),
      _react2.default.createElement(_Routes2.default, null),
      _react2.default.createElement(_reactToastify.ToastContainer, null)
    )
  );
};

exports.default = AppLayout;