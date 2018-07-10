import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    items: this.props.items,
    collapsed: this.props.collapsed
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.items !== nextProps.items ? nextProps : null;
  }

  getIconByName(name) {
    switch (name) {
      case 'block-storage':
        return 'storage-volume';
      case 'alert_management':
        return 'alarm-mgmt';
      default:
        return name;
    }
  }

  render() {
    const items = this.state.items;
    const __ = this.props.__;
    return items ?
      <div className="side_menu">
        <div className="menu-wrapper">
          <Menu
            selectedKeys={items.defaultSelectedKeys}
            defaultOpenKeys={items.defaultOpenKeys}
            mode="inline"
            theme="dark"
            style={this.state.collapsed ? { width: 80 } : { width: 200 }}
            // 禁用Menu的点选功能，完全通过history.listen来操控selectedKeys
            selectable={false}
            inlineCollapsed={this.state.collapsed}
          >
            {
              items.modules.map(module => (!module.title ? module.items.map(item => (<Menu.Item key={item}>
                <Link to={`/${item}`}><Icon type={this.getIconByName(item)} /><span>{__[item]}</span></Link>
              </Menu.Item>)) :
              <SubMenu key={module.title} title={<span><Icon type={this.getIconByName(module.title)} /><span>{__[module.title]}</span></span>}>
                {
                  module.items.map(item => (<Menu.Item key={item}>
                    <Link to={`/${item}`}><Icon type="circle" /><span>{__[item]}</span></Link>
                  </Menu.Item>))
                }
              </SubMenu>))
            }
          </Menu>
        </div>
      </div> : null;
  }
}

export default SideMenu;
