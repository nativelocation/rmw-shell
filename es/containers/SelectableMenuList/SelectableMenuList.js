function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ArrowBack from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTheme, withStyles } from '@material-ui/core/styles';

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
          return React.createElement(
            'div',
            { key: i, inset: item.inset, style: item.style },
            item.subheader
          );
        } else if (item.divider !== undefined) {
          return React.createElement(Divider, { key: i, inset: item.inset, style: item.style });
        } else {
          return React.createElement(
            ListItem,
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
            item.leftIcon && React.createElement(
              ListItemIcon,
              null,
              item.leftIcon
            ),
            !useMinified && React.createElement(ListItemText, { primary: item.primaryText }),
            item.nestedItems && !useMinified && React.createElement(
              ListItemSecondaryAction,
              {
                onClick: function onClick() {
                  _this.handleNestedItemsClick(item);
                }
              },
              React.createElement(
                IconButton,
                { style: { marginRight: useMinified ? 150 : undefined } },
                React.createElement(KeyboardArrowRight, { color: 'action' })
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

    return React.createElement(
      List,
      { value: index, onChange: onIndexChange },
      this.state.items && this.state.previousItems && this.state.previousItems.length > 0 && React.createElement(
        'div',
        null,
        React.createElement(
          ListItem,
          {
            button: true,
            onClick: function onClick() {
              _this2.handleBackClick();
            }
          },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(ArrowBack, null)
          ),
          React.createElement(ListItemText, { primary: this.state.title })
        ),
        React.createElement(Divider, null)
      ),
      list.filter(function (item) {
        return item.visible !== false;
      }).map(function (item, i) {
        return _this2.getItem(item, i);
      })
    );
  };

  return SelectableMenuList;
}(Component);

SelectableMenuList.propTypes = process.env.NODE_ENV !== "production" ? {
  items: PropTypes.array.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired
} : {};

export default withTheme(withStyles(styles, { withTheme: true })(SelectableMenuList));