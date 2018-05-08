import commonModal from 'client/components/modal_v2/index';
import config from './config';
import __ from 'client/locale/dashboard.lang.json';
import request from '../../request';
import getErrorMessage from '../../../../applications/dashboard/utils/error_message';

function pop(obj, callback) {

  let props = {
    __: __,
    config: config,
    onConfirm: function(values, cb, closeImmediately) {
      request.modifyPassword({
        old_password: values.old_password,
        new_password: values.new_password
      }).then(res => {
        cb(true);
        window.location = '/logout';
      }).catch(err => {
        cb(false, getErrorMessage(err));
      });
    }
  };
  commonModal(props);
}
export default pop;
