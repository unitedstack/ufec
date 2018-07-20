const fs = require('fs');
const path = require('path');
const SourceMapConsumer = require('source-map').SourceMapConsumer;

const spy = async function(opts = {
  path: 'public/dist',
  filename: 'dashboard.min.js',
  line: 0,
  column: 0
}) {
  try {
    const data = fs.readFileSync(path.resolve(opts.path, `${opts.filename}.map`), 'utf8');
    const consumer = await new SourceMapConsumer(data);
    const origin = consumer.originalPositionFor({
      line: opts.line,
      column: opts.column
    });
    consumer.destroy();
    return origin;
  } catch(err) {
    return {};
  }
}

module.exports = spy;
