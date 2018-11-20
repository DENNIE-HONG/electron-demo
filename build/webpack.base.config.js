/**
 * webapck 基础配置
 * @author luyanhong 2018-11-19
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { WEBPACK_COMMON_CONFIG } = require('../config');
const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
}
module.exports = (env) => {
  const isProd = env.production === true;
  return {
    entry: WEBPACK_COMMON_CONFIG.entry,
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': resolve('src'),
        assets: resolve('src/assets'),
        coms: resolve('src/components'),
        server: resolve('server'),
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
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  resolve('src/assets/vars.scss'),
                  resolve('src/assets/mixins.scss')
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: isProd ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2048,
                name: isProd ? 'fonts/[name].[hash:7].[ext]' : 'fonts/[name].[ext]'
              }
            }
          ]
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
        filename: 'index.html',
        inject: true,
        cache: false,
        // favicon: path.resolve(__dirname, '../favicon.ico')
      })
    ]
  }
}
