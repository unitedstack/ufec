/**
 * @func: convert obj value into specific language
 */
export default {
  getLangValue(lang, obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      let strs = '';
      obj.forEach((str) => {
        strs += lang[str] || str;
      });

      return strs;
    }
    return lang[obj] || obj;
  },

  convertLang(lang, config) {
    if (config.info) {
      config.info.title = this.getLangValue(lang, config.info.title);
      config.info.content = this.getLangValue(lang, config.info.content);
    }
    if (config.tabs) {
      config.tabs.forEach((item) => {
        item.name = this.getLangValue(lang, item.name);
      });
    }
    if (config.title) {
      config.title = this.getLangValue(lang, config.title);
    }
    if (config.search && config.search.placeholder) {
      config.search.placeholder = this.getLangValue(lang, config.search.placeholder);
    }
    if (config.btns) {
      config.btns.forEach((btn) => {
        if (btn.value) {
          btn.value = this.getLangValue(lang, btn.value);
          if (btn.dropdown) {
            btn.dropdown.forEach((item) => {
              if (!item.type) {
                item.value = this.getLangValue(lang, item.value);
              }
            });
          }
        }
      });
    }
    if (config.table) {
      config.table.columns.forEach((col) => {
        col.title = this.getLangValue(lang, col.title);
      });
    }
    if (config.table.detail) {
      config.table.detail.tabs && config.table.detail.tabs.forEach((tab) => {
        tab.name = this.getLangValue(lang, tab.name);
      });
    }
  }
};
