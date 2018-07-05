/** input/textarea/searchInput/groupInput
 *
 * required: bool 是否必需
 * hide: bool 隐藏
 * disabled: bool 不可用
 * value: string 输入信息
 * placeholder： string
 * width: number
 *
 * input:
 * addonAfter: string 后缀
 * tipTitle: string input提示
 *
 * textarea:
 * rows: number 行数(默认4)
 *
 * searchInput:
 * enterButton: string|ReactMode 按钮文字
 *
 * groupInput:
 * data: array 数据 data=['x', 'xx'] 必需
 *
 * password
 */
import React from 'react';
import { Input, Select, AutoComplete, Form, Icon } from 'antd';

const FormItem = Form.Item;

const { TextArea, Search } = Input;
const Option = Select.Option;

const InputGroup = Input.Group;

class InputModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide,
      disabled: props.disabled,
      // inputType: props.inputType || 'text',
      // groupInput: props.defaultValue || (props.data && props.data[0]),
      placeholder: props.placeholder && (props.__[props.placeholder] || props.placeholder),
      passwordType: 'password'
    };
  }

  togglePasswordVisiable = () => {
    this.setState({
      passwordType: this.state.passwordType === 'password' ? 'text' : 'password'
    });
  }

  // input: this.inputRef.input.value
  // search: this.inputRef.input.input.value
  // search.enterButton: 可选值(true, false(默认), 任意字符串(比如Search))
  // size: 指高度

  initialize(props) {
    const state = this.state;
    const styleWidth = { width: props.width },
      __ = props.__,
      addonAfter = props.addonAfter && __[props.addonAfter] ? __[props.addonAfter] : props.addonAfter;

    switch (props.type) {
      case 'input':
        return (<Input
          style={styleWidth}
          addonAfter={addonAfter}
          placeholder={state.placeholder}
          disabled={this.state.disabled}
          type={props.inputType || 'text'}
        />);
      case 'textarea':
        return (<TextArea
          style={styleWidth}
          rows={props.rows || 4}
          placeholder={state.placeholder}
          disabled={this.state.disabled}
        />);
      case 'searchInput':
        return (<Search
          style={styleWidth}
          disabled={this.state.disabled}
          placeholder={state.placeholder}
          enterButton={props.enterButton || false}
        />);
      case 'groupInput':
        return (<InputGroup>
          <Select
            getPopupContainer={trigger => trigger.parentNode}
          >
            {
              props.data && props.data.map((dt, index) => <Option key={index} value={dt}>{__[dt]}</Option>)
            }
          </Select>
          <AutoComplete
            style={styleWidth}
            placeholder={state.placeholder}
          />
        </InputGroup>);
      case 'password':
        return (<div className="password-wrapper">
          <Input
            style={styleWidth}
            placeholder={state.placeholder}
            disabled={this.state.disabled}
            type={this.state.passwordType}
          />
          <span className={`eye-wrapper${state.passwordType === 'password' ? '' : ' active'}`}>
            <Icon onClick={this.togglePasswordVisiable} type="eye" />
          </span>
        </div>);
      default:
        break;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.disabled,
      hide: nextProps.hide,
      placeholder: nextProps.placeholder
    };
  }

  valueIsEmpty(decorator) {
    const value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
    return value === undefined || value === '';
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

    const isRequired = decorator && decorator.rules && decorator.rules.some(rule => rule.required);

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    return (<div className={props.className}>
      <FormItem
        label={props.label}
        required={props.required}
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
          })(this.initialize(props))
        }
      </FormItem>
    </div>);
  }
}

export default InputModal;
