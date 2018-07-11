import RSVP from 'rsvp';
import request from './ajax';

const Promise = RSVP.Promise;

function errHandler(err) {
  if (err.status === 401) {
    window.location = '/auth/logout';
  }
  return new Promise(((resolve, reject) => {
    reject(err);
  }));
}

const fetch = {};

['get', 'post', 'put', 'delete', 'patch', 'head'].forEach((m) => {
  fetch[m] = function (options) {
    const opt = Object.assign({
      dataType: 'json',
      contentType: 'application/json',
      headers: {}
    }, options);

    return request[m](opt).catch(errHandler);
  };
});

export default fetch;
