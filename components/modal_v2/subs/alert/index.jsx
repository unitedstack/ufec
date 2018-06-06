/**提示框
 *
 * hide: bool 隐藏
 * message: string alert的主要信息
 * description: string alert的解释性信息
 * tip_type: alert的type
 */

import React from 'react';
import { Alert } from 'antd';

class Tip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide,
      message: props.message || '',
      description: props.description || ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hide: nextProps.hide
    };
  }

  render() {
    let props = this.props,
      className = 'alert-row';

    className += this.state.hide ? ' hide' : '';

    let type = props.tip_type;

    const message = props.message;
    let msg;
    // 当message是数组的时候，返回多个div，用于换行
    if(Object.prototype.toString.call(message) === '[object Array]') {
      msg = [];
      message.forEach((m, i) => {
        msg.push(<div key={i}>{m}</div>);
      });
    } else {
      msg = props.__[props.message] || props.message;
    }

    return (
      <div className={className}>
        <Alert type={type}
          message={msg}
          description={props.__[props.description]}
          showIcon={props.showIcon === undefined ? true : props.showIcon} />
      </div>
    );
  }
}

export default Tip;
