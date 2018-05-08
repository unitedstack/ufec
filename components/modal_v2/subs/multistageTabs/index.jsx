/** Tabs
 * required: bool 是否必需
 * hide: bool 隐藏,
 * type: tab类型, 有line、card、editable-card,
 * subtype: 同subtype,
 * panes: array tab内容 panes=[{title: xx, key: xx, content: string|Node }]
 * subpanes: 格式形如panes,
 * onAction: 点击tab出发的方法,
 * onSubAction: 点击subtab出发的方法,
 */

import React from 'react';
import { Tabs, Form } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panes: props.panes,
      subtype: props.subtype,
      subpanes: props.subpanes,
      hide: props.hide,
      type: props.type
    };
    this.onChange = this.onChange.bind(this);
    this.onSubChange = this.onSubChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      panes: nextProps.panes,
      subpanes: nextProps.subpanes,
      type: nextProps.type,
      subtype: nextProps.subtype,
      hide: nextProps.hide
    };
  }

  onChange(activeKey) {
    this.setState({
      activeKey: activeKey
    }, () => {
      this.props.onAction && this.props.onAction(this.props.field, this.state);
    });
  }

  onSubChange(activeKey) {
    this.setState({
      activeKey: activeKey
    }, () => this.props.onSubAction && this.props.onSubAction(this.props.field, this.state));
  }

  render() {
    let props = this.props,
      state = this.state;

    let className = 'modal-row tab-row';
    if (props.is_long_label) {
      className += ' label-row long-label-row';
    } else {
      className += ' label-row';
    }
    if (state.hide) {
      className += ' hide';
    }

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    return <FormItem
      label={props.label}
      className={className}
      {...formItemLayout}
      extra={props.extra}>
      {
        getFieldDecorator('currentKey')(
          <Tabs
            type={state.type}
            onTabClick={this.onChange}>
            {state.panes && state.panes.map(pane => {
              return <TabPane tab={props.__[pane.name]} key={pane.key}>
                {
                  getFieldDecorator('currentObjectKey')(
                    <Tabs
                      type={state.subtype}
                      onTabClick={this.onSubChange}>
                      {state.subpanes && state.subpanes.map(subpane => {
                        return <TabPane tab={props.__[subpane.name]} key={subpane.key}>{subpane.content}</TabPane>;
                      })}
                    </Tabs>
                  )}
              </TabPane>;})
            }
          </Tabs>
        )
      }
    </FormItem>;
  }
}

export default Tab;
