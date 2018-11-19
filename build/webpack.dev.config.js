/**
 * webpack 开发环境配置
 * @author luyanhong 2018-11-19
 */
const merge = require('webpack-merge');
const path = require('path');
const { WEBPACK_DEV_CONFIG } = require('../config');
const devConfig = require('./webpack.base.config');
module.exports = merge(devConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    path: WEBPACK_DEV_CONFIG.assetsDirectory,
    publicPath: WEBPACK_DEV_CONFIG.assetsPublicPath
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../app'),
    index: WEBPACK_DEV_CONFIG.assetsViews,
    watchContentBase: true,
    port: WEBPACK_DEV_CONFIG.port,
    compress: true,
    hot: true,
    publicPath: WEBPACK_DEV_CONFIG.assetsPublicPath,
    overlay: true,
    stats: {
      colors: true,
      modules: false,
      chunks: false,
      children: false,
    chunkModules: false
    },
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  }
});
