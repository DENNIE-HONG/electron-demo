/**
 * webpack 开发环境配置
 * @author luyanhong 2018-11-19
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WEBPACK_DEV_CONFIG } = require('../config');
const devConfig = require('./webpack.base.config');
module.exports = (env) => merge(devConfig(env), {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    path: WEBPACK_DEV_CONFIG.assetsDirectory,
    publicPath: WEBPACK_DEV_CONFIG.assetsPublicPath,
    chunkFilename: 'js/[name].js'
  },
  devServer: {
    contentBase: WEBPACK_DEV_CONFIG.assetsDirectory,
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
    proxy: {
      '/wy': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/wy': '' }
      }
    },
    // historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
});
