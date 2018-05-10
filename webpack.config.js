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
    react: 'react',
    "react-dom": "react-dom",
    "moment": "moment",
    "antd": "antd",
    "react-router-dom": "react-router-dom"
  }
};
