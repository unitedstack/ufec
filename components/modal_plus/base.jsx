/**
 * index.js 传的function props
 *
 * 1. onInitialize(form) -- 可选
 * 2. beforeSubmit(values, from, trueSubmit) -- 可选
 * 3. onSubmit(values, cb, closeImmediately) -- 必选
 * 4. onAction(field, value, form, updateFields) -- 可选
 */

import React from 'react';

import { Button, Form, Icon } from 'antd';

import Input from '../modal_v2/subs/input/index';
import InputNumber from '../modal_v2/subs/inputNumber/index';
import Radio from '../modal_v2/subs/radio/index';
import Select from '../modal_v2/subs/select/index';
import Slider from '../modal_v2/subs/slider/index';
import Switch from '../modal_v2/subs/switch/index';
import Alert from '../modal_v2/subs/alert/index';
import AlertWithClick from '../modal_v2/subs/alertWithClick/index';
import AutoComplete from '../modal_v2/subs/autoComplete/index';
import Checkbox from '../modal_v2/subs/checkbox/index';
import CheckboxTable from '../modal_v2/subs/checkboxTable/index';
import Text from '../modal_v2/subs/text/index';
import IconLabel from '../modal_v2/subs/iconLabel/index';
import TreeSelect from '../modal_v2/subs/treeSelect/index';

import event from './event';
import deepClone from '../../utils/deep_clone';
import convert from './convert';

class ModalBase extends React.Component {

  constructor(props) {
    super(props);
    this.__ = props.__;
    const config = deepClone(props.config);
    this.state = {
      config: config,
      disabled: config.btn.disabled === undefined ? false : config.btn.disabled,
      loading: false,
      error: false,
      className: 'component_modal_plus'
    };

    convert(this.state.config, props.__);
  }

  initialize() {
    let config = this.state.config;
    return config.fields.map((m) => {
      m.label = this.__[m.field] || m.field;
      m.__ = this.__;
      m.form = this.props.form;

      let subComs = {
        'input': Input,
        'textarea': Input,
        'searchInput': Input,
        'groupInput': Input,
        'inputNumber': InputNumber,
        'radio': Radio,
        'select': Select,
        'optionGroup': Select,
        'slider': Slider,
        'switch': Switch,
        'alert': Alert,
        'alertWithClick': AlertWithClick,
        'autoComplete': AutoComplete,
        'checkbox': Checkbox,
        'checkboxTable': CheckboxTable,
        'text': Text,
        'iconLabel': IconLabel,
        'treeSelect': TreeSelect
      };

      let Sub = subComs[m.type];
      return Sub ? <Sub key={m.field} onAction={this.onAction} {...m}/> : null;
    });
  }

  onAction = (field, value) => {
    this.props.onAction && this.props.onAction(field, value, this.props.form, this.updateFields);
  }

  componentDidMount() {
    const _config = this.state.config;
    // Fire initialize function
    setTimeout(() => {
      this.props.onInitialize && this.props.onInitialize(this.props.form, this.updateFields);
    });
    // Animation
    this.setState({
      className: 'component_modal_plus modal-enter modal-enter-active'
    }, () => {
      setTimeout(() => {
        this.setState({
          className: 'component_modal_plus'
        });
      }, 200);
    });
    // EventEmitter
    event.on('valuesChange', (value) => {
      let field = Object.keys(value)[0];
      let currentField = _config.fields.find(f => f.field === field);
      let linkList = currentField && currentField.linkList;
      if(linkList && linkList.length && linkList.length > 0) {
        linkList.forEach(link => {
          let id = link.id;
          const keys = Object.keys(link);
          keys.forEach(key => {
            if(key !== 'id') {
              _config.fields.find(f => f.field === id)[key] = ( typeof link[key] === 'function' ? link[key](value[field]) : link[key] );
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
  updateFields = fields => {
    const _config = this.state.config;
    if(Object.prototype.toString.call(fields) === '[object Object]') {
      const fieldKeys = Object.keys(fields);
      fieldKeys.forEach(fk => {
        let keys = Object.keys(fields[fk]);
        keys.forEach(key => {
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
                this.onCancel();
              } else {
                if (errorMessage) {
                  this.setState({
                    message: errorMessage,
                    error: true
                  });
                  this.setState({
                    loading: false
                  });
                }
              }
            }, this.closeImmediately, this.setBtnDisabled);
          });
        };
        if(props.beforeSubmit) {
          props.beforeSubmit(values, props.form, trueSubmit);
        } else {
          trueSubmit();
        }
      }
    });
  }

  onCancel = () => {
    this.setState({
      className: 'component_modal_plus modal-leave modal-leave-active'
    }, () => {
      setTimeout(() => {
        this.props.onAfterClose();
      }, 200);
    });
  }

  render() {
    let props = this.props,
      state = this.state,
      __ = this.__;

    let title = props.config.title.map(function(m) {
      return __[m];
    }).join('');

    return (
      <div className={this.state.className}>
        <div className="title"><span onClick={this.onCancel}>
          <Icon type="left" />{title}</span>
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Form onSubmit={this.handleSubmit}>
              {this.initialize()}
              <Alert __={__} message={state.message} hide={!state.error} tip_type="error" />
              <div className="btn-wrapper">
                <Button className="cancel-button" type="dashed" ref="btn" onClick={this.onCancel}>{__.cancel}</Button>
                <Button className="create-button" loading={state.loading} type={props.config.btn.type} htmlType="submit">{__[props.config.btn.value]}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({
  onValuesChange: (props, values) => {
    event.emit('valuesChange', values);
  }
})(ModalBase);
