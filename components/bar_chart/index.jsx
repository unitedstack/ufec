import './style/index.less';
import React from 'react';
import echarts from 'client/libs/chart/index';


/**
 * 条形图组件，暂时不包含 state，有必要的时候再加
 * 接收以下的 props
 * 注：名字和标题的文本部分需事先用 i18n 转换好语言
 *
 * __ {object}: i18n
 * className {string}: 外层容器的类名
 * chartOption {object}: 图表的配置选项，支持以下参数
 *  title: {string|array} 条形图的标题
 *  subtitle: {string | object} 子标题，复杂情况下除了文本，可能包含数值部分和单位
 *    subtitle.text: {string} 文本
 *    subtitle.value: {number|string}子标题的数值部分
 *    subtitle.unit: {string} 子标题的数值的单位部分
 *  orient: {string} 布局方向，支持 'horizontal' 和 'vertical'
 *        :水平布局情况下，标题、子标题和图表在左边，图例在右边
 *        :垂直布局情况下，都在一列上
 *
 * data {array}: 图表的数据系列配置项，其中的每个元素类似下面这样的对象
 *   data[0].name {string | object}: 数据系列的名字，主要用于显示图例的文本，对象情况详见 client/libs/chart/helpers.js 428 行
 *   data[0].color: 颜色
 *   data[0].data {array}: 数据部分，暂时应该是一个单一数值的数组
 *
 * 一个栗子:
  {
    "chartOpt": {
      "title": "集群数据",
      subtitle: {
        "text": "总计",
        value: 270,
        unit: "TB"
      },
      orient: horizontal
    },
    "data": [{
      "name": "series1",
      "color": "red",
      "data": [20]
    }, {
      "name": "series2",
      "color": "blue",
      "data": [40]
    }]
  }
*/
class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.chart = null;
  }

  componentDidMount() {
    const { chartOpt, __, data } = this.props;
    this.chart = echarts.$$init(this.divElem);
    this.chart.$$setOption('bar', chartOpt, data, __);
  }

  componentDidUpdate() {
    this.chart.hideLoading();   // 暂时其实没加 loading 功能，这里是备用
    const { __, chartOpt, data } = this.props;
    this.chart.$$setOption('bar', chartOpt, data, __);
  }


  render() {
    let className = 'uds-component-bar-chart-wrapper';
    className += this.props.className ? (' ' + this.props.className) : '';
    return (
      <div className={className}>
        <div className="uds-component-bar-chart" ref={(elem) => this.divElem = elem }></div>
      </div>
    );
  }
}

export default BarChart;
