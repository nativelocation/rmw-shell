'use strict';

exports.__esModule = true;
exports.getLocaleMessages = getLocaleMessages;

require('intl-pluralrules');

var _en = require('./en');

var _en2 = _interopRequireDefault(_en);

var _de = require('./de');

var _de2 = _interopRequireDefault(_de);

require('@formatjs/intl-relativetimeformat/polyfill');

require('@formatjs/intl-relativetimeformat/dist/locale-data/de');

require('@formatjs/intl-relativetimeformat/dist/locale-data/en');

var _intlLocalesSupported = require('intl-locales-supported');

var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// START: Intl polyfill
// Required for working on Safari
// Code from here: https://formatjs.io/guides/runtime-environments/
var localesMyAppSupports = [
  /* list locales here */
];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!(0, _intlLocalesSupported2.default)(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    var IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}
// END: Intl polyfill

var locales = [{
  locale: 'en',
  messages: _en2.default
}, {
  locale: 'de',
  messages: _de2.default
}];

function getLocaleMessages(l, ls) {
  if (ls) {
    for (var i = 0; i < ls.length; i++) {
      if (ls[i]['locale'] === l) {
        return ls[i]['messages'];
      }
    }
  }

  return _en2.default; // Default locale
}

exports.default = locales;