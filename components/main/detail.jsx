import React from 'react';
import { Icon, Tabs, Spin } from 'antd';
import history from '../history';
const TabPane = Tabs.TabPane;

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    loading: false,
    contents: {},
    defaultKey: this.props.detail.tabs && this.props.detail.tabs.find(tab => tab.default).key,
    currentKey: this.props.detail.tabs && this.props.detail.tabs.find(tab => tab.default).key
  };

  onChangTabs(key) {
    if(key === this.state.currentKey) {
      return;
    }
    this.setState({
      currentKey: key
    }, () => {
      this.props.onClickTabs && this.props.onClickTabs(null, key);
    });
  }

  loading(bool, cb) {
    this.setState({
      loading: bool
    }, cb ? cb : () => {});
  }

  open = () => {
    this.setState({
      visible: true
    });
  }

  close = () => {
    this.setState({
      visible: false,
      currentKey: this.state.defaultKey,
      contents: {}
    }, () => {
      history.push(`/${history.getPathList()[0]}`);
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    const title = props.tabs && props.tabs.find(t => t.default).name;
    const tabs = props.detail.tabs;
    return (
      <div className={'garen-com-table-detail' + (state.visible ? ' visible' : '')}>
        <div className="detail-wrapper">
          <div className="header">
            <div className="left">
              <span onClick={this.close}><Icon type="left" />{title}</span>
            </div>
            <div className="center">{props.row ? props.row.id : ''}</div>
          </div>
          <div className="content">
            {tabs && tabs.length > 1 ? <div className="tabs">
              <Tabs activeKey={state.currentKey} onTabClick={this.onChangTabs.bind(this)} type="card">
                {
                  tabs.map(tab => <TabPane tab={tab.name} key={tab.key}></TabPane>)
                }
              </Tabs>
            </div> : null}
            {
              (props.tableLoading || state.loading) ?
              <div className="loading-wrapper">
                <Spin indicator={<Icon type="loading" style={{fontSize: 30}} />}/>
              </div> :
              Object.keys(state.contents).length > 0 && Object.keys(state.contents).map((key) =>
                state.contents[key] ?
                <div key={key}
                  className="detail-content"
                  style={{display: key === state.currentKey ? 'block' : 'none'}}>
                  {state.contents[key]}
                </div>
                  : null
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
