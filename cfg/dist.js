'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      EXPLORER_API_URL: process.env.EXPLORER_API_URL,
      STAGE: process.env.APP_STAGE
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        inline_script: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      inlineSource: '.(js)$'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

module.exports = config;
