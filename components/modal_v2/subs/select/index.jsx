/**
 * required: bool 是否必需
 * hide: bool 隐藏
 * disabled: bool 不可用
 * multiple: bool 是否支持多选
 * data: array 待选数据 select时: data=[{id: xx, name: xxx}];
 *   optionGroup时：data=[{id: xx, name: xx, children: [{id: xxx, name: xxx}]}]
 * value: string|array(multiple) 选中值id
 * empty_text: obj 无数据时传入 empty_text={link_info: 'xxx'; info: 'xxx'}
 * link_info: string 链接提示
 * info: string 无数据时的提示信息
 * nameType: string 名称字段
 *
 * 必须填写的选项是: data
 */

import React from 'react';
import { Select, Form } from 'antd';

const { Option, OptGroup } = Select;

const FormItem = Form.Item;

class SelectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled || false,
      hide: props.hide || false,
      data: props.data,
      nameType: props.nameType || 'name'
    };
  }

  static defaultProps = {
    data: []
  };

  onLinkClick = () => {
    this.setState({
      clicked: true
    }, () => this.props.onAction(this.props.field, this.state));
  }

  valueIsEmpty(decorator) {

    let value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
    return value === undefined || value === ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.disabled,
      hide: nextProps.hide,
      data: nextProps.data,
      nameType: nextProps.nameType || 'name'
    };
  }

  initialize(props, state) {
    const __ = props.__,
      styleWidth = { width: props.width };

    if (props.empty_text) {
      if (props.empty_text.link_info) {
        return (
          <span className={'empty-text-label'}>
            {__[props.empty_text.info]}
            <a onClick={this.onLinkClick}>
              {
                props.empty_text.link_info.map(function(m) {
                  return __[m];
                }).join('')
              }
            </a>
          </span>
        );
      } else {
        return (
          <span className="empty-text-label">{__[props.empty_text.info]}</span>
        );
      }
    } else if (state.data) {
      switch(props.type) {
        case 'select':
          return <Select
            placeholder={props.placeholder}
            notFoundContent={__.no_data}
            style={styleWidth}
            disabled={state.disabled}
            mode={props.multiple ? 'multiple' : ''}
            multiple={props.multiple}>
            { state.data.map((d, index) => <Option key={d.id} value={d.id}>{d[state.nameType] || '(' + d.id.substring(0, 8) + ')'}</Option>) }
          </Select>;
        case 'optionGroup':
          return <Select
            placeholder={props.placeholder}
            style={styleWidth}
            disabled={state.disabled}
            getPopupContainer={trigger => trigger.parentNode}>
            { state.data.map((opt, index) => <OptGroup key={opt.id} label={opt.name}>
              { opt.children && opt.children.map(child => <Option key={child.id} value={child.id}>{child.name || '(' + child.id.substring(0, 8) + ')'}</Option>) }
            </OptGroup>
            )}
          </Select>;
        default:
          break;
      }
    }
  }

  render() {
    let state = this.state,
      props = this.props;

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
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || (!isRequired && this.valueIsEmpty(decorator))
        })(this.initialize(props, state))
      }
    </FormItem>;
  }
}

export default SelectModal;
