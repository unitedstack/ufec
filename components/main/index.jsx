import React from 'react';
import { Table, Tabs, Icon, Input } from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
import history from '../history';
import Detail from './detail';
import ButtonList from './button_list';
import Operation from './operation';
import converter from './converter';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.__ = props.__ || {};

    this.tableColRender(this.props.config.table.columns);

    converter.convertLang(this.__, props.config);

    ['onAction', 'onClickCaptain', 'onClickDetailTabs', 'getCurrentKey'].forEach(func => {
      this[func] = this[func].bind(this);
    });
  }

  state = {
    config: this.props.config,
    currentRow: {},
    rows: [],
    selectedRowKeys: [],
    pathList: history.getPathList()
  };

  componentDidMount() {
    const _config = this.state.config;
    if(!_config.table.loading) {
      _config.table.loading = true;
      this.setState({
        config: _config
      }, () => {
        this.props.onInitialize();
      });
    } else {
      this.props.onInitialize();
    }
  }

  componentWillUnMount() {
    // 当组件unmount的时候，需要重置main的数据并且更新detail为关闭状态.
    this.clearState(true);
  }

  componentDidUpdate(prevProps, prevState) {
    const nextPathList = history.getPathList();
    // 当同模块带detail跳转的时候，需要重新走onInitialize.
    if(!this.state.currentRow
        && prevState.pathList.length > 1
        && nextPathList.length > 1
        && prevState.pathList[0] === nextPathList[0]
        && prevState.pathList[1] !== nextPathList[1] // 以上条件判断两个url的id不同但是模块相同.
        && !this.props.config.table.loading) {
      this.props.onInitialize();
    }
    // 当第一次强刷带detail初始化的时候，需要触发onClickDetailTabs去更新默认tab的content;
    if(this.enableDetail(prevProps, prevState)) {
      this.onClickDetailTabs();
    }
    // 打开detail的操作。
    // 如果当前url带id && detail处于关闭状态 && currentRow有数据 就打开detail
    const detailRef = this.detailRef.current;
    if(history.getPathList().length > 1
      && !detailRef.state.visible
      && this.hasCurrentRow()) {
      detailRef.open();
    }
  }

  enableDetail(prevProps, prevState) {
    return history.getPathList().length > 1
      && (prevProps.config.table.data.length > 0 || !prevProps.config.table.loading)
      && this.hasCurrentRow();
  }

  hasCurrentRow() {
    return this.state.currentRow && Object.keys(this.state.currentRow).length > 0;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const path = history.getPathList();
    return {
      // decodeURIComponent解决url中文乱码
      currentRow: path.length > 1 ? nextProps.config.table.data.find(d => d.id.toString() === decodeURIComponent(path[1])) : {},
      pathList: history.getPathList()
    };
  }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.type) {
        case 'captain':
          column.render = (text, row, index) => {
            let formatData = column.formatter && column.formatter(text, row, index);
            if (!formatData) {
              let key = this.props.config.table.rowKey;
              formatData = text ? text : `(${row[key].substr(0, 8)})`;
            }
            return (
              <a className="captain" onClick={this.onClickCaptain.bind(this, row)}>
                {formatData}
              </a>
            );
          };
          break;
        default:
          break;
      }
    });
  }

  onAction(field, actionType, data, refs) {
    if(!data) {
      data = {};
    }
    if(!data.rows) {
      data.rows = this.state.rows;
    }
    const func = this.props.onAction;
    func && func(field, actionType, data, refs);
  }

  onClickCaptain(row, e) {
    e.preventDefault();
    const pathList = history.getPathList();
    // 没有二级路由的时候添加二级路由
    if(pathList.length < 2 || row.id !== pathList[1]) {
      history.push(`/${pathList[0]}/${row.id}`);
    } else {
      // 有二级路由的时候关闭二级路由
      history.push(`/${pathList[0]}`);
    }
  }

  onChangeTabs(key) {
    if(key === history.getPathList()[0]) {
      return;
    }
    history.push(`/${key}`);
  }

  onSearchTable(value) {
    this.onAction('search', 'click', {
      value: value
    });
  }

  onClickDetailTabs(rows, key = this.getCurrentKey()) {
    if(!rows) {
      rows = [this.state.currentRow];
    }
    this.onAction('detail', 'click', {
      key: key,
      rows: rows
    }, this.detailRef.current);
  }

  getCurrentKey() {
    const detailRef = this.detailRef.current;
    return detailRef.state.currentKey;
  }

  clearState(closeDetail) {
    this.setState({
      rows: [],
      currentRow: {},
      selectedRowKeys: []
    }, () => {
      this.btnListRender(this.state.rows);
      if(closeDetail) {
        this.detailRef.setState({
          visible: false
        });
      }
    });
  }

  btnListRender(selectedRows) {
    if(!this.props.btnListRender) {
      return;
    }
    const refs = this.btnListRef.current;
    let btns = refs.state.btns;
    refs.setState({
      btns: this.props.btnListRender(selectedRows, btns)
    });
  }

  operationsRef = React.createRef();

  btnListRef = React.createRef();

  detailRef = React.createRef();

  render() {
    const _config = this.props.config,
      tabs = _config.tabs,
      btns = _config.btns,
      table = _config.table,
      columns = table.columns,
      data = table.data,
      detail = table.detail,
      search = _config.search,
      operations = _config.operations,
      showPage = {
        withPage: true,
        ...table.showPage
      },
      pagination = {
        hideOnSinglePage: true,
        pageSize: table.limit,
        showQuickJumper: true,
        total: table.total,
        onChange: (page, pageSize) => {
          this.onAction('pagination', 'click', {
            page: page,
            pageSize: pageSize
          });
        },
        ...table.pagination
      };

    // 判断是否显示页数
    let tableClass = showPage.withPage ? 'table-box' : 'table-box without-page';

    // 当前匹配的模块
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          rows: selectedRows,
          selectedRowKeys: selectedRowKeys
        }, () => {
          this.btnListRender(selectedRows);
        });
      }
    };

    // 在数据加载完之后如果直接置为false的话，会出问题
    // 因为在antd的Table中，判断传入的loading是false的话，loadingProps会变成默认的
    // 自定义的loading icon会有一瞬间编程默认的loading icon
    const spinProps = {
      spinning: table.loading,
      indicator: <Icon type="loading" style={{fontSize: 30}} />
    };

    return (
      <div className="garen-com-main">
        <div className="margin-wrapper">
          <div className="main-content">
            {tabs ?
              <div className="submenu-tabs">
                <Tabs activeKey={tabs.find(tab => tab.default).key} onTabClick={this.onChangeTabs.bind(this)} type="card">
                  {
                    tabs.map(tab => <TabPane tab={tab.name} key={tab.key}></TabPane>)
                  }
                </Tabs>
              </div> : null
            }
            {
              (btns && btns.length > 0) || search ? <div className="operation-list">
                <div className="left">
                  <ButtonList
                    loading={table.loading}
                    ref={ this.btnListRef }
                    onAction={this.onAction}
                    btns={btns}
                  />
                  {
                    operations ? <Operation
                      onAction={this.onAction}
                      ref={this.operationsRef}
                      loading={table.loading}
                      operations={operations}
                      __={this.__}
                    /> : null
                  }
                </div>
                {
                  search ? <div className="search-wrapper">
                    <Search
                      placeholder={search.placeholder || 'Search'}
                      onSearch={this.onSearchTable.bind(this)}
                      style={{ width: 180 }}
                      enterButton
                    />
                  </div> : null
                }
              </div> : null
            }
            <div className={tableClass}>
              {
                table ? <Table
                  loading={spinProps}
                  locale={{emptyText: this.props.no_data}}
                  pagination={pagination}
                  columns={columns}
                  dataKey={table.dataKey}
                  rowSelection={table.checkbox ? rowSelection : null}
                  expandedRowRender={table.expandedRowRender}
                  rowKey={table.rowKey}
                  dataSource={data}
                /> : null
              }
            </div>
          </div>
        </div>
        {
          detail ? <Detail
            ref={ this.detailRef }
            tabs={tabs}
            detail={detail}
            tableLoading={table.loading}
            row={this.state.currentRow}
            onClickTabs={this.onClickDetailTabs.bind(this)} />
          : null
        }
      </div>
    );
  }
}

export default Modal;
