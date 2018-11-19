/**
 * webapck 基础配置
 * @author luyanhong 2018-11-19
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const { WEBPACK_COMMON_CONFIG } = require('../config');
module.exports = {
  entry: WEBPACK_COMMON_CONFIG.entry,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      coms: path.resolve(__dirname, '../src/components'),
      server: path.resolve(__dirname, '../server'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        include: WEBPACK_COMMON_CONFIG.sourceCode,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([
      `${WEBPACK_COMMON_CONFIG.assetsDirectory}/`,
      `${WEBPACK_COMMON_CONFIG}/js`,
    ], {
      root: WEBPACK_COMMON_CONFIG.projectRoot
    }),
    new HtmlWebpackPlugin({
      template: WEBPACK_COMMON_CONFIG.assetsViews,
      filename: path.resolve(__dirname, '../app/app.html'),
      inject: true,
      cache: false,
      // favicon: path.resolve(__dirname, '../favicon.ico')
    })
  ]
}
