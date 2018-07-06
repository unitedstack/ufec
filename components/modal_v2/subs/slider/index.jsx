/**
 * required: bool 是否必需
 * hide: bool 隐藏
 * disabled: bool 不可用
 * min: number
 * max: number
 * text: string 文字
 */
import React from 'react';
import { Slider, InputNumber, Form } from 'antd';

const FormItem = Form.Item;

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min,
      max: props.max,
      hide: props.hide,
      disabled: props.disabled,
      text: props.text,
      value: props.decorator.initialValue
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.disabled,
      hide: nextProps.hide
    };
  }

  onChange = (value) => {
    this.setState({
      value
    }, () => {
      this.props.form.setFieldsValue({
        [this.props.field]: this.state.value
      });
    });
  }

  onSliderChange = (value) => {
    this.setState({
      value
    }, () => {
      this.props.form.setFieldsValue({
        [this.props.field]: this.state.value
      });
    });
  }

  valueIsEmpty(decorator) {
    const value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
    return value === undefined || value === '';
  }

  render() {
    const props = this.props,
      state = this.state,
      min = state.min,
      max = state.max,
      disabled = state.disabled;

    let className = 'slider-row';

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

    return (<FormItem
      label={props.label}
      className={className}
      {...formItemLayout}
      extra={props.extra}
    >
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || (!isRequired && this.valueIsEmpty(decorator))
        })(<div>
          <Slider
            min={min}
            max={max}
            step={props.step}
            disabled={disabled}
            onChange={this.onSliderChange}
            value={state.value}
            style={{ width: '258px' }}
          />
          <InputNumber
            min={min}
            max={max}
            value={state.value}
            style={{ marginLeft: 10, width: 78 }}
            onChange={this.onChange}
          />
        </div>)
      }
      {
        <div className="range">{state.text ? state.text : (`${min}-${max}${props.unit}`)}</div>
      }
    </FormItem>);
  }
}

export default Slide;
