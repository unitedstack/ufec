/**自动补全(模糊搜索)
 *
 * required: bool 是否必需
 * hide: bool 隐藏
 * placeholder: string
 * width: number 自定义宽度
 * dataSource: array 自动补全的候补数据 dataSource=['xxx', 'xx', 'x']
 * value: string 输入值
 *
 * 必需项: dataSource
 */

import React from 'react';

import { AutoComplete, Form } from 'antd';
const FormItem = Form.Item;

class AutoCompleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.dataSource || [],
      hide: props.hide,
      placeholder: props.placeholder
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide,
      disabled: nextProps.disabled,
      placeholder: nextProps.placeholder
    };
  }

  render() {
    const { dataSource } =  this.state,
      props = this.props,
      state = this.state,
      styleWidth = {width: props.width};

    let className = '';
    if (state.hide) {
      className += ' hide';
    }

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const decorator = props.decorator;

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    const isRequired = decorator && decorator.rules && decorator.rules.some(rule => rule.required);

    return <FormItem
      className={className}
      label={props.label}
      {...formItemLayout}>
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired
        })(
          <AutoComplete
            dataSource={dataSource}
            style={styleWidth}
            placeholder={state.placeholder}
            filterOption={true}
            defaultActiveFirstOption={false}
            disabled={state.disabled}/>
        )
      }
    </FormItem>;
  }
}

export default AutoCompleteModal;
