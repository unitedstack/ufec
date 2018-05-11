import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

export default {
  input: './components/index',
  external: ['react', 'react-dom', 'react-router-dom', 'antd', 'history', 'eventemitter'],
  output: {
    format: 'es',
    file: 'lib/ufec.js'
  },
  plugins: [
    json(),
    babel(),
    resolve({
      extensions: [ '.js', '.jsx' ]
    })
  ]
};
