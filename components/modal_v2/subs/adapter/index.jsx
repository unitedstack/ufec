/**
 * hide: bool 隐藏
 * info: string text的内容
 * text_type: info | warning | error | default -- text的颜色
 */
import React from 'react';

class Adapter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subs: props.subs
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      subs: nextProps.subs
    };
  }

  render() {
    const props = this.props,
      state = this.state,
      Subs = state.subs;

    return <Subs {...props} />;
  }
}

export default Adapter;
