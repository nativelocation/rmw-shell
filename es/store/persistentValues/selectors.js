var getPersistentValue = function getPersistentValue(state, name, defValue) {
  var _ref = state.simpleValues ? state.simpleValues : {},
      _ref$name = _ref[name],
      persistentValue = _ref$name === undefined ? defValue : _ref$name;

  return persistentValue;
};

export default getPersistentValue;