/**
 * format {string}: 格式
 * showTime {bool|object}: 是否要显示时间选择器，或者是 TimePicker 的参数
 */
import React from 'react';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import { DatePicker, Form, LocaleProvider } from 'antd';

const lang = GAREN.locale === 'zh-cn' ? zh_CN : en_US;

// 默认现在只用了 RangePicker，所以暂时只添加 RangePicker 的用法
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class DatePickerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide,
      disabled: props.disabled,
      format: props.format || 'YYYY-MM-DD',
      showTime: props.showTime || false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disabled: nextProps.disabled,
      hide: nextProps.hide
    };
  }

  render() {
    let props = this.props,
      state = this.state,
      className = '';

    className += state.hide ? ' hide' : '';

    const formItemLayout = props.formItemLayout || {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const decorator = props.decorator;

    const getFieldDecorator = this.props.form ? this.props.form.getFieldDecorator : null;

    return (
      <LocaleProvider locale={lang}>
        <div className={props.className}>
          <FormItem
            label={props.label}
            required={props.required}
            className={className}
            {...formItemLayout}
            extra={props.extra}>
            {
              decorator && getFieldDecorator(decorator.id, {
                rules: decorator.rules,
                initialValue: decorator.initialValue,
                onChange: decorator.onChange,
                hidden: state.hide
              })(
                <RangePicker format={state.format} showTime={state.showTime} style={{ width: '100%' }} />
              )
            }
          </FormItem>
        </div>
      </LocaleProvider>
    );
  }
}


export default DatePickerModal;
