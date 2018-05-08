import React from 'react';
import {Select} from 'antd';

class OpSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    operation: this.props.operation,
    value: this.props.operation.value || this.props.operation.data[0].value,
    disabled: this.props.operation.disabled,
    data: this.props.operation.data,
    tableLoading: this.props.tableLoading
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const operation = nextProps.operation;
    return {
      value: operation.value || prevState.value,
      disabled: operation.disabled,
      data: operation.data,
      tableLoading: nextProps.tableLoading
    };
  }

  onChangeSelect = (key, value, option) => {
    this.setState({
      value: value
    }, () => {
      this.props.onChangeSelect(key, value, option);
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    const __ = props.__;
    const operation = state.operation;
    return (
      <Select
        disabled={state.tableLoading || state.disabled}
        onChange={this.onChangeSelect.bind(this, operation.key)}
        value={state.value}
        style={{width: operation.width || 100}}>
        {
          state.data.map(d => <Select.Option
            key={d.value}
            value={d.value}>
            {operation.transpile ? __[d.name] : d.name}
            {d.suffix}
          </Select.Option>)
        }
      </Select>
    );
  }
}

export default OpSelect;
