/**
 * @PengJiyuan
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {

  context: __dirname,

  entry: './components/index.js',

  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'ufec.js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules|moment/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: process.env.NODE_ENV !== 'production'
        }
      }
    }],
    noParse: [
      /moment/g
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  resolve: {
    extensions: ['.jsx', '.js', 'json'],
    modules: [
      path.resolve(__dirname, '../'),
      'node_modules'
    ]
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    moment: {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment'
    },
    antd: {
      root: 'antd',
      commonjs2: 'antd',
      commonjs: 'antd',
      amd: 'antd'
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'react-router-dom'
    },
    eventemitter2: {
      root: 'EventEmitter2',
      commonjs2: 'eventemitter2',
      commonjs: 'eventemitter2',
      amd: 'eventemitter2'
    },
    history: {
      root: 'history',
      commonjs2: 'history',
      commonjs: 'history',
      amd: 'history'
    }
  }
};
