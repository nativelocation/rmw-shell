var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

export var themes = [{
  id: 'default',
  color: blue[500],
  source: {
    palette: {
      primary: blue
    }
  }
}, {
  id: 'red',
  color: red[500],
  source: {
    palette: {
      primary: red,
      secondary: pink,
      error: red
    }
  }
}, {
  id: 'green',
  color: green[500],
  source: {
    palette: {
      primary: green,
      secondary: red,
      error: red
    }
  }
}];

var getThemeSource = function getThemeSource(t, ts) {
  if (ts) {
    for (var i = 0; i < ts.length; i++) {
      if (ts[i]['id'] === t.source) {
        var source = ts[i]['source'];
        var palette = source != null ? source.palette : {};

        return createMuiTheme(_extends({}, source, {
          typography: {
            useNextVariants: true
          },
          palette: _extends({}, palette, { type: t.isNightModeOn ? 'dark' : 'light' })
        }));
      }
    }
  }

  return createMuiTheme({
    typography: {
      useNextVariants: true
    },
    palette: { type: t.isNightModeOn ? 'dark' : 'light' }
  }); // Default theme
};

export default getThemeSource;