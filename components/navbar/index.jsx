import './style/index.less';

import React from 'react';
import { Icon, Badge, Dropdown, Menu, Modal } from 'antd';
import { version } from '../../../package.json';
import modifyPassword from './pop/modify_password/index';
import request from './request';
import history from '../../utils/history';

const ALERT_TYPES = ['informational', 'warning', 'major', 'critical'];

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    collapsed: this.props.collapsed,
    visible: false,
    totalAlertCount: 0,
    alertList: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.collapsed !== nextProps.collapsed ? nextProps : null;
  }

  componentDidMount() {
    this.updateAlert();
    setInterval(this.updateAlert.bind(this), 10000);
  }

  updateAlert() {
    request.getList().then(res => {
      const counts = res.severityCounts;
      this.setState({
        totalAlertCount: Object.keys(counts).filter(sc => ~ALERT_TYPES.findIndex(t => t === sc)).reduce((pre, cur) => pre + counts[cur], 0),
        alertList: counts
      });
    });
  }

  onClick() {
    this.props.onClick && this.props.onClick();
  }

  onClickHelpList = ({ item, key, keyPath }) => {
    switch(key) {
      case 'api_doc':
        if(GAREN.doc_url) {
          window.location = GAREN.doc_url;
        }
        break;
      case 'about_production':
        this.setState({
          visible: !this.state.visible
        });
        break;
      default:
        break;
    }
  }

  onClickUserList = ({ item, key, keyPath }) => {
    if(key === 'modify_password') {
      modifyPassword();
    }
  }

  onClickAlertList = () => {
    history.push('/alert_history');
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }

  getTypeFromColor(type) {
    switch(type) {
      case ALERT_TYPES[0]:
        return '#1CAFC6';
      case ALERT_TYPES[1]:
        return '#FCA625';
      case ALERT_TYPES[2]:
        return '#F04134';
      case ALERT_TYPES[3]:
        return '#C3180B';
      default:
        return '#1CAFC6';
    }
  }

  render() {
    const state = this.state;
    let lang = GAREN.locale;
    const __ = this.props.__;
    const alertMenu = (
      <Menu onClick={this.onClickAlertList}>
        {
          ALERT_TYPES.map(type => (
            <Menu.Item key={type}>{__[type]}&nbsp;
              <Badge
                count={state.alertList[Object.keys(state.alertList).find(alert => alert === type)]}
                style={{ backgroundColor: this.getTypeFromColor(type) }}
              />
            </Menu.Item>
          ))
        }
      </Menu>
    );
    const helpMenu = (
      <Menu onClick={this.onClickHelpList}>
        <Menu.Item key="api_doc">{__.api_doc}</Menu.Item>
        {/* <Menu.Item key="download_SDK">{__.download_SDK}</Menu.Item> */}
        <Menu.Item key="about_production">{__.about_production}</Menu.Item>
      </Menu>
    );
    const userMenu = (
      <Menu onClick={this.onClickUserList}>
        <Menu.Item key="modify_password">{__.modify_password}</Menu.Item>
        <Menu.Item><a href={lang === 'zh-cn' ? '?locale=en' : '?locale=zh-CN'}>{lang === 'zh-cn' ? __.en : __.zh}</a></Menu.Item>
        <Menu.Item><a href="/logout">{__.logout}</a></Menu.Item>
      </Menu>
    );
    return (
      <div id="navbar_dropdown_wrapper" className="garen-com-navbar">
        <ul className="left">
          {/* <li className="toggle" onClick={this.onClick.bind(this)}>
            <Icon type={
              state.collapsed ? 'menu-unfold' : 'menu-fold'
            } />
          </li> */}
        </ul>
        <ul className="right">
          <Dropdown getPopupContainer={() => document.getElementById('navbar_dropdown_wrapper')} overlay={alertMenu} >
            <li>
              <Badge count={state.totalAlertCount} overflowCount={99}>
                <div className="alert">
                  <Icon type="alarm" />
                </div>
              </Badge>
            </li>
          </Dropdown>
          <Dropdown getPopupContainer={() => document.getElementById('navbar_dropdown_wrapper')} overlay={helpMenu} >
            <li>
              <Icon type="exclamation-circle" /> {__.help}
            </li>
          </Dropdown>
          <Dropdown getPopupContainer={() => document.getElementById('navbar_dropdown_wrapper')} overlay={userMenu} >
            <li>
              <Icon type="admin" /> {GAREN.user.username}<Icon type="caret-down-right" />
            </li>
          </Dropdown>
        </ul>
        {/* 关于产品pop */}
        <Modal
          title={__.about_production}
          visible={state.visible}
          footer={null}
          onCancel={this.onCancel}
        >
          <div className="about_production_content">
            <div className="logo-wrapper">
              <img src="/public/assets/logo_black_40px.png" />
            </div>
            <div className="zh-name">存储平台</div>
            <div className="en-name">UDS Platform</div>
            <div className="version"><span>{version}</span></div>
            <div className="copyright">Copyright © 同方有云（北京）科技有限公司</div>
          </div>
        </Modal>
      </div>
    );
  }
}

module.exports = NavBar;
