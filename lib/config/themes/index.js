'use strict';

exports.__esModule = true;
exports.themes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _styles = require('@material-ui/core/styles');

var _red = require('@material-ui/core/colors/red');

var _red2 = _interopRequireDefault(_red);

var _pink = require('@material-ui/core/colors/pink');

var _pink2 = _interopRequireDefault(_pink);

var _green = require('@material-ui/core/colors/green');

var _green2 = _interopRequireDefault(_green);

var _blue = require('@material-ui/core/colors/blue');

var _blue2 = _interopRequireDefault(_blue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themes = exports.themes = [{
  id: 'default',
  color: _blue2.default[500],
  source: {
    palette: {
      primary: _blue2.default
    }
  }
}, {
  id: 'red',
  color: _red2.default[500],
  source: {
    palette: {
      primary: _red2.default,
      secondary: _pink2.default,
      error: _red2.default
    }
  }
}, {
  id: 'green',
  color: _green2.default[500],
  source: {
    palette: {
      primary: _green2.default,
      secondary: _red2.default,
      error: _red2.default
    }
  }
}];

var getThemeSource = function getThemeSource(t, ts) {
  if (ts) {
    for (var i = 0; i < ts.length; i++) {
      if (ts[i]['id'] === t.source) {
        var source = ts[i]['source'];
        var palette = source != null ? source.palette : {};

        return (0, _styles.createMuiTheme)(_extends({}, source, {
          typography: {
            useNextVariants: true
          },
          palette: _extends({}, palette, { type: t.isNightModeOn ? 'dark' : 'light' })
        }));
      }
    }
  }

  return (0, _styles.createMuiTheme)({
    typography: {
      useNextVariants: true
    },
    palette: { type: t.isNightModeOn ? 'dark' : 'light' }
  }); // Default theme
};

exports.default = getThemeSource;