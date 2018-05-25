/** 开关
 * required: bool 是否必需
 * hide: bool 隐藏
 * disabled: bool 不可用
 * checkedChildren: string 选中时的内容
 * unCheckedChildren: string 非选中时的内容
 * loading: bool 加载中的开关
 * size: string 大小 large|default|small
 * defaultChecked: bool 默认状态
 *
 * 必需项: checkedChildren, unCheckedChildren,
 */
import React from 'react';
import { Switch, Form } from 'antd';

const FormItem = Form.Item;

class Switchs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedChildren: props.checkedChildren,
      unCheckedChildren: props.unCheckedChildren,
      disabled: props.disabled,
      loading: props.loading,
      size: props.size,
      hide: props.hide
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.disabled,
      hide: nextProps.hide
    };
  }

  valueIsEmpty(decorator) {

    let value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
    return value === undefined || value === ''
  }

  render() {
    let props = this.props,
      state = this.state;
    let className = '';

    if (this.state.hide) {
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
      label={props.label}
      className={className}
      {...formItemLayout}
      extra={props.extra}>
      {
        decorator && getFieldDecorator(decorator.id, {
          valuePropName: 'checked',
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || (!isRequired && this.valueIsEmpty(decorator))
        })(
          <Switch
            size={state.size}
            disabled={state.disabled}
            loading={state.loading}
            checkedChildren={state.checkedChildren}
            unCheckedChildren={state.unCheckedChildren}/>
        )
      }
    </FormItem>;
  }
}

export default Switchs;
