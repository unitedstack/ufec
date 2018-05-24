/** 单选框
 *
 * required: bool 是否必需
 * hide: bool 隐藏
 * disabled: bool 不可用
 * button: 是圆形还是按钮
 * itemWidth: 当是按钮的时候设置按钮的宽度，默认是144px
 * decorator: 看Form的文档的getFieldDecorator api {Object}
 * data: array 单选数据 data=[{id: xxx, name: xxx}]
 */
import React from 'react';
import { Radio, Form } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

class RadioModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled || false,
      data: props.data,
      hide: props.hide
    };
  }

  render() {
    let state = this.state,
      props = this.props,
      className = 'radio-row';

    if (this.state.hide) {
      className += ' hide';
    }

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const _Radio = props.button ? RadioButton : Radio;
    const decorator = props.decorator;

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    const isRequired = decorator && decorator.rules && decorator.rules.some(rule => rule.required);


    return <FormItem
      label={props.label}
      {...formItemLayout}
      className={className}
      extra={props.extra}>
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || !isRequired
        })(
          <RadioGroup disabled={state.disabled}>
            {
              state.data && state.data.map((d, index) => <_Radio style={{width: props.itemWidth || 144}} key={d.id} value={d.id}>{d.name || '(' + d.id.substring(0, 8) + ')'}</_Radio>)
            }
          </RadioGroup>
        )
      }
    </FormItem>;
  }
}

export default RadioModal;
