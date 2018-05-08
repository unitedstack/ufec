import './style/index.less';
import React from 'react';
import { Select, Icon } from 'antd';
import echarts from 'client/libs/chart/index';

const Option = Select.Option;

/**
 * 折线面积图组件，暂时不包含 state，有必要的时候再加
 * 接收以下的 props
 * __ {object}: 略，下面提到的属性中，设计到文本的地方，如 title 标题、select 中的 lable，数据系列的名字 name 均会使用 i18n 对象转换，单位部分则不会
 * height {number}: 整个图表组件的高度，默认是 291px
 *
 * onInitialize {function}: 图表挂载后执行的函数，用来获取数据，这个方法感觉不是特别的有必要，未来可能移除
 * onChange {function}: 当下拉框发生变化时执行的函数
 *
 * title {string}: 组件的标题部分，通常和 select 一行的那个
 *
 * select {object}: 下拉框配置项
 *   select.defaultValue: 默认选择的选项
 *   select.data {array}: 下拉框数据
 *   select.data[x].value: 下拉框的 option 值
 *   select.data[x].label: 下拉框的 option 的文本
 *
 * chartOption {object}: 图表的配置选项，支持以下参数
 *   hasLegend {boolean}: 是否需要图例，默认不展示
 *   legendPos {string}: 图例的位置，支持 'top' 和 'bottom'，即图例在图表上方还是下方
 *   yAxisUnit {string}: y 轴刻度文字的单位，例如 KB/S, MB 等，不过需要注意的是使用了单位后记得要将数据也转换为对应单位的值
 *
 * data {array}: 图表的数据系列配置项，其中的每个元素类似下面这样的对象
 *   data[0].name {string}: 数据系列的名字
 *   data[0].color: 系列图例的颜色
 *   data[0].lineColor: 折线的颜色，如果不传这个属性，则不会绘制线
 *   data[0].areaColor: 面积区域的颜色，以上的几个颜色部分，如果需要透明的请使用 rgba 形式
 *   data[0].data {array}: 数据部分，暂时只支持每个数据项都是两个元素数组形式的数据，
 *      数据的第一个元素是 UNIX 时间戳，第二个是数据值
 *
 * 一个栗子:
  {
    "title": "集群数据",
    "select": {
      "defaultValue": "123",
      "data": [{
        "value": "123",
        "label": "实时"
      }]
    },
    "chartOpt": {
      "hasLegend": true
    },
    "data": [{
      "name": "series1",
      "color": "red",
      "data": [[1214124214, 3], [1321321424, 20]]
    }, {
      "name": "series2",
      "color": "blue",
      "data": [[1214124214, 3], [1321321424, 20]]
    }]
  }
*/
class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.chart = null;
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    const { chartOpt, __ } = this.props;
    this.chart = echarts.$$init(this.divElem);
    this.chart.$$setOption('line', chartOpt, this.props.data, __);
    // 如果在这里显示 showLoading，请务必传递 onInitialize 方法，并保证在之后会更新组件、否则可能一直 loading
    this.setState({
      loading: true
    });
    this.props.onInitialize && this.props.onInitialize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;
    for(let i = 0; i < nextProps.data.length; i++) {
      // 目前只在图表的数据有更新的时候触发组件更新，如果以后有其他情况
      // 需要更新，记得修改这里
      if(props.data[i].data !== nextProps.data[i].data) {
        return true;
      }
    }
    if(this.state.loading !== nextState.loading) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, chartOpt, __ } = this.props;
    if(prevState.loading === this.state.loading) {
      this.setState({
        loading: false
      });
    }
    this.chart.$$setOption('line', chartOpt, data, __);
  }

  componentWillUnmount() {
    this.chart && this.chart.dispose();
    this.chart = null;
  }

  onSelectChange(selectedKey) {
    this.setState({
      loading: true
    });
    this.props.onChange(selectedKey);
  }

  render() {
    const {  __, height = 291 } = this.props;
    return (
      <div className="uds-component-line-chart-wrapper" style={{height: height}}>
        <div className="line-chart-header">
          <div className="title">
            {__[this.props.title] || this.props.title }
          </div>
          <div className="select">
            <Select defaultValue={this.props.select.defaultValue} onChange={this.onSelectChange}>
              {
                this.props.select.data.map((item, idx) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {__[item.label] || item.label }
                    </Option>
                  );
                })
              }
            </Select>
          </div>
        </div>
        <div className="line-chart-content">
          {
            this.state.loading ?
              (
                <div className="uds-component-line-chart-loading-wrapper">
                  <div className="loading-mask"></div>
                  <div className="loading-icon">
                    <Icon type="loading" />
                  </div>
                </div>
              ) : null
          }
          <div className="uds-component-line-chart" ref={(elem) => this.divElem = elem}></div>
        </div>
      </div>
    );
  }
}

export default LineChart;
