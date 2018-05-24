/** 多选框
 *
 * required: bool 是否必需
 * hide: bool 隐藏
 * data: array 数据 data=[{label: xxx, value: xxx}]
 * defaultValue: string 默认值
 * hasLabel: bool 是否显示field
 *
 * 必需项: data
 */

import React from 'react';
import { Checkbox, Form } from 'antd';

const FormItem = Form.Item;

const CheckboxGroup = Checkbox.Group;

class CheckboxModal extends React.Component {
  constructor(props) {
    super(props);

    const _data = JSON.parse(JSON.stringify(props.data));

    _data.forEach(op => op.label = props.__[op.label] || op.label);

    this.state = {
      hide: props.hide,
      options: _data
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide,
      disabled: nextProps.disabled
    };
  }

  render() {
    const props = this.props,
      state = this.state;

    let className = '';

    if (this.state.hide) {
      className += ' hide';
    }

    if (!props.hasLabel) {
      className += ' hidden';
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
      {...formItemLayout}
      extra={props.extra}>
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired
        })(
          <CheckboxGroup options={state.options} />
        )
      }
    </FormItem>;
  }
}

export default CheckboxModal;