import './style/index.less';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * detail 里的属性组件
*/
class Properties extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 三个 prop，一个用来保存需要显示属性的数组， 一个改变detail的title， 一个__
   * 每个属性可能包含以下属性
   *  key: {string} 列表key值
   *  formatter: {string | ReactNode} 自定义显示内容
   *  title: {string} 属性的名字
   *  content: {string} 属性的值
   *  link: {string} 如果是链接需要跳转，这个属性传递要跳转的地址，直接传给 Link 组件
   *  拷贝、编辑等功能以后再加
   */
  render() {
    const { properties = [], title, __ } = this.props;

    return (
      <div className="uds-detail-properties-comp">
        <div className="uds-detail-properties-comp-title">
          {__[title] || __.property_details}
        </div>
        <ul className="property-list">
          {
            properties.map((property, idx) => {
              let content;

              if(property.formatter) {
                content = property.formatter;
              } else if(property.link) {
                content = (
                  <Link to={property.link}>
                    { property.content }
                  </Link>
                );
              } else {
                content = property.content;
              }

              return (
                <li key={property.key || String(idx)}>
                  <div className="property-title">
                    {typeof(property.title) === 'string' ?
                    __[property.title] || property.title :
                    property.title.map(function(m) {
                      return __[m];
                    }).join('')
                    }
                  </div>
                  <div className="property-content">
                    { content }
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default Properties;
