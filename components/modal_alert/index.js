/**
 * @param title    - pop标题 (必填)
 * @param info     - pop的info
 * @param message  - pop的message
 * @param tip_type - pop的alert的type
 * @param btnValue - pop的确认按钮的文案 (必填)
 * @param btnType  - pop的确认按钮的type
 */
import commonModal from 'client/components/modal_v2/index';
import config from './config.json';

function pop(_props) {
  config.title = _props.title;
  config.fields[0].info = _props.info || '';
  config.fields[0].hide = !_props.info;
  config.fields[1].message = _props.message || '';
  config.fields[1].hide = !_props.message;
  config.fields[1].tip_type = _props.tip_type || 'warning';
  config.btn.value = _props.btnValue;
  config.btn.type = _props.btnType || 'danger';
  let props = {
    __: _props.__,
    config: config,
    onConfirm: function(refs, cb) {
      _props.onAction && _props.onAction(cb);
    }
  };
  commonModal(props);
}
export default pop;
