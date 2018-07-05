/** treeSelect
 * placeholder: string
 * disabled: bool,
 * required: bool
 * hide: bool
 * treeData: array 初始化数据
 * treeData = {
 *   value: 'xx',
 *   key: 'xx1',
 *   children: [{
 *     value: 'xxx',
 *     key: 'xxxx1',
 *   }]
 * }
 */
import React from 'react';
import { TreeSelect, Form } from 'antd';

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class TreeSelectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide,
      maxHeight: 100,
      disabled: props.disabled,
      treeData: props.treeData || []
    };

    this.tree = [];
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      treeData: nextProps.treeData,
      hide: nextProps.hide,
      disabled: nextProps.disabled
    };
  }

  renderTreeNode(treeData) {
    return treeData.map(tree => (<TreeNode disabled={tree.disabled} value={tree.name} title={tree.name} key={tree.id} >
      { tree.children && this.renderTreeNode(tree.children) }
    </TreeNode>));
  }

  componentDidUpdate() {
    const decorator = this.props.decorator;
    const clientHeight = document.getElementById('modal-container').clientHeight;
    const decoratorEle = document.getElementsByClassName(decorator.id);

    let offsetTop = 0,
      height = 0,
      maxHeight = 400;

    if (decoratorEle[0]) {
      offsetTop = decoratorEle[0].offsetTop;
      height = decoratorEle[0].clientHeight;
    }

    maxHeight = clientHeight - offsetTop - height - 24 || '100px';

    if (maxHeight < 40) {
      maxHeight = 400;
    }

    if (maxHeight !== this.state.maxHeight) {
      this.setState({
        maxHeight
      });
    }
  }

  valueIsEmpty(decorator) {
    const value = this.props.form && this.props.form.getFieldValue(decorator && decorator.id);
    return value === undefined || value === '';
  }

  render() {
    const decorator = this.props.decorator;
    const props = this.props;
    const state = this.state;
    let className = decorator.id;

    if (this.state.hide) {
      className += ' hide';
    }

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    const isRequired = decorator && decorator.rules && decorator.rules.some(rule => rule.required);

    return (<FormItem
      label={props.label}
      className={className}
      {...formItemLayout}
      extra={props.extra}
    >
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide || (!isRequired && this.valueIsEmpty(decorator))
        })(<TreeSelect
          showSearch
          disabled={state.disabled}
          placeholder={props.placeholder}
          dropdownStyle={{ maxHeight: state.maxHeight }}
          allowClear
          multiple
          onSelect={this.onChange}
          treeCheckable
          showCheckedStrategy={SHOW_PARENT}
        >
          { this.state.treeData && this.renderTreeNode(this.state.treeData) }
        </TreeSelect>)
      }
    </FormItem>);
  }
}

export default TreeSelectModal;
