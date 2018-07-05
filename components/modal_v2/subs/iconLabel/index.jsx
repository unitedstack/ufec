/** 图标文字
 *
 * isColumn: bool 排列方式
 * hide: bool 隐藏
 * text: string label内容
 * icon_type: string icon的类型
 */
import React from 'react';

import { Icon, Form } from 'antd';

const FormItem = Form.Item;

class IconLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      hide: !!props.hide
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide,
      text: nextProps.text
    };
  }

  render() {
    const props = this.props;

    let className = 'icon-label-wrapper';

    if (this.state.hide) {
      className += ' hide';
    }

    return (<FormItem
      className={className}
      label={props.label}
      required={props.required}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      extra={props.extra}
    >
      {
        props.icon_type && <Icon type={props.icon_type} />
      }
      <span className="label_value">{this.state.text}</span>
    </FormItem>);
  }
}

export default IconLabel;
