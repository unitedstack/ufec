import { createBrowserHistory } from 'history';
import _Spin from 'antd/lib/spin';
import _Icon from 'antd/lib/icon';
import _Tabs from 'antd/lib/tabs';
import React from 'react';
import _Dropdown from 'antd/lib/dropdown';
import _Button from 'antd/lib/button';
import _Menu from 'antd/lib/menu';
import _Select from 'antd/lib/select';
import _Table from 'antd/lib/table';
import _Input from 'antd/lib/input';
import _AutoComplete from 'antd/lib/auto-complete';
import _Form from 'antd/lib/form';
import _Tooltip from 'antd/lib/tooltip';
import _InputNumber from 'antd/lib/input-number';
import _Radio2 from 'antd/lib/radio';
import _Slider from 'antd/lib/slider';
import _Switch from 'antd/lib/switch';
import _Alert from 'antd/lib/alert';
import _Checkbox from 'antd/lib/checkbox';
import _TreeSelect from 'antd/lib/tree-select';
import _DatePicker from 'antd/lib/date-picker';
import _Modal from 'antd/lib/modal';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import _Steps from 'antd/lib/steps';

/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 * history.getPathList() // return pathlist array
 */

var currentUfecApp = window.CURRENT_UFEC_APP || 'dashboard';

var getPathList = function getPathList() {
  return window.location.pathname.split('/').filter(function (m) {
    return !!m && m !== currentUfecApp;
  });
};

var HISTORY = createBrowserHistory({
  basename: '/' + currentUfecApp
});
// 注意！这里的pathList是将basename忽略的！！为了跟忽略basename的link和route统一
HISTORY.getPathList = getPathList;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var TabPane = _Tabs.TabPane;

var Detail = function (_React$Component) {
  inherits(Detail, _React$Component);

  function Detail(props) {
    classCallCheck(this, Detail);

    var _this = possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this, props));

    _this.state = {
      visible: false,
      loading: false,
      contents: {},
      defaultKey: _this.props.detail.tabs && _this.props.detail.tabs.find(function (tab) {
        return tab.default;
      }).key,
      currentKey: _this.props.detail.tabs && _this.props.detail.tabs.find(function (tab) {
        return tab.default;
      }).key
    };

    _this.open = function () {
      _this.setState({
        visible: true
      });
    };

    _this.close = function () {
      _this.setState({
        visible: false,
        currentKey: _this.state.defaultKey,
        contents: {}
      }, function () {
        HISTORY.push('/' + HISTORY.getPathList()[0]);
      });
    };

    return _this;
  }

  createClass(Detail, [{
    key: 'onChangTabs',
    value: function onChangTabs(key) {
      var _this2 = this;

      if (key === this.state.currentKey) {
        return;
      }
      this.setState({
        currentKey: key
      }, function () {
        _this2.props.onClickTabs && _this2.props.onClickTabs(null, key);
      });
    }
  }, {
    key: 'loading',
    value: function loading(bool, cb) {
      this.setState({
        loading: bool
      }, cb ? cb : function () {});
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var title = props.tabs && props.tabs.find(function (t) {
        return t.default;
      }).name;
      var tabs = props.detail.tabs;
      return React.createElement(
        'div',
        { className: 'garen-com-table-detail' + (state.visible ? ' visible' : '') },
        React.createElement(
          'div',
          { className: 'detail-wrapper' },
          React.createElement(
            'div',
            { className: 'header' },
            React.createElement(
              'div',
              { className: 'left' },
              React.createElement(
                'span',
                { onClick: this.close },
                React.createElement(_Icon, { type: 'left' }),
                title
              )
            ),
            React.createElement(
              'div',
              { className: 'center' },
              props.row ? props.row.id : ''
            )
          ),
          React.createElement(
            'div',
            { className: 'content' },
            tabs && tabs.length > 1 ? React.createElement(
              'div',
              { className: 'tabs' },
              React.createElement(
                _Tabs,
                { activeKey: state.currentKey, onTabClick: this.onChangTabs.bind(this), type: 'card' },
                tabs.map(function (tab) {
                  return React.createElement(TabPane, { tab: tab.name, key: tab.key });
                })
              )
            ) : null,
            props.tableLoading || state.loading ? React.createElement(
              'div',
              { className: 'loading-wrapper' },
              React.createElement(_Spin, { indicator: React.createElement(_Icon, { type: 'loading', style: { fontSize: 30 } }) })
            ) : Object.keys(state.contents).length > 0 && Object.keys(state.contents).map(function (key) {
              return state.contents[key] ? React.createElement(
                'div',
                { key: key,
                  className: 'detail-content',
                  style: { display: key === state.currentKey ? 'block' : 'none' } },
                state.contents[key]
              ) : null;
            })
          )
        )
      );
    }
  }]);
  return Detail;
}(React.Component);

var ButtonList = function (_React$Component) {
  inherits(ButtonList, _React$Component);

  function ButtonList(props) {
    classCallCheck(this, ButtonList);

    var _this = possibleConstructorReturn(this, (ButtonList.__proto__ || Object.getPrototypeOf(ButtonList)).call(this, props));

    _this.state = {
      btns: _this.formatData(_this.props.btns)
    };
    return _this;
  }

  createClass(ButtonList, [{
    key: 'formatData',
    value: function formatData(btns) {
      var formatedBtns = {};

      btns.forEach(function (btn) {
        if (btn.dropdown) {
          btn.dropdown.forEach(function (item) {
            if (!item.type) {
              formatedBtns[item.key] = item;
            }
          });
        } else {
          formatedBtns[btn.key] = btn;
        }
      });
      return formatedBtns;
    }
  }, {
    key: 'onClickDropdownList',
    value: function onClickDropdownList(_ref) {
      var item = _ref.item,
          key = _ref.key,
          keyPath = _ref.keyPath;

      this.props.onAction('btnList', 'click', {
        key: key
      });
    }
  }, {
    key: 'onClickBtnList',
    value: function onClickBtnList(key) {
      this.props.onAction('btnList', 'click', {
        key: key
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props,
          btns = props.btns,
          tableLoading = props.loading;

      return React.createElement(
        'div',
        { className: 'btn-list' },
        btns.map(function (btn) {
          if (btn.dropdown) {
            var menu = React.createElement(
              _Menu,
              { onClick: _this2.onClickDropdownList.bind(_this2) },
              btn.dropdown.map(function (drop, i) {
                return drop.type && drop.type === 'divider' ? React.createElement(_Menu.Divider, { key: i }) : React.createElement(
                  _Menu.Item,
                  { key: drop.key, disabled: tableLoading || drop.disabled },
                  drop.value
                );
              })
            );
            return React.createElement(
              _Dropdown,
              { key: btn.key, overlay: menu, trigger: ['click'], disabled: btn.disabled },
              React.createElement(
                _Button,
                { type: btn.type },
                React.createElement(_Icon, { type: 'more' }),
                btn.value,
                ' ',
                React.createElement(_Icon, { type: 'caret-down-right' })
              )
            );
          } else {
            return React.createElement(
              _Button,
              {
                onClick: _this2.onClickBtnList.bind(_this2, btn.key),
                key: btn.key,
                type: btn.type,
                icon: btn.icon ? btn.icon : null,
                loading: btn.key === 'refresh' ? tableLoading : false,
                disabled: tableLoading || btn.disabled },
              btn.value
            );
          }
        })
      );
    }
  }]);
  return ButtonList;
}(React.Component);

var OpSelect = function (_React$Component) {
  inherits(OpSelect, _React$Component);

  function OpSelect(props) {
    classCallCheck(this, OpSelect);

    var _this = possibleConstructorReturn(this, (OpSelect.__proto__ || Object.getPrototypeOf(OpSelect)).call(this, props));

    _this.state = {
      operation: _this.props.operation,
      value: _this.props.operation.value || _this.props.operation.data[0].value,
      disabled: _this.props.operation.disabled,
      data: _this.props.operation.data,
      tableLoading: _this.props.tableLoading
    };

    _this.onChangeSelect = function (key, value, option) {
      _this.setState({
        value: value
      }, function () {
        _this.props.onChangeSelect(key, value, option);
      });
    };

    return _this;
  }

  createClass(OpSelect, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var __ = props.__;
      var operation = state.operation;
      return React.createElement(
        _Select,
        {
          disabled: state.tableLoading || state.disabled,
          onChange: this.onChangeSelect.bind(this, operation.key),
          value: state.value,
          style: { width: operation.width || 100 } },
        state.data.map(function (d) {
          return React.createElement(
            _Select.Option,
            {
              key: d.value,
              value: d.value },
            operation.transpile ? __[d.name] : d.name,
            d.suffix
          );
        })
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var operation = nextProps.operation;
      return {
        value: operation.value || prevState.value,
        disabled: operation.disabled,
        data: operation.data,
        tableLoading: nextProps.tableLoading
      };
    }
  }]);
  return OpSelect;
}(React.Component);

var Operation = function (_React$Component) {
  inherits(Operation, _React$Component);

  function Operation(props) {
    classCallCheck(this, Operation);

    var _this = possibleConstructorReturn(this, (Operation.__proto__ || Object.getPrototypeOf(Operation)).call(this, props));

    _this.state = {
      operations: _this.props.operations
    };

    _this.onChangeSelect = function (key, value, option) {
      _this.props.onAction('operation', 'select', {
        key: key,
        value: value
      });
    };

    ['onChangeSelect'].forEach(function (func) {
      return _this[func] = _this[func].bind(_this);
    });
    return _this;
  }

  createClass(Operation, [{
    key: 'handleCheckboxChange',
    value: function handleCheckboxChange(operKey, key, e) {
      this.props.onAction('operation', 'checkbox', {
        key: operKey,
        value: key
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props,
          __ = props.__,
          state = this.state,
          tableLoading = props.loading,
          operations = state.operations;

      return React.createElement(
        'div',
        { className: 'operations-wrapper' },
        operations.map(function (operation, i) {
          if (operation.type === 'select') {
            // 下拉框类型
            return operation.data && operation.data.length > 0 ? React.createElement(OpSelect, {
              key: i,
              __: __,
              operation: operation,
              tableLoading: tableLoading,
              onChangeSelect: _this2.onChangeSelect
            }) : null;
          } else if (operation.type === 'checkbox') {
            // 类 checkbox 类型
            return operation.data && operation.data.length > 0 ? React.createElement(
              'div',
              { className: 'main-operation-checkbox-wrapper',
                key: operation.key },
              React.createElement(
                'ul',
                null,
                operation.data.map(function (item) {
                  return React.createElement(
                    'li',
                    { key: item.value,
                      className: item.checked ? 'checked' : '',
                      onClick: _this2.handleCheckboxChange.bind(_this2, operation.key, item.value) },
                    React.createElement(
                      'span',
                      { className: 'checkbox-content' },
                      __[item.name]
                    ),

                    // 额外的补充内容
                    item.suffix
                  );
                })
              )
            ) : null;
          } else {
            return null;
          }
        })
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        operations: nextProps.operations
      };
    }
  }]);
  return Operation;
}(React.Component);

/**
 * @func: convert obj value into specific language
 */
var converter = {
  getLangValue: function getLangValue(lang, obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      var strs = '';
      obj.forEach(function (str) {
        strs += lang[str];
      });

      return strs;
    } else {
      return obj;
    }
  },
  getSubItem: function getSubItem(lang, children) {
    var _this = this;

    children.forEach(function (child) {
      child.items.forEach(function (childItem) {
        childItem.title = _this.getLangValue(lang, childItem.title);
        if (childItem.children) {
          _this.getSubItem(lang, childItem.children);
        }
      });
    });
  },
  convertLang: function convertLang(lang, config) {
    var _this2 = this;

    if (config.info) {
      config.info.title = this.getLangValue(lang, config.info.title);
      config.info.content = this.getLangValue(lang, config.info.content);
    }
    if (config.tabs) {
      config.tabs.forEach(function (item) {
        item.name = _this2.getLangValue(lang, item.name);
      });
    }
    if (config.search && config.search.placeholder) {
      config.search.placeholder = this.getLangValue(lang, config.search.placeholder);
    }
    if (config.btns) {
      config.btns.forEach(function (btn) {
        if (btn.value) {
          btn.value = _this2.getLangValue(lang, btn.value);
          if (btn.dropdown) {
            btn.dropdown.forEach(function (item) {
              if (!item.type) {
                item.value = _this2.getLangValue(lang, item.value);
              }
            });
          }
        }
      });
    }
    if (config.table) {
      config.table.columns.forEach(function (col) {
        col.title = _this2.getLangValue(lang, col.title);
      });
    }
    if (config.table.detail) {
      config.table.detail.tabs && config.table.detail.tabs.forEach(function (tab) {
        tab.name = _this2.getLangValue(lang, tab.name);
      });
    }
  }
};

var TabPane$1 = _Tabs.TabPane;
var Search = _Input.Search;

var Modal = function (_React$Component) {
  inherits(Modal, _React$Component);

  function Modal(props) {
    classCallCheck(this, Modal);

    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.state = {
      config: _this.props.config,
      currentRow: {},
      rows: [],
      selectedRowKeys: [],
      pathList: HISTORY.getPathList()
    };
    _this.operationsRef = React.createRef();
    _this.btnListRef = React.createRef();
    _this.detailRef = React.createRef();


    _this.tableColRender(_this.props.config.table.columns);

    converter.convertLang(props.__, props.config);

    ['onAction', 'onClickCaptain', 'onClickDetailTabs', 'getCurrentKey'].forEach(function (func) {
      _this[func] = _this[func].bind(_this);
    });
    return _this;
  }

  createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _config = this.state.config;
      if (!_config.table.loading) {
        _config.table.loading = true;
        this.setState({
          config: _config
        }, function () {
          _this2.props.onInitialize();
        });
      } else {
        this.props.onInitialize();
      }
    }
  }, {
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      // 当组件unmount的时候，需要重置main的数据并且更新detail为关闭状态.
      this.clearState(true);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var nextPathList = HISTORY.getPathList();
      // 当同模块带detail跳转的时候，需要重新走onInitialize.
      if (!this.state.currentRow && prevState.pathList.length > 1 && nextPathList.length > 1 && prevState.pathList[0] === nextPathList[0] && prevState.pathList[1] !== nextPathList[1] // 以上条件判断两个url的id不同但是模块相同.
      && !this.props.config.table.loading) {
        this.props.onInitialize();
      }
      // 当第一次强刷带detail初始化的时候，需要触发onClickDetailTabs去更新默认tab的content;
      if (this.enableDetail(prevProps, prevState)) {
        this.onClickDetailTabs();
      }
      // 打开detail的操作。
      // 如果当前url带id && detail处于关闭状态 && currentRow有数据 就打开detail
      var detailRef = this.detailRef.current;
      if (HISTORY.getPathList().length > 1 && !detailRef.state.visible && this.hasCurrentRow()) {
        detailRef.open();
      }
    }
  }, {
    key: 'enableDetail',
    value: function enableDetail(prevProps, prevState) {
      return HISTORY.getPathList().length > 1 && (prevProps.config.table.data.length > 0 || !prevProps.config.table.loading) && this.hasCurrentRow();
    }
  }, {
    key: 'hasCurrentRow',
    value: function hasCurrentRow() {
      return this.state.currentRow && Object.keys(this.state.currentRow).length > 0;
    }
  }, {
    key: 'tableColRender',
    value: function tableColRender(columns) {
      var _this3 = this;

      columns.map(function (column) {
        switch (column.type) {
          case 'captain':
            column.render = function (text, row, index) {
              var formatData = column.formatter && column.formatter(text, row, index);
              if (!formatData) {
                var key = _this3.props.config.table.rowKey;
                formatData = text ? text : '(' + row[key].substr(0, 8) + ')';
              }
              return React.createElement(
                'a',
                { className: 'captain', onClick: _this3.onClickCaptain.bind(_this3, row) },
                formatData
              );
            };
            break;
          default:
            break;
        }
      });
    }
  }, {
    key: 'onAction',
    value: function onAction(field, actionType, data, refs) {
      if (!data) {
        data = {};
      }
      if (!data.rows) {
        data.rows = this.state.rows;
      }
      var func = this.props.onAction;
      func && func(field, actionType, data, refs);
    }
  }, {
    key: 'onClickCaptain',
    value: function onClickCaptain(row, e) {
      e.preventDefault();
      var pathList = HISTORY.getPathList();
      // 没有二级路由的时候添加二级路由
      if (pathList.length < 2 || row.id !== pathList[1]) {
        HISTORY.push('/' + pathList[0] + '/' + row.id);
      } else {
        // 有二级路由的时候关闭二级路由
        HISTORY.push('/' + pathList[0]);
      }
    }
  }, {
    key: 'onChangeTabs',
    value: function onChangeTabs(key) {
      if (key === HISTORY.getPathList()[0]) {
        return;
      }
      HISTORY.push('/' + key);
    }
  }, {
    key: 'onSearchTable',
    value: function onSearchTable(value) {
      this.onAction('search', 'click', {
        value: value
      });
    }
  }, {
    key: 'onClickDetailTabs',
    value: function onClickDetailTabs(rows) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getCurrentKey();

      if (!rows) {
        rows = [this.state.currentRow];
      }
      this.onAction('detail', 'click', {
        key: key,
        rows: rows
      }, this.detailRef.current);
    }
  }, {
    key: 'getCurrentKey',
    value: function getCurrentKey() {
      var detailRef = this.detailRef.current;
      return detailRef.state.currentKey;
    }
  }, {
    key: 'clearState',
    value: function clearState(closeDetail) {
      var _this4 = this;

      this.setState({
        rows: [],
        currentRow: {},
        selectedRowKeys: []
      }, function () {
        _this4.btnListRender(_this4.state.rows);
        if (closeDetail) {
          _this4.detailRef.setState({
            visible: false
          });
        }
      });
    }
  }, {
    key: 'btnListRender',
    value: function btnListRender(selectedRows) {
      if (!this.props.btnListRender) {
        return;
      }
      var refs = this.btnListRef.current;
      var btns = refs.state.btns;
      refs.setState({
        btns: this.props.btnListRender(selectedRows, btns)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _config = this.props.config,
          tabs = _config.tabs,
          btns = _config.btns,
          table = _config.table,
          columns = table.columns,
          data = table.data,
          detail = table.detail,
          search = _config.search,
          operations = _config.operations,
          pagination = _extends({}, table.pagination, {
        hideOnSinglePage: true,
        pageSize: table.limit,
        showQuickJumper: true,
        total: table.total,
        onChange: function onChange(page, pageSize) {
          _this5.onAction('pagination', 'click', {
            page: page,
            pageSize: pageSize
          });
        }
      });

      // 当前匹配的模块
      var selectedRowKeys = this.state.selectedRowKeys;
      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this5.setState({
            rows: selectedRows,
            selectedRowKeys: selectedRowKeys
          }, function () {
            _this5.btnListRender(selectedRows);
          });
        }
      };

      // 在数据加载完之后如果直接置为false的话，会出问题
      // 因为在antd的Table中，判断传入的loading是false的话，loadingProps会变成默认的
      // 自定义的loading icon会有一瞬间编程默认的loading icon
      var spinProps = {
        spinning: table.loading,
        indicator: React.createElement(_Icon, { type: 'loading', style: { fontSize: 30 } })
      };

      return React.createElement(
        'div',
        { className: 'garen-com-main' },
        React.createElement(
          'div',
          { className: 'margin-wrapper' },
          React.createElement(
            'div',
            { className: 'main-content' },
            tabs ? React.createElement(
              'div',
              { className: 'submenu-tabs' },
              React.createElement(
                _Tabs,
                { activeKey: tabs.find(function (tab) {
                    return tab.default;
                  }).key, onTabClick: this.onChangeTabs.bind(this), type: 'card' },
                tabs.map(function (tab) {
                  return React.createElement(TabPane$1, { tab: tab.name, key: tab.key });
                })
              )
            ) : null,
            btns && btns.length > 0 || search ? React.createElement(
              'div',
              { className: 'operation-list' },
              React.createElement(
                'div',
                { className: 'left' },
                React.createElement(ButtonList, {
                  loading: table.loading,
                  ref: this.btnListRef,
                  onAction: this.onAction,
                  btns: btns
                }),
                operations ? React.createElement(Operation, {
                  onAction: this.onAction,
                  ref: this.operationsRef,
                  loading: table.loading,
                  operations: operations,
                  __: this.props.__
                }) : null
              ),
              search ? React.createElement(
                'div',
                { className: 'search-wrapper' },
                React.createElement(Search, {
                  placeholder: search.placeholder || 'Search',
                  onSearch: this.onSearchTable.bind(this),
                  style: { width: 180 },
                  enterButton: true
                })
              ) : null
            ) : null,
            React.createElement(
              'div',
              { className: 'table-box' },
              table ? React.createElement(_Table, {
                loading: spinProps,
                locale: { emptyText: this.props.no_data },
                pagination: pagination,
                columns: columns,
                dataKey: table.dataKey,
                rowSelection: table.checkbox ? rowSelection : null,
                expandedRowRender: table.expandedRowRender,
                rowKey: table.rowKey,
                dataSource: data
              }) : null
            )
          )
        ),
        detail ? React.createElement(Detail, {
          ref: this.detailRef,
          tabs: tabs,
          detail: detail,
          tableLoading: table.loading,
          row: this.state.currentRow,
          onClickTabs: this.onClickDetailTabs.bind(this) }) : null
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var path = HISTORY.getPathList();
      return {
        // decodeURIComponent解决url中文乱码
        currentRow: path.length > 1 ? nextProps.config.table.data.find(function (d) {
          return d.id.toString() === decodeURIComponent(path[1]);
        }) : {},
        pathList: HISTORY.getPathList()
      };
    }
  }]);
  return Modal;
}(React.Component);

var FormItem = _Form.Item;

var TextArea = _Input.TextArea,
    Search$1 = _Input.Search;

var Option = _Select.Option;

var InputGroup = _Input.Group;

var InputModal = function (_React$Component) {
  inherits(InputModal, _React$Component);

  function InputModal(props) {
    classCallCheck(this, InputModal);

    var _this = possibleConstructorReturn(this, (InputModal.__proto__ || Object.getPrototypeOf(InputModal)).call(this, props));

    _this.togglePasswordVisiable = function () {
      _this.setState({
        passwordType: _this.state.passwordType === 'password' ? 'text' : 'password'
      });
    };

    _this.state = {
      hide: props.hide,
      disabled: props.disabled,
      inputType: props.inputType || 'text',
      groupInput: props.defaultValue || props.data && props.data[0],
      placeholder: props.placeholder && (props.__[props.placeholder] || props.placeholder),
      passwordType: 'password'
    };
    return _this;
  }

  createClass(InputModal, [{
    key: 'initialize',


    //input: this.inputRef.input.value
    //search: this.inputRef.input.input.value
    //search.enterButton: 可选值(true, false(默认), 任意字符串(比如Search))
    //size: 指高度

    value: function initialize(props) {
      var state = this.state;
      var styleWidth = { width: props.width },
          __ = props.__,
          addonAfter = props.addonAfter && __[props.addonAfter] ? __[props.addonAfter] : props.addonAfter;

      switch (props.type) {
        case 'input':
          return React.createElement(_Input, { style: styleWidth,
            addonAfter: addonAfter,
            placeholder: state.placeholder,
            disabled: this.state.disabled,
            type: props.inputType || 'text' });
        case 'textarea':
          return React.createElement(TextArea, { style: styleWidth,
            rows: props.rows || 4,
            placeholder: state.placeholder,
            disabled: this.state.disabled });
        case 'searchInput':
          return React.createElement(Search$1, {
            style: styleWidth,
            disabled: this.state.disabled,
            placeholder: state.placeholder,
            enterButton: props.enterButton || false });
        case 'groupInput':
          return React.createElement(
            InputGroup,
            null,
            React.createElement(
              _Select,
              {
                getPopupContainer: function getPopupContainer(trigger) {
                  return trigger.parentNode;
                } },
              props.data && props.data.map(function (dt, index) {
                return React.createElement(
                  Option,
                  { key: index, value: dt },
                  __[dt]
                );
              })
            ),
            React.createElement(_AutoComplete, {
              style: styleWidth,
              placeholder: state.placeholder
            })
          );
        case 'password':
          return React.createElement(
            'div',
            { className: 'password-wrapper' },
            React.createElement(_Input, {
              style: styleWidth,
              placeholder: state.placeholder,
              disabled: this.state.disabled,
              type: this.state.passwordType }),
            React.createElement(
              'span',
              { className: 'eye-wrapper' + (state.passwordType === 'password' ? '' : ' active') },
              React.createElement(_Icon, { onClick: this.togglePasswordVisiable, type: 'eye' })
            )
          );
        default:
          break;
      }
    }
  }, {
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          className = '';

      className += state.hide ? ' hide' : '';

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      return React.createElement(
        'div',
        { className: props.className },
        React.createElement(
          FormItem,
          _extends({
            label: props.label,
            required: props.required,
            className: className
          }, formItemLayout, {
            extra: props.extra }),
          decorator && getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue,
            onChange: decorator.onChange,
            hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
          })(this.initialize(props))
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        disabled: nextProps.disabled,
        hide: nextProps.hide,
        placeholder: nextProps.placeholder
      };
    }
  }]);
  return InputModal;
}(React.Component);

var FormItem$1 = _Form.Item;

var InputNumberModal = function (_React$Component) {
  inherits(InputNumberModal, _React$Component);

  function InputNumberModal(props) {
    classCallCheck(this, InputNumberModal);

    var _this = possibleConstructorReturn(this, (InputNumberModal.__proto__ || Object.getPrototypeOf(InputNumberModal)).call(this, props));

    _this.state = {
      min: props.min || 0,
      max: props.max,
      disabled: props.disabled || false,
      hide: props.hide
    };
    return _this;
  }

  createClass(InputNumberModal, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state,
          props = this.props;

      var className = 'input-number-wrapper';
      var addonAfter = props.addonAfter && props.__[props.addonAfter] ? props.__[props.addonAfter] : props.addonAfter;

      if (this.state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$1,
        _extends({
          label: props.label,
          className: className
        }, formItemLayout, {
          extra: props.extra }),
        React.createElement(
          _Tooltip,
          {
            title: props.__[props.tipTitle] || props.tipTitle,
            placement: 'topLeft' },
          decorator && getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue,
            onChange: decorator.onChange,
            hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
          })(React.createElement(_InputNumber, {
            min: state.min,
            max: state.max,
            step: props.step,
            disabled: state.disabled }))
        ),
        React.createElement(
          'span',
          { className: props.addonAfter ? 'input-number-addon' : 'hide' },
          addonAfter
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide,
        disabled: nextProps.disabled,
        max: nextProps.max
      };
    }
  }]);
  return InputNumberModal;
}(React.Component);

var RadioGroup = _Radio2.Group;
var RadioButton = _Radio2.Button;
var FormItem$2 = _Form.Item;

var RadioModal = function (_React$Component) {
  inherits(RadioModal, _React$Component);

  function RadioModal(props) {
    classCallCheck(this, RadioModal);

    var _this = possibleConstructorReturn(this, (RadioModal.__proto__ || Object.getPrototypeOf(RadioModal)).call(this, props));

    _this.state = {
      disabled: props.disabled || false,
      data: props.data,
      hide: props.hide
    };
    return _this;
  }

  createClass(RadioModal, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state,
          props = this.props,
          className = 'radio-row';

      if (this.state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };

      var _Radio = props.button ? RadioButton : _Radio2;
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$2,
        _extends({
          label: props.label
        }, formItemLayout, {
          className: className,
          extra: props.extra }),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(
          RadioGroup,
          { disabled: state.disabled },
          state.data && state.data.map(function (d, index) {
            return React.createElement(
              _Radio,
              { style: { width: props.itemWidth || 144 }, key: d.id, value: d.id },
              d.name || '(' + d.id.substring(0, 8) + ')'
            );
          })
        ))
      );
    }
  }]);
  return RadioModal;
}(React.Component);

var Option$1 = _Select.Option,
    OptGroup = _Select.OptGroup;


var FormItem$3 = _Form.Item;

var SelectModal = function (_React$Component) {
  inherits(SelectModal, _React$Component);

  function SelectModal(props) {
    classCallCheck(this, SelectModal);

    var _this = possibleConstructorReturn(this, (SelectModal.__proto__ || Object.getPrototypeOf(SelectModal)).call(this, props));

    _this.onLinkClick = function () {
      _this.setState({
        clicked: true
      }, function () {
        return _this.props.onAction(_this.props.field, _this.state);
      });
    };

    _this.state = {
      disabled: props.disabled || false,
      hide: props.hide || false,
      data: props.data,
      nameType: props.nameType || 'name'
    };
    return _this;
  }

  createClass(SelectModal, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'initialize',
    value: function initialize(props, state) {
      var __ = props.__,
          styleWidth = { width: props.width };

      if (props.empty_text) {
        if (props.empty_text.link_info) {
          return React.createElement(
            'span',
            { className: 'empty-text-label' },
            __[props.empty_text.info],
            React.createElement(
              'a',
              { onClick: this.onLinkClick },
              props.empty_text.link_info.map(function (m) {
                return __[m];
              }).join('')
            )
          );
        } else {
          return React.createElement(
            'span',
            { className: 'empty-text-label' },
            __[props.empty_text.info]
          );
        }
      } else if (state.data) {
        switch (props.type) {
          case 'select':
            return React.createElement(
              _Select,
              {
                placeholder: props.placeholder,
                notFoundContent: __.no_data,
                style: styleWidth,
                disabled: state.disabled,
                mode: props.multiple ? 'multiple' : '',
                multiple: props.multiple },
              state.data.map(function (d, index) {
                return React.createElement(
                  Option$1,
                  { key: d.id, value: d.id },
                  d[state.nameType] || '(' + d.id.substring(0, 8) + ')'
                );
              })
            );
          case 'optionGroup':
            return React.createElement(
              _Select,
              {
                placeholder: props.placeholder,
                style: styleWidth,
                disabled: state.disabled,
                getPopupContainer: function getPopupContainer(trigger) {
                  return trigger.parentNode;
                } },
              state.data.map(function (opt, index) {
                return React.createElement(
                  OptGroup,
                  { key: opt.id, label: opt.name },
                  opt.children && opt.children.map(function (child) {
                    return React.createElement(
                      Option$1,
                      { key: child.id, value: child.id },
                      child.name || '(' + child.id.substring(0, 8) + ')'
                    );
                  })
                );
              })
            );
          default:
            break;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state,
          props = this.props;

      var className = '';

      if (this.state.hide) {
        className += ' hide';
      }
      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$3,
        _extends({
          label: props.label,
          className: className
        }, formItemLayout, {
          extra: props.extra }),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(this.initialize(props, state))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        disabled: nextProps.disabled,
        hide: nextProps.hide,
        data: nextProps.data,
        nameType: nextProps.nameType || 'name'
      };
    }
  }]);
  return SelectModal;
}(React.Component);

SelectModal.defaultProps = {
  data: []
};

var FormItem$4 = _Form.Item;

var Slide = function (_React$Component) {
  inherits(Slide, _React$Component);

  function Slide(props) {
    classCallCheck(this, Slide);

    var _this = possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).call(this, props));

    _this.onChange = function (value) {
      _this.setState({
        value: value
      }, function () {
        _this.props.form.setFieldsValue(defineProperty({}, _this.props.field, _this.state.value));
      });
    };

    _this.onSliderChange = function (value) {
      _this.setState({
        value: value
      }, function () {
        _this.props.form.setFieldsValue(defineProperty({}, _this.props.field, _this.state.value));
      });
    };

    _this.state = {
      min: props.min,
      max: props.max,
      hide: props.hide,
      disabled: props.disabled,
      text: props.text,
      value: props.decorator.initialValue
    };
    return _this;
  }

  createClass(Slide, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          min = state.min,
          max = state.max,
          disabled = state.disabled;

      var className = 'slider-row';

      if (state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$4,
        _extends({
          label: props.label,
          className: className
        }, formItemLayout, {
          extra: props.extra }),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(
          'div',
          null,
          React.createElement(_Slider, {
            min: min,
            max: max,
            step: props.step,
            disabled: disabled,
            onChange: this.onSliderChange,
            value: state.value,
            style: { width: '258px' } }),
          React.createElement(_InputNumber, {
            min: min,
            max: max,
            value: state.value,
            style: { marginLeft: 10, width: 78 },
            onChange: this.onChange
          })
        )),
        React.createElement(
          'div',
          { className: 'range' },
          state.text ? state.text : min + '-' + max + props.unit
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        disabled: nextProps.disabled,
        hide: nextProps.hide
      };
    }
  }]);
  return Slide;
}(React.Component);

var FormItem$5 = _Form.Item;

var Switchs = function (_React$Component) {
  inherits(Switchs, _React$Component);

  function Switchs(props) {
    classCallCheck(this, Switchs);

    var _this = possibleConstructorReturn(this, (Switchs.__proto__ || Object.getPrototypeOf(Switchs)).call(this, props));

    _this.state = {
      checkedChildren: props.checkedChildren,
      unCheckedChildren: props.unCheckedChildren,
      disabled: props.disabled,
      loading: props.loading,
      size: props.size,
      hide: props.hide
    };
    return _this;
  }

  createClass(Switchs, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;
      var className = '';

      if (this.state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$5,
        _extends({
          label: props.label,
          className: className
        }, formItemLayout, {
          extra: props.extra }),
        decorator && getFieldDecorator(decorator.id, {
          valuePropName: 'checked',
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(_Switch, {
          size: state.size,
          disabled: state.disabled,
          loading: state.loading,
          checkedChildren: state.checkedChildren,
          unCheckedChildren: state.unCheckedChildren }))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        disabled: nextProps.disabled,
        hide: nextProps.hide
      };
    }
  }]);
  return Switchs;
}(React.Component);

var Tip = function (_React$Component) {
  inherits(Tip, _React$Component);

  function Tip(props) {
    classCallCheck(this, Tip);

    var _this = possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).call(this, props));

    _this.state = {
      hide: props.hide,
      message: props.message || '',
      description: props.description || ''
    };
    return _this;
  }

  createClass(Tip, [{
    key: 'render',
    value: function render() {
      var props = this.props,
          className = 'alert-row';

      className += this.state.hide ? ' hide' : '';

      var type = props.tip_type;

      var message = props.message;
      var msg = void 0;
      // 当message是数组的时候，返回多个div，用于换行
      if (Object.prototype.toString.call(message) === '[object Array]') {
        msg = [];
        message.forEach(function (m, i) {
          msg.push(React.createElement(
            'div',
            { key: i },
            m
          ));
        });
      } else {
        msg = props.__[props.message] || props.message;
      }

      return React.createElement(
        'div',
        { className: className },
        React.createElement(_Alert, { type: type,
          message: msg,
          description: props.__[props.description],
          showIcon: props.showIcon === undefined ? true : props.showIcon })
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide
      };
    }
  }]);
  return Tip;
}(React.Component);

/**
 * 带有可点击文本的 Alert 组件，目前仅支持在最后的文本添加点击功能
 * 参数基本同 Alert 组件，除了添加了一个 linkText prop
 * linkText: {string} 可点击内容的文本
 */
var Tip$1 = function (_React$Component) {
  inherits(Tip, _React$Component);

  function Tip(props) {
    classCallCheck(this, Tip);

    var _this = possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).call(this, props));

    _this.onClick = function () {
      _this.props.onAction && _this.props.onAction(_this.props.field);
    };

    _this.state = {
      hide: !!props.hide,
      message: props.message || '',
      description: props.description || ''
    };
    return _this;
  }

  createClass(Tip, [{
    key: 'render',
    value: function render() {
      var props = this.props,
          className = 'modal-row alert-row';

      className += this.state.hide ? ' hide' : '';

      var type = props.tip_type;

      return React.createElement(
        'div',
        { className: className },
        React.createElement(_Alert, { type: type,
          message: React.createElement(TipContent, { message: props.__[props.message] || props.message,
            linkText: props.__[props.linkText],
            onClick: this.onClick }),
          description: props.__[props.description],
          showIcon: true })
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide
      };
    }
  }]);
  return Tip;
}(React.Component);

var TipContent = function (_React$Component2) {
  inherits(TipContent, _React$Component2);

  function TipContent(props) {
    classCallCheck(this, TipContent);

    var _this2 = possibleConstructorReturn(this, (TipContent.__proto__ || Object.getPrototypeOf(TipContent)).call(this, props));

    _this2.onClick = function (e) {
      _this2.props.onClick && _this2.props.onClick(e);
    };

    return _this2;
  }

  createClass(TipContent, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var linkStyle = {
        fontSize: 12,
        color: '#01AFC9',
        lineheight: 14,
        cursor: 'pointer'
      };

      return React.createElement(
        'div',
        null,
        props.message,
        React.createElement(
          'span',
          { onClick: this.onClick, style: linkStyle },
          props.linkText
        )
      );
    }
  }]);
  return TipContent;
}(React.Component);

var FormItem$6 = _Form.Item;

var AutoCompleteModal = function (_React$Component) {
  inherits(AutoCompleteModal, _React$Component);

  function AutoCompleteModal(props) {
    classCallCheck(this, AutoCompleteModal);

    var _this = possibleConstructorReturn(this, (AutoCompleteModal.__proto__ || Object.getPrototypeOf(AutoCompleteModal)).call(this, props));

    _this.state = {
      dataSource: props.dataSource || [],
      hide: props.hide,
      placeholder: props.placeholder
    };
    return _this;
  }

  createClass(AutoCompleteModal, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var dataSource = this.state.dataSource,
          props = this.props,
          state = this.state,
          styleWidth = { width: props.width };


      var className = '';
      if (state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$6,
        _extends({
          className: className,
          label: props.label
        }, formItemLayout),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(_AutoComplete, {
          dataSource: dataSource,
          style: styleWidth,
          placeholder: state.placeholder,
          filterOption: true,
          defaultActiveFirstOption: false,
          disabled: state.disabled }))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide,
        disabled: nextProps.disabled,
        placeholder: nextProps.placeholder
      };
    }
  }]);
  return AutoCompleteModal;
}(React.Component);

var FormItem$7 = _Form.Item;

var CheckboxGroup = _Checkbox.Group;

var CheckboxModal = function (_React$Component) {
  inherits(CheckboxModal, _React$Component);

  function CheckboxModal(props) {
    classCallCheck(this, CheckboxModal);

    var _this = possibleConstructorReturn(this, (CheckboxModal.__proto__ || Object.getPrototypeOf(CheckboxModal)).call(this, props));

    var _data = JSON.parse(JSON.stringify(props.data));

    _data.forEach(function (op) {
      return op.label = props.__[op.label] || op.label;
    });

    _this.state = {
      hide: props.hide,
      options: _data
    };
    return _this;
  }

  createClass(CheckboxModal, [{
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;

      var className = '';

      if (this.state.hide) {
        className += ' hide';
      }

      if (!props.hasLabel) {
        className += ' hidden';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$7,
        _extends({
          className: className,
          label: props.label
        }, formItemLayout, {
          extra: props.extra }),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(CheckboxGroup, { options: state.options }))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide,
        disabled: nextProps.disabled
      };
    }
  }]);
  return CheckboxModal;
}(React.Component);

var CheckboxGroup$1 = _Checkbox.Group;
var FormItem$8 = _Form.Item;
var Option$2 = _Select.Option;

var CheckboxTableModal = function (_React$Component) {
  inherits(CheckboxTableModal, _React$Component);

  function CheckboxTableModal(props) {
    classCallCheck(this, CheckboxTableModal);

    var _this = possibleConstructorReturn(this, (CheckboxTableModal.__proto__ || Object.getPrototypeOf(CheckboxTableModal)).call(this, props));

    _this.onAddClick = function (e) {
      var addData = {};

      addData.user_name = '';
      addData.competence = [];
      _this.state.allData.push(addData);

      _this.setState({
        allData: _this.state.allData
      }, function () {
        _this.triggerValue({ allData: _this.state.allData });
      });
    };

    _this.triggerValue = function (changeValue) {
      var form = _this.props.form;
      var data = Object.assign({}, _this.state, changeValue);
      form.setFieldsValue(defineProperty({}, _this.props.field, data));
    };

    _this.state = {
      initData: props.initData ? JSON.parse(JSON.stringify(props.initData)) : [],
      hide: props.hide,
      allData: [],
      options: props.options,
      userData: props.userData ? JSON.parse(JSON.stringify(props.userData)) : [],
      nameType: props.nameType || 'name'
    };
    return _this;
  }

  createClass(CheckboxTableModal, [{
    key: 'initialze',
    value: function initialze(state) {
      var _this2 = this;

      var inlen = state.allData.length + state.initData.length === 1;
      var userData = state.userData.filter(function (user) {
        return !state.allData.some(function (init) {
          return init.user_name === user.user_id;
        });
      });
      return React.createElement(
        'div',
        { className: 'checkout-table-content' },
        state.allData.map(function (d, index) {
          return React.createElement(
            'div',
            { className: 'content-wrapper', key: index },
            React.createElement(
              _Select,
              {
                mode: 'combobox',
                value: d.user_name,
                style: { width: '56px', marginRight: '4px' },
                dropdownMatchSelectWidth: false,
                notFoundContent: _this2.props.__.no_data,
                onChange: _this2.onInputChange.bind(_this2, index) },
              userData.map(function (d, index) {
                return React.createElement(
                  Option$2,
                  { key: d.id, value: d.id },
                  d[state.nameType] || '(' + d.id.substring(0, 8) + ')'
                );
              })
            ),
            React.createElement(CheckboxGroup$1, {
              options: state.options,
              value: d.competence,
              onChange: _this2.onChange.bind(_this2, index) }),
            React.createElement(_Icon, { className: !inlen ? 'pointer' : '', type: 'close', onClick: !inlen ? _this2.onDeleteClick.bind(_this2, index) : null })
          );
        })
      );
    }
  }, {
    key: 'initialzeData',
    value: function initialzeData(state) {
      var _this3 = this;

      var len = state.allData.length + state.initData.length === 1;
      return React.createElement(
        'div',
        { className: 'checkout-table-content' },
        state.initData.map(function (d, index) {
          return React.createElement(
            'div',
            { className: 'content-wrapper', key: index },
            React.createElement(
              'div',
              { className: 'label' },
              d.user_name
            ),
            React.createElement(CheckboxGroup$1, {
              options: state.options,
              value: d.competence,
              onChange: _this3.onInitChange.bind(_this3, index) }),
            React.createElement(_Icon, { className: !len ? 'pointer' : '', type: 'close', onClick: !len ? _this3.onDeleteInitClick.bind(_this3, index) : null })
          );
        })
      );
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(index, value) {
      var _this4 = this;

      this.state.allData[index].user_name = value;

      this.setState({
        allData: this.state.allData
      }, function () {
        _this4.triggerValue({ allData: _this4.state.allData });
      });
    }
  }, {
    key: 'onInitChange',
    value: function onInitChange(index, value) {
      var _this5 = this;

      this.state.initData[index].competence = value;

      this.setState({
        initData: this.state.initData
      }, function () {
        _this5.triggerValue({ initData: _this5.state.initData });
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(index, value) {
      var _this6 = this;

      this.state.allData[index].competence = value;

      this.setState({
        allData: this.state.allData
      }, function () {
        _this6.triggerValue({ allData: _this6.state.allData });
      });
    }
  }, {
    key: 'onDeleteInitClick',
    value: function onDeleteInitClick(index) {
      var _this7 = this;

      this.state.initData.splice(index, 1);

      this.setState({
        initData: this.state.initData
      }, function () {
        _this7.triggerValue({ initData: _this7.state.initData });
      });
    }
  }, {
    key: 'onDeleteClick',
    value: function onDeleteClick(index) {
      var _this8 = this;

      this.state.allData.splice(index, 1);

      this.setState({
        allData: this.state.allData
      }, function () {
        _this8.triggerValue({ allData: _this8.state.allData });
      });
    }
  }, {
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          title = props.title,
          className = 'checkout-table-row',
          hideAddBtn = state.allData && state.initData && state.userData && state.allData.length >= state.userData.length;

      if (this.state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$8,
        _extends({
          className: className,
          label: props.label,
          required: props.required
        }, formItemLayout),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(
          'div',
          { className: 'checkout-table' },
          React.createElement(
            'div',
            { className: 'checkout-table-title' },
            title.map(function (t, index) {
              return React.createElement(
                'div',
                { key: index },
                props.__[t]
              );
            })
          ),
          state.allData && state.initData && this.initialzeData(state),
          state.allData && state.initData && this.initialze(state),
          React.createElement(
            'div',
            { className: hideAddBtn ? 'hide' : 'checkout-table-footer' },
            React.createElement(
              'div',
              { className: 'icon', onClick: this.onAddClick },
              React.createElement(_Icon, { type: 'plus' })
            ),
            React.createElement(
              'div',
              { onClick: this.onAddClick },
              props.__[props.addValue]
            )
          )
        ))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide,
        initData: nextProps.initData,
        options: nextProps.options,
        userData: nextProps.userData,
        nameType: nextProps.nameType
      };
    }
  }]);
  return CheckboxTableModal;
}(React.Component);

var FormItem$9 = _Form.Item;

var Text = function (_React$Component) {
  inherits(Text, _React$Component);

  function Text(props) {
    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, props));

    _this.state = {
      hide: !!props.hide,
      hasLabel: !!props.hasLabel,
      info: props.info
    };
    return _this;
  }

  createClass(Text, [{
    key: 'setColorByType',
    value: function setColorByType(type) {
      switch (type) {
        case 'info':
          return { color: '#01AFC9' };
        case 'waring':
          return { color: '#FCA625' };
        case 'error':
          return { color: '#EF6D64' };
        default:
          return { color: '#252F3D' };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var className = props.isColumn ? 'text-row column-row' : 'text-row';

      if (this.state.hide) {
        className += ' hide';
      }

      if (!props.hasLabel) {
        className += ' hidden';
      }

      return React.createElement(
        FormItem$9,
        {
          className: className,
          label: props.label,
          required: props.required,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 } },
        React.createElement(
          'span',
          { style: this.setColorByType(props.text_type) },
          props.__[state.info] || state.info
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: !!nextProps.hide,
        info: nextProps.info
      };
    }
  }]);
  return Text;
}(React.Component);

var FormItem$10 = _Form.Item;

var IconLabel = function (_React$Component) {
  inherits(IconLabel, _React$Component);

  function IconLabel(props) {
    classCallCheck(this, IconLabel);

    var _this = possibleConstructorReturn(this, (IconLabel.__proto__ || Object.getPrototypeOf(IconLabel)).call(this, props));

    _this.state = {
      text: props.text,
      hide: !!props.hide
    };
    return _this;
  }

  createClass(IconLabel, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      var className = 'icon-label-wrapper';

      if (this.state.hide) {
        className += ' hide';
      }

      return React.createElement(
        FormItem$10,
        {
          className: className,
          label: props.label,
          required: props.required,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          extra: props.extra },
        props.icon_type && React.createElement(_Icon, { type: props.icon_type }),
        React.createElement(
          'span',
          { className: 'label_value' },
          this.state.text
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        hide: nextProps.hide,
        text: nextProps.text
      };
    }
  }]);
  return IconLabel;
}(React.Component);

var FormItem$11 = _Form.Item;
var TreeNode = _TreeSelect.TreeNode;

var SHOW_PARENT = _TreeSelect.SHOW_PARENT;

var TreeSelectModal = function (_React$Component) {
  inherits(TreeSelectModal, _React$Component);

  function TreeSelectModal(props) {
    classCallCheck(this, TreeSelectModal);

    var _this = possibleConstructorReturn(this, (TreeSelectModal.__proto__ || Object.getPrototypeOf(TreeSelectModal)).call(this, props));

    _this.state = {
      value: props.value,
      hide: props.hide,
      maxHeight: 100,
      disabled: props.disabled,
      treeData: props.treeData || []
    };

    _this.tree = [];
    return _this;
  }

  createClass(TreeSelectModal, [{
    key: 'renderTreeNode',
    value: function renderTreeNode(treeData) {
      var _this2 = this;

      return treeData.map(function (tree) {
        return React.createElement(
          TreeNode,
          { disabled: tree.disabled, value: tree.name, title: tree.name, key: tree.id },
          tree.children && _this2.renderTreeNode(tree.children)
        );
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var decorator = this.props.decorator;
      var clientHeight = document.getElementById('modal-container').clientHeight;

      var decoratorEle = document.getElementsByClassName(decorator.id),
          offsetTop = 0,
          height = 0,
          maxHeight = 400;

      if (decoratorEle[0]) {
        offsetTop = decoratorEle[0].offsetTop;
        height = decoratorEle[0].clientHeight;
      }

      maxHeight = clientHeight - offsetTop - height - 24 || '100px';

      if (maxHeight < 40) {
        maxHeight = 400;
      }

      if (maxHeight !== this.state.maxHeight) {
        this.setState({
          maxHeight: maxHeight
        });
      }
    }
  }, {
    key: 'valueIsEmpty',
    value: function valueIsEmpty(decorator) {

      var value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
      return value === undefined || value === '';
    }
  }, {
    key: 'render',
    value: function render() {
      var decorator = this.props.decorator;
      var props = this.props,
          state = this.state,
          className = decorator.id;

      if (this.state.hide) {
        className += ' hide';
      }

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        FormItem$11,
        _extends({
          label: props.label,
          className: className
        }, formItemLayout, {
          extra: props.extra }),
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired && this.valueIsEmpty(decorator)
        })(React.createElement(
          _TreeSelect,
          {
            showSearch: true,
            disabled: state.disabled,
            placeholder: props.placeholder,
            dropdownStyle: { maxHeight: state.maxHeight },
            allowClear: true,
            multiple: true,
            onSelect: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT },
          this.state.treeData && this.renderTreeNode(this.state.treeData)
        ))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      return {
        treeData: nextProps.treeData,
        hide: nextProps.hide,
        disabled: nextProps.disabled
      };
    }
  }]);
  return TreeSelectModal;
}(React.Component);

// 默认现在只用了 RangePicker，所以暂时只添加 RangePicker 的用法
var RangePicker = _DatePicker.RangePicker;

var FormItem$12 = _Form.Item;

var DatePickerModal = function (_React$Component) {
  inherits(DatePickerModal, _React$Component);

  function DatePickerModal(props) {
    classCallCheck(this, DatePickerModal);

    var _this = possibleConstructorReturn(this, (DatePickerModal.__proto__ || Object.getPrototypeOf(DatePickerModal)).call(this, props));

    _this.state = {
      hide: props.hide,
      disabled: props.disabled,
      format: props.format || 'YYYY-MM-DD',
      showTime: props.showTime || false
    };
    return _this;
  }

  createClass(DatePickerModal, [{
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          className = '';

      className += state.hide ? ' hide' : '';

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      var isRequired = decorator && decorator.rules && decorator.rules.some(function (rule) {
        return rule.required;
      });

      return React.createElement(
        'div',
        { className: props.className },
        React.createElement(
          FormItem$12,
          _extends({
            label: props.label,
            required: props.required,
            className: className
          }, formItemLayout, {
            extra: props.extra }),
          decorator && getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue,
            onChange: decorator.onChange,
            hidden: state.hide || !isRequired
          })(React.createElement(RangePicker, { format: state.format, showTime: state.showTime, style: { width: '100%' } }))
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        disabled: nextProps.disabled,
        hide: nextProps.hide
      };
    }
  }]);
  return DatePickerModal;
}(React.Component);

var FormItem$13 = _Form.Item;

var InputModal$1 = function (_React$Component) {
  inherits(InputModal, _React$Component);

  function InputModal(props) {
    classCallCheck(this, InputModal);

    var _this = possibleConstructorReturn(this, (InputModal.__proto__ || Object.getPrototypeOf(InputModal)).call(this, props));

    _this.onChange = function () {
      _this.setState({
        value: 'clicked'
      }, function () {
        _this.props.form.setFieldsValue(defineProperty({}, _this.props.field, _this.state.value));
      });
    };

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  createClass(InputModal, [{
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          className = '';

      className += state.hide ? ' hide' : '';

      var formItemLayout = props.formItemLayout || {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
      var decorator = props.decorator;

      var getFieldDecorator = this.props.form.getFieldDecorator;


      return React.createElement(
        'div',
        { className: props.className },
        React.createElement(
          FormItem$13,
          _extends({
            label: props.label,
            required: props.required,
            className: className
          }, formItemLayout, {
            validateStatus: state.status,
            help: props.__[state.msg] || state.msg }),
          decorator && !state.hide ? getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue
          })(React.createElement(
            'button',
            { onClick: this.onChange },
            'hahahaah'
          )) : React.createElement('div', null)
        )
      );
    }
  }]);
  return InputModal;
}(React.Component);

/*!
 * emitry
 * https://github.com/PengJiyuan/emitry
 *
 * Copyright (c) 2018 PengJiyuan
 * Licensed under the MIT license.
 */

var Emitry = function Emitry() {
  this.list = Object.create(null);
};

Emitry.prototype.has = function has(key) {
  return ~Object.keys(this.list).indexOf(key);
};

Emitry.prototype.isArray = function isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
};

Emitry.prototype.emit = function emit(name) {
  var this$1 = this;
  var data = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    data[len] = arguments[len + 1];
  }this.list[name] && this.list[name].forEach(function (e, i) {
    e.callback.apply(e, data);
    if (e.once) {
      this$1.list[name].splice(i--, 1);
    }
  });
  if (this.list[name] && this.list[name].length === 0) {
    delete this.list[name];
  }
};

Emitry.prototype.on = function on(name, callback) {
  if (!this.has(name)) {
    this.list[name] = [];
  }
  this.list[name].push({
    callback: callback
  });
};

Emitry.prototype.once = function once(name, callback) {
  if (!this.has(name)) {
    this.list[name] = [];
  }
  this.list[name].push({
    once: true,
    callback: callback
  });
};

Emitry.prototype.off = function off(names) {
  var this$1 = this;

  if (this.isArray(names)) {
    names.forEach(function (name) {
      return delete this$1.list[name];
    });
  } else {
    this.list = Object.create(null);
  }
};

var event = new Emitry();

// 简单的深拷贝函数
function clone(objectToBeCloned) {
  // Basis.
  if (!(objectToBeCloned instanceof Object) || objectToBeCloned instanceof Function) {
    return objectToBeCloned;
  }

  var objectClone;

  // Filter out special objects.
  var Constructor = objectToBeCloned.constructor;
  switch (Constructor) {
    // Implement other special objects here.
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
  }

  // Clone each property.
  for (var prop in objectToBeCloned) {
    objectClone[prop] = clone(objectToBeCloned[prop]);
  }

  return objectClone;
}

function convert(config, __) {
  config.fields.forEach(function (field) {
    if (field.extra) {
      field.extra = __[field.extra] || field.extra;
    }
    if (field.placeholder) {
      field.placeholder = __[field.placeholder] || field.placeholder;
    }
    if (field.decorator && field.decorator.rules && field.decorator.rules.length > 0) {
      field.decorator.rules.forEach(function (rule) {
        rule.message = __[rule.message] || rule.message;
      });
    }
  });
}

var ModalBase = function (_React$Component) {
  inherits(ModalBase, _React$Component);

  function ModalBase(props) {
    classCallCheck(this, ModalBase);

    var _this = possibleConstructorReturn(this, (ModalBase.__proto__ || Object.getPrototypeOf(ModalBase)).call(this, props));

    _initialiseProps.call(_this);

    _this.__ = props.__;
    var config = clone(props.config);
    _this.state = {
      config: config,
      disabled: config.btn.disabled === undefined ? false : config.btn.disabled,
      visible: true,
      loading: false,
      error: false
    };

    convert(_this.state.config, props.__);
    return _this;
  }

  createClass(ModalBase, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var config = this.state.config;
      return config.fields.map(function (m) {
        m.label = _this2.__[m.field] || m.field;
        m.__ = _this2.__;
        m.form = _this2.props.form;

        var subComs = {
          'input': InputModal,
          'textarea': InputModal,
          'searchInput': InputModal,
          'groupInput': InputModal,
          'password': InputModal,
          'inputNumber': InputNumberModal,
          'radio': RadioModal,
          'select': SelectModal,
          'optionGroup': SelectModal,
          'slider': Slide,
          'switch': Switchs,
          'alert': Tip,
          'alertWithClick': Tip$1,
          'autoComplete': AutoCompleteModal,
          'checkbox': CheckboxModal,
          'custom': InputModal$1,
          'checkboxTable': CheckboxTableModal,
          'text': Text,
          'iconLabel': IconLabel,
          'treeSelect': TreeSelectModal,
          'datePicker': DatePickerModal
        };

        var Sub = subComs[m.type];
        return Sub ? React.createElement(Sub, _extends({ key: m.field, onAction: _this2.onAction }, m)) : null;
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var index = window.modalRefList.length;
      var _config = this.state.config;
      setTimeout(function () {
        _this3.props.onInitialize && _this3.props.onInitialize(_this3.props.form, _this3.updateFields);
      });
      event.on('valuesChange_' + index, function (value) {
        var field = Object.keys(value)[0];
        var currentField = _config.fields.find(function (f) {
          return f.field === field;
        });
        var linkList = currentField && currentField.linkList;
        if (linkList && linkList.length && linkList.length > 0) {
          linkList.forEach(function (link) {
            var id = link.id;
            var keys = Object.keys(link);
            keys.forEach(function (key) {
              if (key !== 'id') {
                _config.fields.find(function (f) {
                  return f.field === id;
                })[key] = typeof link[key] === 'function' ? link[key](value[field]) : link[key];
              }
            });
          });
          _this3.setState({
            config: _config
          });
        }

        _this3.props.onAction && _this3.props.onAction(field, value[field], _this3.props.form, _this3.updateFields, _this3.setBtnDisabled);
      });
    }

    /**
     * @des -- Update specify field's props
     * @param {Object} fields -- {fieldName: {disabled: true}}
     */

  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          __ = this.__,
          btn = props.config.btn;

      var title = props.config.title.map(function (m) {
        return __[m];
      }).join('');

      // 多级pop, 存放modal
      var div = Array.from(document.querySelectorAll('#modal-container > div'));
      var container = div[div.length - 1];

      return (
        // wrapper for keyboard listener.
        React.createElement(
          'div',
          { onKeyDown: this.onKeyDown },
          React.createElement(
            _Modal,
            {
              title: title,
              ref: this.modalRef,
              visible: state.visible,
              bodyStyle: { padding: '24px 50px 24px 0' },
              width: props.width || 540,
              className: props.modalClassName || '',
              getContainer: function getContainer() {
                return container;
              },
              onCancel: this.onCancel,
              maskClosable: false,
              footer: [React.createElement(
                _Button,
                { key: 'cancel', type: 'dashed', onClick: this.onCancel },
                __.cancel
              ), React.createElement(
                _Button,
                { key: 'confirm', type: btn.type || 'primary', onClick: this.handleSubmit, htmlType: 'submit', disabled: state.disabled, loading: state.loading },
                __[btn.value]
              )] },
            React.createElement(
              _Form,
              null,
              this.initialize(),
              React.createElement(Tip, { __: __, message: state.message, hide: !state.error, tip_type: 'error' })
            )
          )
        )
      );
    }
  }]);
  return ModalBase;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onAction = function (field, value) {
    _this4.props.onAction && _this4.props.onAction(field, value, _this4.props.form, _this4.updateFields);
  };

  this.updateFields = function (fields) {
    var _config = _this4.state.config;
    if (Object.prototype.toString.call(fields) === '[object Object]') {
      var fieldKeys = Object.keys(fields);
      fieldKeys.forEach(function (fk) {
        var keys = Object.keys(fields[fk]);
        keys.forEach(function (key) {
          _config.fields.find(function (f) {
            return f.field === fk;
          })[key] = fields[fk][key];
        });
      });

      _this4.setState({
        config: _config
      });
    }
  };

  this.handleSubmit = function (e) {
    var props = _this4.props;
    e.preventDefault();
    props.form.validateFields(function (err, values) {
      if (!err) {
        var trueSubmit = function trueSubmit() {
          _this4.setState({
            loading: true
          }, function () {
            props.onConfirm(values, function (success, errorMessage) {
              if (success) {
                _this4.dealChainPop(function () {
                  _this4.setState({
                    visible: false,
                    loading: false
                  });
                });
              } else {
                if (errorMessage) {
                  _this4.setState({
                    message: errorMessage,
                    error: true
                  });
                  _this4.setState({
                    loading: false
                  });
                }
              }
            }, _this4.closeImmediately, _this4.setBtnDisabled);
          });
        };
        if (props.beforeSubmit) {
          props.beforeSubmit(values, props.form, trueSubmit);
        } else {
          trueSubmit();
        }
      }
    });
  };

  this.setBtnDisabled = function (bool) {
    _this4.setState({
      disabled: bool
    });
  };

  this.onCancel = function () {
    _this4.dealChainPop(function () {
      _this4.setState({
        visible: false
      });
    });
  };

  this.closeImmediately = function (cb) {
    _this4.setState({
      visible: false
    }, function () {
      setTimeout(function () {
        cb && cb();
        window.modalRefList = [];
        _this4.props.onAfterClose();
      }, 300);
    });
  };

  this.dealChainPop = function (cb) {
    var refList = window.modalRefList;
    var index = refList.length;
    var len = refList.length;
    if (refList && refList.length > 1) {
      refList[len - 2].current.setState({
        loading: false,
        visible: true
      }, function () {
        refList.pop();
        // 清理全局事件中的当前pop的事件
        event.off(['valuesChange_' + index]);
        setTimeout(function () {
          ReactDOM.unmountComponentAtNode(_this4.props.childNodes[len - 1]);
        }, 300);
      });
    } else {
      refList.pop();
      setTimeout(function () {
        _this4.props.onAfterClose();
      }, 300);
    }
    cb && cb();
  };

  this.onKeyDown = function (e) {
    // Modal自带ESC监听，所以无需处理

    // Enter keyCode === 13
    if (_this4.state.visible && e.keyCode === 13) {
      _this4.handleSubmit(e);
    }
  };

  this.modalRef = React.createRef();
};

var Base = _Form.create({
  onValuesChange: function onValuesChange(props, values) {
    var index = window.modalRefList.length;
    event.emit('valuesChange_' + index, values);
  }
})(ModalBase);

function modal(props) {

  if (!window.modalRefList) {
    window.modalRefList = [];
  }

  var doc = document,
      root = doc.getElementById('modal-container'),
      container = null;

  if (!root) {
    root = doc.createElement('div');
    root.id = 'modal-container';

    doc.body.appendChild(root);
  }

  container = doc.createElement('div');
  root.appendChild(container);

  var modalNums = root.childNodes.length;

  if (modalNums > 1) {
    var prevModal = modalRefList[modalNums - 2].current;
    prevModal.setState({
      visible: false
    });
  }

  // location发生改变时destroy掉pop
  var unlisten = HISTORY.listen(destroy);

  function destroy() {
    window.modalRefList = [];
    root && root.parentNode && root.parentNode.removeChild(root);
    ReactDOM.unmountComponentAtNode(root);
    unlisten();
  }

  function onAfterClose() {
    event.off();
    destroy();
  }

  var _props = _extends({}, props, {
    root: root,
    childNodes: root.childNodes,
    onAfterClose: onAfterClose
  });

  modalRefList.push(React.createRef());

  // https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140
  ReactDOM.render(React.createElement(Base, _extends({ wrappedComponentRef: modalRefList[modalRefList.length - 1] }, _props)), container);
}

var event$1 = new Emitry();

function convert$1(config, __) {
  config.fields.forEach(function (field) {
    if (field.extra) {
      field.extra = __[field.extra] || field.extra;
    }
    if (field.placeholder) {
      field.placeholder = __[field.placeholder] || field.placeholder;
    }
    if (field.decorator && field.decorator.rules && field.decorator.rules.length > 0) {
      field.decorator.rules.forEach(function (rule) {
        rule.message = __[rule.message] || rule.message;
      });
    }
  });
}

var ModalBase$1 = function (_React$Component) {
  inherits(ModalBase, _React$Component);

  function ModalBase(props) {
    classCallCheck(this, ModalBase);

    var _this = possibleConstructorReturn(this, (ModalBase.__proto__ || Object.getPrototypeOf(ModalBase)).call(this, props));

    _initialiseProps$1.call(_this);

    _this.__ = props.__;
    var config = clone(props.config);
    _this.state = {
      config: config,
      disabled: config.btn.disabled === undefined ? false : config.btn.disabled,
      loading: false,
      error: false,
      className: 'component_modal_plus'
    };

    convert$1(_this.state.config, props.__);
    return _this;
  }

  createClass(ModalBase, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var config = this.state.config;
      return config.fields.map(function (m) {
        m.label = _this2.__[m.field] || m.field;
        m.__ = _this2.__;
        m.form = _this2.props.form;

        var subComs = {
          'input': InputModal,
          'textarea': InputModal,
          'searchInput': InputModal,
          'groupInput': InputModal,
          'inputNumber': InputNumberModal,
          'radio': RadioModal,
          'select': SelectModal,
          'optionGroup': SelectModal,
          'slider': Slide,
          'switch': Switchs,
          'alert': Tip,
          'alertWithClick': Tip$1,
          'autoComplete': AutoCompleteModal,
          'checkbox': CheckboxModal,
          'checkboxTable': CheckboxTableModal,
          'text': Text,
          'iconLabel': IconLabel,
          'treeSelect': TreeSelectModal
        };

        var Sub = subComs[m.type];
        return Sub ? React.createElement(Sub, _extends({ key: m.field, onAction: _this2.onAction }, m)) : null;
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var _config = this.state.config;
      // Fire initialize function
      setTimeout(function () {
        _this3.props.onInitialize && _this3.props.onInitialize(_this3.props.form, _this3.updateFields);
      });
      // Animation
      this.setState({
        className: 'component_modal_plus modal-enter modal-enter-active'
      }, function () {
        setTimeout(function () {
          _this3.setState({
            className: 'component_modal_plus'
          });
        }, 200);
      });
      // EventEmitter
      event$1.on('valuesChange', function (value) {
        var field = Object.keys(value)[0];
        var currentField = _config.fields.find(function (f) {
          return f.field === field;
        });
        var linkList = currentField && currentField.linkList;
        if (linkList && linkList.length && linkList.length > 0) {
          linkList.forEach(function (link) {
            var id = link.id;
            var keys = Object.keys(link);
            keys.forEach(function (key) {
              if (key !== 'id') {
                _config.fields.find(function (f) {
                  return f.field === id;
                })[key] = typeof link[key] === 'function' ? link[key](value[field]) : link[key];
              }
            });
          });
          _this3.setState({
            config: _config
          });
        }

        _this3.props.onAction && _this3.props.onAction(field, value[field], _this3.props.form, _this3.updateFields, _this3.setBtnDisabled);
      });
    }

    /**
     * @des -- Update specify field's props
     * @param {Object} fields -- {fieldName: {disabled: true}}
     */

  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          __ = this.__;

      var title = props.config.title.map(function (m) {
        return __[m];
      }).join('');

      return React.createElement(
        'div',
        { className: this.state.className },
        React.createElement(
          'div',
          { className: 'title' },
          React.createElement(
            'span',
            { onClick: this.onCancel },
            React.createElement(_Icon, { type: 'left' }),
            title
          )
        ),
        React.createElement(
          'div',
          { className: 'content' },
          React.createElement(
            'div',
            { className: 'content-wrapper' },
            React.createElement(
              _Form,
              { onSubmit: this.handleSubmit },
              this.initialize(),
              React.createElement(Tip, { __: __, message: state.message, hide: !state.error, tip_type: 'error' }),
              React.createElement(
                'div',
                { className: 'btn-wrapper' },
                React.createElement(
                  _Button,
                  { className: 'cancel-button', type: 'dashed', ref: 'btn', onClick: this.onCancel },
                  __.cancel
                ),
                React.createElement(
                  _Button,
                  { className: 'create-button', loading: state.loading, type: props.config.btn.type, htmlType: 'submit' },
                  __[props.config.btn.value]
                )
              )
            )
          )
        )
      );
    }
  }]);
  return ModalBase;
}(React.Component);

var _initialiseProps$1 = function _initialiseProps() {
  var _this4 = this;

  this.onAction = function (field, value) {
    _this4.props.onAction && _this4.props.onAction(field, value, _this4.props.form, _this4.updateFields);
  };

  this.updateFields = function (fields) {
    var _config = _this4.state.config;
    if (Object.prototype.toString.call(fields) === '[object Object]') {
      var fieldKeys = Object.keys(fields);
      fieldKeys.forEach(function (fk) {
        var keys = Object.keys(fields[fk]);
        keys.forEach(function (key) {
          _config.fields.find(function (f) {
            return f.field === fk;
          })[key] = fields[fk][key];
        });
      });
      _this4.setState({
        config: _config
      });
    }
  };

  this.handleSubmit = function (e) {
    var props = _this4.props;
    e.preventDefault();
    props.form.validateFields(function (err, values) {
      if (!err) {
        var trueSubmit = function trueSubmit() {
          _this4.setState({
            loading: true
          }, function () {
            props.onConfirm(values, function (success, errorMessage) {
              if (success) {
                _this4.onCancel();
              } else {
                if (errorMessage) {
                  _this4.setState({
                    message: errorMessage,
                    error: true
                  });
                  _this4.setState({
                    loading: false
                  });
                }
              }
            }, _this4.closeImmediately, _this4.setBtnDisabled);
          });
        };
        if (props.beforeSubmit) {
          props.beforeSubmit(values, props.form, trueSubmit);
        } else {
          trueSubmit();
        }
      }
    });
  };

  this.onCancel = function () {
    _this4.setState({
      className: 'component_modal_plus modal-leave modal-leave-active'
    }, function () {
      setTimeout(function () {
        _this4.props.onAfterClose();
      }, 200);
    });
  };
};

var Base$1 = _Form.create({
  onValuesChange: function onValuesChange(props, values) {
    event$1.emit('valuesChange', values);
  }
})(ModalBase$1);

function modal$1(props) {

  var doc = document.getElementById('main'),
      root = document.getElementById('modal-container'),
      container = null;

  if (!root) {
    root = document.createElement('div');
    root.id = 'modal-container';

    doc.appendChild(root);
  }

  container = document.createElement('div');
  root.appendChild(container);

  // location发生改变时destroy掉pop
  var unlisten = HISTORY.listen(destroy);

  function destroy() {
    root && root.parentNode && root.parentNode.removeChild(root);
    ReactDOM.unmountComponentAtNode(root);
    unlisten();
  }

  function onAfterClose() {
    event$1.off();
    destroy();
  }

  var _props = _extends({}, props, {
    root: root,
    onAfterClose: onAfterClose
  });

  ReactDOM.render(React.createElement(Base$1, _props), container);
}

var CheckboxGroup$2 = _Checkbox.Group;

var ModalBase$2 = function (_React$Component) {
  inherits(ModalBase, _React$Component);

  function ModalBase(props) {
    classCallCheck(this, ModalBase);

    var _this = possibleConstructorReturn(this, (ModalBase.__proto__ || Object.getPrototypeOf(ModalBase)).call(this, props));

    _this.state = {
      disabled: props.disabled,
      tip: props.tip,
      tipType: 'warning',
      visible: true,
      errorHide: true,
      options: props.options,
      data: props.data,
      defaultValue: props.defaultValue,
      loading: false,
      value: props.value,
      nameType: props.nameType || 'name',
      alertTip: props.alertTip
    };

    _this.onDelete = _this.onDelete.bind(_this);
    _this.onCancel = _this.onCancel.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  createClass(ModalBase, [{
    key: 'onDelete',
    value: function onDelete() {
      var _this2 = this;

      this.setState({ loading: true });
      this.props.onDelete && this.props.onDelete(this.state, function (status, msg) {
        if (status) {
          _this2.dealChainPop(function () {
            _this2.setState({
              visible: false,
              loading: false
            });
          });
        } else {
          _this2.setState({
            errorMessage: msg,
            errorHide: false
          });
          _this2.setState({
            loading: false
          });
        }
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: 'closeImmediately',
    value: function closeImmediately(cb) {
      var _this3 = this;

      this.setState({
        visible: false
      }, function () {
        setTimeout(function () {
          cb && cb();
          window.modalRefList = [];
          _this3.props.onAfterClose();
        }, 300);
      });
    }
  }, {
    key: 'dealChainPop',
    value: function dealChainPop(cb) {
      var _this4 = this;

      var refList = window.modalRefList;
      var len = refList.length;
      if (refList && refList.length > 1) {
        refList[len - 2].current.setState({
          loading: false,
          visible: true
        }, function () {
          refList.pop();
          setTimeout(function () {
            ReactDOM.unmountComponentAtNode(_this4.props.childNodes[len - 1]);
          }, 300);
        });
      } else {
        refList.pop();
        setTimeout(function () {
          _this4.props.onAfterClose();
        }, 300);
      }
      cb && cb();
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      var _this5 = this;

      this.dealChainPop(function () {
        _this5.setState({
          visible: false
        });
      });
      this.props.onCancel && this.props.onCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state,
          __ = props.__,
          action = __[props.action],
          type = Array.isArray(props.type) ? props.type.map(function (t) {
        return __[t];
      }).join('') : __[props.type],
          num = props.num || props.data.length,
          cancel = __.cancel,
          content = __.msg_delete.replace('{0}', action).replace('{1}', type).replace('{2}', num);

      var _props = Object.assign({}, props, {
        title: action + type
      });

      var div = Array.from(document.querySelectorAll('#modal-container > div'));
      var container = div[div.length - 1];

      return React.createElement(
        _Modal,
        { ref: this.modalRef,
          title: _props.title,
          visible: state.visible,
          width: 540,
          getContainer: function getContainer() {
            return container;
          },
          onCancel: this.onCancel,
          maskClosable: false,
          footer: [React.createElement(
            _Button,
            { key: 'cancel', type: 'dashed', onClick: this.onCancel },
            cancel
          ), React.createElement(
            _Button,
            { key: 'confirm', type: 'danger', disabled: state.disabled, loading: state.loading, onClick: this.onDelete },
            __.delete
          )] },
        React.createElement(
          'div',
          { className: 'modal-bd halo-com-modal-delete' },
          React.createElement(_Icon, { type: 'exclamation-circle' }),
          React.createElement('span', { dangerouslySetInnerHTML: { __html: content } }),
          React.createElement(
            'ul',
            { className: 'data-list' },
            props.data.map(function (item) {
              return React.createElement(
                'li',
                { key: item.id || item.name },
                React.createElement(
                  'span',
                  null,
                  item[state.nameType] || '(' + item.id.substr(0, 8) + ')'
                )
              );
            })
          ),
          React.createElement(
            'div',
            { className: 'modal-row tip-row' + (state.tip ? '' : ' hide') },
            React.createElement(_Alert, { type: state.tipType, content: state.tip, showIcon: true, width: 462 })
          ),
          React.createElement(
            'div',
            { className: props.hasCheckbox ? '' : 'hide' },
            React.createElement(CheckboxGroup$2, { value: state.value,
              options: state.options,
              defaultValue: state.defaultValue,
              onChange: this.onChange.bind(this) })
          ),
          React.createElement(
            'div',
            { className: props.hasAlert ? '' : 'hide' },
            React.createElement(
              'p',
              null,
              state.alertTip
            )
          )
        ),
        props.children
      );
    }
  }]);
  return ModalBase;
}(React.Component);

function modal$2(props) {
  if (!window.modalRefList) {
    window.modalRefList = [];
  }
  var doc = document,
      root = doc.getElementById('modal-container'),
      container = null;
  if (!root) {
    root = doc.createElement('div');
    root.id = 'modal-container';
    doc.body.appendChild(root);
  }
  container = doc.createElement('div');
  root.appendChild(container);
  var modalNums = root.childNodes.length;
  if (modalNums > 1) {
    var prevModal = modalRefList[modalNums - 2].current;
    prevModal.setState({
      visible: false
    });
  }
  // location发生改变时destroy掉pop
  var unlisten = HISTORY.listen(destroy);
  function destroy() {
    window.modalRefList = [];
    root && root.parentNode && root.parentNode.removeChild(root);
    ReactDOM.unmountComponentAtNode(root);
    unlisten();
  }
  function onAfterClose() {
    destroy();
  }
  var _props = _extends({}, props, {
    root: root,
    childNodes: root.childNodes,
    onAfterClose: onAfterClose
  });
  modalRefList.push(React.createRef());
  ReactDOM.render(React.createElement(ModalBase$2, _extends({ ref: modalRefList[modalRefList.length - 1] }, _props)), container);
}

var title = "aa";
var fields = [{ "type": "text", "field": "info" }, { "type": "alert", "field": "message" }];
var btn = { "value": "clear", "type": "danger", "disabled": false };
var config = {
	title: title,
	fields: fields,
	btn: btn
};

/**
 * @param title    - pop标题 (必填)
 * @param info     - pop的info
 * @param message  - pop的message
 * @param tip_type - pop的alert的type
 * @param btnValue - pop的确认按钮的文案 (必填)
 * @param btnType  - pop的确认按钮的type
 */

function pop(_props) {
  config.title = _props.title;
  config.fields[0].info = _props.info || '';
  config.fields[0].hide = !_props.info;
  config.fields[1].message = _props.message || '';
  config.fields[1].hide = !_props.message;
  config.fields[1].tip_type = _props.tip_type || 'warning';
  config.btn.value = _props.btnValue;
  config.btn.type = _props.btnType || 'danger';
  var props = {
    __: _props.__,
    config: config,
    onConfirm: function onConfirm(refs, cb) {
      _props.onAction && _props.onAction(cb);
    }
  };
  modal(props);
}

var SubMenu = _Menu.SubMenu;

var SideMenu = function (_React$Component) {
  inherits(SideMenu, _React$Component);

  function SideMenu(props) {
    classCallCheck(this, SideMenu);

    var _this = possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props));

    _this.state = {
      items: _this.props.items,
      collapsed: _this.props.collapsed
    };
    return _this;
  }

  createClass(SideMenu, [{
    key: 'getIconByName',
    value: function getIconByName(name) {
      switch (name) {
        case 'block-storage':
          return 'storage-volume';
        case 'alert_management':
          return 'alarm-mgmt';
        default:
          return name;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var items = this.state.items;
      var __ = this.props.__;
      return items ? React.createElement(
        'div',
        { className: 'side_menu' },
        React.createElement(
          'div',
          { className: 'logo-wrapper' },
          React.createElement('img', { src: this.state.collapsed ? '/public/assets/logo_no_text.png' : '/public/assets/logo.png' })
        ),
        React.createElement(
          'div',
          { className: 'menu-wrapper' },
          React.createElement(
            _Menu,
            {
              selectedKeys: items.defaultSelectedKeys,
              defaultOpenKeys: items.defaultOpenKeys,
              mode: 'inline',
              theme: 'dark',
              style: this.state.collapsed ? { width: 80 } : { width: 200 }
              // 禁用Menu的点选功能，完全通过history.listen来操控selectedKeys
              , selectable: false,
              inlineCollapsed: this.state.collapsed
            },
            items.modules.map(function (module) {
              return !module.title ? module.items.map(function (item) {
                return React.createElement(
                  _Menu.Item,
                  { key: item },
                  React.createElement(
                    Link,
                    { to: '/' + item },
                    React.createElement(_Icon, { type: _this2.getIconByName(item) }),
                    React.createElement(
                      'span',
                      null,
                      __[item]
                    )
                  )
                );
              }) : React.createElement(
                SubMenu,
                { key: module.title, title: React.createElement(
                    'span',
                    null,
                    React.createElement(_Icon, { type: _this2.getIconByName(module.title) }),
                    React.createElement(
                      'span',
                      null,
                      __[module.title]
                    )
                  ) },
                module.items.map(function (item) {
                  return React.createElement(
                    _Menu.Item,
                    { key: item },
                    React.createElement(
                      Link,
                      { to: '/' + item },
                      React.createElement(_Icon, { type: 'circle' }),
                      React.createElement(
                        'span',
                        null,
                        __[item]
                      )
                    )
                  );
                })
              );
            })
          )
        )
      ) : null;
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return prevState.items !== nextProps.items ? nextProps : null;
    }
  }]);
  return SideMenu;
}(React.Component);

var Choice = function (_React$Component) {
  inherits(Choice, _React$Component);

  function Choice(props) {
    classCallCheck(this, Choice);

    var _this = possibleConstructorReturn(this, (Choice.__proto__ || Object.getPrototypeOf(Choice)).call(this, props));

    _this.readChange = function () {
      _this.setState({
        readChecked: !_this.state.readChecked
      }, function () {
        return _this.props.onAction && _this.props.onAction(_this.props.field, _this.state);
      });
    };

    _this.writeChange = function () {
      _this.setState({
        writeChecked: !_this.state.writeChecked
      }, function () {
        return _this.props.onAction && _this.props.onAction(_this.props.field, _this.state);
      });
    };

    _this.state = {
      readChecked: false,
      writeChecked: false
    };
    return _this;
  }

  createClass(Choice, [{
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;
      var className = 'modal-row label-row multiple-choice';
      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          'span',
          { className: 'title' },
          props.required && React.createElement(
            'strong',
            null,
            '*'
          ),
          props.label
        ),
        React.createElement(
          'div',
          { className: 'user-competence' },
          React.createElement(
            'div',
            { className: state.readChecked ? 'everyone everyone-read readChecked' : 'everyone everyone-read' },
            React.createElement('input', { id: 'myRead', type: 'checkbox', name: 'access', value: props.__['read_permission'], onChange: this.readChange }),
            React.createElement('label', { htmlFor: 'myRead' }),
            React.createElement(
              'span',
              null,
              props.__['read_permission']
            )
          ),
          React.createElement(
            'div',
            { className: state.writeChecked ? 'everyone everyone-write writeChecked' : 'everyone everyone-write' },
            React.createElement('input', { id: 'myWrite', type: 'checkbox', name: 'access', value: props.__['write_permission'], onChange: this.writeChange }),
            React.createElement('label', { htmlFor: 'myWrite' }),
            React.createElement(
              'span',
              null,
              props.__['write_permission']
            )
          ),
          props['read_write_tip'] ? React.createElement(
            'p',
            { className: 'read-write-tip' },
            props.__['read_write_tip']
          ) : null
        )
      );
    }
  }]);
  return Choice;
}(React.Component);

var TabPane$2 = _Tabs.TabPane;
var FormItem$14 = _Form.Item;

var Tab = function (_React$Component) {
  inherits(Tab, _React$Component);

  function Tab(props) {
    classCallCheck(this, Tab);

    var _this = possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

    _this.state = {
      panes: props.panes,
      subtype: props.subtype,
      subpanes: props.subpanes,
      hide: props.hide,
      type: props.type
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onSubChange = _this.onSubChange.bind(_this);
    return _this;
  }

  createClass(Tab, [{
    key: 'onChange',
    value: function onChange(activeKey) {
      var _this2 = this;

      this.setState({
        activeKey: activeKey
      }, function () {
        _this2.props.onAction && _this2.props.onAction(_this2.props.field, _this2.state);
      });
    }
  }, {
    key: 'onSubChange',
    value: function onSubChange(activeKey) {
      var _this3 = this;

      this.setState({
        activeKey: activeKey
      }, function () {
        return _this3.props.onSubAction && _this3.props.onSubAction(_this3.props.field, _this3.state);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props,
          state = this.state;

      var className = 'modal-row tab-row';
      if (props.is_long_label) {
        className += ' label-row long-label-row';
      } else {
        className += ' label-row';
      }
      if (state.hide) {
        className += ' hide';
      }

      var formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      };

      var getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

      return React.createElement(
        FormItem$14,
        _extends({
          label: props.label,
          className: className
        }, formItemLayout, {
          extra: props.extra }),
        getFieldDecorator('currentKey')(React.createElement(
          _Tabs,
          {
            type: state.type,
            onTabClick: this.onChange },
          state.panes && state.panes.map(function (pane) {
            return React.createElement(
              TabPane$2,
              { tab: props.__[pane.name], key: pane.key },
              getFieldDecorator('currentObjectKey')(React.createElement(
                _Tabs,
                {
                  type: state.subtype,
                  onTabClick: _this4.onSubChange },
                state.subpanes && state.subpanes.map(function (subpane) {
                  return React.createElement(
                    TabPane$2,
                    { tab: props.__[subpane.name], key: subpane.key },
                    subpane.content
                  );
                })
              ))
            );
          })
        ))
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      return {
        panes: nextProps.panes,
        subpanes: nextProps.subpanes,
        type: nextProps.type,
        subtype: nextProps.subtype,
        hide: nextProps.hide
      };
    }
  }]);
  return Tab;
}(React.Component);

var Step = _Steps.Step;

var StepsModal = function (_React$Component) {
  inherits(StepsModal, _React$Component);

  function StepsModal(props) {
    classCallCheck(this, StepsModal);

    var _this = possibleConstructorReturn(this, (StepsModal.__proto__ || Object.getPrototypeOf(StepsModal)).call(this, props));

    _this.state = {
      current: 0,
      disabled: props.disabled,
      loading: false,
      isNext: false
    };
    return _this;
  }

  createClass(StepsModal, [{
    key: 'next',
    value: function next() {
      var _this2 = this;

      var that = this;
      this.props.form.validateFields(function (err, values) {
        if (!err) {
          var current = that.state.current + 1;
          _this2.setState({
            isNext: true,
            current: current
          }, function () {
            _this2.props.onChange && _this2.props.onChange(values, current);
          });
        }
      });
      /*this.setState({
        isNext: true
      }, () => {
        this.props.onAction && this.props.onAction(this.props.field, this.state, () => {
          if (!this.state.loading) {
            let current = this.state.current + 1;
            this.setState({ current });
          }
        });
      });*/
    }
  }, {
    key: 'prev',
    value: function prev() {
      var _this3 = this;

      var current = this.state.current - 1;
      var form = this.props.form.getFieldsValue();
      this.setState({
        isNext: false,
        current: current
      }, function () {
        return _this3.props.onPrev && _this3.props.onPrev(current, form);
      });
    }
  }, {
    key: 'onConfirm',
    value: function onConfirm() {
      this.props.onConfirm && this.props.onConfirm();
    }
  }, {
    key: 'render',
    value: function render() {
      var current = this.state.current,
          len = this.props.steps.length;


      var state = this.state,
          props = this.props,
          __ = props.__;

      return React.createElement(
        'div',
        { className: 'steps-wrapper' },
        React.createElement(
          _Steps,
          { current: current, size: 'small' },
          props.steps.map(function (s, i) {
            return React.createElement(Step, { key: i, title: s.title, description: s.description });
          })
        ),
        React.createElement(
          'div',
          { className: 'steps-content' },
          props.steps[state.current].content
        ),
        React.createElement(
          'div',
          { style: { marginTop: 24 } },
          React.createElement(
            _Button,
            { className: current === 0 ? 'hide' : 'btn-default',
              onClick: current !== 0 ? this.prev.bind(this) : null },
            __.prev
          ),
          React.createElement(
            _Button,
            { disabled: state.disabled,
              style: { float: 'right' },
              type: 'primary',
              loading: state.loading,
              onClick: current !== len - 1 ? this.next.bind(this) : this.onConfirm.bind(this) },
            current === len - 1 ? __.create : __.next
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        disabled: nextProps.disabled
      };
    }
  }]);
  return StepsModal;
}(React.Component);



var _export = /*#__PURE__*/Object.freeze({
  Alert: Tip,
  AlertWithClick: Tip$1,
  AutoComplete: AutoCompleteModal,
  Checkbox: CheckboxModal,
  CheckboxTable: CheckboxTableModal,
  DatePicker: DatePickerModal,
  IconLabel: IconLabel,
  Input: InputModal,
  InputNumber: InputNumberModal,
  MultipleChoice: Choice,
  MultistageTabs: Tab,
  Radio: RadioModal,
  Select: SelectModal,
  Slider: Slide,
  Steps: StepsModal,
  Switch: Switchs,
  Text: Text,
  TreeSelect: TreeSelectModal
});

// main layout

export { Modal as Main, modal as ModalV2, modal$1 as ModalPlus, modal$2 as ModalDelete, pop as ModalAlert, SideMenu, _export as Subs, HISTORY as history };
