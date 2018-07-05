/** 多个输入框
 * required: bool 是否必需
 * hide: bool 隐藏
 * addValue: string 添加的文字
 * allData: array 所有的数据 allData=[{xxx: 'xxx', xx: 'xx'}]
 */

import React from 'react';

import { Select, Icon, Checkbox, Form } from 'antd';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;

class CheckboxTableModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: props.initData ? JSON.parse(JSON.stringify(props.initData)) : [],
      hide: props.hide,
      allData: [],
      options: props.options,
      userData: props.userData ? JSON.parse(JSON.stringify(props.userData)) : [],
      nameType: props.nameType || 'name'
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide,
      initData: nextProps.initData,
      options: nextProps.options,
      userData: nextProps.userData,
      nameType: nextProps.nameType
    };
  }

  initialze(state) {
    const inlen = (state.allData.length + state.initData.length) === 1;
    const userData = state.userData.filter(user => !state.allData.some(init => init.user_name === user.user_id));
    return (<div className="checkout-table-content">
      {state.allData.map((d, index) =>
        (<div className="content-wrapper" key={index}>
          <Select
            mode="combobox"
            value={d.user_name}
            style={{ width: '56px', marginRight: '4px' }}
            dropdownMatchSelectWidth={false}
            notFoundContent={this.props.__.no_data}
            onChange={this.onInputChange.bind(this, index)}
          >
            { userData.map((_d, _index) => <Option key={_d.id} value={_d.id}>{_d[state.nameType] || `(${_d.id.substring(0, 8)})`}</Option>) }
          </Select>
          <CheckboxGroup
            options={state.options}
            value={d.competence}
            onChange={this.onChange.bind(this, index)}
          />
          <Icon className={!inlen ? 'pointer' : ''} type="close" onClick={!inlen ? this.onDeleteClick.bind(this, index) : null} />
        </div>))}
    </div>);
  }

  initialzeData(state) {
    const len = (state.allData.length + state.initData.length) === 1;
    return (<div className="checkout-table-content">
      {state.initData.map((d, index) =>
        (<div className="content-wrapper" key={index}>
          <div className="label">{d.user_name}</div>
          <CheckboxGroup
            options={state.options}
            value={d.competence}
            onChange={this.onInitChange.bind(this, index)}
          />
          <Icon className={!len ? 'pointer' : ''} type="close" onClick={!len ? this.onDeleteInitClick.bind(this, index) : null} />
        </div>))}
    </div>);
  }

  onInputChange(index, value) {
    this.state.allData[index].user_name = value;

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({ allData: this.state.allData });
    });
  }

  onInitChange(index, value) {
    this.state.initData[index].competence = value;

    this.setState({
      initData: this.state.initData
    }, () => {
      this.triggerValue({ initData: this.state.initData });
    });
  }

  onChange(index, value) {
    this.state.allData[index].competence = value;

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({ allData: this.state.allData });
    });
  }

  onAddClick = (e) => {
    const addData = {};

    addData.user_name = '';
    addData.competence = [];
    this.state.allData.push(addData);

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({ allData: this.state.allData });
    });
  }

  onDeleteInitClick(index) {
    this.state.initData.splice(index, 1);

    this.setState({
      initData: this.state.initData
    }, () => {
      this.triggerValue({ initData: this.state.initData });
    });
  }

  onDeleteClick(index) {
    this.state.allData.splice(index, 1);

    this.setState({
      allData: this.state.allData
    }, () => {
      this.triggerValue({ allData: this.state.allData });
    });
  }

  triggerValue = (changeValue) => {
    const form = this.props.form;
    const data = Object.assign({}, this.state, changeValue);
    form.setFieldsValue({
      [this.props.field]: data
    });
  }

  valueIsEmpty(decorator) {
    const value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
    return value === undefined || value === '';
  }

  render() {
    const props = this.props,
      state = this.state,
      title = props.title,
      hideAddBtn = state.allData && state.initData && state.userData && (state.allData.length >= state.userData.length);

    let className = 'checkout-table-row';

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

    return (<FormItem
      className={className}
      label={props.label}
      required={props.required}
      {...formItemLayout}
    >
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || (!isRequired && this.valueIsEmpty(decorator))
        })(<div className="checkout-table">
          <div className="checkout-table-title">
            {
              title.map((t, index) => <div key={index}>{props.__[t]}</div>)
            }
          </div>
          {state.allData && state.initData && this.initialzeData(state)}
          {state.allData && state.initData && this.initialze(state)}
          <div className={hideAddBtn ? 'hide' : 'checkout-table-footer'}>
            <div className="icon" onClick={this.onAddClick}><Icon type="plus" /></div>
            <div onClick={this.onAddClick}>{props.__[props.addValue]}</div>
          </div>
        </div>)
      }
    </FormItem>);
  }
}

export default CheckboxTableModal;

