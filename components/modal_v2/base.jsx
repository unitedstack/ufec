/**
 * index.js 传的function props
 *
 * 1. onInitialize(form) -- 可选
 * 2. beforeSubmit(values, from, trueSubmit) -- 可选
 * 3. onSubmit(values, cb, closeImmediately) -- 必选
 * 4. onAction(field, value, form, updateFields) -- 可选
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button, Form } from 'antd';

import Input from './subs/input/index';
import InputNumber from './subs/inputNumber/index';
import Radio from './subs/radio/index';
import Select from './subs/select/index';
import Slider from './subs/slider/index';
import Switch from './subs/switch/index';
import Alert from './subs/alert/index';
import AlertWithClick from './subs/alertWithClick/index';
import AutoComplete from './subs/autoComplete/index';
import Checkbox from './subs/checkbox/index';
import CheckboxTable from './subs/checkboxTable/index';
import Text from './subs/text/index';
import IconLabel from './subs/iconLabel/index';
import TreeSelect from './subs/treeSelect/index';
import DatePicker from './subs/datePicker/index';
import CustomDoubleInput from './subs/customDoubleInput/index';

import Custom from './subs/custom/index';

import event from './event';
import deepClone from '../../utils/deep_clone';
import convert from './convert';

class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    this.__ = props.__ || {};
    const config = deepClone(props.config);
    this.state = {
      config,
      disabled: config.btn.disabled === undefined ? false : config.btn.disabled,
      visible: true,
      loading: false,
      error: false
    };

    convert(this.state.config, this.__);
  }

  initialize() {
    const config = this.state.config;
    return config.fields.map((m) => {
      m.label = this.__[m.field] || m.field;
      m.__ = this.__;
      m.form = this.props.form;

      const subComs = {
        input: Input,
        textarea: Input,
        searchInput: Input,
        groupInput: Input,
        password: Input,
        inputNumber: InputNumber,
        radio: Radio,
        select: Select,
        optionGroup: Select,
        slider: Slider,
        switch: Switch,
        alert: Alert,
        alertWithClick: AlertWithClick,
        autoComplete: AutoComplete,
        checkbox: Checkbox,
        custom: Custom,
        checkboxTable: CheckboxTable,
        text: Text,
        iconLabel: IconLabel,
        treeSelect: TreeSelect,
        datePicker: DatePicker,
        customDoubleInput: CustomDoubleInput
      };

      const Sub = subComs[m.type];
      return Sub ? <Sub key={m.field} onAction={this.onAction} {...m} /> : null;
    });
  }

  onAction = (field, value) => {
    this.props.onAction && this.props.onAction(field, value, this.props.form, this.updateFields);
  }

  componentDidMount() {
    const index = window.modalRefList.length;
    const _config = this.state.config;
    setTimeout(() => {
      this.props.onInitialize && this.props.onInitialize(this.props.form, this.updateFields);
    });
    event.on(`valuesChange_${index}`, (value) => {
      const field = Object.keys(value)[0];
      const currentField = _config.fields.find(f => f.field === field);
      const linkList = currentField && currentField.linkList;
      if (linkList && linkList.length && linkList.length > 0) {
        linkList.forEach((link) => {
          const id = link.id;
          const keys = Object.keys(link);
          keys.forEach((key) => {
            if (key !== 'id') {
              _config.fields.find(f => f.field === id)[key] = (typeof link[key] === 'function' ? link[key](value[field]) : link[key]);
            }
          });
        });
        this.setState({
          config: _config
        });
      }

      this.props.onAction && this.props.onAction(field, value[field], this.props.form, this.updateFields, this.setBtnDisabled);
    });
  }

  /**
   * @des -- Update specify field's props
   * @param {Object} fields -- {fieldName: {disabled: true}}
   */
  updateFields = (fields) => {
    const _config = this.state.config;
    if (Object.prototype.toString.call(fields) === '[object Object]') {
      const fieldKeys = Object.keys(fields);
      fieldKeys.forEach((fk) => {
        const keys = Object.keys(fields[fk]);
        keys.forEach((key) => {
          _config.fields.find(f => f.field === fk)[key] = fields[fk][key];
        });
      });

      this.setState({
        config: _config
      });
    }
  }

  handleSubmit = (e) => {
    const props = this.props;
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const trueSubmit = () => {
          this.setState({
            loading: true
          }, () => {
            props.onConfirm(values, (success, errorMessage) => {
              if (success) {
                this.dealChainPop(() => {
                  this.setState({
                    visible: false,
                    loading: false
                  });
                });
              } else if (errorMessage) {
                this.setState({
                  message: errorMessage,
                  error: true
                });
                this.setState({
                  loading: false
                });
              }
            }, this.closeImmediately, this.setBtnDisabled);
          });
        };
        if (props.beforeSubmit) {
          props.beforeSubmit(values, props.form, trueSubmit);
        } else {
          trueSubmit();
        }
      }
    });
  }

  setBtnDisabled = (bool) => {
    this.setState({
      disabled: bool
    });
  }

  onCancel = () => {
    this.dealChainPop(() => {
      this.setState({
        visible: false
      });
    });
  }

  closeImmediately = (cb) => {
    this.setState({
      visible: false
    }, () => {
      setTimeout(() => {
        cb && cb();
        window.modalRefList = [];
        this.props.onAfterClose();
      }, 300);
    });
  }

  dealChainPop = (cb) => {
    const refList = window.modalRefList;
    const index = refList.length;
    const len = refList.length;
    if (refList && refList.length > 1) {
      refList[len - 2].current.setState({
        loading: false,
        visible: true
      }, () => {
        refList.pop();
        // 清理全局事件中的当前pop的事件
        event.off([`valuesChange_${index}`]);
        setTimeout(() => {
          ReactDOM.unmountComponentAtNode(this.props.childNodes[len - 1]);
        }, 300);
      });
    } else {
      refList.pop();
      setTimeout(() => {
        this.props.onAfterClose();
      }, 300);
    }
    cb && cb();
  }

  onKeyDown = (e) => {
    // Modal自带ESC监听，所以无需处理

    // Enter keyCode === 13
    if (this.state.visible && e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  modalRef = React.createRef();

  render() {
    const props = this.props,
      state = this.state,
      __ = this.__,
      btn = props.config.btn;

    const title = props.config.title.map(m => __[m]).join('');

    // 多级pop, 存放modal
    const div = Array.from(document.querySelectorAll('#modal-container > div'));
    const container = div[div.length - 1];

    return (
      // wrapper for keyboard listener.
      <div onKeyDown={this.onKeyDown}>
        <Modal
          title={title}
          ref={this.modalRef}
          visible={state.visible}
          bodyStyle={{ padding: '24px 50px 24px 0' }}
          width={props.width || 540}
          className={props.modalClassName || ''}
          getContainer={() => container}
          onCancel={this.onCancel}
          maskClosable={false}
          footer={[
            <Button key="cancel" type="dashed" onClick={this.onCancel}>{__.cancel}</Button>,
            <Button
              key="confirm"
              type={btn.type || 'primary'}
              onClick={this.handleSubmit}
              htmlType="submit"
              disabled={state.disabled}
              loading={state.loading}
            >
              {__[btn.value]}
            </Button>
          ]}
        >
          <Form>
            { this.initialize() }
            <Alert __={__} message={state.message} hide={!state.error} tip_type="error" />
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({
  onValuesChange: (props, values) => {
    const index = window.modalRefList.length;
    event.emit(`valuesChange_${index}`, values);
  }
})(ModalBase);
