'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');


let config = Object.assign({}, baseConfig, {
  entry: './src/index',
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      STAGE: 'dev'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      inlineSource: '.(js)$'
    })
  ],
  module: defaultSettings.getDefaultModules()
});

module.exports = config;
