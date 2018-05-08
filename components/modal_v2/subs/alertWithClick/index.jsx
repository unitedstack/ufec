import React from 'react';
import { Alert } from 'antd';

/**
 * 带有可点击文本的 Alert 组件，目前仅支持在最后的文本添加点击功能
 * 参数基本同 Alert 组件，除了添加了一个 linkText prop
 * linkText: {string} 可点击内容的文本
 */
class Tip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: !!props.hide,
      message: props.message || '',
      description: props.description || ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide
    };
  }

  onClick = () => {
    this.props.onAction && this.props.onAction(this.props.field);
  }

  render() {
    let props = this.props,
      className = 'modal-row alert-row';

    className += this.state.hide ? ' hide' : '';

    let type = props.tip_type;

    return (
      <div className={className}>
        <Alert type={type}
          message={<TipContent message={props.__[props.message] || props.message}
            linkText={props.__[props.linkText]}
            onClick={this.onClick} />}
          description ={props.__[props.description]}
          showIcon />
      </div>
    );
  }
}


class TipContent extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = (e) => {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    const props = this.props;
    const linkStyle = {
      fontSize: 12,
      color: '#01AFC9',
      lineheight: 14,
      cursor: 'pointer'
    };

    return (
      <div>
        {props.message}
        <span onClick={this.onClick} style={linkStyle}>{props.linkText}</span>
      </div>
    );
  }
}

export default Tip;
