/** 多个输入框
 * required: bool 是否必需
 * hide: bool 隐藏
 * addValue: string 添加的文字
 * allData: array 所有的数据 allData=[{xxx: 'xxx', xx: 'xx'}]
 */

import React from 'react';

import { Input, Icon, Checkbox, Form } from 'antd';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class CheckboxTableModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: props.initData ? JSON.parse(JSON.stringify(props.initData)) : [],
      hide: props.hide,
      allData: [],
      options: props.options
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide,
      initData: nextProps.initData,
      options: nextProps.options
    };
  }

  initialze(state) {
    const inlen = (state.allData.length + state.initData.length) === 1;
    return <div className="checkout-table-content">
      {state.allData.map((d, index) =>
        <div className="content-wrapper" key={index}>
          <Input type='input' value={d.user_name} onChange={this.onInputChange.bind(this, index)}/>
          <CheckboxGroup
            options={state.options}
            value={d.competence}
            onChange={this.onChange.bind(this, index)} />
          <Icon className={!inlen ? 'pointer' : ''} type="close" onClick={!inlen ? this.onDeleteClick.bind(this, index) : null}/>
        </div>)}
    </div>;
  }

  initialzeData(state) {
    const len = (state.allData.length + state.initData.length) === 1;
    return <div className="checkout-table-content">
      {state.initData.map((d, index) =>
        <div className="content-wrapper" key={index}>
          <div className="label">{d.user_name}</div>
          <CheckboxGroup
            options={state.options}
            value={d.competence}
            onChange={this.onInitChange.bind(this, index)} />
          <Icon className={!len ? 'pointer' : ''} type="close" onClick={!len ? this.onDeleteInitClick.bind(this, index) : null}/>
        </div>)}
    </div>;
  }

  onInputChange(index, e) {
    this.state.allData[index].user_name = e.target.value;

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({allData: this.state.allData});
    });
  }

  onInitChange(index, value) {
    this.state.initData[index].competence = value;

    this.setState({
      initData: this.state.initData
    }, () => {
      this.triggerValue({initData: this.state.initData});
    });
  }

  onChange(index, value) {
    this.state.allData[index].competence = value;

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({allData: this.state.allData});
    });
  }

  onAddClick = (e) => {
    let addData = {};

    addData.user_name = '';
    addData.competence = [];
    this.state.allData.push(addData);

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({allData: this.state.allData});
    });
  }

  onDeleteInitClick(index) {
    this.state.initData.splice(index, 1);

    this.setState({
      initData: this.state.initData
    }, () => {
      this.triggerValue({initData: this.state.initData});
    });
  }

  onDeleteClick(index) {
    this.state.allData.splice(index, 1);

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({allData: this.state.allData});
    });
  }

  triggerValue = (changeValue) => {
    const form = this.props.form;
    const data = Object.assign({}, this.state, changeValue);
    form.setFieldsValue({
      [this.props.field]: data
    });
  }

  render() {
    let props = this.props,
      state = this.state,
      title = props.title,
      className = 'checkout-table-row';

    if (this.state.hide) {
      className += ' hide';
    }

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const decorator = props.decorator;

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    return <FormItem
      className={className}
      label={props.label}
      required={props.required}
      {...formItemLayout}>
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide
        })(
          <div className="checkout-table">
            <div className="checkout-table-title">
              {
                title.map((t, index) => <div key={index}>{props.__[t]}</div>)
              }
            </div>
            {state.allData && state.initData && this.initialzeData(state)}
            {state.allData && state.initData && this.initialze(state)}
            <div className="checkout-table-footer">
              <div className="icon" onClick={this.onAddClick}><Icon type="plus" /></div>
              <div onClick={this.onAddClick}>{props.__[props.addValue]}</div>
            </div>
          </div>
        )
      }
    </FormItem>;
  }
}

export default CheckboxTableModal;

