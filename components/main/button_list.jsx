import React from 'react';
import { Button, Dropdown, Menu, Icon } from 'antd';

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    btns: this.formatData(this.props.btns) // eslint-disable-line
  }

  formatData(btns) {
    const formatedBtns = {};

    btns.forEach((btn) => {
      if (btn.dropdown) {
        btn.dropdown.forEach((item) => {
          if (!item.type) {
            formatedBtns[item.key] = item;
          }
        });
      } else {
        formatedBtns[btn.key] = btn;
      }
    });
    return formatedBtns;
  }

  onClickDropdownList({ item, key, keyPath }) {
    this.props.onAction('btnList', 'click', {
      key
    });
  }

  onClickBtnList(key) {
    this.props.onAction('btnList', 'click', {
      key
    });
  }

  render() {
    const props = this.props,
      btns = props.btns,
      tableLoading = props.loading;

    return (
      <div className="btn-list">
        {
          btns.map((btn) => {
            if (btn.dropdown) {
              const menu = (
                <Menu onClick={this.onClickDropdownList.bind(this)}>
                  {
                    btn.dropdown.map((drop, i) => (drop.type && drop.type === 'divider' ?
                      <Menu.Divider key={i} /> :
                      <Menu.Item key={drop.key} disabled={tableLoading || drop.disabled}>{drop.value}</Menu.Item>))
                  }
                </Menu>
              );
              return (<Dropdown key={btn.key} overlay={menu} trigger={['click']} disabled={btn.disabled}>
                <Button type={btn.type}>
                  <Icon type={btn.iconPrefix || 'more'} />{btn.value} <Icon type={btn.iconSuffix || 'caret-down-right'} />
                </Button>
              </Dropdown>);
            }
            return (<Button
              onClick={this.onClickBtnList.bind(this, btn.key)}
              key={btn.key}
              type={btn.type}
              icon={btn.icon ? btn.icon : null}
              loading={btn.key === 'refresh' ? tableLoading : false}
              disabled={tableLoading || btn.disabled}
            >
              {btn.value}
            </Button>);
          })
        }
      </div>
    );
  }
}

export default ButtonList;
