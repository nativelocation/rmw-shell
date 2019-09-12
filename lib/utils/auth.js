'use strict';

exports.__esModule = true;
exports.default = isGranted;
exports.isAnyGranted = isAnyGranted;
exports.saveAuthorisation = saveAuthorisation;
exports.isAuthorised = isAuthorised;
function isGranted(state, grant) {
  var auth = state.auth,
      lists = state.lists,
      paths = state.paths;


  var userGrants = lists['user_grants/' + auth.uid];
  var isAdmin = paths['admins/' + auth.uid];

  if (auth.isAuthorised !== true) {
    return false;
  }

  if (isAdmin === true) {
    return true;
  }

  if (userGrants !== undefined) {
    for (var _iterator = userGrants, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var userGrant = _ref;

      if (userGrant.key === grant) {
        return userGrant.val === true;
      }
    }
  }

  return false;
}

function isAnyGranted(state, grants) {
  if (grants !== undefined) {
    for (var _iterator2 = grants, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var grant = _ref2;

      if (isGranted(state, grant) === true) {
        return true;
      }
    }
  }

  return false;
}

var localStorageAuthKey = 'rmw:isAuthorised';

function saveAuthorisation(user) {
  if (typeof Storage !== 'undefined') {
    try {
      localStorage.setItem(localStorageAuthKey, Boolean(user));
    } catch (ex) {
      console.log(ex);
    }
  } else {
    // No web storage Support.
  }
}

function isAuthorised() {
  if (typeof Storage !== 'undefined') {
    try {
      return localStorage.getItem(localStorageAuthKey);
    } catch (ex) {
      return false;
    }
  } else {
    // No web storage Support.
  }
}