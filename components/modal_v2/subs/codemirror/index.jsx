/**
 * 这个组件集成了codemirror
 *
 * 支持的lang为: ['xml', 'htmlmixed', 'css', 'javascript', 'yaml', 'python']
 * 支持的theme为: ['material', 'neat']
 * lineNumbers: 是否显示行号
 * height: 代码块的最大高度
 */

import React from 'react';
import { Form } from 'antd';

// 就不能考虑一下es module吗？难受
const CodeMirror = require('codemirror');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/yaml/yaml.js');
require('codemirror/mode/python/python.js');

const FormItem = Form.Item;
const LANGUAGES = ['xml', 'htmlmixed', 'css', 'javascript', 'yaml', 'python'];

class CodemirrorModal extends React.Component {
  constructor(props) {
    super(props);

    if (!~LANGUAGES.indexOf(this.props.lang)) {
      throw new Error(`Only support ${LANGUAGES}`);
    }

    this.state = {
      value: this.props.decorator.initialValue || '',
      theme: this.props.theme || 'neat',
      lang: this.props.lang || 'yaml',
      lineNumbers: typeof this.props.lineNumbers === 'boolean' ? this.props.lineNumbers : true
    };
  }

  componentDidMount() {
    const state = this.state;
    this.editor = CodeMirror(this.ref, {
      value: state.value,
      mode: state.lang,
      theme: state.theme,
      lineNumbers: state.lineNumbers,
      matchBrackets: true
    });
    this.editor.on('change', (codemirrorIns, codemirrorObj) => {
      this.onChange(this.editor.getValue());
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // 通过updateFields设置初始值
    const oldInitValue = prevProps.decorator.initialValue;
    const newInitValue = this.props.decorator.initialValue;
    if (oldInitValue !== newInitValue) {
      this.editor.setValue(newInitValue);
    }
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

  render() {
    const props = this.props,
      state = this.state;
    let className = 'codemirror-wrapper';

    className += state.hide ? ' hide' : '';

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const decorator = props.decorator;
    const { getFieldDecorator } = props.form;
    const style = { height: props.height || 200 };

    return (<div className={props.className}>
      <FormItem
        label={props.label}
        required={props.required}
        className={className}
        {...formItemLayout}
        help={state.lang}
        extra={props.__[props.extra] || props.extra}
      >
        {
          decorator && !state.hide ? getFieldDecorator(decorator.id, {
            rules: decorator.rules,
            initialValue: decorator.initialValue
          })(<div className="code" style={style} ref={self => this.ref = self} />) : <div />
        }
      </FormItem>
    </div>);
  }
}

export default CodemirrorModal;
