/**
 * hide: bool 隐藏
 * info: string text的内容
 * text_type: info | warning | error | default -- text的颜色
 */
import React from 'react';

import { Form } from 'antd';

const FormItem = Form.Item;

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: !!props.hide,
      info: props.info
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: !!nextProps.hide,
      info: nextProps.info
    };
  }

  setColorByType(type) {
    switch (type) {
      case 'info':
        return { color: '#01AFC9' };
      case 'waring':
        return { color: '#FCA625' };
      case 'error':
        return { color: '#EF6D64' };
      default:
        return { color: '#252F3D' };
    }
  }

  render() {
    const props = this.props;
    const state = this.state;
    let className = props.isColumn ? 'text-row column-row' : 'text-row';

    if (this.state.hide) {
      className += ' hide';
    }

    if (!props.hasLabel) {
      className += ' hidden';
    }

    return (<FormItem
      className={className}
      label={props.label}
      required={props.required}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <span style={this.setColorByType(props.text_type)}>{props.__[state.info] || state.info}</span>
    </FormItem>);
  }
}

export default Text;
