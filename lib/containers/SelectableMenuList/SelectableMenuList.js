'use strict';

exports.__esModule = true;

var _ArrowBack = require('@material-ui/icons/ArrowBack');

var _ArrowBack2 = _interopRequireDefault(_ArrowBack);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _KeyboardArrowRight = require('@material-ui/icons/KeyboardArrowRight');

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction');

var _ListItemSecondaryAction2 = _interopRequireDefault(_ListItemSecondaryAction);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    icon: {
      color: theme.palette.primary.contrastText
    }
  };
};

var SelectableMenuList = function (_Component) {
  _inherits(SelectableMenuList, _Component);

  function SelectableMenuList() {
    var _temp, _this, _ret;

    _classCallCheck(this, SelectableMenuList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {}, _this.handleNestedItemsClick = function (item) {
      if (item.nestedItems) {
        var previousItems = _this.state.previousItems ? _this.state.previousItems : [];
        var items = item.nestedItems;
        var title = item.primaryText;

        previousItems.unshift(_this.state.items ? _this.state.items : items);

        _this.setState({ items: items, previousItems: previousItems, title: title, index: item.value });
      } else {
        if (item.value || item.onClick) {
          _this.setState({ index: item.value });
        }
      }
    }, _this.handleBackClick = function () {
      var previousItems = _this.state.previousItems ? _this.state.previousItems : [];
      var items = previousItems[0] ? previousItems[0] : undefined;

      previousItems.shift();

      _this.setState({ items: items, previousItems: previousItems });
    }, _this.getNestedItems = function (hostItem, hostIndex) {
      if (hostItem.nestedItems !== undefined) {
        var items = hostItem.nestedItems.filter(function (item) {
          return item.visible !== false;
        });

        if (items.length > 0) {
          return items.map(function (item, i) {
            return _this.getItem(item, hostIndex.toString() + i.toString());
          });
        }
      }

      return null;
    }, _this.getItem = function (item, i) {
      var _this$props = _this.props,
          onIndexChange = _this$props.onIndexChange,
          useMinified = _this$props.useMinified;
      var index = _this.state.index;


      delete item.visible;

      if (item !== undefined) {
        if (item.subheader !== undefined) {
          return _react2.default.createElement(
            'div',
            { key: i, inset: item.inset, style: item.style },
            item.subheader
          );
        } else if (item.divider !== undefined) {
          return _react2.default.createElement(_Divider2.default, { key: i, inset: item.inset, style: item.style });
        } else {
          return _react2.default.createElement(
            _ListItem2.default,
            {
              button: true,
              selected: index && index === item.value,
              key: i,
              onClick: function onClick(e) {
                onIndexChange(e, item.value);
                _this.handleNestedItemsClick(item);

                if (item.onClick) {
                  item.onClick();
                }
              },
              onMouseDown: function onMouseDown(e) {
                if (e.button === 1) {
                  var win = window.open('' + item.value, '_blank');
                  win.focus();
                }
              }
            },
            item.leftIcon && _react2.default.createElement(
              _ListItemIcon2.default,
              null,
              item.leftIcon
            ),
            !useMinified && _react2.default.createElement(_ListItemText2.default, { primary: item.primaryText }),
            item.nestedItems && !useMinified && _react2.default.createElement(
              _ListItemSecondaryAction2.default,
              {
                onClick: function onClick() {
                  _this.handleNestedItemsClick(item);
                }
              },
              _react2.default.createElement(
                _IconButton2.default,
                { style: { marginRight: useMinified ? 150 : undefined } },
                _react2.default.createElement(_KeyboardArrowRight2.default, { color: 'action' })
              )
            )
          );
        }
      }

      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SelectableMenuList.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        items = _props.items,
        onIndexChange = _props.onIndexChange,
        index = _props.index;


    var list = this.state.previousItems && this.state.previousItems.length > 0 ? this.state.items : items;

    return _react2.default.createElement(
      _List2.default,
      { value: index, onChange: onIndexChange },
      this.state.items && this.state.previousItems && this.state.previousItems.length > 0 && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _ListItem2.default,
          {
            button: true,
            onClick: function onClick() {
              _this2.handleBackClick();
            }
          },
          _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            _react2.default.createElement(_ArrowBack2.default, null)
          ),
          _react2.default.createElement(_ListItemText2.default, { primary: this.state.title })
        ),
        _react2.default.createElement(_Divider2.default, null)
      ),
      list.filter(function (item) {
        return item.visible !== false;
      }).map(function (item, i) {
        return _this2.getItem(item, i);
      })
    );
  };

  return SelectableMenuList;
}(_react.Component);

SelectableMenuList.propTypes = process.env.NODE_ENV !== "production" ? {
  items: _propTypes2.default.array.isRequired,
  onIndexChange: _propTypes2.default.func.isRequired,
  index: _propTypes2.default.string.isRequired
} : {};

exports.default = (0, _styles.withTheme)((0, _styles.withStyles)(styles, { withTheme: true })(SelectableMenuList));
module.exports = exports['default'];