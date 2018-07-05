function convert(config, __) {
  config.fields.forEach((field) => {
    if (field.extra) {
      field.extra = __[field.extra] || field.extra;
    }
    if (field.placeholder) {
      field.placeholder = __[field.placeholder] || field.placeholder;
    }
    if (field.decorator && field.decorator.rules && field.decorator.rules.length > 0) {
      field.decorator.rules.forEach((rule) => {
        rule.message = __[rule.message] || rule.message;
      });
    }
  });
}
export default convert;
