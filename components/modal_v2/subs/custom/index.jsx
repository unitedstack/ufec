import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;


class InputModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  onChange = () => {
    this.setState({
      value: 'clicked'
    }, () => {
      this.props.form.setFieldsValue({
        [this.props.field]: this.state.value
      });
    });
  }

  render() {
    const props = this.props,
      state = this.state;
    let className = '';

    className += state.hide ? ' hide' : '';

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const decorator = props.decorator;

    const { getFieldDecorator } = this.props.form;

    return (<div className={props.className}>
      <FormItem
        label={props.label}
        required={props.required}
        className={className}
        {...formItemLayout}
        validateStatus={state.status}
        help={props.__[state.msg] || state.msg}
      >
        {
          decorator && !state.hide ? getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue
          })(<button onClick={this.onChange}>hahahaah</button>) : <div />
        }
      </FormItem>
    </div>);
  }
}

export default InputModal;
