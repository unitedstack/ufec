import React from 'react';
import {Modal, Button, Alert, Checkbox, Icon} from 'antd';
import ReactDOM from 'react-dom';

const CheckboxGroup = Checkbox.Group;

class ModalBase extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled,
      tip: props.tip,
      tipType: 'warning',
      visible: true,
      hide: true,
      options: props.options,
      data: props.data,
      defaultValue: props.defaultValue,
      loading: false,
      value: props.value,
      nameType: props.nameType || 'name',
      alertTip: props.alertTip
    };

    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onDelete() {
    this.setState({ loading: true });
    this.props.onDelete && this.props.onDelete(this.state, (status, msg) => {
      if (status) {
        this.dealChainPop(() => {
          this.setState({
            visible: false,
            loading: false
          });
        });
      } else {
        this.setState({
          message: msg,
          hide: false
        });
        this.setState({
          loading: false
        });
      }
    });
  }

  onChange(value) {
    this.setState({
      value: value
    });
  }

  closeImmediately(cb) {
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

  dealChainPop(cb) {
    const refList = window.modalRefList;
    const len = refList.length;
    if(refList && refList.length > 1) {
      refList[len - 2].current.setState({
        loading: false,
        visible: true
      }, () => {
        refList.pop();
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

  onCancel() {
    this.dealChainPop(() => {
      this.setState({
        visible: false
      });
    });
    this.props.onCancel && this.props.onCancel();
  }

  render() {
    let props = this.props,
      state = this.state,
      __ = props.__,
      action = __[props.action],
      type = Array.isArray(props.type) ? props.type.map(t => __[t]).join('') : __[props.type],
      num = props.num || props.data.length,
      cancel = __.cancel,
      content = __.msg_delete.replace('{0}', action).replace('{1}', type).replace('{2}', num);

    let _props = Object.assign({}, props, {
      title: action + type
    });

    const div = Array.from(document.querySelectorAll('#modal-container > div'));
    const container = div[div.length - 1];

    return (
      <Modal ref={ this.modalRef }
        title={_props.title}
        visible={state.visible}
        width={540}
        getContainer={() => container}
        onCancel={this.onCancel}
        maskClosable={false}
        footer={[
          <Button key="cancel" type="dashed" onClick={this.onCancel}>{cancel}</Button>,
          <Button key="confirm" type="danger" disabled={state.disabled} loading={state.loading} onClick={this.onDelete}>{__.delete}</Button>
        ]}>
        <div className="modal-bd halo-com-modal-delete">
          <Icon type="exclamation-circle" />
          <span dangerouslySetInnerHTML={{__html: content}}></span>
          <ul className="data-list">
            {
              props.data.map((item) =>
                <li key={item.id || item.name}>
                  <span>{item[state.nameType] || '(' + item.id.substr(0, 8) + ')'}</span>
                </li>
              )
            }
          </ul>
          <div className={'modal-row tip-row' + (state.tip ? '' : ' hide')}>
            <Alert type={state.tipType} content={state.tip} showIcon={true} width={462}/>
          </div>
          <div className={props.hasCheckbox ? '' : 'hide'}>
            <CheckboxGroup value={state.value}
              options={state.options}
              defaultValue={state.defaultValue}
              onChange={this.onChange.bind(this)} />
          </div>
          <div className={props.hasAlert ? '' : 'hide'}>
            <p>{state.alertTip}</p>
          </div>
          <div className={'modal-error-message' + (state.hide ? ' hide' : '')}>
            <Alert __={__} message={state.message} type="error" showIcon />
          </div>
        </div>
        {props.children}
      </Modal>
    );
  }
}

export default ModalBase;
