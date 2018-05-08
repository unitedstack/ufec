/** treeSelect
 * placeholder: string
 * disabled: bool,
 * required: bool
 * hide: bool
 * value: array 选中值的数据
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
      value: props.value,
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
    return treeData.map(tree => <TreeNode disabled={tree.disabled} value={tree.name} title={tree.name} key={tree.id} >
      { tree.children && this.renderTreeNode(tree.children) }
    </TreeNode>);
  }

  componentDidUpdate() {
    const decorator = this.props.decorator;
    const clientHeight = document.getElementById('modal-container').clientHeight;

    let decoratorEle = document.getElementsByClassName(decorator.id),
      offsetTop = 0, height = 0, maxHeight = 400;

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
        maxHeight: maxHeight
      });
    }
  }

  render() {
    const decorator = this.props.decorator;
    let props = this.props,
      state = this.state,
      className = decorator.id;

    if (this.state.hide) {
      className += ' hide';
    }

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    return <FormItem
      label={props.label}
      className={className}
      {...formItemLayout}
      extra={props.extra}>
      {
        decorator && getFieldDecorator(decorator.id, {
          rules: decorator.rules,
          initialValue: decorator.initialValue,
          onChange: decorator.onChange,
          hidden: state.hide
        })(
          <TreeSelect
            showSearch
            disabled={state.disabled}
            placeholder={props.placeholder}
            dropdownStyle={{maxHeight: state.maxHeight}}
            allowClear
            multiple
            onSelect={this.onChange}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}>
            { this.state.treeData && this.renderTreeNode(this.state.treeData) }
          </TreeSelect>
        )
      }
    </FormItem>;
  }
}

export default TreeSelectModal;