import React from 'react';
import OpSelect from './operations/select';

class Operation extends React.Component {
  constructor(props) {
    super(props);

    ['onChangeSelect'].forEach(func => this[func] = this[func].bind(this));
  }

  state = {
    operations: this.props.operations
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      operations: nextProps.operations
    };
  }

  onChangeSelect = (key, value, option) => {
    this.props.onAction('operation', 'select', {
      key: key,
      value: value
    });
  }

  handleCheckboxChange(operKey, key, e) {
    this.props.onAction('operation', 'checkbox', {
      key: operKey,
      value: key
    });
  }

  render() {
    const props = this.props,
      __ = props.__,
      state = this.state,
      tableLoading = props.loading,
      operations = state.operations;

    return (
      <div className="operations-wrapper">
        {
          operations.map((operation, i) => {
            if(operation.type === 'select') {
              // 下拉框类型
              return operation.data && operation.data.length > 0 ? <OpSelect
                key={i}
                __={__}
                operation={operation}
                tableLoading={tableLoading}
                onChangeSelect={this.onChangeSelect}
              /> : null;
            } else if(operation.type === 'checkbox') {
              // 类 checkbox 类型
              return operation.data && operation.data.length > 0 ?
                (
                  <div className="main-operation-checkbox-wrapper"
                    key={operation.key}>
                    <ul>
                      {
                        operation.data.map(item => {
                          return (
                            <li key={item.value}
                              className={item.checked ? 'checked' : ''}
                              onClick={this.handleCheckboxChange.bind(this, operation.key, item.value)}>
                              <span className="checkbox-content">
                                {__[item.name]}
                              </span>
                              {
                                // 额外的补充内容
                                item.suffix
                              }
                            </li>
                          );
                        })

                      }
                    </ul>
                  </div>
                ) : null;
            } else {
              return null;
            }
          })
        }
      </div>
    );
  }
}

export default Operation;
