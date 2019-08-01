/**
 * 打包app/main文件
 * @author luyanhong 2019-08-01
*/
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: './app/main',
  mode: 'production',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      })
    ],
    hashedModuleIds: true
  },
  output: {
    path: path.join(__dirname, '..'),
    filename: './app/main.prod.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};
