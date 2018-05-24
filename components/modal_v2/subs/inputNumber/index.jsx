/** 数字输入框
 *
 * required: bool 是否必需
 * hide: bool 隐藏
 * disabled: bool 不可用,
 * value: string 输入值
 * min: number 最小值
 * max: number 最大值
 * step: number 步数
 * addonAfter: string 后缀
 * tipTitle: hover显示的tip信息
 *
 * 必需项: max
 */
import React from 'react';
import { InputNumber, Form, Tooltip } from 'antd';

const FormItem = Form.Item;

class InputNumberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min || 0,
      max: props.max,
      disabled: props.disabled || false,
      hide: props.hide
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide,
      disabled: nextProps.disabled,
      max: nextProps.max
    };
  }

  render() {
    let state = this.state,
      props = this.props;

    let className = 'input-number-wrapper';
    const addonAfter = props.addonAfter && props. __[props.addonAfter] ? props.__[props.addonAfter] : props.addonAfter;

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
      <Tooltip
        title={props.__[props.tipTitle] || props.tipTitle}
        placement="topLeft">
        {
          decorator && getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue,
            onChange: decorator.onChange,
            hidden: state.hide || !isRequired
          })(
            <InputNumber
              min={state.min}
              max={state.max}
              step={props.step}
              disabled={state.disabled} />
          )
        }
      </Tooltip>
      <span className={props.addonAfter ? 'input-number-addon' : 'hide'}>{addonAfter}</span>
    </FormItem>;
  }
}

export default InputNumberModal;
