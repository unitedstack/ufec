import React from 'react';
import { Steps, Button } from 'antd';

const Step = Steps.Step;
class StepsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      disabled: props.disabled,
      loading: false,
      // isNext: false
    };
  }

  next() {
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const current = that.state.current + 1;
        this.setState({
          // isNext: true,
          current
        }, () => {
          this.props.onChange && this.props.onChange(values, current);
        });
      }
    });
    /* this.setState({
      isNext: true
    }, () => {
      this.props.onAction && this.props.onAction(this.props.field, this.state, () => {
        if (!this.state.loading) {
          let current = this.state.current + 1;
          this.setState({ current });
        }
      });
    }); */
  }

  prev() {
    const current = this.state.current - 1;
    const form = this.props.form.getFieldsValue();
    this.setState({
      // isNext: false,
      current
    }, () => this.props.onPrev && this.props.onPrev(current, form));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.disabled
    };
  }

  onConfirm() {
    this.props.onConfirm && this.props.onConfirm();
  }

  render() {
    const { current } = this.state,
      len = this.props.steps.length;

    const state = this.state,
      props = this.props,
      __ = props.__;

    return (<div className="steps-wrapper">
      <Steps current={current} size="small">
        {props.steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
      </Steps>
      <div className="steps-content">{props.steps[state.current].content}</div>
      <div style={{ marginTop: 24 }}>
        <Button
          className={current === 0 ? 'hide' : 'btn-default'}
          onClick={current !== 0 ? this.prev.bind(this) : null}
        >{__.prev}</Button>
        <Button
          disabled={state.disabled}
          style={{ float: 'right' }}
          type="primary"
          loading={state.loading}
          onClick={current !== len - 1 ? this.next.bind(this) : this.onConfirm.bind(this)}
        >
          {current === len - 1 ? __.create : __.next}
        </Button>
      </div>
    </div>);
  }
}
export default StepsModal;
