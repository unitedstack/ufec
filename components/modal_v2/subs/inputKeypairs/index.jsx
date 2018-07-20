/**
 * customConfiguration: 添加配置的i18n翻译,
 * addCustomConfiguration: 组件命名的i18n翻译,
 * inputkey: 第一个输入框的i18n,
 * inputvalue: 第二个输入框的i18n,
 * metaData: {}
 */

import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const MetaPair = ({
  keyName,
  valueForkey,
  valueForValue,
  getFieldDecorator,
  handleCancleMetaData,
  onChange,
  inputkey,
  inputvalue
}) =>
  (
    <div className="meta-pair" id={keyName}>
      {
        getFieldDecorator(`${keyName}-key`, { initialValue: valueForkey })(<Input
          className="meta-data meta-data-key"
          placeholder={inputkey}
          onChange={(e) => { onChange(e); }}
        />)
      }
      {
        getFieldDecorator(`${keyName}-value`, { initialValue: valueForValue })(<Input
          className="meta-data meta-data-value"
          placeholder={inputvalue}
          onChange={(e) => { onChange(e); }}
        />)
      }
      <Button icon="close" type="primary" className="meta-data-cancel" onClick={(e) => { handleCancleMetaData(e); }} />
    </div>
  );

const getkeyNumber = obj => Object.keys(obj).length;
const getMetaDataId = (obj) => {
  const len = getkeyNumber(obj);
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(`meta-data-${i}`);
  }
  return result;
};

const assembleMetaData = (metaData) => {
  const len = getkeyNumber(metaData);
  const metaDataId = getMetaDataId(metaData);
  const metaDataKey = Object.keys(metaData);
  const result = [];
  if (len) {
    metaDataKey.forEach((key, index) => {
      result.push([metaDataId[index], key, metaData[key]]);
    });
    return result;
  }
  return result;
};

class InputKeypairs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      metaData: assembleMetaData(this.props.metaData),
      addCustomConfiguration: props.addCustomConfiguration,
      customConfiguration: props.customConfiguration,
      inputkey: props.inputkey,
      inputvalue: props.inputvalue
    };
    this.number = getkeyNumber(this.props.metaData);
  }


  handleCancleMetaData = (e) => {
    const cancleMetaData = e.target.parentNode;
    const key = cancleMetaData.getAttribute('id');
    let metaData = this.state.metaData;
    metaData = metaData.filter(data => data[0] !== key);
    this.setState({
      metaData
    });
    this.props.getMetaData(metaData);
  }

  onInputChange = (e) => {
    const attr = e.target.id.match(/(.+)-(.+)/);
    const id = attr[1];
    const key = attr[2];
    const value = e.target.value;
    const metaData = this.state.metaData;
    metaData.forEach((data) => {
      if (data[0] === id) {
        switch (key) {
          case 'key':
            data[1] = value;
            break;
          case 'value':
            data[2] = value;
            break;
          default:
            break;
        }
      }
    });
    this.setState({
      metaData
    });
    this.props.getMetaData(metaData);
  }

  handleAddMetaData = () => {
    this.number += 1;
    const metaData = this.state.metaData;
    metaData.push([`meta-data-${this.number}`]);
    this.setState({
      metaData,
    });
    this.props.getMetaData(metaData);
  }

  render() {
    const { metaData, inputkey, inputvalue } = this.state;
    return (
      <FormItem
        label={this.state.customConfiguration}
        {...formItemLayout}
      >
        <div className="meta-data-wrapper">
          <div className="meta-data-content">
            <div className="meta-data-title">
              <span>{inputkey}</span>
              <span>{inputvalue}</span>
            </div>
            <div className="meta-data-input-wrapper">
              {
                metaData.map(data =>
                  (
                    <MetaPair
                      key={data[0]}
                      keyName={data[0]}
                      valueForkey={data[1]}
                      valueForValue={data[2]}
                      getFieldDecorator={this.props.form.getFieldDecorator}
                      handleCancleMetaData={this.handleCancleMetaData}
                      onChange={this.onInputChange}
                      inputkey={inputkey}
                      inputvalue={inputvalue}
                    />
                  ))
              }
            </div>
          </div>
          <div
            className="meta-data-add-btn-wrapper"
            onClick={this.handleAddMetaData}
          >
            <Button className="meta-add-btn" icon="plus" type="primary" size="small" />
            <span>{this.state.addCustomConfiguration}</span>
          </div>
        </div>
      </FormItem>
    );
  }
}

export default InputKeypairs;
