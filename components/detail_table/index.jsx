import './style/index.less';
import React from 'react';
import { Table } from 'antd';

/**
 * detail 中显示的表格
 * props 中包含一个 table 对象用来配置 table 的内容
 * table 中有如下属性
 * title: {string} 表格的标题
 * rowKey: {string} key
 * columns: {array} columns 的配置
 * data: {array} 表格中的数据
 *
 * columns 需要包含如下属性
 * title: {string} 列头
 * dataIndex: {string} 列应该显示数据中的哪一个属性的键名
 * key: {string} React 所需的 key，如果设置了 dataIndex 可以省略这个属性
 * render: {fn(text, row, index)} 可选，自定义显示列内容时需要这个属性
*/
class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.table.data || []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      data: nextProps.table.data
    };
  }

  render() {
    const data = this.state.data;
    const { __ } = this.props;
    const { columns, title, rowKey } = this.props.table;

    // 暂不进行分页
    return (
      <div className="uds-detail-table-container">
        {
          title ? <div className="table-title">{title}</div> : null
        }
        <div className="table-content">
          <Table columns={columns} dataSource={data} pagination={false} rowKey= {rowKey} locale={{emptyText: __.no_data }}/>
        </div>
      </div>
    );
  }
}

export default DetailTable;
