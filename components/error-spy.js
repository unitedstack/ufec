import fetch from './fetch';

class errorSpy {
  constructor(options = {
    report: false,
    url: '/report'
  }) {
    this.options = options;
  }

  init() {
    const opts = this.options;
    window.addEventListener('error', (event) => {
      // 通过分析当前url得到当前application
      const application = location.pathname.split('/')[1];
      // bundle的文件名，要拿到具体的source文件，需要分析sourcemap
      const filename = event.filename;
      // 当前的userAgent，用于记录电脑型号，浏览器类别等
      const ua = navigator.userAgent;
      // 也是用来定位电脑型号
      const platform = navigator.platform;
      // 因为报错的时候，如果react等打包到dll里，dll里也会抛出一个错误，正则匹配，之处理当前app的bundle文件。
      const reg = new RegExp(`.+\.${application}\.min\.js`);

      if (reg.test(filename)) {
        const data = {
          message: event.message,
          filename: event.filename,
          line: event.lineno,
          column: event.colno,
          application,
          userAgent: ua,
          platform
        };
        // event.error里的message没有Uncaught error字样
        if (event.error.message) {
          data.message = event.error.message;
        }
        // stack里有详细的错误信息
        if (event.error.stack) {
          data.stack = event.error.stack;
        }
        // 如果设置上报错误信息的话，根据提供的url上传错误信息。
        if (opts.report && opts.url) {
          fetch.post({
            url: opts.url,
            data
          }).then(() => {
            console.log('Report Success!');
          });
        }
      }
    });
  }
}

export default errorSpy;
